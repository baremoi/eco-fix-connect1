
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchFilters } from "@/components/trades/SearchFilters";
import { TradeSearchResults } from "@/components/trades/TradeSearchResults";
import { TradeCategory, TradeSearchFilters, Tradesperson } from "@/components/trades/TradeTypes";
import { tradesService } from "@/services/tradesService";

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
    
    // Load categories and perform initial search if parameters exist
    loadCategories();
    
    if (tradeParam || postcodeParam || priceMinParam || ratingParam) {
      performSearch();
    } else {
      setLoading(false);
    }
  }, [location.search]);
  
  const loadCategories = async () => {
    const data = await tradesService.getCategories();
    setCategories(data);
  };
  
  const performSearch = async () => {
    setLoading(true);
    
    try {
      const results = await tradesService.searchTradespeople(filters);
      setTradespeople(results);
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
    performSearch();
  };
  
  const handleResetFilters = () => {
    const resetFilters: TradeSearchFilters = {
      selectedCategory: "",
      postcode: "",
      priceRange: [0, 200],
      ratingFilter: 0,
      sortBy: "rating",
      availabilityFilter: false
    };
    
    setFilters(resetFilters);
    navigate("/trades");
    performSearch();
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
