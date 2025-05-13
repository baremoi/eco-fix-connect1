
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const TradesInfoSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:flex md:items-center md:gap-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold mb-4">Are You a Tradesperson?</h2>
          <p className="text-muted-foreground mb-6">
            Join our growing community of trusted eco-friendly tradespeople. Get connected with homeowners looking for your services and grow your business.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Access new customers looking for quality eco-conscious services</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Receive job notifications matching your skills and location</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Build your reputation with verified reviews and ratings</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Get paid securely and on time through our platform</span>
            </li>
          </ul>
          <Button asChild size="lg">
            <Link to="/join">Become a Provider</Link>
          </Button>
        </div>
        <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <AspectRatio ratio={4/3}>
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Tradesperson working" 
              className="w-full h-full object-cover" 
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default TradesInfoSection;
