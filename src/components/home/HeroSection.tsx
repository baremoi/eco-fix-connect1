
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ShieldCheck, Clock, ThumbsUp } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [tradeName, setTradeName] = useState('');
  const [postcode, setPostcode] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/trades?trade=${encodeURIComponent(tradeName)}&postcode=${encodeURIComponent(postcode)}`);
  };

  return (
    <section className="hero-gradient text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Trusted Tradespeople For Your Home
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
          Connect with verified, eco-conscious trade professionals in your area for all your home improvement needs.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
            <div className="sm:col-span-3 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="What service do you need?" 
                className="bg-white text-foreground h-12 pl-9"
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-3 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Enter your postcode" 
                className="bg-white text-foreground h-12 pl-9"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" className="h-12 sm:col-span-1">
              Search
            </Button>
          </div>
        </form>
        
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2" />
            <span>Verified Providers</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            <span>Quick Response</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="h-6 w-6 mr-2" />
            <span>Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
