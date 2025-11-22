import { Request, Response } from "express";
import { analyzeFood, generateHealthTips } from "../services/aiService"; // Add generateHealthTips
import prisma from '../utils/prisma';


export async function analyzeFoodController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                status: "Error",
                message: "Gambar tidak ditemukan" 
            });
        }

        const imageBuffer = req.file.buffer;


        const aiRes = await analyzeFood(imageBuffer);

        const userId = req.user?.id as string
        if(!userId) {
            return res.status(401).json({
                message: "Unauthorized" 
            })
        }

        // Validasi struktur data dari AI sebelum menyimpan ke database
        if (!aiRes.foodName || !aiRes.nutrition || !aiRes.risk || !aiRes.recommendation) {
            return res.status(500).json({
                status: "Error",
                message: "Struktur data dari AI tidak lengkap"
            });
        }

        await prisma.foodHistory.create({
            data: {
                userId,
                foodName: aiRes.foodName,

                kalori: aiRes.nutrition.kalori,
                lemak: aiRes.nutrition.lemak,
                gula: aiRes.nutrition.gula,
                protein: aiRes.nutrition.protein,
                sodium: aiRes.nutrition.sodium,

                diabetes: aiRes.risk.diabetes,
                hipertensi: aiRes.risk.hipertensi,
                kolesterol: aiRes.risk.kolesterol,

                recommendation: aiRes.recommendation
            }
        });

        // Return response ke frontend
        return res.json({
            status: "Success",
            data: aiRes
        });

    } catch (err) {
        console.error("Analyze error:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal Menganalisa Makanan";
        return res.status(500).json({ 
            status: "Error",
            message: errorMessage
        });
    }
}



export async function getHistoryController(req: Request, res: Response) {
    try {
        const userId = req.user?.id as string;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const history = await prisma.foodHistory.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return res.status(200).json({
            status: "Success",
            data: history,
        });
    } catch (err) {
        console.error("Error fetching history:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal mengambil riwayat";
        return res.status(500).json({
            status: "Error",
            message: errorMessage,
        });
    }
}


export async function getWeeklySummaryController(req: Request, res: Response) {
    try {
        const userId = req.user?.id as string;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const weeklySummary = [];
        const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']; 

        for (let i = 6; i >= 0; i--) { 
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const nextDate = new Date(date);
            nextDate.setDate(date.getDate() + 1);

            const scansToday = await prisma.foodHistory.count({
                where: {
                    userId: userId,
                    createdAt: {
                        gte: date,
                        lt: nextDate,
                    },
                },
            });

            weeklySummary.push({
                day: dayNames[date.getDay()],
                score: scansToday, 
            });
        }

        return res.status(200).json({
            status: "Success",
            data: weeklySummary,
        });
    } catch (err) {
        console.error("Error fetching weekly summary:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal mengambil ringkasan mingguan";
        return res.status(500).json({
            status: "Error",
            message: errorMessage,
        });
    }
}


export async function getAggregateMetricsController(req: Request, res: Response) {
    try {
        const userId = req.user?.id as string;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const allHistory = await prisma.foodHistory.findMany({
            where: { userId: userId },
        });

        if (allHistory.length === 0) {
            return res.status(200).json({
                status: "Success",
                data: {
                    weeklyScore: 0,
                    caloriesAvg: 0,
                    riskReduction: 0,
                    totalScans: 0,
                },
            });
        }

        const totalCalories = allHistory.reduce((sum, item) => sum + item.kalori, 0);
        const averageCalories = Math.round(totalCalories / allHistory.length);

        let totalHealthScore = 0;
        let goodRiskCount = 0;

        const riskMapping = {
            "Rendah": 100,
            "Sedang": 50,
            "Tinggi": 0,
        };

        allHistory.forEach(item => {
            const itemRiskScores = [
                riskMapping[item.diabetes as keyof typeof riskMapping] ?? 0,
                riskMapping[item.hipertensi as keyof typeof riskMapping] ?? 0,
                riskMapping[item.kolesterol as keyof typeof riskMapping] ?? 0,
            ];
            const itemAverageScore = itemRiskScores.reduce((sum, score) => sum + score, 0) / itemRiskScores.length;
            totalHealthScore += itemAverageScore;

            if (item.diabetes === "Rendah" && item.hipertensi === "Rendah" && item.kolesterol === "Rendah") {
                goodRiskCount++;
            }
        });

        const weeklyScore = Math.round(totalHealthScore / allHistory.length);
        const riskReduction = Math.round((goodRiskCount / allHistory.length) * 100);

        return res.status(200).json({
            status: "Success",
            data: {
                weeklyScore: weeklyScore,
                caloriesAvg: averageCalories,
                riskReduction: riskReduction,
                totalScans: allHistory.length,
            },
        });

    } catch (err) {
        console.error("Error fetching aggregate metrics:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal mengambil metrik agregat";
        return res.status(500).json({
            status: "Error",
            message: errorMessage,
        });
    }
}

export async function getDailyHealthTipsController(req: Request, res: Response) {
    try {
        const tips = await generateHealthTips();

        if (!Array.isArray(tips) || tips.some(tip => typeof tip !== 'string')) {
            throw new Error("Format tips dari AI tidak sesuai.");
        }

        return res.status(200).json({
            status: "Success",
            data: tips,
        });
    } catch (err) {
        console.error("Error fetching daily health tips:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal mengambil tips kesehatan harian";
        return res.status(500).json({
            status: "Error",
            message: errorMessage,
        });
    }
}

export async function countAnalyze(req:Request,res:Response){
    try {
        const data = await prisma.foodHistory.count({
            where: {
                userId: req.user?.id as string
            }
        })
        res.status(200).json({
            message: "Success",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}