
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Service, servicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Trades() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState({
    trade: searchParams.get("trade") || "",
    postcode: searchParams.get("postcode") || "",
  });

  useEffect(() => {
    // Set initial filter values from URL params
    setFilters({
      trade: searchParams.get("trade") || "",
      postcode: searchParams.get("postcode") || "",
    });
    
    // Simulate API call with a delay
    setLoading(true);
    const timer = setTimeout(() => {
      filterServices();
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const filterServices = () => {
    // Filter services based on search criteria
    let filteredServices = [...servicesData];
    
    if (filters.trade) {
      filteredServices = filteredServices.filter(service => 
        service.name.toLowerCase().includes(filters.trade.toLowerCase()) ||
        service.category.toLowerCase().includes(filters.trade.toLowerCase())
      );
    }
    
    if (filters.postcode) {
      // In a real app, this would filter by location/distance
      // For now we'll just simulate filtering
      filteredServices = filteredServices.filter(() => true);
    }
    
    setServices(filteredServices);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Update URL with search parameters
    setSearchParams({
      trade: filters.trade,
      postcode: filters.postcode,
    });
  };

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
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {services.length} results found
          {filters.trade && <span className="ml-2 font-normal text-lg">for "{filters.trade}"</span>}
          {filters.postcode && <span className="ml-2 font-normal text-lg">in {filters.postcode}</span>}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Sort className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

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
            onClick={() => {
              setFilters({ trade: "", postcode: "" });
              setSearchParams({});
            }}
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

// Import for Sort icon
import { Sort } from "lucide-react";
