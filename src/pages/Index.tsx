
import { ErrorBoundary } from "@/components/ui/error-boundary";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import TradeCategories from "@/components/home/TradeCategories";
import FeaturedTradespeople from "@/components/home/FeaturedTradespeople";
import CTASection from "@/components/home/CTASection";
import TradesInfoSection from "@/components/home/TradesInfoSection";
import { Suspense } from "react";
import { Card } from "@/components/ui/card";

const Index = () => {
  console.log("Index page rendering");
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="p-8 text-center">Loading homepage...</div>}>
        <HeroSection />
        <ErrorBoundary>
          <Suspense fallback={<Card className="p-6 m-6">Loading featured tradespeople...</Card>}>
            <FeaturedTradespeople />
          </Suspense>
        </ErrorBoundary>
        <ErrorBoundary>
          <TradeCategories />
        </ErrorBoundary>
        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>
        <ErrorBoundary>
          <TradesInfoSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        <ErrorBoundary>
          <CTASection />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Index;
