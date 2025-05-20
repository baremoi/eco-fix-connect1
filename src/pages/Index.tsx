
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import HeroSection from "@/components/home/HeroSection";
import { Card } from "@/components/ui/card";
import ErrorFallback from "@/components/error/ErrorFallback";

// Use explicit chunkNames for better debugging
const HowItWorks = lazy(() => import("@/components/home/HowItWorks" /* webpackChunkName: "HowItWorks" */));
const Testimonials = lazy(() => import("@/components/home/Testimonials" /* webpackChunkName: "Testimonials" */));
const TradeCategories = lazy(() => import("@/components/home/TradeCategories" /* webpackChunkName: "TradeCategories" */));
const FeaturedTradespeople = lazy(() => import("@/components/home/FeaturedTradespeople" /* webpackChunkName: "FeaturedTradespeople" */));
const CTASection = lazy(() => import("@/components/home/CTASection" /* webpackChunkName: "CTASection" */));
const TradesInfoSection = lazy(() => import("@/components/home/TradesInfoSection" /* webpackChunkName: "TradesInfoSection" */));

// Component-specific loading states
const LoadingFallback = ({ componentName }: { componentName: string }) => (
  <section className="py-8">
    <div className="container mx-auto px-4 text-center">
      <div className="h-8 w-8 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading {componentName}...</p>
    </div>
  </section>
);

const Index = () => {
  return (
    <div className="bg-background">
      <ErrorBoundary fallback={<ErrorFallback message="Failed to load homepage content" componentName="HomePage" />}>
        {/* HeroSection is not lazy loaded - render it directly for fast initial load */}
        <HeroSection />
        
        {/* Each section is isolated in its own error boundary */}
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
          <Suspense fallback={<LoadingFallback componentName="featured tradespeople" />}>
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
          <Suspense fallback={<LoadingFallback componentName="trade categories" />}>
            <TradeCategories />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-3">How It Works</h2>
              <Card className="p-6">
                <ErrorFallback 
                  message="Unable to load how it works section" 
                  componentName="HowItWorks" 
                />
              </Card>
            </div>
          </section>
        }>
          <Suspense fallback={<LoadingFallback componentName="how it works" />}>
            <HowItWorks />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-3">Trades Information</h2>
              <Card className="p-6">
                <ErrorFallback 
                  message="Unable to load trades info section" 
                  componentName="TradesInfoSection" 
                />
              </Card>
            </div>
          </section>
        }>
          <Suspense fallback={<LoadingFallback componentName="trades information" />}>
            <TradesInfoSection />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-3">What Our Customers Say</h2>
              <Card className="p-6">
                <ErrorFallback 
                  message="Unable to load testimonials" 
                  componentName="Testimonials" 
                />
              </Card>
            </div>
          </section>
        }>
          <Suspense fallback={<LoadingFallback componentName="testimonials" />}>
            <Testimonials />
          </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary fallback={
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-3">Ready to Get Started?</h2>
              <Card className="p-6">
                <ErrorFallback 
                  message="Unable to load call to action section" 
                  componentName="CTASection" 
                />
              </Card>
            </div>
          </section>
        }>
          <Suspense fallback={<LoadingFallback componentName="call to action" />}>
            <CTASection />
          </Suspense>
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  );
};

export default Index;
