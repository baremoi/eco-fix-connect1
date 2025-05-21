
export type NotificationType = 'booking' | 'message' | 'update' | 'alert' | 'reminder';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  entityId?: string; // ID of related entity (booking, message, etc.)
}
