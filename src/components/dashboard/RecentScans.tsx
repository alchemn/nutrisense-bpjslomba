import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple, Loader2 } from "lucide-react";
import { FoodHistoryResponse, FoodHistoryItem } from "@/lib/types";

interface RecentScansProps {
  foodHistoryData: FoodHistoryResponse | undefined;
  isHistoryLoading: boolean;
  isHistoryError: boolean;
  historyError: Error | null;
  formatTimestamp: (timestamp: string) => string;
}

const RecentScans = ({
  foodHistoryData,
  isHistoryLoading,
  isHistoryError,
  historyError,
  formatTimestamp,
}: RecentScansProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Riwayat Scan Terbaru
      </h2>
      {isHistoryLoading && (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">Memuat riwayat...</p>
        </div>
      )}
      {isHistoryError && (
        <div className="text-destructive text-center py-4">
          Gagal memuat riwayat: {historyError?.message}
        </div>
      )}
      {!isHistoryLoading &&
      !isHistoryError &&
      foodHistoryData?.data &&
      foodHistoryData.data.length > 0 ? (
        <div className="space-y-4">
          {foodHistoryData.data.map((scan: FoodHistoryItem, index: number) => (
            <div
              key={scan.id || index} // Use scan.id if available, fallback to index
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Apple className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{scan.foodName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTimestamp(scan.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Kalori</p>
                  <p className="font-semibold text-foreground">
                    {scan.kalori}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Risiko Diabetes
                  </p>
                  <Badge
                    className={
                      scan.diabetes === "Tinggi"
                        ? "bg-destructive"
                        : scan.diabetes === "Sedang"
                        ? "bg-warning"
                        : "bg-success"
                    }
                  >
                    {scan.diabetes}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isHistoryLoading &&
        !isHistoryError && (
          <p className="text-center text-muted-foreground py-4">
            Belum ada riwayat scan makanan.
          </p>
        )
      )}
    </Card>
  );
};

export default RecentScans;
