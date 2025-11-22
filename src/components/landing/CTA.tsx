import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="p-8 md:p-12 bg-gradient-hero border-2 border-primary/20">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Mulai Jaga Kesehatan Anda Hari Ini
            </h2>
            <p className="text-lg text-muted-foreground pb-4">
              Bergabunglah dengan ribuan peserta JKN yang telah merasakan
              manfaat deteksi dini risiko penyakit melalui pola makan sehat.
            </p>
            <Link to="/scanner">
              <Button variant="hero" size="lg">
                <Camera className="mr-2" />
                Coba Scan Gratis
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default CTA;
