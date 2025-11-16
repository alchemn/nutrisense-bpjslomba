import {Request,Response} from "express"
import { detectFood } from "../services/visionService"
import { getNutritionInfo } from "../services/nutritionService"
import { calculateRisk } from "../utils/riskCalculator"

export async function analyzeFood(req:Request, res:Response) {
    try {
        if(!req.file){
            return res.status(400).json({error: "Gambar tidak ditemukan"})
        }
        const foodName = await detectFood(req.file.path)
        const nutrition = await getNutritionInfo(foodName)
        const risk = calculateRisk(nutrition)
        res.json({
            status: "Success",
            foodName,
            nutrition,
            risk
        })
    } catch (err) {
       console.error(err);
       res.status(500).json({error: "Gagal Menganalisa Makanan"})
    }
}