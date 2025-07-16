import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export interface NotificationData {
  id: number;
  title: string;
  body: string;
  schedule?: {
    at: Date;
    repeats?: boolean;
    every?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  };
  extra?: any;
}

class NotificationService {
  private isInitialized = false;
  private hasPermissions = false;
  private initializationPromise: Promise<void> | null = null;

  async initialize() {
    // Prevent multiple initialization attempts
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    if (this.isInitialized) return;

    this.initializationPromise = this.performInitialization();
    return this.initializationPromise;
  }

  private async performInitialization() {
    try {
      // Check if we're on a supported platform
      if (!Capacitor.isNativePlatform()) {
        console.log('Notifications not supported on web platform');
        this.isInitialized = true;
        this.hasPermissions = false;
        return;
      }

      // Only request local notification permissions
      await this.requestLocalPermissionsSafely();

      // Setup local notification listeners only
      if (this.hasPermissions) {
        await this.setupLocalNotificationListeners();
      }

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
      this.isInitialized = true; // Mark as initialized even if failed to prevent retry loops
      this.hasPermissions = false;
    } finally {
      this.initializationPromise = null;
    }
  }

  private async requestLocalPermissionsSafely() {
    try {
      // Check if LocalNotifications is available
      if (!LocalNotifications) {
        console.warn('LocalNotifications plugin not available');
        this.hasPermissions = false;
        return;
      }

      const permission = await LocalNotifications.requestPermissions();
      
      if (permission.display === 'granted') {
        console.log('Local notification permissions granted');
        this.hasPermissions = true;
      } else {
        console.log('Local notification permissions denied or not determined');
        this.hasPermissions = false;
      }
    } catch (permError) {
      console.error('Permission request failed:', permError);
      this.hasPermissions = false;
      
      // Try to handle specific error cases
      if (permError instanceof Error && permError.message && permError.message.includes('not implemented')) {
        console.warn('Notifications not implemented on this platform');
      }
    }
  }

  private async setupLocalNotificationListeners() {
    try {
      if (!LocalNotifications) {
        return;
      }

      // Listen for notification actions with error handling
      await LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        try {
          console.log('Notification action performed:', notification);
          this.handleNotificationAction(notification);
        } catch (error) {
          console.error('Error handling notification action:', error);
        }
      });

