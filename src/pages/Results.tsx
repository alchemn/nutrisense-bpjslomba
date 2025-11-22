import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Activity,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { AnalysisData } from "@/lib/types";
import { getUser } from "@/utils/auth";
import ResultHeader from "@/components/results/ResultHeader";
import FoodInfo from "@/components/results/FoodInfo";
import HealthScore from "@/components/results/HealthScore";
import RiskAnalysis from "@/components/results/RiskAnalysis";
import NutritionBreakdown from "@/components/results/NutritionBreakdown";
import Recommendations from "@/components/results/Recommendations";
import ResultActions from "@/components/results/ResultActions";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (!user) {
      navigate("/auth");
    }
  }, [navigate]);

  const state = location.state as {
    foodImage: string;
    analysisResult: AnalysisData;
  } | null;
  const { foodImage, analysisResult } = state || {};

  useEffect(() => {
    if (!foodImage || !analysisResult) {
      navigate("/scanner");
    }
  }, [foodImage, analysisResult, navigate]);

  const calculateDV = (value: number, standard: number) => {
    const percent = (value / standard) * 100;
    return Math.min(Math.round(percent), 100);
  };

  const mapRiskLevel = (level: string) => {
    const lowerLevel = level.toLowerCase();
    if (lowerLevel.includes("tinggi")) return "high";
    if (lowerLevel.includes("sedang")) return "medium";
    return "low";
  };

  const getRiskScore = (level: string) => {
    const map = mapRiskLevel(level);
    if (map === "high") return 85;
    if (map === "medium") return 50;
    return 15;
  };

  const recommendationsList = useMemo(() => {
    if (!analysisResult?.recommendation) return [];
    return analysisResult.recommendation
      .split(".")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }, [analysisResult?.recommendation]);

  if (!foodImage || !analysisResult) return null;

  const nutritionScore = Math.max(
    0,
    100 -
      (analysisResult.nutrition.gula > 10 ? 20 : 0) -
      (analysisResult.nutrition.lemak > 10 ? 15 : 0) -
      (mapRiskLevel(analysisResult.risk.diabetes) === "high" ? 20 : 0)
  );

  const risks = [
    {
      name: "Diabetes",
      level: mapRiskLevel(analysisResult.risk.diabetes),
      displayLevel: analysisResult.risk.diabetes,
      score: getRiskScore(analysisResult.risk.diabetes),
    },
    {
      name: "Hipertensi",
      level: mapRiskLevel(analysisResult.risk.hipertensi),
      displayLevel: analysisResult.risk.hipertensi,
      score: getRiskScore(analysisResult.risk.hipertensi),
    },
    {
      name: "Kolesterol",
      level: mapRiskLevel(analysisResult.risk.kolesterol),
      displayLevel: analysisResult.risk.kolesterol,
      score: getRiskScore(analysisResult.risk.kolesterol),
    },
  ];

  const nutrients = [
    {
      name: "Protein",
      amount: `${analysisResult.nutrition.protein}g`,
      percentage: calculateDV(analysisResult.nutrition.protein, 60),
    },
    {
      name: "Lemak",
      amount: `${analysisResult.nutrition.lemak}g`,
      percentage: calculateDV(analysisResult.nutrition.lemak, 67),
    },
    {
      name: "Gula",
      amount: `${analysisResult.nutrition.gula}g`,
      percentage: calculateDV(analysisResult.nutrition.gula, 50),
    },
    {
      name: "Sodium",
      amount: `${analysisResult.nutrition.sodium}mg`,
      percentage: calculateDV(analysisResult.nutrition.sodium, 2000),
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-yellow-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "high":
        return <AlertTriangle className="w-4 h-4" />;
      case "medium":
        return <Activity className="w-4 h-4" />;
      case "low":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <Link to="/scanner">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" />
            Scan Lagi
          </Button>
        </Link>

        <div className="max-w-6xl mx-auto space-y-6">
          <ResultHeader />

          <div className="grid lg:grid-cols-2 gap-6">
            <FoodInfo
              foodImage={foodImage}
              analysisResult={analysisResult}
            />
            <HealthScore
              nutritionScore={nutritionScore}
              analysisResult={analysisResult}
            />
          </div>

          <RiskAnalysis
            risks={risks}
            getRiskColor={getRiskColor}
            getRiskIcon={getRiskIcon}
          />

          <NutritionBreakdown nutrients={nutrients} />

          <Recommendations recommendationsList={recommendationsList} />

          <ResultActions />
        </div>
      </div>
    </div>
  );
};

export default Results;