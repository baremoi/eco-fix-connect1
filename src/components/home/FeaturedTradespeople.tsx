
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// Featured tradespeople data
const featuredTradespeople = [
  {
    id: 1,
    name: 'Michael Johnson',
    trade: 'Electrician',
    image: 'https://i.pravatar.cc/300?img=11',
    rating: 4.9,
    projects: 142,
    badge: 'Top Rated',
    description: 'Specializing in renewable energy systems and smart home integration.',
  },
  {
    id: 2,
    name: 'Sophia Williams',
    trade: 'Plumber',
    image: 'https://i.pravatar.cc/300?img=20',
    rating: 4.8,
    projects: 98,
    badge: 'Eco-Certified',
    description: 'Expert in water-saving installations and sustainable plumbing solutions.',
  },
  {
    id: 3,
    name: 'Daniel Taylor',
    trade: 'Carpenter',
    image: 'https://i.pravatar.cc/300?img=13',
    rating: 4.7,
    projects: 87,
    badge: 'Verified Pro',
    description: 'Crafting beautiful wooden furniture using sustainable, locally sourced materials.',
  },
];

const FeaturedTradespeople = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate data loading
    try {
      // Add a small delay to simulate loading time
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error loading featured tradespeople:", error);
      setHasError(true);
      toast.error("Failed to load featured tradespeople");
    }
  }, []);

  if (hasError) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Featured Tradespeople</h2>
          <div className="p-8 text-center text-muted-foreground">
            Unable to load featured tradespeople at this time.
          </div>
        </div>
      </section>
    );
  }

  if (!isLoaded) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3">Featured Tradespeople</h2>
          <div className="p-8 text-center">
            <div className="h-12 w-12 mx-auto mb-4 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">Loading top professionals...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">Featured Tradespeople</h2>
        <p className="text-center text-muted-foreground mb-10">Meet our top-rated eco-conscious professionals</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTradespeople.map((person) => (
            <Card key={person.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://placehold.co/600x400?text=Image+Not+Available";
                    }}
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                  {person.badge}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{person.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current mr-1" />
                    <span>{person.rating}</span>
                  </div>
                </div>
                
                <p className="text-primary font-medium mb-3">{person.trade}</p>
                <p className="text-muted-foreground text-sm mb-4">{person.description}</p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{person.projects} projects</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Quick Response</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/trades" 
            className="inline-flex items-center text-primary hover:underline"
          >
            View All Tradespeople
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTradespeople;
