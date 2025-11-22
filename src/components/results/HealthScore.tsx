import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import { AnalysisData } from "@/lib/types";

interface HealthScoreProps {
  nutritionScore: number;
  analysisResult: AnalysisData;
}

const HealthScore = ({
  nutritionScore,
  analysisResult,
}: HealthScoreProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Heart className="w-5 h-5 text-primary" />
        Skor Kesehatan
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Kualitas Gizi</span>
            <span className="font-semibold text-foreground">
              {nutritionScore}/100
            </span>
          </div>
          <Progress value={nutritionScore} className="h-3" />
        </div>
        <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
          <p className="text-sm text-muted-foreground italic">
            "{analysisResult.healthOpinion}"
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HealthScore;
