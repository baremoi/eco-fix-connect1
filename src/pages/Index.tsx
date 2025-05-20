
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import HeroSection from "@/components/home/HeroSection";
import { Card } from "@/components/ui/card";
import ErrorFallback from "@/components/error/ErrorFallback";

// Lazy load potentially problematic components
const HowItWorks = lazy(() => import("@/components/home/HowItWorks"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const TradeCategories = lazy(() => import("@/components/home/TradeCategories"));
const FeaturedTradespeople = lazy(() => import("@/components/home/FeaturedTradespeople"));
const CTASection = lazy(() => import("@/components/home/CTASection"));
const TradesInfoSection = lazy(() => import("@/components/home/TradesInfoSection"));

const Index = () => {
  return (
    <div className="bg-background">
      <ErrorBoundary fallback={<ErrorFallback message="Failed to load homepage content" componentName="HomePage" />}>
        <Suspense fallback={<div className="p-8 text-center">Loading homepage...</div>}>
          <HeroSection />
          
          <ErrorBoundary fallback={
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-3">Featured Tradespeople</h2>
                <Card className="p-6">
                  <ErrorFallback 
                    message="Unable to load featured tradespeople" 
                    componentName="FeaturedTradespeople" 
                  />
                </Card>
              </div>
            </section>
          }>
            <Suspense fallback={
              <section className="py-8">
                <div className="container mx-auto px-4 text-center">
                  <div className="h-8 w-8 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <p>Loading featured tradespeople...</p>
                </div>
              </section>
            }>
              <FeaturedTradespeople />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-3">Popular Trade Categories</h2>
                <Card className="p-6">
                  <ErrorFallback 
                    message="Unable to load trade categories" 
                    componentName="TradeCategories" 
                  />
                </Card>
              </div>
            </section>
          }>
            <Suspense fallback={
              <section className="py-8">
                <div className="container mx-auto px-4 text-center">
                  <div className="h-8 w-8 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                  <p>Loading trade categories...</p>
                </div>
              </section>
            }>
              <TradeCategories />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <ErrorFallback message="Unable to load how it works section" componentName="HowItWorks" />
          }>
            <Suspense fallback={<div className="py-8 text-center">Loading how it works...</div>}>
              <HowItWorks />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <ErrorFallback message="Unable to load trades info section" componentName="TradesInfoSection" />
          }>
            <Suspense fallback={<div className="py-8 text-center">Loading trades info...</div>}>
              <TradesInfoSection />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <ErrorFallback message="Unable to load testimonials" componentName="Testimonials" />
          }>
            <Suspense fallback={<div className="py-8 text-center">Loading testimonials...</div>}>
              <Testimonials />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary fallback={
            <ErrorFallback message="Unable to load call to action section" componentName="CTASection" />
          }>
            <Suspense fallback={<div className="py-8 text-center">Loading call to action...</div>}>
              <CTASection />
            </Suspense>
          </ErrorBoundary>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Index;
