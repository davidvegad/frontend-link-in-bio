// Service Worker para Push Notifications
const CACHE_NAME = 'push-notifications-v1';
const urlsToCache = [
  '/',
  '/icon-192x192.png',
  '/badge-72x72.png',
  '/welcome-icon.png',
  '/promo-icon.png',
  '/cart-icon.png',
  '/reminder-icon.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Push event - Handle incoming push notifications
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');

  let notificationData = {
    title: 'Nueva Notificación',
    body: 'Tienes una nueva notificación',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: 'default',
    data: {},
    actions: [],
    requireInteraction: false
  };

  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        ...data
      };
    } catch (error) {
      console.error('[Service Worker] Error parsing push data:', error);
      notificationData.body = event.data.text();
    }
  }

  // Show notification
  const notificationPromise = self.registration.showNotification(
    notificationData.title,
    {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      data: notificationData.data,
      actions: notificationData.actions,
      requireInteraction: notificationData.requireInteraction,
      image: notificationData.image,
      timestamp: Date.now(),
      vibrate: [200, 100, 200],
      renotify: true
    }
  );

  event.waitUntil(notificationPromise);
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  const notification = event.notification;
  const data = notification.data || {};
  const action = event.action;

  // Handle different actions
  if (action) {
    handleNotificationAction(action, data, event);
  } else {
    // Default click action
    handleNotificationClick(data, event);
  }
});

// Notification close event
self.addEventListener('notificationclose', (event) => {
  console.log('[Service Worker] Notification close Received.');
  
  const notification = event.notification;
  const data = notification.data || {};
  
  // Track notification dismiss
  if (data.notificationId && data.sessionId) {
    trackNotificationDismiss(data.notificationId, data.sessionId);
  }
});

// Handle notification action clicks
function handleNotificationAction(action, data, event) {
  console.log('[Service Worker] Notification action:', action);

  switch (action) {
    case 'view':
    case 'view_cart':
    case 'view_offer':
    case 'explore':
      // Open the main app
      event.waitUntil(
        clients.openWindow(getActionUrl(action, data))
      );
      break;
      
    case 'settings':
      // Open settings
      event.waitUntil(
        clients.openWindow('/settings')
      );
      break;
      
    case 'dismiss':
    case 'close':
      // Just close the notification (already handled above)
      break;
      
    default:
      // Default action
      event.waitUntil(
        clients.openWindow('/')
      );
  }

  // Track action
  if (data.notificationId && data.sessionId) {
    trackNotificationClick(data.notificationId, data.sessionId, action);
  }
}

// Handle default notification click
function handleNotificationClick(data, event) {
  console.log('[Service Worker] Default notification click');
  
  let url = '/';
  
  // Determine URL based on notification type
  if (data.type) {
    switch (data.type) {
      case 'abandoned_cart':
        url = '/cart';
        break;
      case 'promotion':
        url = '/offers';
        break;
      case 'welcome':
        url = '/welcome';
        break;
      default:
        url = '/';
    }
  }
  
  // Check if the app is already open
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // If app is already open, focus it
      for (const client of clientList) {
        if (client.url === self.location.origin + url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If app is not open, open it
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );

  // Track click
  if (data.notificationId && data.sessionId) {
    trackNotificationClick(data.notificationId, data.sessionId);
  }
}

// Get URL for specific actions
function getActionUrl(action, data) {
  switch (action) {
    case 'view_cart':
      return '/cart';
    case 'view_offer':
      return data.offer ? `/offers/${data.offer.id}` : '/offers';
    case 'explore':
      return '/explore';
    case 'settings':
      return '/settings';
    default:
      return '/';
  }
}

// Track notification click
function trackNotificationClick(notificationId, sessionId, action = 'default') {
  console.log('[Service Worker] Tracking notification click:', { notificationId, sessionId, action });
  
  // Send tracking data to analytics
  if (self.gtag) {
    self.gtag('event', 'notification_click', {
      event_category: 'engagement',
      event_label: notificationId,
      session_id: sessionId,
      action: action
    });
  }
  
  // Store in local storage for the app to pick up
  try {
    const trackingData = {
      type: 'notification_click',
      notificationId,
      sessionId,
      action,
      timestamp: Date.now()
    };
    
    // Use IndexedDB or postMessage to communicate with the app
    broadcastTrackingData(trackingData);
  } catch (error) {
    console.error('[Service Worker] Error tracking notification click:', error);
  }
}

// Track notification dismiss
function trackNotificationDismiss(notificationId, sessionId) {
  console.log('[Service Worker] Tracking notification dismiss:', { notificationId, sessionId });
  
  // Send tracking data to analytics
  if (self.gtag) {
    self.gtag('event', 'notification_dismiss', {
      event_category: 'engagement',
      event_label: notificationId,
      session_id: sessionId
    });
  }
  
  // Store tracking data
  try {
    const trackingData = {
      type: 'notification_dismiss',
      notificationId,
      sessionId,
      timestamp: Date.now()
    };
    
    broadcastTrackingData(trackingData);
  } catch (error) {
    console.error('[Service Worker] Error tracking notification dismiss:', error);
  }
}

// Broadcast tracking data to all clients
function broadcastTrackingData(data) {
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'NOTIFICATION_TRACKING',
        data: data
      });
    });
  });
}

// Background sync for offline notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('[Service Worker] Background sync');
  
  // Handle any pending notifications or analytics
  try {
    // Get stored data that needs to be synced
    const pendingData = await getStoredPendingData();
    
    if (pendingData && pendingData.length > 0) {
      // Send pending analytics data
      await sendPendingAnalytics(pendingData);
      
      // Clear sent data
      await clearStoredPendingData();
    }
  } catch (error) {
    console.error('[Service Worker] Background sync error:', error);
  }
}

// Storage helpers for offline data
async function getStoredPendingData() {
  // Implementation would depend on your storage strategy
  // This is a simplified example
  return [];
}

async function sendPendingAnalytics(data) {
  // Implementation would send data to your analytics endpoint
  console.log('[Service Worker] Sending pending analytics:', data);
}

async function clearStoredPendingData() {
  // Implementation would clear the stored data
  console.log('[Service Worker] Clearing stored pending data');
}

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup-notifications') {
    event.waitUntil(cleanupOldNotifications());
  }
});

async function cleanupOldNotifications() {
  console.log('[Service Worker] Cleaning up old notifications');
  
  try {
    const notifications = await self.registration.getNotifications();
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    notifications.forEach((notification) => {
      if (notification.timestamp && (now - notification.timestamp) > maxAge) {
        notification.close();
      }
    });
  } catch (error) {
    console.error('[Service Worker] Error cleaning up notifications:', error);
  }
}

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  console.log('[Service Worker] Message received:', event.data);
  
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(
        caches.delete(CACHE_NAME).then(() => {
          event.ports[0].postMessage({ success: true });
        })
      );
      break;
      
    default:
      console.log('[Service Worker] Unknown message type:', type);
  }
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

console.log('[Service Worker] Loaded and ready for push notifications');