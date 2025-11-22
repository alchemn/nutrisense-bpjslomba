import { Card } from "@/components/ui/card";
import { AnalysisData } from "@/lib/types";

interface FoodInfoProps {
  foodImage: string;
  analysisResult: AnalysisData;
}

const FoodInfo = ({ foodImage, analysisResult }: FoodInfoProps) => {
  return (
    <Card className="p-6">
      <img
        src={foodImage}
        alt="Analyzed food"
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        {analysisResult.foodName}
      </h2>
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="text-3xl font-bold text-primary">
          {analysisResult.nutrition.kalori}
        </span>
        <span>kalori</span>
      </div>
    </Card>
  );
};

export default FoodInfo;
