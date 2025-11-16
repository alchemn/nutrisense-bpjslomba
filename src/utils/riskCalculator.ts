export const calculateRisk = (nutrition:any) => {
    return {
        diabetes: nutrition.gula > 15 ? "tinggi" : "rendah",
        hipertensi: nutrition.sodium > 300 ? "tinggi" : "rendah",
        kolesterol: nutrition.lemak > 20 ? "tinggi" : "rendah"
    }
}