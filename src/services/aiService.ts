import 'dotenv/config'
import { GoogleGenerativeAI } from "@google/generative-ai";

// Konfigurasi awal untuk koneksi ke Google AI
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const analyzeFood = async (imageBuffer: Buffer) => {
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
      "healthOpinion": "pendapat kesehatan singkat",
      "recommendations": [
        "rekomendasi 1",
        "rekomendasi 2"
      ]
    }
    `;

    const result = await model.generateContent([
        { text: prompt },
        {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/jpeg"
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
    } catch (error) {
        console.error("Gagal parse JSON dari AI:", cleanJson);
        throw new Error("Gagal memproses respons dari server AI.");
    }
}