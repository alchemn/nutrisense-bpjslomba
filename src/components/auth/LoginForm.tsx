import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginFormProps {
  handleLogin: (e: React.FormEvent) => void;
  loginEmail: string;
  setLoginEmail: (email: string) => void;
  loginPassword: string;
  setLoginPassword: (password: string) => void;
  isLoading: boolean;
}

const LoginForm = ({
  handleLogin,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  isLoading,
}: LoginFormProps) => {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="nama@email.com"
          name="email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          type="password"
          placeholder="••••••••"
          name="password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" className="rounded" />
          Ingat saya
        </label>
        <button type="button" className="text-primary hover:underline">
          Lupa password?
        </button>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-primary hover:opacity-90"
        disabled={isLoading}
      >
        {isLoading ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
};

export default LoginForm;
