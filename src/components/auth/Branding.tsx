import { NavLink } from "@/components/NavLink";
import { ArrowLeft, Heart, Shield, Scan } from "lucide-react";

const Branding = () => {
  return (
    <div className="hidden lg:block space-y-6">
      <NavLink
        to="/"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Kembali ke Beranda</span>
      </NavLink>

      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          NutriSense JKN
        </h1>
        <p className="text-lg text-muted-foreground">
          Platform Pemantauan Kesehatan Berbasis Analisis Nutrisi untuk Peserta
          BPJS Kesehatan
        </p>

        <div className="space-y-4 pt-6">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Scan className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Scan Makanan Instan
              </h3>
              <p className="text-sm text-muted-foreground">
                Analisis nutrisi dengan teknologi AI
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-secondary/10 p-2 rounded-lg">
              <Heart className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Rekomendasi Personal
              </h3>
              <p className="text-sm text-muted-foreground">
                Saran kesehatan sesuai kebutuhan Anda
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-accent/10 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Integrasi BPJS</h3>
              <p className="text-sm text-muted-foreground">
                Terhubung dengan layanan kesehatan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Branding;
