
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProviders } from "@/services/providerService";
import { Filter } from "lucide-react";
import { ProviderFilters } from "@/components/providers/ProviderFilters";
import { ProviderResults } from "@/components/providers/ProviderResults";
import { ProviderSearch } from "@/components/providers/ProviderSearch";

export default function Providers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFiltersVisible, setIsMobileFiltersVisible] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "");
  const [minRating, setMinRating] = useState(parseInt(searchParams.get("rating") || "0") || 0);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const filters = {};
        if (selectedCategory) filters.category = selectedCategory;
        if (selectedLocation) filters.location = selectedLocation;
        if (minRating > 0) filters.minRating = minRating;
        if (searchTerm) filters.specialty = searchTerm;
        
        const data = await getProviders(filters);
        setProviders(data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [selectedCategory, selectedLocation, minRating, searchTerm]);

  const applyFilters = () => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (selectedLocation) params.location = selectedLocation;
    if (minRating > 0) params.rating = minRating.toString();
    if (searchTerm) params.search = searchTerm;
    
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedLocation("");
    setMinRating(0);
    setSearchTerm("");
    setSearchParams({});
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-4 md:space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Eco Service Providers</h1>
          <p className="text-muted-foreground">
            Find eco-friendly specialists in your area
          </p>
        </div>

        {/* Search bar - always visible */}
        <ProviderSearch 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          applyFilters={applyFilters}
        />

        {/* Mobile filter button */}
        <div className="md:hidden">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => setIsMobileFiltersVisible(!isMobileFiltersVisible)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {isMobileFiltersVisible ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Filters */}
          <ProviderFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            minRating={minRating}
            setMinRating={setMinRating}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            isMobileFiltersVisible={isMobileFiltersVisible}
          />
          
          {/* Results */}
          <div className="md:col-span-3">
            <ProviderResults 
              providers={providers}
              loading={loading}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
