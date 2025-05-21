
import { toast } from "sonner";
import { Notification, NotificationType } from "@/types/notification";

// Mock storage for notifications
let mockNotifications: Notification[] = [];

export const notificationService = {
  // Get all notifications for a user
  getNotifications: async (userId: string): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return mockNotifications.filter(notification => notification.userId === userId);
  },
  
  // Create a new notification
  createNotification: async (
    userId: string, 
    type: NotificationType, 
    title: string, 
    message: string,
    actionUrl?: string,
    entityId?: string,
  ): Promise<Notification> => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
    
    const newNotification: Notification = {
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      userId,
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false,
      actionUrl,
      entityId
    };
    
    mockNotifications.push(newNotification);

    // Show toast for new notifications
    toast.info(title, {
      description: message,
      position: "top-right",
      duration: 5000,
    });
    
    return newNotification;
  },
  
  // Mark notifications as read
  markAsRead: async (notificationId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
    
    const index = mockNotifications.findIndex(notification => notification.id === notificationId);
    if (index !== -1) {
      mockNotifications[index].read = true;
      return true;
    }
    
    return false;
  },
  
  // Mark all notifications as read for a user
  markAllAsRead: async (userId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    mockNotifications = mockNotifications.map(notification => 
      notification.userId === userId 
        ? { ...notification, read: true } 
        : notification
    );
    
    return true;
  },
  
  // Delete a notification
  deleteNotification: async (notificationId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200)); // Simulate API delay
    
    const initialLength = mockNotifications.length;
    mockNotifications = mockNotifications.filter(notification => notification.id !== notificationId);
    
    return mockNotifications.length < initialLength;
  },

  // Clear all notifications for a user
  clearNotifications: async (userId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    const initialLength = mockNotifications.length;
    mockNotifications = mockNotifications.filter(notification => notification.userId !== userId);
    
    return mockNotifications.length < initialLength;
  },

  // Create a booking notification
  createBookingNotification: async (
    userId: string,
    bookingId: string,
    action: 'created' | 'updated' | 'cancelled' | 'completed',
    serviceName: string
  ): Promise<Notification> => {
    const titles = {
      created: 'New Booking Confirmed',
      updated: 'Booking Updated',
      cancelled: 'Booking Cancelled',
      completed: 'Booking Completed'
    };
    
    const messages = {
      created: `Your booking for ${serviceName} has been confirmed.`,
      updated: `Your booking for ${serviceName} has been updated.`,
      cancelled: `Your booking for ${serviceName} has been cancelled.`,
      completed: `Your booking for ${serviceName} has been marked as completed.`
    };
    
    return notificationService.createNotification(
      userId,
      'booking',
      titles[action],
      messages[action],
      `/bookings?id=${bookingId}`,
      bookingId
    );
  },

  // Create a message notification
  createMessageNotification: async (
    userId: string,
    messageId: string,
    senderName: string,
  ): Promise<Notification> => {
    return notificationService.createNotification(
      userId,
      'message',
      'New Message',
      `You have a new message from ${senderName}.`,
      `/messages?id=${messageId}`,
      messageId
    );
  }
};