      // Listen for notification received
      await LocalNotifications.addListener('localNotificationReceived', (notification) => {
        try {
          console.log('Local notification received:', notification);
        } catch (error) {
          console.error('Error handling notification received:', error);
        }
      });
    } catch (error) {
      console.error('Failed to setup notification listeners:', error);
    }
  }

  async scheduleNotification(data: NotificationData) {
    try {
      await this.initialize();
      
      if (!this.hasPermissions) {
        console.warn('Cannot schedule notification: permissions not granted');
        return false;
      }

      if (!Capacitor.isNativePlatform()) {
        console.warn('Cannot schedule notification: not on native platform');
        return false;
      }

      if (!LocalNotifications) {
        console.warn('LocalNotifications plugin not available');
        return false;
      }

      const options: ScheduleOptions = {
        notifications: [{
          id: data.id,
          title: data.title,
          body: data.body,
          schedule: data.schedule,
          extra: data.extra || {},
          sound: 'default',
          attachments: [],
          actionTypeId: '',
          group: 'dailyflow'
        }]
      };

      await LocalNotifications.schedule(options);
      console.log('Notification scheduled:', data);
      return true;
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return false;
    }
  }

  async cancelNotification(id: number) {
    try {
      if (!this.hasPermissions || !Capacitor.isNativePlatform() || !LocalNotifications) {
        return false;
      }
      
      await LocalNotifications.cancel({ notifications: [{ id }] });
      console.log('Notification cancelled:', id);
      return true;
    } catch (error) {
      console.error('Failed to cancel notification:', error);
      return false;
    }
  }

  async cancelAllNotifications() {
    try {
      if (!this.hasPermissions || !Capacitor.isNativePlatform() || !LocalNotifications) {
        return false;
      }
      
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({ 
          notifications: pending.notifications.map(n => ({ id: n.id }))
        });
      }
      console.log('All notifications cancelled');
      return true;
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
      return false;
    }
  }

  async getPendingNotifications() {
    try {
      if (!this.hasPermissions || !Capacitor.isNativePlatform() || !LocalNotifications) {
        return [];
      }
      
      const result = await LocalNotifications.getPending();
      return result.notifications || [];
    } catch (error) {
      console.error('Failed to get pending notifications:', error);
      return [];
    }
  }

  private handleNotificationAction(notification: any) {
    try {
      // Handle notification tap/action safely
      const { actionId, notification: notificationData } = notification;
      
      if (actionId === 'tap') {
        // User tapped the notification
        if (notificationData?.extra?.taskId) {
          // Navigate to specific task
          const url = `/tasks?highlight=${notificationData.extra.taskId}`;
          if (typeof window !== 'undefined' && window.location) {
            window.location.href = url;
          }
        } else {
          // Navigate to home
          if (typeof window !== 'undefined' && window.location) {
            window.location.href = '/';
          }
        }
      }
    } catch (error) {
      console.error('Error in handleNotificationAction:', error);
    }
  }

  // Check if notifications are supported and available
  isSupported(): boolean {
    return Capacitor.isNativePlatform() && !!LocalNotifications;
  }

  // Get current permission status
  getPermissionStatus(): boolean {
    return this.hasPermissions;
  }

  // ADHD-friendly notification helpers
  async scheduleTaskReminder(taskId: string, title: string, reminderTime: Date) {
    try {
      const id = this.generateSafeId(taskId);
      
      return await this.scheduleNotification({
        id,
        title: '🎯 Gentle Reminder',
        body: `Time to work on: ${title}`,
        schedule: {
          at: reminderTime
        },
        extra: { taskId, type: 'task_reminder' }
      });
    } catch (error) {
      console.error('Failed to schedule task reminder:', error);
      return false;
    }
  }

  async scheduleBreakReminder(intervalMinutes: number = 30) {
    try {
      const now = new Date();
      const breakTime = new Date(now.getTime() + intervalMinutes * 60000);
      
      return await this.scheduleNotification({
        id: this.generateSafeId('break_reminder'),
        title: '☕ Break Time!',
        body: 'Your ADHD brain needs a rest. Take a 5-10 minute break!',
        schedule: {
          at: breakTime,
          repeats: true,
          every: 'hour'
        },
        extra: { type: 'break_reminder' }
      });
    } catch (error) {
      console.error('Failed to schedule break reminder:', error);
      return false;
    }
  }

  async scheduleMotivationalNotification() {
    try {
      const motivationalMessages = [
        'You\'re doing amazing! Every small step counts 🌟',
        'Your ADHD brain is unique and powerful 💪',
        'Progress, not perfection. You\'ve got this! ✨',
        'Take a moment to celebrate what you\'ve accomplished today 🎉',
        'Remember: different brains, amazing results! 🧠'
      ];

      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0); // 9 AM tomorrow

      return await this.scheduleNotification({
        id: this.generateSafeId('motivation'),
        title: '💫 Daily Motivation',
        body: randomMessage,
        schedule: {
          at: tomorrow,
          repeats: true,
          every: 'day'
        },
        extra: { type: 'motivation' }
      });
    } catch (error) {
      console.error('Failed to schedule motivational notification:', error);
      return false;
    }
  }

  private generateSafeId(base: string): number {
    try {
      // Generate a safe numeric ID from string
      let hash = 0;
      for (let i = 0; i < base.length; i++) {
        const char = base.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      // Ensure positive number and within safe range
      return Math.abs(hash) % 2147483647;
    } catch (error) {
      // Fallback to timestamp-based ID
      return Date.now() % 2147483647;
    }
  }
}

export const notificationService = new NotificationService();