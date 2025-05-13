
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 hero-gradient text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Find reliable eco-conscious tradespeople in your area and get your project started today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link to="/register">Sign Up Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
            <Link to="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
