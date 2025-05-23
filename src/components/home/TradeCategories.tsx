
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  Home, 
  Wrench, 
  Paintbrush, 
  Sprout, 
  Zap, 
  Car, 
  Hammer, 
  Dog, 
  Scissors, 
  ShoppingBag
} from 'lucide-react';

// Trade category data with updated categories
const tradeCategories = [
  { id: 1, name: 'Plumbing', icon: <Wrench className="h-6 w-6" />, jobs: 56 },
  { id: 2, name: 'Electrical', icon: <Zap className="h-6 w-6" />, jobs: 42 },
  { id: 3, name: 'Gardener/Landscaper', icon: <Sprout className="h-6 w-6" />, jobs: 38 },
  { id: 4, name: 'Painter/Decorator', icon: <Paintbrush className="h-6 w-6" />, jobs: 31 },
  { id: 5, name: 'Carpentry', icon: <Hammer className="h-6 w-6" />, jobs: 27 },
  { id: 6, name: 'Handyman', icon: <Home className="h-6 w-6" />, jobs: 35 },
  { id: 7, name: 'Car Wash', icon: <Car className="h-6 w-6" />, jobs: 24 },
  { id: 8, name: 'Dog Walker', icon: <Dog className="h-6 w-6" />, jobs: 18 },
  { id: 9, name: 'Hairdresser/Barber', icon: <Scissors className="h-6 w-6" />, jobs: 22 },
  { id: 10, name: 'Cleaner', icon: <ShoppingBag className="h-6 w-6" />, jobs: 45 },
];

const TradeCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/trades?trade=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3">Popular Trade Categories</h2>
        <p className="text-center text-muted-foreground mb-10">Browse our most requested services</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tradeCategories.map((category) => (
            <Card 
              key={category.id} 
              className="group hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{category.name}</h3>
                    <p className="text-muted-foreground">{category.jobs} jobs available</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/trades">View All Categories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TradeCategories;
