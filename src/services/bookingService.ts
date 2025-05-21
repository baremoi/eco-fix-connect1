
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

// Mock storage for booking data
let mockBookings: Booking[] = [];

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
  }
};
