import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, CheckCircle, AlertCircle, Calendar, MessageSquare } from "lucide-react";

type Notification = {
  id: string;
  type: 'update' | 'alert' | 'reminder' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

const DashboardNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "N001",
      type: "update",
      title: "Trade Request Accepted",
      message: "Your plumbing repair request has been accepted by Mike's Plumbing",
      timestamp: "2024-03-15T10:30:00",
      read: false
    },
    {
      id: "N002",
      type: "alert",
      title: "Urgent: Project Update Required",
      message: "Please review and approve the updated timeline for your kitchen renovation",
      timestamp: "2024-03-14T15:45:00",
      read: false
    },
    {
      id: "N003",
      type: "reminder",
      title: "Upcoming Appointment",
      message: "Reminder: Electrical inspection scheduled for tomorrow at 2 PM",
      timestamp: "2024-03-14T09:00:00",
      read: true
    },
    {
      id: "N004",
      type: "message",
      title: "New Message from Tradesperson",
      message: "Bob from Bob's Construction has sent you a message regarding your project",
      timestamp: "2024-03-13T16:20:00",
      read: true
    }
  ]);

  const getIcon = (type: Notification['type']) => {
    const icons = {
      update: <CheckCircle className="h-5 w-5 text-green-500" />,
      alert: <AlertCircle className="h-5 w-5 text-red-500" />,
      reminder: <Calendar className="h-5 w-5 text-blue-500" />,
      message: <MessageSquare className="h-5 w-5 text-purple-500" />
    };
    return icons[type];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CardTitle>Notifications</CardTitle>
            {unreadCount > 0 && (
              <Badge variant="destructive">
                {unreadCount} new
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`relative ${!notification.read ? 'bg-gray-50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DashboardNotifications; 