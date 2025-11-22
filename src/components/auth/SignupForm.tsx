import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignupFormProps {
  handleSignup: (e: React.FormEvent) => void;
  signupEmail: string;
  setSignupEmail: (email: string) => void;
  signupPassword: string;
  setSignupPassword: (password: string) => void;
  signupConfirmPassword: string;
  setSignupConfirmPassword: (password: string) => void;
  isLoading: boolean;
}

const SignupForm = ({
  handleSignup,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  signupConfirmPassword,
  setSignupConfirmPassword,
  isLoading,
}: SignupFormProps) => {
  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="nama@email.com"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Minimal 8 karakter"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-confirm">Konfirmasi Password</Label>
        <Input
          id="signup-confirm"
          type="password"
          placeholder="Ulangi password"
          value={signupConfirmPassword}
          onChange={(e) => setSignupConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>

      <div className="text-sm text-muted-foreground">
        <label className="flex items-start gap-2">
          <input type="checkbox" required className="mt-0.5 rounded" />
          <span>
            Saya setuju dengan{" "}
            <button type="button" className="text-primary hover:underline">
              syarat & ketentuan
            </button>{" "}
            dan{" "}
            <button type="button" className="text-primary hover:underline">
              kebijakan privasi
            </button>
          </span>
        </label>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-primary hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
};

export default SignupForm;
