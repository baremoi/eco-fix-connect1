
import { Suspense, lazy, useState, useEffect } from "react";
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

const SectionErrorBoundary = ({ children, name }: { children: React.ReactNode; name: string }) => {
  const [hasRetried, setHasRetried] = useState(false);
  
  const handleReset = () => {
    setHasRetried(true);
    // Force a re-render of the component
    setTimeout(() => {
      setHasRetried(false);
    }, 0);
  };
  
  return (
    <ErrorBoundary 
      fallback={(error) => (
        <section className={`py-16 ${name === 'Testimonials' || name === 'TradeCategories' ? 'bg-muted/30' : ''}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-3">{name}</h2>
            <Card className="p-6">
              <ErrorFallback 
                error={error}
                message={`Unable to load ${name.toLowerCase()}`} 
                componentName={name}
                resetErrorBoundary={handleReset}
              />
            </Card>
          </div>
        </section>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

const Index = () => {
  const [sectionsToShow, setSectionsToShow] = useState<string[]>([]);
  
  // Progressive loading strategy - load sections in stages to isolate issues
  useEffect(() => {
    // Start with the most critical sections
    setSectionsToShow(['FeaturedTradespeople']);
    
    // Add more sections after short intervals to isolate potential issues
    const timer1 = setTimeout(() => {
      setSectionsToShow(prev => [...prev, 'TradeCategories']);
    }, 500);
    
    const timer2 = setTimeout(() => {
      setSectionsToShow(prev => [...prev, 'HowItWorks']);
    }, 1000);
    
    const timer3 = setTimeout(() => {
      setSectionsToShow(prev => [...prev, 'TradesInfoSection', 'Testimonials', 'CTASection']);
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  // Helper to check if a section should be rendered
  const shouldShowSection = (name: string) => sectionsToShow.includes(name);

  return (
    <div className="bg-background">
      <ErrorBoundary fallback={<ErrorFallback message="Failed to load homepage content" componentName="HomePage" />}>
        {/* HeroSection is not lazy loaded - render it directly for fast initial load */}
        <HeroSection />
        
        {shouldShowSection('FeaturedTradespeople') && (
          <SectionErrorBoundary name="Featured Tradespeople">
            <Suspense fallback={<LoadingFallback componentName="featured tradespeople" />}>
              <FeaturedTradespeople />
            </Suspense>
          </SectionErrorBoundary>
        )}
        
        {shouldShowSection('TradeCategories') && (
          <SectionErrorBoundary name="Trade Categories">
            <Suspense fallback={<LoadingFallback componentName="trade categories" />}>
              <TradeCategories />
            </Suspense>
          </SectionErrorBoundary>
        )}
        
        {shouldShowSection('HowItWorks') && (
          <SectionErrorBoundary name="How It Works">
            <Suspense fallback={<LoadingFallback componentName="how it works" />}>
              <HowItWorks />
            </Suspense>
          </SectionErrorBoundary>
        )}
        
        {shouldShowSection('TradesInfoSection') && (
          <SectionErrorBoundary name="Trades Information">
            <Suspense fallback={<LoadingFallback componentName="trades information" />}>
              <TradesInfoSection />
            </Suspense>
          </SectionErrorBoundary>
        )}
        
        {shouldShowSection('Testimonials') && (
          <SectionErrorBoundary name="Testimonials">
            <Suspense fallback={<LoadingFallback componentName="testimonials" />}>
              <Testimonials />
            </Suspense>
          </SectionErrorBoundary>
        )}
        
        {shouldShowSection('CTASection') && (
          <SectionErrorBoundary name="Call to Action">
            <Suspense fallback={<LoadingFallback componentName="call to action" />}>
              <CTASection />
            </Suspense>
          </SectionErrorBoundary>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default Index;
