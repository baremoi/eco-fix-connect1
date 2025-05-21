
import { toast } from "sonner";

export interface BookingRequest {
  providerId: string;
  serviceId?: string;
  date: string;
  time: string;
  notes?: string;
}

interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

export interface Review {
  id: string;
  bookingId: string;
  userId: string;
  userName: string;
  providerId: string;
  rating: number;
  comment: string;
  date: string;
  userAvatar?: string;
}

// Mock storage for booking data
let mockBookings: Booking[] = [];

// Mock storage for reviews
let mockReviews: Review[] = [];

export const bookingService = {
  createBooking: async (bookingData: BookingRequest): Promise<Booking> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    // Generate a mock booking response
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      providerId: bookingData.providerId,
      providerName: "Service Provider", // In a real app, we would fetch this
      serviceName: bookingData.serviceId ? "Specific Service" : "General Service",
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      notes: bookingData.notes
    };
    
    // Add to mock storage
    mockBookings.push(newBooking);
    
    return newBooking;
  },
  
  getBookingsForUser: async (): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API delay
    return [...mockBookings];
  },
  
  getBookingById: async (bookingId: string): Promise<Booking | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return mockBookings.find(booking => booking.id === bookingId);
  },
  
  cancelBooking: async (bookingId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const index = mockBookings.findIndex(booking => booking.id === bookingId);
    if (index !== -1) {
      mockBookings[index].status = 'cancelled';
      return true;
    }
    
    return false;
  },

  completeBooking: async (bookingId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const index = mockBookings.findIndex(booking => booking.id === bookingId);
    if (index !== -1) {
      mockBookings[index].status = 'completed';
      return true;
    }
    
    return false;
  },

  // Review related functions
  submitReview: async (review: Omit<Review, 'id' | 'date'>): Promise<Review> => {
    await new Promise(resolve => setTimeout(resolve, 700)); // Simulate API delay
    
    // Generate a mock review response
    const newReview: Review = {
      id: `review-${Date.now()}`,
      ...review,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Add to mock storage
    mockReviews.push(newReview);
    
    return newReview;
  },
  
  getReviewsForProvider: async (providerId: string): Promise<Review[]> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return mockReviews.filter(review => review.providerId === providerId);
  },
  
  getReviewByBookingId: async (bookingId: string): Promise<Review | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return mockReviews.find(review => review.bookingId === bookingId);
  },
  
  getReviewStats: async (providerId: string): Promise<{ averageRating: number, totalReviews: number }> => {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API delay
    
    const providerReviews = mockReviews.filter(review => review.providerId === providerId);
    const totalReviews = providerReviews.length;
    
    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0
      };
    }
    
    const sumRatings = providerReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = sumRatings / totalReviews;
    
    return {
      averageRating,
      totalReviews
    };
  }
};
