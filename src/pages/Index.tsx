
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TradeCategories from "@/components/home/TradeCategories";
import FeaturedTradespeople from "@/components/home/FeaturedTradespeople";
import CTASection from "@/components/home/CTASection";
import TradesInfoSection from "@/components/home/TradesInfoSection";

const Index = () => {
  console.log("Index page rendering");
  return (
    <>
      <HeroSection />
      <FeaturedTradespeople />
      <TradeCategories />
      <HowItWorks />
      <TradesInfoSection />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Index;
