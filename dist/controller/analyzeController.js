"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFoodController = analyzeFoodController;
const aiService_1 = require("../services/aiService");
const prisma_1 = __importDefault(require("../utils/prisma"));
async function analyzeFoodController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: "Error",
                message: "Gambar tidak ditemukan"
            });
        }
        const imageBuffer = req.file.buffer;
        const aiRes = await (0, aiService_1.analyzeFood)(imageBuffer);
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        // Validasi struktur data dari AI sebelum menyimpan ke database
        if (!aiRes.foodName || !aiRes.nutrition || !aiRes.risk || !aiRes.recommendation) {
            return res.status(500).json({
                status: "Error",
                message: "Struktur data dari AI tidak lengkap"
            });
        }
        await prisma_1.default.foodHistory.create({
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
    }
    catch (err) {
        console.error("Analyze error:", err);
        const errorMessage = err instanceof Error ? err.message : "Gagal Menganalisa Makanan";
        return res.status(500).json({
            status: "Error",
            message: errorMessage
        });
    }
}
//# sourceMappingURL=analyzeController.js.map