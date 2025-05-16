
import { Provider, ProviderFilters } from "./types/provider.types";
import { mockProviders } from "./data/mockProviders";
import { supabase } from "@/lib/supabase";

// Import the mock data for fallback
import { serviceCategories as mockServiceCategories, popularLocations as mockPopularLocations } from "./data/mockProviders";

export const getProviders = async (filters?: ProviderFilters) => {
  try {
    let query = supabase.from('providers').select('*');
    
    if (filters) {
      if (filters.category) {
        query = query.filter('services', 'cs', `{"${filters.category}"}`);
      }
      
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      
      if (filters.minRating && filters.minRating > 0) {
        query = query.gte('rating', filters.minRating);
      }
      
      if (filters.specialty) {
        query = query.filter('specialties', 'cs', `{"${filters.specialty}"}`);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching providers from Supabase:', error);
      // Fallback to mock data if there's an error
      return filterMockProviders(filters);
    }
    
    // Map the Supabase data to match our Provider type
    return data.map((item: any) => ({
      ...item,
      completedProjects: item.completed_projects
    }));
  } catch (error) {
    console.error('Exception fetching providers:', error);
    // Fallback to mock data if there's an exception
    return filterMockProviders(filters);
  }
};

export const getProviderById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('providers')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching provider by ID from Supabase:', error);
      // Fallback to mock data if there's an error
      return mockProviders.find(p => p.id === id);
    }
    
    // Map the Supabase data to match our Provider type
    return {
      ...data,
      completedProjects: data.completed_projects
    } as Provider;
  } catch (error) {
    console.error('Exception fetching provider by ID:', error);
    // Fallback to mock data if there's an exception
    return mockProviders.find(p => p.id === id);
  }
};

// Helper function to filter mock providers (for fallback)
const filterMockProviders = (filters?: ProviderFilters) => {
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

export const getServiceCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('name')
      .order('name');
    
    if (error) {
      console.error('Error fetching service categories from Supabase:', error);
      // Fallback to mock data if there's an error
      return mockServiceCategories;
    }
    
    return data.map(category => category.name);
  } catch (error) {
    console.error('Exception fetching service categories:', error);
    // Fallback to mock data if there's an exception
    return mockServiceCategories;
  }
};

export const getPopularLocations = async () => {
  try {
    const { data, error } = await supabase
      .from('popular_locations')
      .select('name')
      .order('name');
    
    if (error) {
      console.error('Error fetching popular locations from Supabase:', error);
      // Fallback to mock data if there's an error
      return mockPopularLocations;
    }
    
    return data.map(location => location.name);
  } catch (error) {
    console.error('Exception fetching popular locations:', error);
    // Fallback to mock data if there's an exception
    return mockPopularLocations;
  }
};

// Export the Provider type for use in other files
export type { Provider };
