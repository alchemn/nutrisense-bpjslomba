import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ResultActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
      <Link to="/dashboard">
        <Button variant="default" size="lg" className="w-full sm:w-auto">
          Lihat Dashboard
        </Button>
      </Link>
      <Link to="/scanner">
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Scan Makanan Lain
        </Button>
      </Link>
    </div>
  );
};

export default ResultActions;
