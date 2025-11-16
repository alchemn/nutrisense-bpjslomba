import foodData from "../data/foodData.json"
import fs from "fs"
import { getNutrition } from "./nutritionAi"
interface NutritionData {
    [key: string]: {
        kalori: number;
        lemak: number;
        gula: number;
        protein: number;
    };
}

export const getNutritionInfo = async (foodName: string) => {
    const key = foodName.toLowerCase();

    if((foodData as any)[key]){
        return (foodData as any)[key]
    }

    const generated = await getNutrition(foodName);
    (foodData as any)[key] = generated
    fs.writeFileSync("src/data/foodData.json", JSON.stringify(foodData, null, 2))
    return generated
}