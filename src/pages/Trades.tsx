import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Service, servicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  MapPin, 
  Search, 
  Sort, 
  ChevronDown, 
  Star,
  Clock,
  CheckSquare
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define filter types
interface FilterOptions {
  category: string[];
  rating: number | null;
  availability: string | null;
  eco_certified: boolean;
}

export default function Trades() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState({
    trade: searchParams.get("trade") || "",
    postcode: searchParams.get("postcode") || "",
  });
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevance");
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    category: [],
    rating: null,
    availability: null,
    eco_certified: false
  });

  // Extract unique categories from services data
  const categories = [...new Set(servicesData.map(service => service.category))];

  useEffect(() => {
    // Set initial filter values from URL params
    const initialTrade = searchParams.get("trade") || "";
    const initialPostcode = searchParams.get("postcode") || "";
    const initialCategory = searchParams.get("category")?.split(",") || [];
    const initialRating = searchParams.get("rating") ? 
      Number(searchParams.get("rating")) : null;
    const initialAvailability = searchParams.get("availability") || null;
    const initialEcoCertified = searchParams.get("eco_certified") === "true";
    
    setFilters({
      trade: initialTrade,
      postcode: initialPostcode,
    });
    
    setAdvancedFilters({
      category: initialCategory,
      rating: initialRating,
      availability: initialAvailability,
      eco_certified: initialEcoCertified
    });
    
    // Simulate API call with a delay
    setLoading(true);
    const timer = setTimeout(() => {
      filterServices(
        { 
          trade: initialTrade, 
          postcode: initialPostcode 
        },
        {
          category: initialCategory,
          rating: initialRating,
          availability: initialAvailability,
          eco_certified: initialEcoCertified
        },
        searchParams.get("sort") || "relevance"
      );
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const filterServices = (
    basicFilters = filters, 
    advFilters = advancedFilters,
    sortBy = sortOption
  ) => {
    // Filter services based on search criteria
    let filteredServices = [...servicesData];
    
    // Basic filters
    if (basicFilters.trade) {
      filteredServices = filteredServices.filter(service => 
        service.name.toLowerCase().includes(basicFilters.trade.toLowerCase()) ||
        service.category.toLowerCase().includes(basicFilters.trade.toLowerCase()) ||
        service.description.toLowerCase().includes(basicFilters.trade.toLowerCase())
      );
    }
    
    if (basicFilters.postcode) {
      // In a real app, this would filter by location/distance
      // For now we'll just simulate filtering
      filteredServices = filteredServices.filter(() => true);
    }
    
    // Advanced filters
    if (advFilters.category.length > 0) {
      filteredServices = filteredServices.filter(service => 
        advFilters.category.includes(service.category)
      );
    }
    
    if (advFilters.rating) {
      filteredServices = filteredServices.filter(service => 
        service.rating >= advFilters.rating
      );
    }
    
    if (advFilters.eco_certified) {
      filteredServices = filteredServices.filter(service => 
        service.eco_certified === true
      );
    }
    
    // Sort services
    switch (sortBy) {
      case "rating":
        filteredServices.sort((a, b) => b.rating - a.rating);
        break;
      case "price_low":
        filteredServices.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "price_high":
        filteredServices.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case "name_asc":
        filteredServices.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance or any other case
        // Default sorting could be based on a relevance score
        // For now, we'll keep the original order
        break;
    }
    
    setServices(filteredServices);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Prepare search parameters
    const params: Record<string, string> = {
      trade: filters.trade,
      postcode: filters.postcode,
      sort: sortOption,
    };
    
    // Add advanced filters to params
    if (advancedFilters.category.length > 0) {
      params.category = advancedFilters.category.join(',');
    }
    
    if (advancedFilters.rating) {
      params.rating = advancedFilters.rating.toString();
    }
    
    if (advancedFilters.availability) {
      params.availability = advancedFilters.availability;
    }
    
    if (advancedFilters.eco_certified) {
      params.eco_certified = 'true';
    }
    
    // Update URL with search parameters
    setSearchParams(params);
  };

  const handleCategoryChange = (category: string) => {
    setAdvancedFilters(prev => {
      const updatedCategories = prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category];
      
      return {
        ...prev,
        category: updatedCategories
      };
    });
  };

  const handleRatingFilter = (rating: number) => {
    setAdvancedFilters(prev => ({
      ...prev,
      rating: prev.rating === rating ? null : rating
    }));
  };

  const handleEcoCertifiedChange = (checked: boolean) => {
    setAdvancedFilters(prev => ({
      ...prev,
      eco_certified: checked
    }));
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    // Immediately apply sorting
    filterServices(filters, advancedFilters, option);
  };

  const clearAllFilters = () => {
    setFilters({
      trade: "",
      postcode: "",
    });
    setAdvancedFilters({
      category: [],
      rating: null,
      availability: null,
      eco_certified: false
    });
    setSortOption("relevance");
    setSearchParams({});
  };

  const getSortLabel = (option: string) => {
    switch (option) {
      case "relevance": return "Relevance";
      case "rating": return "Highest Rating";
      case "price_low": return "Price: Low to High";
      case "price_high": return "Price: High to Low";
      case "name_asc": return "Name: A to Z";
      default: return "Sort";
    }
  };

  // Count active filters
  const activeFilterCount = (
    (advancedFilters.category.length > 0 ? 1 : 0) +
    (advancedFilters.rating ? 1 : 0) +
    (advancedFilters.availability ? 1 : 0) +
    (advancedFilters.eco_certified ? 1 : 0)
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Find Eco-Conscious Tradespeople</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <form onSubmit={handleSearch} className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Search for tradespeople</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                name="trade"
                className="pl-9"
                placeholder="What service do you need?"
                value={filters.trade}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                name="postcode"
                className="pl-9"
                placeholder="Enter your postcode"
                value={filters.postcode}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-end">
              <Button 
                type="submit"
                className="w-full md:w-auto"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Results Section */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">
          {services.length} results found
          {filters.trade && <span className="ml-2 font-normal text-lg">for "{filters.trade}"</span>}
          {filters.postcode && <span className="ml-2 font-normal text-lg">in {filters.postcode}</span>}
        </h2>
        <div className="flex gap-2">
          {/* Filter Dropdown */}
          <DropdownMenu open={filterDropdownOpen} onOpenChange={setFilterDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="h-4 w-4 mr-1" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="ml-1 text-xs bg-primary text-white rounded-full px-1.5">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className="h-3 w-3 ml-1 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[280px] p-4" align="end">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox 
                          id={`category-${category}`}
                          checked={advancedFilters.category.includes(category)}
                          onCheckedChange={() => handleCategoryChange(category)}
                          className="mr-2"
                        />
                        <label 
                          htmlFor={`category-${category}`}
                          className="text-sm cursor-pointer"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Minimum Rating</h3>
                  <div className="flex gap-1">
                    {[5, 4, 3, 2].map((star) => (
                      <Button 
                        key={star} 
                        variant={advancedFilters.rating === star ? "default" : "outline"} 
                        size="sm"
                        className="flex items-center"
                        onClick={() => handleRatingFilter(star)}
                      >
                        {star}+ <Star className="ml-1 h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Eco Certified</h3>
                  <div className="flex items-center">
                    <Checkbox 
                      id="eco-certified"
                      checked={advancedFilters.eco_certified}
                      onCheckedChange={(checked) => 
                        handleEcoCertifiedChange(checked as boolean)
                      }
                      className="mr-2"
                    />
                    <label 
                      htmlFor="eco-certified"
                      className="text-sm cursor-pointer"
                    >
                      Show only eco-certified professionals
                    </label>
                  </div>
                </div>
                
                <div className="pt-2 flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      handleSearch();
                      setFilterDropdownOpen(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <Sort className="h-4 w-4 mr-1" />
                {getSortLabel(sortOption)}
                <ChevronDown className="h-3 w-3 ml-1 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSortChange("relevance")}>
                Relevance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("rating")}>
                Highest Rating
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price_low")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price_high")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("name_asc")}>
                Name: A to Z
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {advancedFilters.category.length > 0 && (
            <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
              Categories: {advancedFilters.category.join(', ')}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setAdvancedFilters(prev => ({ ...prev, category: [] }))}
              >
                &times;
              </Button>
            </div>
          )}
          
          {advancedFilters.rating && (
            <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
              {advancedFilters.rating}+ Stars
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setAdvancedFilters(prev => ({ ...prev, rating: null }))}
              >
                &times;
              </Button>
            </div>
          )}
          
          {advancedFilters.eco_certified && (
            <div className="bg-muted px-3 py-1 rounded-full text-sm flex items-center">
              Eco Certified
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0"
                onClick={() => setAdvancedFilters(prev => ({ ...prev, eco_certified: false }))}
              >
                &times;
              </Button>
            </div>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-sm h-7"
            onClick={clearAllFilters}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Spinner className="h-12 w-12 text-primary" />
          <span className="sr-only">Loading</span>
        </div>
      )}

      {/* No Results State */}
      {!loading && services.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-gray-500">
            Try adjusting your search criteria or browse all available services.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={clearAllFilters}
          >
            Clear filters
          </Button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
