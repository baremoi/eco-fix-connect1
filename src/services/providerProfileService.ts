
import { mockProviders, Provider } from "@/services/data/mockProviders";

export const providerProfileService = {
  /**
   * Get a provider by ID
   */
  getProviderById: async (providerId: string): Promise<Provider | undefined> => {
    console.log("Fetching provider with ID:", providerId);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find provider in mock data
    return mockProviders.find(provider => provider.id === providerId);
  },
  
  /**
   * Get reviews for a provider
   */
  getProviderReviews: async (providerId: string): Promise<any[]> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock reviews data
    return [
      {
        id: "r1",
        userId: "user1",
        userName: "Alex Johnson",
        rating: 5,
        date: "2023-03-15",
        comment: "Excellent work! Very professional and completed the job ahead of schedule.",
        userAvatar: "/avatars/user1.jpg"
      },
      {
        id: "r2",
        userId: "user2",
        userName: "Morgan Smith",
        rating: 4,
        date: "2023-02-28",
        comment: "Good service, installed my solar panels efficiently and explained everything well.",
        userAvatar: "/avatars/user2.jpg"
      },
      {
        id: "r3",
        userId: "user3",
        userName: "Taylor Wilson",
        rating: 5,
        date: "2023-02-10",
        comment: "Fantastic experience! They were knowledgeable about eco-friendly options and helped me make good choices.",
        userAvatar: "/avatars/user3.jpg"
      }
    ].filter(() => providerId); // Just to use providerId parameter
  },
  
  /**
   * Get services offered by a provider
   */
  getProviderServices: async (providerId: string): Promise<any[]> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock services data
    return [
      {
        id: "s1",
        name: "Solar Panel Installation",
        description: "Complete installation of residential solar panel systems with battery options.",
        price: 3500,
        duration: "1-2 days",
        eco_rating: 5
      },
      {
        id: "s2",
        name: "Energy Audit",
        description: "Comprehensive home energy audit with detailed recommendations for improvements.",
        price: 250,
        duration: "3-4 hours",
        eco_rating: 4
      },
      {
        id: "s3",
        name: "Smart Home Setup",
        description: "Installation and configuration of energy-efficient smart home devices.",
        price: 450,
        duration: "1 day",
        eco_rating: 4
      }
    ].filter(() => providerId); // Just to use providerId parameter
  },
  
  /**
   * Get availability slots for a provider
   */
  getProviderAvailability: async (providerId: string): Promise<any[]> => {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get current date for demo purposes
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    // Mock availability data
    return [
      {
        date: today.toISOString().split('T')[0],
        slots: ["09:00", "13:00", "15:00"]
      },
      {
        date: tomorrow.toISOString().split('T')[0],
        slots: ["10:00", "14:00"]
      },
      {
        date: dayAfter.toISOString().split('T')[0],
        slots: ["09:00", "11:00", "16:00"]
      },
      {
        date: nextWeek.toISOString().split('T')[0],
        slots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"]
      }
    ].filter(() => providerId); // Just to use providerId parameter
  }
};
