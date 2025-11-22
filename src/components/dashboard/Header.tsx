import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Dashboard Kesehatan
        </h1>
        <p className="text-muted-foreground">
          Pantau progres pola makan dan kesehatan Anda
        </p>
      </div>
      <Link to="/scanner">
        <Button variant="hero" size="lg">
          <Camera className="mr-2" />
          Scan Makanan Baru
        </Button>
      </Link>
    </div>
  );
};

export default Header;
