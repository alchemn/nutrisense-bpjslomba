import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { loginUser, registerUser } from "@/api/auth";
import Branding from "@/components/auth/Branding";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginUser({
        email: loginEmail,
        password: loginPassword,
      });

      const { user, token, message } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Login Berhasil! 🎉",
        description: message || "Selamat datang kembali di NutriSense JKN",
      });

      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "Terjadi kesalahan pada server";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || "Email atau password salah";
      }

      toast({
        title: "Login Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Password Tidak Cocok",
        description: "Pastikan password dan konfirmasi password sama",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        email: signupEmail,
        password: signupPassword,
      });

      toast({
        title: "Registrasi Berhasil! 🎉",
        description: "Silakan login dengan akun baru Anda.",
      });

      const loginTab = document.querySelector(
        '[value="login"]'
      ) as HTMLElement;
      loginTab?.click();
    } catch (error) {
      let errorMessage = "Gagal melakukan registrasi";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || "Email mungkin sudah terdaftar";
      }

      toast({
        title: "Registrasi Gagal",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <Branding />

        <Card className="w-full shadow-lg border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Selamat Datang</CardTitle>
            <CardDescription>
              Masuk atau daftar untuk melanjutkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="signup">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm
                  handleLogin={handleLogin}
                  loginEmail={loginEmail}
                  setLoginEmail={setLoginEmail}
                  loginPassword={loginPassword}
                  setLoginPassword={setLoginPassword}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="signup">
                <SignupForm
                  handleSignup={handleSignup}
                  signupEmail={signupEmail}
                  setSignupEmail={setSignupEmail}
                  signupPassword={signupPassword}
                  setSignupPassword={setSignupPassword}
                  signupConfirmPassword={signupConfirmPassword}
                  setSignupConfirmPassword={setSignupConfirmPassword}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;