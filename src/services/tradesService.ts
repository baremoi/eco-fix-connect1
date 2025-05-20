
import { supabase } from "@/lib/supabase";
import { Tradesperson, TradeSearchFilters, TradeCategory } from "@/components/trades/TradeTypes";

export const tradesService = {
  async getCategories(): Promise<TradeCategory[]> {
    try {
      const { data, error } = await supabase
        .from('service_categories')
        .select('id, name')
        .order('name');
      
      if (error) {
        console.error('Error loading categories:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Exception loading categories:', error);
      return [];
    }
  },

  async searchTradespeople(filters: TradeSearchFilters): Promise<Tradesperson[]> {
    try {
      console.log("Searching with filters:", filters);
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
      if (filters.selectedCategory) {
        console.log("Filtering by category:", filters.selectedCategory);
        const { data: matchingCategories } = await supabase
          .from('service_categories')
          .select('id, name')
          .ilike('name', `%${filters.selectedCategory}%`);
        
        console.log("Matching categories:", matchingCategories);
        
        if (matchingCategories && matchingCategories.length > 0) {
          // Fix: Access the first item of the array before accessing its 'id' property
          const categoryId = matchingCategories[0]?.id;
          console.log("Using category ID:", categoryId);
          if (categoryId) {
            query = query.eq('tradesperson_services.service_categories.id', categoryId);
          }
        }
      }
      
      // Add postcode filter if provided (this would be more complex in a real app)
      if (filters.postcode) {
        console.log("Filtering by postcode:", filters.postcode);
        query = query.ilike('address', `%${filters.postcode}%`);
      }
      
      // Apply hourly rate filter
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 200) {
        console.log("Filtering by price range:", filters.priceRange);
        query = query
          .gte('tradesperson_services.hourly_rate', filters.priceRange[0])
          .lte('tradesperson_services.hourly_rate', filters.priceRange[1]);
      }
      
      // Apply availability filter
      if (filters.availabilityFilter) {
        console.log("Filtering by availability");
        query = query.eq('tradesperson_services.availability_status', true);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error searching tradespeople:', error);
        return [];
      }
      
      console.log("Raw data from query:", data);
      
      // Transform the data to a more usable format
      const formattedData = data.map(item => ({
        id: item.id,
        full_name: item.full_name || 'Unknown',
        avatar_url: item.avatar_url,
        role: item.role,
        bio: item.bio,
        // Fix: Access service category name safely by ensuring we access a property from an object, not from an array
        serviceCategory: item.tradesperson_services[0]?.service_categories?.name || 'General',
        hourlyRate: item.tradesperson_services[0]?.hourly_rate,
        avg_rating: 0,
        review_count: 0
      }));
      
      console.log("Formatted data:", formattedData);
      
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
      
      console.log("With ratings:", tradespeopleWithRatings);
      
      // Apply rating filter
      let filteredData = tradespeopleWithRatings;
      if (filters.ratingFilter > 0) {
        console.log("Filtering by rating:", filters.ratingFilter);
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
      
      console.log("Final filtered data:", filteredData);
      return filteredData;
    } catch (error) {
      console.error('Exception searching tradespeople:', error);
      return [];
    }
  }
};
