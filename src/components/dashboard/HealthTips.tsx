import { Card } from "@/components/ui/card";
import { HealthTipsResponse } from "@/lib/types";
import { Loader2 } from "lucide-react";

interface HealthTipsProps {
  healthTipsData: HealthTipsResponse | undefined;
  isHealthTipsLoading: boolean;
  isHealthTipsError: boolean;
  healthTipsError: Error | null;
}

const HealthTips = ({
  healthTipsData,
  isHealthTipsLoading,
  isHealthTipsError,
  healthTipsError,
}: HealthTipsProps) => {
  return (
    <Card className="p-6 bg-gradient-hero">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Tips Kesehatan Hari Ini
      </h2>
      {isHealthTipsLoading && (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">
            Memuat tips kesehatan...
          </p>
        </div>
      )}
      {isHealthTipsError && (
        <div className="text-destructive text-center py-4">
          Gagal memuat tips kesehatan: {healthTipsError?.message}
        </div>
      )}
      {!isHealthTipsLoading &&
      !isHealthTipsError &&
      (healthTipsData?.data || []).length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {(healthTipsData?.data || []).map((tip: string, index: number) => (
            <div key={index} className="p-4 bg-card rounded-lg">
              <p className="text-foreground">{tip}</p>
            </div>
          ))}
        </div>
      ) : (
        !isHealthTipsLoading &&
        !isHealthTipsError && (
          <p className="text-center text-muted-foreground py-4">
            Belum ada tips kesehatan hari ini.
          </p>
        )
      )}
    </Card>
  );
};

export default HealthTips;
