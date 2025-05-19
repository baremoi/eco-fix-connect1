
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageButton } from "@/components/messaging/MessageButton";
import { Icons } from "@/components/ui/icons";
import { Search, UserX } from "lucide-react";

interface Tradesperson {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: string;
  bio?: string;
  serviceCategory: string;
  hourlyRate?: number;
}

export default function Trades() {
  const [tradespeople, setTradespeople] = useState<Tradesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract search params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tradeParam = params.get('trade');
    const postcodeParam = params.get('postcode');
    
    if (tradeParam) {
      setSelectedCategory(tradeParam);
    }
    
    if (postcodeParam) {
      setPostcode(postcodeParam);
    }
    
    // Load categories
    loadCategories();
    
    // Initial search if parameters exist
    if (tradeParam || postcodeParam) {
      searchTradespeople(tradeParam || "", postcodeParam || "");
    } else {
      setLoading(false);
    }
  }, [location.search]);
  
  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('id, name')
        .order('name');
      
      if (error) {
        console.error('Error loading categories:', error);
        return;
      }
      
      setCategories(data || []);
    } catch (error) {
      console.error('Exception loading categories:', error);
    }
  };
  
  const searchTradespeople = async (category: string, searchPostcode: string) => {
    setLoading(true);
    
    try {
      // Find profiles with the role 'tradesperson'
      let query = supabase
        .from('profiles')
        .select(`
          id, full_name, avatar_url, role, bio,
          tradesperson_services!inner(
            hourly_rate,
            service_categories!inner(id, name)
          )
        `)
        .eq('role', 'tradesperson');
      
      // Add category filter if provided
      if (category) {
        const matchingCategories = categories.filter(cat => 
          cat.name.toLowerCase().includes(category.toLowerCase())
        );
        
        if (matchingCategories.length > 0) {
          query = query.eq('tradesperson_services.service_categories.id', matchingCategories[0].id);
        }
      }
      
      // Add postcode filter if provided (this would be more complex in a real app)
      if (searchPostcode) {
        query = query.ilike('address', `%${searchPostcode}%`);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error searching tradespeople:', error);
        setTradespeople([]);
      } else {
        // Transform the data to a more usable format
        const formattedData = data.map(item => ({
          id: item.id,
          full_name: item.full_name || 'Unknown',
          avatar_url: item.avatar_url,
          role: item.role,
          bio: item.bio,
          serviceCategory: item.tradesperson_services[0]?.service_categories?.name || 'General',
          hourlyRate: item.tradesperson_services[0]?.hourly_rate
        }));
        
        setTradespeople(formattedData);
      }
    } catch (error) {
      console.error('Exception searching tradespeople:', error);
      setTradespeople([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    // Update URL params
    const params = new URLSearchParams();
    if (selectedCategory) params.set('trade', selectedCategory);
    if (postcode) params.set('postcode', postcode);
    
    navigate(`/trades?${params.toString()}`);
    
    // Execute search
    searchTradespeople(selectedCategory, postcode);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Find Tradespeople</h1>
      <div className="bg-card shadow rounded-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Search for tradespeople</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Trade
              </label>
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All trades</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Postcode
              </label>
              <Input
                type="text"
                placeholder="Enter your postcode"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button
                className="w-full"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search results */}
        <div className="mt-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-4 w-[160px]" />
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : tradespeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tradespeople.map((person) => (
                <Card key={person.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                        {person.avatar_url ? (
                          <img src={person.avatar_url} alt={person.full_name} className="w-full h-full object-cover" />
                        ) : (
                          <Icons.user className="h-6 w-6 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{person.full_name}</h3>
                        <p className="text-sm text-muted-foreground">{person.serviceCategory}</p>
                        {person.hourlyRate && (
                          <p className="text-sm font-medium">£{person.hourlyRate}/hour</p>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {person.bio || "No bio available."}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <MessageButton userId={person.id} label="Contact" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tradespeople found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse through our trade categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
