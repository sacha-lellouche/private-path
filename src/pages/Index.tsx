import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import BNPBanner from "@/components/BNPBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <BNPBanner />
      <Navigation />
      <HeroSection />
    </div>
  );
};

export default Index;
