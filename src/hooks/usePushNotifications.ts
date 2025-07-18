'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  getPushNotificationService, 
  PushSubscription, 
  PushNotification,
  NotificationPreferences
} from '@/lib/push-notifications';

export function usePushNotifications() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const getService = () => getPushNotificationService();

  // Check if push notifications are supported
  useEffect(() => {
    const checkSupport = () => {
      const supported = 
        typeof window !== 'undefined' && 
        'serviceWorker' in navigator && 
        'PushManager' in window && 
        'Notification' in window;
      
      setIsSupported(supported);
      
      if (supported) {
        const service = getService();
        if (service) {
          setPermission(service.getPermissionStatus());
        }
      }
      
      setIsLoading(false);
    };

    checkSupport();
  }, []);

  // Subscribe to push notifications
  const subscribe = useCallback(async (
    userId?: string, 
    preferences?: Partial<NotificationPreferences>
  ) => {
    const service = getService();
    if (!isSupported || !service) {
      setError('Push notifications are not supported in this browser');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newSubscription = await service.subscribe(userId, preferences);
      setSubscription(newSubscription);
      setPermission('granted');
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to subscribe';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    const service = getService();
    if (!subscription || !service) return;

    try {
      await service.unsubscribe(subscription.sessionId);
      setSubscription(null);
      setPermission('default');
    } catch (error) {
      setError('Failed to unsubscribe from notifications');
    }
  }, [subscription]);

  // Update notification preferences
  const updatePreferences = useCallback((preferences: Partial<NotificationPreferences>) => {
    const service = getService();
    if (!subscription || !service) return;

    service.updatePreferences(subscription.sessionId, preferences);
    
    // Update local state
    setSubscription(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    } : null);
  }, [subscription]);

  // Send a test notification
  const sendTestNotification = useCallback(async () => {
    const service = getService();
    if (!subscription || !service) return;

    try {
      await service.sendToSubscription(subscription.sessionId, {
        title: '🎉 Notificación de Prueba',
        body: 'Este es un mensaje de prueba para verificar que las notificaciones funcionan correctamente.',
        icon: '/icon-192x192.png',
        actions: [
          { action: 'view', title: 'Ver' },
          { action: 'dismiss', title: 'Cerrar' }
        ]
      });
    } catch (error) {
      setError('Failed to send test notification');
    }
  }, [subscription]);

  // Track notification interactions
  const trackNotificationClick = useCallback((notificationId: string) => {
    if (subscription) {
      pushNotificationService.trackNotificationClick(notificationId, subscription.sessionId);
    }
  }, [subscription]);

  const trackNotificationDismiss = useCallback((notificationId: string) => {
    if (subscription) {
      pushNotificationService.trackNotificationDismiss(notificationId, subscription.sessionId);
    }
  }, [subscription]);

  // Send automated notifications
  const sendAbandonedCartNotification = useCallback(async (cartItems: any[]) => {
    if (!subscription) return;

    try {
      await pushNotificationService.sendAbandonedCartNotification(subscription.sessionId, cartItems);
    } catch (error) {
      setError('Failed to send abandoned cart notification');
    }
  }, [subscription]);

  const sendPromotionalNotification = useCallback(async (offer: any) => {
    if (!subscription) return;

    try {
      await pushNotificationService.sendPromotionalNotification(subscription.sessionId, offer);
    } catch (error) {
      setError('Failed to send promotional notification');
    }
  }, [subscription]);

  // Get analytics
  const getAnalytics = useCallback(() => {
    return pushNotificationService.getAnalytics();
  }, []);

  return {
    // State
    subscription,
    isSupported,
    permission,
    isLoading,
    error,
    
    // Actions
    subscribe,
    unsubscribe,
    updatePreferences,
    sendTestNotification,
    
    // Tracking
    trackNotificationClick,
    trackNotificationDismiss,
    
    // Automated notifications
    sendAbandonedCartNotification,
    sendPromotionalNotification,
    
    // Analytics
    getAnalytics,
    
    // Status checks
    isSubscribed: !!subscription && subscription.isActive,
    canSubscribe: isSupported && permission !== 'denied'
  };
}

// Hook for notification preferences management
export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    enabled: true,
    frequency: 'immediate',
    categories: {
      marketing: true,
      updates: true,
      reminders: true,
      promotions: true,
      personalized: true
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const updatePreference = useCallback((key: string, value: any) => {
    setPreferences(prev => {
      if (key.includes('.')) {
        const [parent, child] = key.split('.');
        const parentValue = prev[parent as keyof NotificationPreferences];
        return {
          ...prev,
          [parent]: {
            ...(typeof parentValue === 'object' ? parentValue : {}),
            [child]: value
          }
        };
      }
      return {
        ...prev,
        [key]: value
      };
    });
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences({
      enabled: true,
      frequency: 'immediate',
      categories: {
        marketing: true,
        updates: true,
        reminders: true,
        promotions: true,
        personalized: true
      },
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '08:00'
      }
    });
  }, []);

  return {
    preferences,
    updatePreference,
    resetPreferences
  };
}

// Hook for managing notification campaigns
export function useNotificationCampaigns() {
  const [campaigns, setCampaigns] = useState(pushNotificationService.getCampaigns());
  const [templates, setTemplates] = useState(pushNotificationService.getTemplates());

  const refreshData = useCallback(() => {
    setCampaigns(pushNotificationService.getCampaigns());
    setTemplates(pushNotificationService.getTemplates());
  }, []);

  const executeCampaign = useCallback(async (campaignId: string) => {
    try {
      await pushNotificationService.executeCampaign(campaignId);
      refreshData();
      return true;
    } catch (error) {
      return false;
    }
  }, [refreshData]);

  const sendFromTemplate = useCallback(async (
    templateId: string, 
    sessionId: string, 
    variables: Record<string, string> = {}
  ) => {
    try {
      await pushNotificationService.sendFromTemplate(templateId, sessionId, variables);
      return true;
    } catch (error) {
      return false;
    }
  }, []);

  return {
    campaigns,
    templates,
    refreshData,
    executeCampaign,
    sendFromTemplate
  };
}