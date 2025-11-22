import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Activity,
  Apple,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { AggregateMetricsResponse } from "@/lib/types";

interface KeyMetricsProps {
  aggregateMetricsData: AggregateMetricsResponse | undefined;
  isAggregateMetricsLoading: boolean;
  isAggregateMetricsError: boolean;
}

const KeyMetrics = ({
  aggregateMetricsData,
  isAggregateMetricsLoading,
  isAggregateMetricsError,
}: KeyMetricsProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          {isAggregateMetricsLoading ? (
            <Loader2 className="animate-spin" />
          ) : isAggregateMetricsError ? (
            <Badge variant="destructive">Error</Badge>
          ) : (
            <Badge className="bg-success/10 text-success border-success/20">
              <TrendingUp className="w-3 h-3 mr-1" />+{" "}
              {aggregateMetricsData?.data?.riskReduction || 0}%
            </Badge>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Skor Mingguan</p>
          <p className="text-3xl font-bold text-foreground">
            {isAggregateMetricsLoading
              ? "..."
              : aggregateMetricsData?.data?.weeklyScore || 0}
          </p>
          <Progress
            value={
              isAggregateMetricsLoading
                ? 0
                : aggregateMetricsData?.data?.weeklyScore || 0
            }
            className="h-2"
          />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-secondary-foreground" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Total Scan</p>
          <p className="text-3xl font-bold text-foreground">
            {isAggregateMetricsLoading
              ? "..."
              : aggregateMetricsData?.data?.totalScans || 0}
          </p>
          <p className="text-xs text-muted-foreground">makanan teranalisis</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
            <Apple className="w-6 h-6 text-accent-foreground" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Kalori Rata-rata</p>
          <p className="text-3xl font-bold text-foreground">
            {isAggregateMetricsLoading
              ? "..."
              : aggregateMetricsData?.data?.caloriesAvg || 0}
          </p>
          <p className="text-xs text-muted-foreground">per hari</p>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-primary-foreground" />
          </div>
          {isAggregateMetricsLoading ? (
            <Loader2 className="animate-spin" />
          ) : isAggregateMetricsError ? (
            <Badge variant="destructive">Error</Badge>
          ) : (
            <Badge className="bg-success/10 text-success border-success/20">
              {(aggregateMetricsData?.data?.riskReduction || 0) >= 0
                ? "Baik"
                : "Buruk"}
            </Badge>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Penurunan Risiko</p>
          <p className="text-3xl font-bold text-foreground">
            {isAggregateMetricsLoading
              ? "..."
              : `${aggregateMetricsData?.data?.riskReduction || 0}%`}
          </p>
          <p className="text-xs text-muted-foreground">bulan ini</p>
        </div>
      </Card>
    </div>
  );
};

export default KeyMetrics;
