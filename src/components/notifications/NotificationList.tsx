
import React from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/types/notification";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle, Bell, AlertCircle } from "lucide-react";

interface NotificationListProps {
  inPopover?: boolean;
  maxHeight?: string;
}

export const NotificationList: React.FC<NotificationListProps> = ({ 
  inPopover = false,
  maxHeight = "400px" 
}) => {
  const { 
    notifications, 
    loading, 
    unreadCount,
    markAllAsRead, 
    clearNotifications 
  } = useNotifications();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mb-3" />
        <h3 className="font-medium text-lg">No notifications</h3>
        <p className="text-sm text-muted-foreground">
          You're all caught up! We'll notify you when something happens.
        </p>
      </div>
    );
  }

  const notificationList = (
    <ScrollArea style={{ maxHeight }} className="px-1">
      <div className="divide-y">
        {notifications.map((notification) => (
          <NotificationItem 
            key={notification.id} 
            notification={notification}
            inPopover={inPopover}
          />
        ))}
      </div>
    </ScrollArea>
  );

  if (inPopover) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-3 border-b bg-muted/50">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => markAllAsRead()}
                className="text-xs h-8"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>
        {notificationList}
        <div className="p-3 border-t">
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => clearNotifications()} 
            className="text-xs w-full"
          >
            Clear All
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Notifications</h2>
        <div className="space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => markAllAsRead()}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark all as read
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => clearNotifications()}>
            Clear All
          </Button>
        </div>
      </div>
      {notificationList}
    </div>
  );
};
