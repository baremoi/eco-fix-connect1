
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TradeCategories from "@/components/home/TradeCategories";
import FeaturedTradespeople from "@/components/home/FeaturedTradespeople";
import CTASection from "@/components/home/CTASection";
import TradesInfoSection from "@/components/home/TradesInfoSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedTradespeople />
      <TradeCategories />
      <HowItWorks />
      <TradesInfoSection />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
