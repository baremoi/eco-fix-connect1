
import { Button } from '@/components/ui/button';
import { Home, ThumbsUp, ShieldCheck } from 'lucide-react';

// How it works steps
const howItWorks = [
  {
    id: 1,
    title: 'Post Your Job',
    description: "Tell us what you need done and we'll match you with the right tradespeople.",
    icon: <Home className="h-10 w-10" />,
  },
  {
    id: 2,
    title: 'Get Free Quotes',
    description: 'Receive free quotes from verified tradespeople ready to help.',
    icon: <ThumbsUp className="h-10 w-10" />,
  },
  {
    id: 3,
    title: 'Hire & Pay Securely',
    description: 'Choose the right person for your job and pay securely through our platform.',
    icon: <ShieldCheck className="h-10 w-10" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">How EcoFix Works</h2>
        <p className="text-center text-muted-foreground mb-12">Simple, quick, and reliable process</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step) => (
            <div key={step.id} className="text-center">
              <div className="bg-primary/10 p-4 rounded-full inline-flex justify-center items-center mb-5 text-primary">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <a href="/how-it-works">Learn More</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
