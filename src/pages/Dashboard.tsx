import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFoodHistory, getWeeklySummary, getAggregateMetrics, getHealthTips } from "@/api/food";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/dashboard/Header";
import KeyMetrics from "@/components/dashboard/KeyMetrics";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import RecentScans from "@/components/dashboard/RecentScans";
import HealthTips from "@/components/dashboard/HealthTips";
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import AccountInfo from "@/components/dashboard/AccountInfo";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
      return;
    }

    const userData = JSON.parse(user);
    setUserName(userData.name || "");
    setUserEmail(userData.email || "");
    setIsAuthenticated(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    toast({
      title: "Berhasil Logout",
      description: "Anda telah berhasil keluar dari akun Anda.",
    });
  };

  const {
    data: foodHistoryData,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    error: historyError,
  } = useQuery({
    queryKey: ["foodHistory"],
    queryFn: getFoodHistory,
    enabled: isAuthenticated,
  });

  const {
    data: weeklySummaryData,
    isLoading: isWeeklySummaryLoading,
    isError: isWeeklySummaryError,
    error: weeklySummaryError,
  } = useQuery({
    queryKey: ["weeklySummary"],
    queryFn: getWeeklySummary,
    enabled: isAuthenticated,
  });

  const {
    data: aggregateMetricsData,
    isLoading: isAggregateMetricsLoading,
    isError: isAggregateMetricsError,
    error: aggregateMetricsError,
  } = useQuery({
    queryKey: ["aggregateMetrics"],
    queryFn: getAggregateMetrics,
    enabled: isAuthenticated,
  });

  const {
    data: healthTipsData,
    isLoading: isHealthTipsLoading,
    isError: isHealthTipsError,
    error: healthTipsError,
  } = useQuery({
    queryKey: ["healthTips"],
    queryFn: getHealthTips,
    enabled: isAuthenticated,
  });

  const handleSaveProfile = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      userData.email = userEmail;
      localStorage.setItem("user", JSON.stringify(userData));

      toast({
        title: "Profil Tersimpan",
        description: "Data profil Anda berhasil diperbarui.",
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Hari ini, ${date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Kemarin, ${date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    } else {
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2" />
              Beranda
            </Button>
          </Link>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Keluar Akun
          </Button>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          <Header />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <KeyMetrics
                aggregateMetricsData={aggregateMetricsData}
                isAggregateMetricsLoading={isAggregateMetricsLoading}
                isAggregateMetricsError={isAggregateMetricsError}
              />
              <WeeklyProgress
                weeklySummaryData={weeklySummaryData}
                isWeeklySummaryLoading={isWeeklySummaryLoading}
                isWeeklySummaryError={isWeeklySummaryError}
                weeklySummaryError={weeklySummaryError as Error | null}
              />
              <RecentScans
                foodHistoryData={foodHistoryData}
                isHistoryLoading={isHistoryLoading}
                isHistoryError={isHistoryError}
                historyError={historyError as Error | null}
                formatTimestamp={formatTimestamp}
              />
              <HealthTips
                healthTipsData={healthTipsData}
                isHealthTipsLoading={isHealthTipsLoading}
                isHealthTipsError={isHealthTipsError}
                healthTipsError={healthTipsError as Error | null}
              />
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <ProfileInfo
                userEmail={userEmail}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
                handleSaveProfile={handleSaveProfile}
              />
              <AccountInfo handleLogout={handleLogout} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
