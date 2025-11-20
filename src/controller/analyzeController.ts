import { Request, Response } from "express";
import { analyzeFood } from "../services/aiService";

export async function analyzeFoodController(req: Request, res: Response) {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                status: "Error",
                message: "Gambar tidak ditemukan" 
            });
        }

        const imageBuffer = req.file.buffer;


        const result = await analyzeFood(imageBuffer);

        return res.json({
            status: "Success",
            data: result
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
