import { Card } from "@/components/ui/card";

interface RecommendationsProps {
  recommendationsList: string[];
}

const Recommendations = ({ recommendationsList }: RecommendationsProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        Rekomendasi & Saran
      </h3>
      <div className="space-y-3">
        {recommendationsList.map((recommendation, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-background rounded-lg border shadow-sm"
          >
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-primary-foreground text-sm font-semibold mt-0.5">
              {index + 1}
            </span>
            <p className="text-foreground text-sm leading-relaxed">
              {recommendation}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Recommendations;
