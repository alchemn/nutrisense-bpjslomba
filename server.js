const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Simpan gambar di RAM sebentar

app.use(cors());
app.use(express.static('public')); // Folder untuk file HTML nanti

// ⚠️ TEMPEL API KEY DI SINI
const API_KEY = "AIzaSyCy8JWRz613HogR0zDzpS5gNKu43Uf2Sso";
const genAI = new GoogleGenerativeAI(API_KEY);

// --- LOGIKA GEMINI (YANG KAMU SUDAH BUAT) ---
async function scanGemini(buffer, mimeType) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Atau 1.5-flash kalau error
    
    const prompt = `
      Kamu adalah Nutrisionis BPJS. Analisis gambar makanan ini.
      OUTPUT WAJIB JSON MURNI:
      {
        "nama_produk": "Nama Makanan/Merk",
        "estimasi_gizi": { "kalori": 0, "gula": 0, "lemak": 0, "protein": 0 },
        "analisa_kesehatan": "Saran singkat max 1 kalimat",
        "warna_risiko": "hijau/kuning/merah"
      }
      Jika bukan makanan, isi nama_produk: "Bukan Makanan".
    `;

    const result = await model.generateContent([
        prompt, 
        { inlineData: { data: buffer.toString("base64"), mimeType: mimeType } }
    ]);
    
    const text = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(text);
}

// --- ROUTE UNTUK MENERIMA GAMBAR DARI FRONTEND ---
app.post('/scan', upload.single('image'), async (req, res) => {
    try {
        console.log("📩 Menerima gambar dari Frontend...");
        if (!req.file) return res.status(400).json({ error: "Mana gambarnya?" });

        // Panggil Gemini
        const data = await scanGemini(req.file.buffer, req.file.mimetype);
        console.log("✅ Sukses! Mengirim balik ke Frontend.");
        
        res.json(data);

    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ error: "Server Gemini Sibuk / Error" });
    }
});

// Jalankan Server di Port 3000
app.listen(3000, () => {
    console.log("🚀 Server NutriSense jalan di: http://localhost:3000");
});