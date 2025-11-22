import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Nutrient {
  name: string;
  amount: string;
  percentage: number;
}

interface NutritionBreakdownProps {
  nutrients: Nutrient[];
}

const NutritionBreakdown = ({ nutrients }: NutritionBreakdownProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Komposisi Nutrisi
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {nutrients.map((nutrient, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">
                {nutrient.name}
              </span>
              <span className="text-sm font-bold text-foreground">
                {nutrient.amount}
              </span>
            </div>
            <Progress value={nutrient.percentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {nutrient.percentage}% dari batas harian
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NutritionBreakdown;
