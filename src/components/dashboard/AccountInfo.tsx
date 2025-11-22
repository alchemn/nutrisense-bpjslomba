import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

interface AccountInfoProps {
  handleLogout: () => void;
}

const AccountInfo = ({ handleLogout }: AccountInfoProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        Informasi Akun
      </h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Status Akun</span>
          <Badge className="bg-success/10 text-success border-success/20">
            Aktif
          </Badge>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Tipe Pengguna</span>
          <span className="text-foreground font-medium">Peserta JKN</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted-foreground">Bergabung Sejak</span>
          <span className="text-foreground font-medium">Januari 2025</span>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar Akun
        </Button>
      </div>
    </Card>
  );
};

export default AccountInfo;
