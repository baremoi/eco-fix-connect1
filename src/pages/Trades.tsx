
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
import { Search, UserX, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { StarRating } from "@/components/reviews/StarRating";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Tradesperson {
  id: string;
  full_name: string;
  avatar_url?: string;
  role: string;
  bio?: string;
  serviceCategory: string;
  hourlyRate?: number;
  avg_rating?: number;
  review_count?: number;
}

export default function Trades() {
  const [tradespeople, setTradespeople] = useState<Tradesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [postcode, setPostcode] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract search params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tradeParam = params.get('trade');
    const postcodeParam = params.get('postcode');
    const priceMinParam = params.get('priceMin');
    const priceMaxParam = params.get('priceMax');
    const ratingParam = params.get('rating');
    const sortParam = params.get('sort');
    const availabilityParam = params.get('availability');
    
    if (tradeParam) {
      setSelectedCategory(tradeParam);
    }
    
    if (postcodeParam) {
      setPostcode(postcodeParam);
    }
    
    if (priceMinParam && priceMaxParam) {
      setPriceRange([parseInt(priceMinParam), parseInt(priceMaxParam)]);
    }
    
    if (ratingParam) {
      setRatingFilter(parseInt(ratingParam));
    }
    
    if (sortParam) {
      setSortBy(sortParam);
    }
    
    if (availabilityParam === 'true') {
      setAvailabilityFilter(true);
    }
    
    // Load categories
    loadCategories();
    
    // Initial search if parameters exist
    if (tradeParam || postcodeParam || priceMinParam || ratingParam) {
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
            availability_status,
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
      
      // Apply hourly rate filter
      if (priceRange[0] > 0 || priceRange[1] < 200) {
        query = query
          .gte('tradesperson_services.hourly_rate', priceRange[0])
          .lte('tradesperson_services.hourly_rate', priceRange[1]);
      }
      
      // Apply availability filter
      if (availabilityFilter) {
        query = query.eq('tradesperson_services.availability_status', true);
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
          hourlyRate: item.tradesperson_services[0]?.hourly_rate,
          avg_rating: 0,
          review_count: 0
        }));
        
        // Fetch ratings for each tradesperson
        const tradespeopleWithRatings = await Promise.all(
          formattedData.map(async (person) => {
            try {
              const stats = await supabase.rpc('get_tradesperson_review_stats', {
                tradesperson_id_param: person.id
              });
              
              return {
                ...person,
                avg_rating: stats.data?.avg_rating || 0,
                review_count: stats.data?.review_count || 0
              };
            } catch (e) {
              return person;
            }
          })
        );
        
        // Apply rating filter
        let filteredData = tradespeopleWithRatings;
        if (ratingFilter > 0) {
          filteredData = filteredData.filter(person => 
            (person.avg_rating || 0) >= ratingFilter
          );
        }
        
        // Apply sorting
        switch (sortBy) {
          case 'rating':
            filteredData.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
            break;
          case 'price_low':
            filteredData.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0));
            break;
          case 'price_high':
            filteredData.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0));
            break;
        }
        
        setTradespeople(filteredData);
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
    if (priceRange[0] > 0) params.set('priceMin', priceRange[0].toString());
    if (priceRange[1] < 200) params.set('priceMax', priceRange[1].toString());
    if (ratingFilter > 0) params.set('rating', ratingFilter.toString());
    if (sortBy) params.set('sort', sortBy);
    if (availabilityFilter) params.set('availability', 'true');
    
    navigate(`/trades?${params.toString()}`);
    
    // Execute search
    searchTradespeople(selectedCategory, postcode);
  };
  
  const handleResetFilters = () => {
    setSelectedCategory("");
    setPostcode("");
    setPriceRange([0, 200]);
    setRatingFilter(0);
    setSortBy("rating");
    setAvailabilityFilter(false);
    
    navigate("/trades");
    searchTradespeople("", "");
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
          
          {/* Advanced Filters */}
          <Collapsible open={showFilters} onOpenChange={setShowFilters} className="mt-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <CollapsibleTrigger className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Advanced Filters</span>
                  {showFilters ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleResetFilters}
                className="text-muted-foreground"
              >
                Reset all
              </Button>
            </div>
            
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Price Range (£ per hour)
                    </label>
                    <div className="px-2">
                      <Slider 
                        defaultValue={priceRange} 
                        min={0} 
                        max={200} 
                        step={5} 
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>£{priceRange[0]}</span>
                        <span>£{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Minimum Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <Button 
                          key={rating}
                          variant={ratingFilter === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                          className="px-3"
                        >
                          <StarRating rating={rating} size="sm" showEmpty={false} />
                          {rating === 1 && "+"}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Sort By
                    </label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox 
                      id="availability" 
                      checked={availabilityFilter} 
                      onCheckedChange={(checked) => 
                        setAvailabilityFilter(checked === true)
                      }
                    />
                    <label
                      htmlFor="availability"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show only available tradespeople
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={person.avg_rating || 0} size="sm" />
                          <span className="text-xs text-muted-foreground">
                            ({person.review_count || 0} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {person.bio || "No bio available."}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        {person.hourlyRate && (
                          <p className="text-sm font-medium">£{person.hourlyRate}/hour</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                        <MessageButton userId={person.id} label="Contact" size="sm" />
                      </div>
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
