import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ProductsSection from "@/components/ProductsSection";
import RiskGameSection from "@/components/RiskGameSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProductsSection />
      <RiskGameSection />
    </div>
  );
};

export default Index;
