import api from "@/lib/axios";
import { AnalyzeFoodResponse, FoodHistoryResponse, WeeklySummaryResponse, AggregateMetricsResponse, HealthTipsResponse } from "@/lib/types";

export const analyzeFoodImage = async (
  file: File
): Promise<AnalyzeFoodResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post<AnalyzeFoodResponse>(
    "/api/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getTotalScan = () => api.get("/api/analyze",{
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }
});

export const getFoodHistory = async (): Promise<FoodHistoryResponse> => {
  const response = await api.get<FoodHistoryResponse>("/api/analyze/history", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getWeeklySummary = async (): Promise<WeeklySummaryResponse> => {
  const response = await api.get<WeeklySummaryResponse>("/api/analyze/weekly-summary", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getAggregateMetrics = async (): Promise<AggregateMetricsResponse> => {
  const response = await api.get<AggregateMetricsResponse>("/api/analyze/metrics", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const getHealthTips = async (): Promise<HealthTipsResponse> => {
  const response = await api.get<HealthTipsResponse>("/api/analyze/health-tips", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};