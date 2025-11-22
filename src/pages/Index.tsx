import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(userData.name || userData.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Hero
        isLoggedIn={isLoggedIn}
        userName={userName}
        handleLogout={handleLogout}
        navigate={navigate}
      />
      <Features />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;