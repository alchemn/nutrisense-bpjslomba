import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Camera,
  Sparkles,
  Activity,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-nutrition.jpg";

interface HeroProps {
  isLoggedIn: boolean;
  userName: string;
  handleLogout: () => void;
  navigate: ReturnType<typeof useNavigate>;
}

const Hero = ({
  isLoggedIn,
  userName,
  handleLogout,
  navigate,
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by BPJS Kesehatan
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              NutriSense JKN
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Deteksi Dini Risiko Penyakit Berdasarkan Pola Makan Anda
            </p>
            <p className="text-lg text-muted-foreground">
              Platform berbasis AI yang membantu peserta JKN memahami kandungan
              gizi makanan dan mendapatkan peringatan risiko kesehatan sebelum
              penyakit serius datang.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/scanner">
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Camera className="mr-2" />
                  Scan Makanan Sekarang
                </Button>
              </Link>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <User className="mr-2" />
                      {userName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-border z-50">
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <Activity className="mr-2" />
                    Masuk / Daftar
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl opacity-10 blur-3xl"></div>
            <img
              src={heroImage}
              alt="Healthy Indonesian food ingredients"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
