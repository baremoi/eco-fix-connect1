
import { notificationService } from "./notificationService";

export const seedNotifications = async (userId: string): Promise<void> => {
  // Check if we've already seeded for this user
  const seededKey = `notifications_seeded_${userId}`;
  if (localStorage.getItem(seededKey)) {
    return;
  }
  
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000));
  const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
  const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
  
  // Create some initial notifications
  await notificationService.createNotification(
    userId,
    'update',
    'Welcome to EcoFixConnect!',
    'Thank you for joining our platform. Start exploring eco-friendly services now.',
    '/',
    undefined,
  );
  
  // Make this one already read
  const welcomeNotif = await notificationService.createNotification(
    userId,
    'message',
    'New message from Support',
    'Hello! We\'re here to help you navigate our platform. Let us know if you have any questions.',
    '/messages',
    'support-message-1',
  );
  await notificationService.markAsRead(welcomeNotif.id);
  
  await notificationService.createNotification(
    userId,
    'booking',
    'Upcoming Booking Reminder',
    'Don\'t forget your upcoming booking for Home Energy Assessment tomorrow at 2PM.',
    '/bookings',
    'booking-reminder-1',
  );
  
  // Mark as seeded
  localStorage.setItem(seededKey, 'true');
};
