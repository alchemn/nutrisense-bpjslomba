import { Card } from "@/components/ui/card";
import {
  Camera,
  TrendingUp,
  FileText,
  Shield,
  Sparkles,
  Activity,
} from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Fitur Unggulan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Teknologi AI canggih untuk membantu Anda menjalani gaya hidup lebih
            sehat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-smooth border-2 hover:border-primary/50">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Scan Makanan Instan
            </h3>
            <p className="text-muted-foreground">
              Cukup foto makanan Anda, AI kami akan menganalisis kandungan gizi
              secara otomatis dalam hitungan detik.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-smooth border-2 hover:border-secondary/50">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Skor Risiko Penyakit
            </h3>
            <p className="text-muted-foreground">
              Dapatkan analisis risiko terhadap penyakit kronis seperti
              diabetes, hipertensi, dan obesitas berdasarkan pola makan Anda.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-smooth border-2 hover:border-accent/50">
            <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Rekomendasi Personal
            </h3>
            <p className="text-muted-foreground">
              Terima rekomendasi makanan alternatif yang lebih sehat dan sesuai
              dengan kondisi kesehatan Anda.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-smooth border-2 hover:border-primary/50">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Tracking Progres
            </h3>
            <p className="text-muted-foreground">
              Pantau riwayat konsumsi harian Anda dan lihat perkembangan pola
              makan dari waktu ke waktu.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-smooth border-2 hover:border-secondary/50">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Terintegrasi BPJS
            </h3>
            <p className="text-muted-foreground">
              Dirancang khusus untuk peserta JKN dengan data terenkripsi dan
              aman sesuai standar kesehatan Indonesia.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-smooth border-2 hover:border-accent/50">
            <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Edukasi Interaktif
            </h3>
            <p className="text-muted-foreground">
              Pelajari tentang gizi seimbang dan gaya hidup sehat melalui
              konten edukatif yang mudah dipahami.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
