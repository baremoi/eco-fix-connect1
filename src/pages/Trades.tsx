
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { SearchFilters } from "@/components/trades/SearchFilters";
import { TradeSearchResults } from "@/components/trades/TradeSearchResults";
import { Tradesperson, TradeCategory, TradeSearchFilters } from "@/components/trades/TradeTypes";

export default function Trades() {
  const [tradespeople, setTradespeople] = useState<Tradesperson[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<TradeCategory[]>([]);
  
  // Search filter states
  const [filters, setFilters] = useState<TradeSearchFilters>({
    selectedCategory: "",
    postcode: "",
    priceRange: [0, 200],
    ratingFilter: 0,
    sortBy: "rating",
    availabilityFilter: false
  });
  
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
    
    const newFilters = { ...filters };
    
    if (tradeParam) {
      newFilters.selectedCategory = tradeParam;
    }
    
    if (postcodeParam) {
      newFilters.postcode = postcodeParam;
    }
    
    if (priceMinParam && priceMaxParam) {
      newFilters.priceRange = [parseInt(priceMinParam), parseInt(priceMaxParam)];
    }
    
    if (ratingParam) {
      newFilters.ratingFilter = parseInt(ratingParam);
    }
    
    if (sortParam) {
      newFilters.sortBy = sortParam;
    }
    
    if (availabilityParam === 'true') {
      newFilters.availabilityFilter = true;
    }
    
    setFilters(newFilters);
    
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
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) {
        query = query
          .gte('tradesperson_services.hourly_rate', filters.priceRange[0])
          .lte('tradesperson_services.hourly_rate', filters.priceRange[1]);
      }
      
      // Apply availability filter
      if (filters.availabilityFilter) {
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
        if (filters.ratingFilter > 0) {
          filteredData = filteredData.filter(person => 
            (person.avg_rating || 0) >= filters.ratingFilter
          );
        }
        
        // Apply sorting
        switch (filters.sortBy) {
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
  
  const handleUpdateFilter = <K extends keyof TradeSearchFilters>(
    key: K, 
    value: TradeSearchFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSearch = () => {
    // Update URL params
    const params = new URLSearchParams();
    if (filters.selectedCategory) params.set('trade', filters.selectedCategory);
    if (filters.postcode) params.set('postcode', filters.postcode);
    if (filters.priceRange[0] > 0) params.set('priceMin', filters.priceRange[0].toString());
    if (filters.priceRange[1] < 200) params.set('priceMax', filters.priceRange[1].toString());
    if (filters.ratingFilter > 0) params.set('rating', filters.ratingFilter.toString());
    if (filters.sortBy) params.set('sort', filters.sortBy);
    if (filters.availabilityFilter) params.set('availability', 'true');
    
    navigate(`/trades?${params.toString()}`);
    
    // Execute search
    searchTradespeople(filters.selectedCategory, filters.postcode);
  };
  
  const handleResetFilters = () => {
    const resetFilters = {
      selectedCategory: "",
      postcode: "",
      priceRange: [0, 200],
      ratingFilter: 0,
      sortBy: "rating",
      availabilityFilter: false
    };
    
    setFilters(resetFilters);
    navigate("/trades");
    searchTradespeople("", "");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Find Tradespeople</h1>
      <div className="bg-card shadow rounded-lg p-6 mb-8">
        <SearchFilters 
          loading={loading}
          categories={categories}
          filters={filters}
          onUpdateFilter={handleUpdateFilter}
          onSearch={handleSearch}
          onResetFilters={handleResetFilters}
        />

        {/* Search results */}
        <div className="mt-6">
          <TradeSearchResults 
            loading={loading}
            tradespeople={tradespeople}
          />
        </div>
      </div>
    </div>
  );
}
