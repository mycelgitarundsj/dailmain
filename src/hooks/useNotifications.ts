import { useState, useEffect } from 'react';
import { notificationService, NotificationData } from '../services/notificationService';

export const useNotifications = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [pendingNotifications, setPendingNotifications] = useState<any[]>([]);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    initializeNotifications();
  }, []);

  const initializeNotifications = async () => {
    if (isInitializing) return;
    
    setIsInitializing(true);
    try {
      await notificationService.initialize();
      
      // Check if notifications are actually available and supported
      const isSupported = notificationService.isSupported();
      const hasPermissions = notificationService.getPermissionStatus();
      
      setIsEnabled(isSupported && hasPermissions);
      
      if (isSupported && hasPermissions) {
        await refreshPendingNotifications();
      }
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      setIsEnabled(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const checkNotificationPermissions = async (): Promise<boolean> => {
    try {
      // Re-initialize to check current status
      await notificationService.initialize();
      const isSupported = notificationService.isSupported();
      const hasPermissions = notificationService.getPermissionStatus();
      
      const enabled = isSupported && hasPermissions;
      setIsEnabled(enabled);
      return enabled;
    } catch (error) {
      console.error('Failed to check notification permissions:', error);
      setIsEnabled(false);
      return false;
    }
  };

  const refreshPendingNotifications = async () => {
    try {
      const pending = await notificationService.getPendingNotifications();
      setPendingNotifications(pending || []);
    } catch (error) {
      console.error('Failed to refresh pending notifications:', error);
      setPendingNotifications([]);
    }
  };

  const scheduleNotification = async (data: NotificationData) => {
    try {
      const success = await notificationService.scheduleNotification(data);
      if (success) {
        await refreshPendingNotifications();
      }
      return success;
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return false;
    }
  };

  const cancelNotification = async (id: number) => {
    try {
      const success = await notificationService.cancelNotification(id);
      if (success) {
        await refreshPendingNotifications();
      }
      return success;
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      return false;
    }
  };

  const cancelAllNotifications = async () => {
    try {
      const success = await notificationService.cancelAllNotifications();
      if (success) {
        await refreshPendingNotifications();
      }
      return success;
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      return false;
    }
  };

  const scheduleTaskReminder = async (taskId: string, title: string, reminderTime: Date) => {
    try {
      return await notificationService.scheduleTaskReminder(taskId, title, reminderTime);
    } catch (error) {
      console.error('Failed to schedule task reminder:', error);
      return false;
    }
  };

  const scheduleBreakReminder = async (intervalMinutes: number = 30) => {
    try {
      return await notificationService.scheduleBreakReminder(intervalMinutes);
    } catch (error) {
      console.error('Failed to schedule break reminder:', error);
      return false;
    }
  };

  const scheduleMotivationalNotification = async () => {
    try {
      return await notificationService.scheduleMotivationalNotification();
    } catch (error) {
      console.error('Failed to schedule motivational notification:', error);
      return false;
    }
  };

  return {
    isEnabled,
    isInitializing,
    pendingNotifications,
    scheduleNotification,
    cancelNotification,
    cancelAllNotifications,
    scheduleTaskReminder,
    scheduleBreakReminder,
    scheduleMotivationalNotification,
    refreshPendingNotifications,
    checkNotificationPermissions
  };
};