
import { Provider, ProviderFilters } from "./types/provider.types";
import { mockProviders } from "./data/mockProviders";

export const getProviders = async (filters?: ProviderFilters) => {
  // In a real implementation, this would query Supabase
  // For now using mock data filtered by the provided criteria
  let filtered = [...mockProviders];
  
  if (filters) {
    if (filters.category) {
      filtered = filtered.filter(p => 
        p.services.some(s => s.toLowerCase().includes(filters.category!.toLowerCase())));
    }
    
    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }
    
    if (filters.minRating) {
      filtered = filtered.filter(p => p.rating >= filters.minRating!);
    }
    
    if (filters.specialty) {
      filtered = filtered.filter(p => 
        p.specialties.some(s => s.toLowerCase().includes(filters.specialty!.toLowerCase())));
    }
  }
  
  return filtered;
};

export const getProviderById = async (id: string) => {
  return mockProviders.find(p => p.id === id);
};

// Re-export the categories and locations for convenience
export { serviceCategories, popularLocations } from "./data/mockProviders";
