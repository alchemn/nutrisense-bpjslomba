import { Card } from "@/components/ui/card";
import { WeeklySummaryResponse, WeeklySummaryItem } from "@/lib/types";
import { Calendar, Loader2 } from "lucide-react";

interface WeeklyProgressProps {
  weeklySummaryData: WeeklySummaryResponse | undefined;
  isWeeklySummaryLoading: boolean;
  isWeeklySummaryError: boolean;
  weeklySummaryError: Error | null;
}

const WeeklyProgress = ({
  weeklySummaryData,
  isWeeklySummaryLoading,
  isWeeklySummaryError,
  weeklySummaryError,
}: WeeklyProgressProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        Progres Mingguan
      </h2>
      {isWeeklySummaryLoading && (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-muted-foreground">
            Memuat ringkasan mingguan...
          </p>
        </div>
      )}
      {isWeeklySummaryError && (
        <div className="text-destructive text-center py-4">
          Gagal memuat ringkasan mingguan: {weeklySummaryError?.message}
        </div>
      )}
      {!isWeeklySummaryLoading &&
      !isWeeklySummaryError &&
      (weeklySummaryData?.data || []).length > 0 ? (
        <div className="flex items-end justify-between gap-4 h-48">
          {(weeklySummaryData?.data || []).map(
            (day: WeeklySummaryItem, index: number) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full bg-muted rounded-t-lg relative">
                  <div
                    className="absolute bottom-0 w-full bg-gradient-primary rounded-t-lg transition-all"
                    style={{
                      height: `${day.score * 5 > 100 ? 100 : day.score * 5}%`,
                    }} // Scale score for UI: max 100%
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {day.day}
                </span>
                <span className="text-xs text-foreground font-semibold">
                  {day.score}
                </span>
              </div>
            )
          )}
        </div>
      ) : (
        !isWeeklySummaryLoading &&
        !isWeeklySummaryError && (
          <p className="text-center text-muted-foreground py-4">
            Belum ada data progres mingguan.
          </p>
        )
      )}
    </Card>
  );
};

export default WeeklyProgress;
