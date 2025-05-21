
import React from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "@/types/notification";
import { useNotifications } from "@/contexts/NotificationContext";
import { CheckCircle, Bell, AlertCircle, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

interface NotificationItemProps {
  notification: Notification;
  inPopover?: boolean;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification, inPopover = false }) => {
  const { markAsRead } = useNotifications();
  const navigate = useNavigate();
  
  const getIcon = () => {
    switch (notification.type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      case 'update':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-orange-500" />;
    }
  };
  
  const handleClick = () => {
    markAsRead(notification.id);
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };
  
  const timeAgo = formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true });
  
  return (
    <div 
      className={`p-3 ${notification.read ? '' : 'bg-muted/50'} ${inPopover ? 'hover:bg-muted' : ''} cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
          <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
        </div>
        {!notification.read && (
          <div className="flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};
