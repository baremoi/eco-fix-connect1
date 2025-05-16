
import { supabase } from "@/lib/supabase"; // Ensure correct import

export const getServiceCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('name')
      .order('name');
    
    if (error) {
      console.error('Error fetching service categories from Supabase:', error);
      // Return empty array if there's an error
      return [];
    }
    
    return data.map(category => category.name);
  } catch (error) {
    console.error('Exception fetching service categories:', error);
    // Return empty array if there's an exception
    return [];
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
      // Return empty array if there's an error
      return [];
    }
    
    return data.map(location => location.name);
  } catch (error) {
    console.error('Exception fetching popular locations:', error);
    // Return empty array if there's an exception
    return [];
  }
};
