
import { supabase } from "@/lib/supabase";

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  tradesperson_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  user_name?: string;
  user_avatar?: string;
}

export interface ReviewStats {
  avg_rating: number;
  review_count: number;
}

export const reviewService = {
  async getReviewsByTradesperson(tradespersonId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviews_user_id_fkey(full_name, avatar_url)
      `)
      .eq('tradesperson_id', tradespersonId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
    
    // Transform data to include user_name and user_avatar
    return data.map(review => ({
      ...review,
      user_name: review.profiles?.full_name || 'Anonymous',
      user_avatar: review.profiles?.avatar_url
    }));
  },
  
  async createReview(review: {
    booking_id: string;
    user_id: string;
    tradesperson_id: string;
    rating: number;
    comment?: string;
  }): Promise<Review> {
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }
    
    return data;
  },
  
  async getReviewStats(tradespersonId: string): Promise<ReviewStats> {
    const { data, error } = await supabase
      .rpc('get_tradesperson_review_stats', {
        tradesperson_id_param: tradespersonId
      });
    
    if (error) {
      console.error('Error fetching review stats:', error);
      return { avg_rating: 0, review_count: 0 };
    }
    
    return data || { avg_rating: 0, review_count: 0 };
  },
  
  async getUserReviews(userId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles!reviews_tradesperson_id_fkey(full_name, avatar_url)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user reviews:', error);
      throw error;
    }
    
    return data;
  },
  
  async checkReviewExists(userId: string, bookingId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', userId)
      .eq('booking_id', bookingId)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking if review exists:', error);
      return false;
    }
    
    return !!data;
  }
};
