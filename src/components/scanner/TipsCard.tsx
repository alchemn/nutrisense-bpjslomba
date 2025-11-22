import { Card } from "@/components/ui/card";
import foodScanImage from "@/assets/food-scan.jpg";

const TipsCard = () => {
  return (
    <Card className="p-8 bg-card">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Tips Foto Terbaik
          </h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </span>
              <span>Pastikan pencahayaan cukup terang</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </span>
              <span>Fokus pada makanan, hindari objek lain</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </span>
              <span>Foto dari atas untuk hasil lebih akurat</span>
            </li>
            <li className="flex items-start">
              <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                ✓
              </span>
              <span>Tampilkan seluruh porsi makanan</span>
            </li>
          </ul>
        </div>

        <div className="border-t pt-6">
          <img
            src={foodScanImage}
            alt="Food scanning example"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default TipsCard;
