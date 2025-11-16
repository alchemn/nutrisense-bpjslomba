import 'dotenv/config'

type Nutrition = {
    kalori: number;
    lemak: number;
    gula: number;
    protein: number;
    sodium: number;
}

const urlOllama = process.env.OLLAMA_URL
const model = process.env.OLLAMA_MODEL

const BASE_PROMPT = `Kamu adalah pakar gizi yang sangat paham makanan Indonesia. Tugasmu: berikan Estimasi kandungan gizi untuk satu jenis makanan.
wajib balas DALAM FORMAT JSON MURNI TANPA TEKS LAIN, dengan Struktur: {
"kalori" : number,
"lemak" : number,
"gula" : number,
"protein" : number,
"sodium" : number,
}`;

function safeParseNutrition(raw:string):Nutrition{
    try {
        const data = JSON.parse(raw)
        return {
            kalori: Number(data.kalori ?? 0),
            lemak: Number(data.lemak ?? 0),
            gula: Number(data.gula ?? 0),
            protein: Number(data.protein ?? 0),
            sodium: Number(data.sodium ?? 0),
        }
    } catch (error) {
     return {
        kalori: 0,
        lemak: 0,
        gula: 0,
        protein: 0,
        sodium: 0
     }   
    }
}

export const getNutrition = async (foodName:string):Promise<Nutrition> => {
    if (!urlOllama || !model) {
        throw new Error("OLLAMA_URL or OLLAMA_MODEL is not defined in the environment variables.");
    }
    const body = {
        model,
        message: [
            {role: "system", content: BASE_PROMPT},
            {role: "user",
                content: `Berikan estimasi gizi untuk makanan: "${foodName}". Ingat: balas hanya JSON.`
            }
        ],
        stream: false
    }
    const resp = await fetch(urlOllama,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    if(!resp.ok){
        console.error("Ollama Error", await resp.text())
        throw new Error("Ollama Error")
    }
    const data = await resp.json()
    const content: string = data?.message?.content
    return safeParseNutrition(content)
}