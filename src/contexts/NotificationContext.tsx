
import React, { createContext, useContext, useState, useEffect } from "react";
import { notificationService } from "@/services/notificationService";
import { useMockAuth } from "@/lib/mockAuth";
import { Notification } from "@/types/notification";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: Error | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  clearNotifications: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useMockAuth();
  const queryClient = useQueryClient();
  
  const {
    data: notifications = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => notificationService.getNotifications(user?.id || ""),
    enabled: !!user?.id,
  });
  
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  const markAsRead = async (id: string) => {
    if (!user) return;
    await notificationService.markAsRead(id);
    queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
  };
  
  const markAllAsRead = async () => {
    if (!user) return;
    await notificationService.markAllAsRead(user.id);
    queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
  };
  
  const clearNotifications = async () => {
    if (!user) return;
    await notificationService.clearNotifications(user.id);
    queryClient.invalidateQueries({ queryKey: ["notifications", user.id] });
  };
  
  const refreshNotifications = async () => {
    refetch();
  };
  
  // Poll for notifications every 30 seconds
  useEffect(() => {
    if (!user?.id) return;
    
    const intervalId = setInterval(() => {
      refetch();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [user?.id, refetch]);
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error: error as Error | null,
        markAsRead,
        markAllAsRead,
        clearNotifications,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
