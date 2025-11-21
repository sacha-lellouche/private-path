import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import TopBanner from "@/components/TopBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBanner />
      <Navigation />
      <HeroSection />
    </div>
  );
};

export default Index;
