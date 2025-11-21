import { Request, Response } from "express";
import { analyzeFood } from "../services/aiService";
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
