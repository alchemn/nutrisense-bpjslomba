import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Save } from "lucide-react";

interface ProfileInfoProps {
  userEmail: string;
  setUserEmail: (email: string) => void;
  handleSaveProfile: () => void;
}

const ProfileInfo = ({
  userEmail,
  setUserEmail,
  handleSaveProfile,
}: ProfileInfoProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Informasi Profile
      </h2>
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="email@example.com"
              className="pl-9"
            />
          </div>
        </div>
        <Button onClick={handleSaveProfile} className="w-full">
          <Save className="mr-2 w-4 h-4" />
          Simpan Perubahan
        </Button>
      </div>
    </Card>
  );
};

export default ProfileInfo;
