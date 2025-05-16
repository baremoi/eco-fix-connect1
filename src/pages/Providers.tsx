
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProviders, serviceCategories, popularLocations, Provider } from "@/services/providerService";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { Spinner } from "@/components/ui/spinner";
import { Filter, MapPin, Search, Star } from "lucide-react";

export default function Providers() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [providers, setProviders] = useState<Provider[]>([]);
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
        const filters: any = {};
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
    const params: any = {};
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for services or specialties..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

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
          {/* Filters - hidden on mobile unless toggled */}
          <div className={`${isMobileFiltersVisible ? 'block' : 'hidden'} md:block`}>
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your search results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Service Category</label>
                  <Select 
                    value={selectedCategory} 
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select 
                    value={selectedLocation} 
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Locations</SelectItem>
                      {popularLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Minimum Rating</label>
                    <span className="text-sm text-muted-foreground">
                      {minRating > 0 ? `${minRating}+ stars` : "Any rating"}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Any</span>
                    <span>★★★★★</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col gap-2">
                  <Button onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" onClick={resetFilters}>Reset</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Results */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Spinner className="h-8 w-8 text-primary" />
                <span className="ml-2">Loading providers...</span>
              </div>
            ) : providers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {providers.map((provider) => (
                  <ProviderCard key={provider.id} provider={provider} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <MapPin className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No providers found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters or search term
                </p>
                <Button className="mt-4" onClick={resetFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
