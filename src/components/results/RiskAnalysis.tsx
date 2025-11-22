import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";

interface Risk {
  name: string;
  level: string;
  displayLevel: string;
  score: number;
}

interface RiskAnalysisProps {
  risks: Risk[];
  getRiskColor: (level: string) => string;
  getRiskIcon: (level: string) => React.ReactNode;
}

const RiskAnalysis = ({
  risks,
  getRiskColor,
  getRiskIcon,
}: RiskAnalysisProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Analisis Risiko Penyakit
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {risks.map((risk, index) => (
          <div
            key={index}
            className="space-y-3 border p-4 rounded-xl bg-card/50"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">{risk.name}</span>
              <Badge className={getRiskColor(risk.level)}>
                {getRiskIcon(risk.level)}
                <span className="ml-1 capitalize">{risk.displayLevel}</span>
              </Badge>
            </div>
            <Progress value={risk.score} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Tingkat Risiko: {risk.displayLevel}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RiskAnalysis;
