
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
import ErrorFallback from "@/components/error/ErrorFallback";

const Index = () => {
  return (
    <div className="bg-background">
      <ErrorBoundary fallback={<ErrorFallback message="Failed to load homepage content" />}>
        <Suspense fallback={<div className="p-8 text-center">Loading homepage...</div>}>
          <HeroSection />
          
          <ErrorBoundary fallback={
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-3">Featured Tradespeople</h2>
                <Card className="p-6">Unable to load featured tradespeople</Card>
              </div>
            </section>
          }>
            <FeaturedTradespeople />
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-3">Popular Trade Categories</h2>
                <Card className="p-6">Unable to load trade categories</Card>
              </div>
            </section>
          }>
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
    </div>
  );
};

export default Index;
