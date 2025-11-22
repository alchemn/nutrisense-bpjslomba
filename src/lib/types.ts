// Bagian Response Food Scan
export interface FoodNutrition {
  kalori: number;
  lemak: number;
  gula: number;
  protein: number;
  sodium: number;
}

export interface FoodRisk {
  diabetes: string;
  hipertensi: string;
  kolesterol: string;
}

export interface AnalysisData {
  foodName: string;
  nutrition: FoodNutrition;
  risk: FoodRisk;
  recommendation: string;
  healthOpinion: string;
}

export interface AnalyzeFoodResponse {
  status: "Success" | "Error";
  data: AnalysisData;
}

export interface ApiErrorResponse {
  message: string;
}

export interface FoodHistoryItem {
  id: string;
  userId: string;
  foodName: string;
  kalori: number;
  lemak: number;
  gula: number;
  protein: number;
  sodium: number;
  diabetes: string;
  hipertensi: string;
  kolesterol: string;
  recommendation: string;
  createdAt: string; // Assuming it comes as a string (ISO date)
}

export interface FoodHistoryResponse {
  status: "Success" | "Error";
  data: FoodHistoryItem[];
}

export interface WeeklySummaryItem {
  day: string;
  score: number;
}

export interface WeeklySummaryResponse {
  status: "Success" | "Error";
  data: WeeklySummaryItem[];
}

export interface AggregateMetricsData {
  weeklyScore: number;
  caloriesAvg: number;
  riskReduction: number;
  totalScans: number;
}

export interface AggregateMetricsResponse {
  status: "Success" | "Error";
  data: AggregateMetricsData;
}

export interface HealthTipsResponse {
  status: "Success" | "Error";
  data: string[];
}

// Login Type
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
