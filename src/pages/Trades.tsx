import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { MapPin, WrenchIcon, Home, Zap, Sprout, Paintbrush, Wrench, Search } from 'lucide-react';
import Layout from '@/components/layout/Layout';

// Mock data for tradespeople - in a real app, this would come from an API/database
const mockTradespeople = [
  {
    id: 1,
    name: 'John Smith',
    trade: 'Plumbing',
    rating: 4.8,
    reviews: 42,
    distance: 1.2,
    postcode: 'EC1V 9NR',
    icon: <WrenchIcon className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    trade: 'Electrical',
    rating: 4.9,
    reviews: 38,
    distance: 2.5,
    postcode: 'EC2A 2DT',
    icon: <Zap className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 3,
    name: 'Mike Williams',
    trade: 'Plumbing',
    rating: 4.7,
    reviews: 26,
    distance: 3.1,
    postcode: 'E1 6AN',
    icon: <WrenchIcon className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 4,
    name: 'Emma Davis',
    trade: 'Gardening',
    rating: 4.6,
    reviews: 19,
    distance: 1.8,
    postcode: 'E2 8DY',
    icon: <Sprout className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 5,
    name: 'David Wilson',
    trade: 'Carpentry',
    rating: 4.9,
    reviews: 31,
    distance: 4.2,
    postcode: 'N1 6AA',
    icon: <Wrench className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=15',
  },
  {
    id: 6,
    name: 'Lisa Brown',
    trade: 'Decorating',
    rating: 4.7,
    reviews: 24,
    distance: 2.9,
    postcode: 'E8 3DL',
    icon: <Paintbrush className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=6',
  },
  {
    id: 7,
    name: 'Rob Taylor',
    trade: 'General Building',
    rating: 4.8,
    reviews: 35,
    distance: 5.3,
    postcode: 'SE1 7PB',
    icon: <Home className="h-6 w-6" />,
    image: 'https://i.pravatar.cc/150?img=18',
  },
];

const Trades = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tradespeople, setTradespeople] = useState(mockTradespeople);
  const [tradeName, setTradeName] = useState(searchParams.get('trade') || '');
  const [postcode, setPostcode] = useState(searchParams.get('postcode') || '');
  const [isSearching, setIsSearching] = useState(false);

  // Handle search functionality
  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      let filtered = [...mockTradespeople];
      
      if (tradeName) {
        filtered = filtered.filter(person => 
          person.trade.toLowerCase().includes(tradeName.toLowerCase())
        );
      }
      
      // In a real app, this would filter by proximity to the entered postcode
      // For now, we'll just sort by the mock distance value
      filtered = filtered.sort((a, b) => a.distance - b.distance);
      
      setTradespeople(filtered);
      setIsSearching(false);
      
      // Update URL params so results can be shared/bookmarked
      setSearchParams({ trade: tradeName, postcode });
    }, 500); // Simulate API delay
  };

  // Run search based on URL parameters when the page loads
  useEffect(() => {
    if (searchParams.get('trade') || searchParams.get('postcode')) {
      handleSearch();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Available Trades</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Plumbing",
            "Electrical",
            "Carpentry",
            "HVAC",
            "Painting",
            "Landscaping",
          ].map((trade) => (
            <div key={trade} className="p-6 bg-card rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-4">{trade}</h2>
              <p className="text-muted-foreground mb-4">
                Find qualified professionals for your {trade.toLowerCase()} needs.
              </p>
              <button className="text-primary hover:underline">View Providers →</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Trades;
