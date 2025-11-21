"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFood = void 0;
require("dotenv/config");
const generative_ai_1 = require("@google/generative-ai");
const ai = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const analyzeFood = async (imageBuffer) => {
    const model = ai.getGenerativeModel({
        model: "gemini-2.0-flash"
    });
    const prompt = `
    Anda adalah seorang ahli gizi dari Indonesia. Tugas Anda adalah menganalisis gambar makanan yang diberikan.

    Berikan output dalam format JSON murni, dengan struktur sebagai berikut:

    {
      "foodName": "nama makanan",
      "nutrition": {
        "kalori": 0,
        "lemak": 0,
        "gula": 0,
        "protein": 0,
        "sodium": 0
      },
      "risk": {
        "diabetes": "rendah|sedang|tinggi",
        "hipertensi": "rendah|sedang|tinggi",
        "kolesterol": "rendah|sedang|tinggi"
      },
      "recommendation": "rekomendasi kesehatan",
      "healthOpinion": "pendapat kesehatan singkat"
    }
    `;
    const result = await model.generateContent([
        { text: prompt },
        {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: 'image/jpeg' // Provide a default if req.file is undefined
            }
        }
    ]);
    const response = result.response.text();
    const cleanJson = response
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    try {
        return JSON.parse(cleanJson);
    }
    catch (_error) {
        console.error("Gagal parse JSON dari AI:", cleanJson, _error);
        throw new Error("Gagal memproses respons dari server AI.");
    }
};
exports.analyzeFood = analyzeFood;
//# sourceMappingURL=aiService.js.map