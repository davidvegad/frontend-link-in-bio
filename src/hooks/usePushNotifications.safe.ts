'use client';

import { useState, useEffect, useCallback } from 'react';

// Simplified version that avoids SSR issues
export function usePushNotifications() {
  const [subscription, setSubscription] = useState<any>(null);
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if push notifications are supported
  useEffect(() => {
    const checkSupport = () => {
      const supported = 
        typeof window !== 'undefined' && 
        'serviceWorker' in navigator && 
        'PushManager' in window && 
        'Notification' in window;
      
      setIsSupported(supported);
      setIsLoading(false);
    };

    checkSupport();
  }, []);

  // Simple subscribe function
  const subscribe = useCallback(async () => {
    if (!isSupported) {
      setError('Push notifications are not supported in this browser');
      return false;
    }

    try {
      // Simple permission request
      const permission = await Notification.requestPermission();
      setPermission(permission);
      
      if (permission === 'granted') {
        setSubscription({ id: Date.now(), isActive: true });
        return true;
      }
      return false;
    } catch (error) {
      setError('Failed to subscribe to notifications');
      return false;
    }
  }, [isSupported]);

  // Simple unsubscribe function
  const unsubscribe = useCallback(async () => {
    setSubscription(null);
    setPermission('default');
  }, []);

  // Simple test notification
  const sendTestNotification = useCallback(async () => {
    if (!subscription || permission !== 'granted') return;

    try {
      new Notification('🎉 Test Notification', {
        body: 'This is a test notification to verify everything works correctly.',
        icon: '/icon-192x192.png'
      });
    } catch (error) {
      setError('Failed to send test notification');
    }
  }, [subscription, permission]);

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
    sendTestNotification,
    
    // Status checks
    isSubscribed: !!subscription && subscription.isActive,
    canSubscribe: isSupported && permission !== 'denied'
  };
}

// Simplified preferences hook
export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState({
    enabled: true,
    frequency: 'immediate',
    categories: {
      marketing: true,
      updates: true,
      reminders: true,
      promotions: true,
      personalized: true
    }
  });

  const updatePreference = useCallback((key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  return {
    preferences,
    updatePreference
  };
}

// Simplified campaigns hook
export function useNotificationCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);

  return {
    campaigns,
    templates,
    refreshData: () => {},
    executeCampaign: async () => true,
    sendFromTemplate: async () => true
  };
}