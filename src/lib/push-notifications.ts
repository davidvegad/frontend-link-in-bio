// Extended notification options interface
interface ExtendedNotificationOptions extends NotificationOptions {
  image?: string;
  actions?: NotificationAction[];
  requireInteraction?: boolean;
  timestamp?: number;
}

// Push Notifications System
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  badge?: string;
  tag?: string;
  data?: Record<string, any>;
  actions?: NotificationAction[];
  requireInteraction?: boolean;
  timestamp: Date;
  expiresAt?: Date;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface PushSubscription {
  userId?: string;
  sessionId: string;
  subscription: PushSubscriptionJSON;
  preferences: NotificationPreferences;
  isActive: boolean;
  subscribedAt: Date;
  lastNotifiedAt?: Date;
  browserInfo: {
    userAgent: string;
    language: string;
    platform: string;
  };
}

export interface NotificationPreferences {
  enabled: boolean;
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
  categories: {
    marketing: boolean;
    updates: boolean;
    reminders: boolean;
    promotions: boolean;
    personalized: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
  };
}

export interface NotificationCampaign {
  id: string;
  name: string;
  title: string;
  body: string;
  icon?: string;
  image?: string;
  targetAudience: {
    segments: string[];
    filters: Record<string, any>;
  };
  schedule: {
    type: 'immediate' | 'scheduled' | 'recurring';
    scheduledAt?: Date;
    recurring?: {
      frequency: 'daily' | 'weekly' | 'monthly';
      days?: number[]; // 0-6 for weekly, 1-31 for monthly
      time: string; // HH:MM format
    };
  };
  actions?: NotificationAction[];
  analytics: {
    sent: number;
    delivered: number;
    clicked: number;
    dismissed: number;
    conversionRate: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  category: 'welcome' | 'abandoned_cart' | 'promotional' | 'update' | 'reminder' | 'custom';
  title: string;
  body: string;
  icon?: string;
  image?: string;
  actions?: NotificationAction[];
  variables: string[]; // Variables like {{name}}, {{product}}
  isActive: boolean;
  createdAt: Date;
}

// Push Notifications Service
export class PushNotificationService {
  private subscriptions: Map<string, PushSubscription> = new Map();
  private campaigns: Map<string, NotificationCampaign> = new Map();
  private templates: Map<string, NotificationTemplate> = new Map();
  private notificationHistory: PushNotification[] = [];
  private registration: ServiceWorkerRegistration | null = null;

  constructor() {
    this.loadFromStorage();
    this.initializeServiceWorker();
    this.initializeDefaultTemplates();
  }

  // Service Worker Registration
  private async initializeServiceWorker() {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Permission Management
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  getPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  }

  // Subscription Management
  async subscribe(userId?: string, preferences?: Partial<NotificationPreferences>): Promise<PushSubscription> {
    const permission = await this.requestPermission();
    
    if (permission !== 'granted') {
      throw new Error('Notification permission not granted');
    }

    if (!this.registration) {
      throw new Error('Service Worker not registered');
    }

    const subscription = await this.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.getVapidPublicKey()
    });

    const pushSubscription: PushSubscription = {
      userId,
      sessionId: this.generateSessionId(),
      subscription: subscription.toJSON(),
      preferences: {
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
        },
        ...preferences
      },
      isActive: true,
      subscribedAt: new Date(),
      browserInfo: {
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        language: typeof window !== 'undefined' ? navigator.language : 'en',
        platform: typeof window !== 'undefined' ? navigator.platform : ''
      }
    };

    this.subscriptions.set(pushSubscription.sessionId, pushSubscription);
    this.saveToStorage();
    
    // Send welcome notification
    await this.sendWelcomeNotification(pushSubscription.sessionId);
    
    return pushSubscription;
  }

  async unsubscribe(sessionId: string): Promise<void> {
    const subscription = this.subscriptions.get(sessionId);
    if (!subscription) return;

    subscription.isActive = false;
    this.subscriptions.set(sessionId, subscription);
    this.saveToStorage();
  }

  updatePreferences(sessionId: string, preferences: Partial<NotificationPreferences>): void {
    const subscription = this.subscriptions.get(sessionId);
    if (!subscription) return;

    subscription.preferences = { ...subscription.preferences, ...preferences };
    this.subscriptions.set(sessionId, subscription);
    this.saveToStorage();
  }

  // Notification Sending
  async sendNotification(notification: Omit<PushNotification, 'id' | 'timestamp'>): Promise<void> {
    const fullNotification: PushNotification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date()
    };

    // Store in history
    this.notificationHistory.push(fullNotification);

    // Send to browser
    if (this.registration) {
      const notificationOptions: ExtendedNotificationOptions = {
        body: fullNotification.body,
        icon: fullNotification.icon || '/icon-192x192.png',
        badge: fullNotification.badge || '/badge-72x72.png',
        tag: fullNotification.tag,
        data: fullNotification.data,
        actions: fullNotification.actions,
        requireInteraction: fullNotification.requireInteraction,
        timestamp: fullNotification.timestamp.getTime(),
        image: fullNotification.image
      };
      
      await this.registration.showNotification(fullNotification.title, notificationOptions);
    }

    this.saveToStorage();
  }

  async sendToSubscription(sessionId: string, notification: Omit<PushNotification, 'id' | 'timestamp'>): Promise<void> {
    const subscription = this.subscriptions.get(sessionId);
    if (!subscription || !subscription.isActive) return;

    // Check quiet hours
    if (this.isQuietHour(subscription.preferences.quietHours)) {
      return;
    }

    // Check frequency limits
    if (!this.shouldSendBasedOnFrequency(subscription)) {
      return;
    }

    await this.sendNotification(notification);
    
    // Update last notified timestamp
    subscription.lastNotifiedAt = new Date();
    this.subscriptions.set(sessionId, subscription);
    this.saveToStorage();
  }

  async sendToSegment(segmentId: string, notification: Omit<PushNotification, 'id' | 'timestamp'>): Promise<void> {
    const targetSubscriptions = this.getSubscriptionsBySegment(segmentId);
    
    for (const subscription of targetSubscriptions) {
      await this.sendToSubscription(subscription.sessionId, notification);
    }
  }

  async sendBulkNotification(
    targets: string[], 
    notification: Omit<PushNotification, 'id' | 'timestamp'>
  ): Promise<void> {
    for (const sessionId of targets) {
      await this.sendToSubscription(sessionId, notification);
    }
  }

  // Template Management
  createTemplate(templateData: Omit<NotificationTemplate, 'id' | 'createdAt'>): NotificationTemplate {
    const template: NotificationTemplate = {
      ...templateData,
      id: this.generateId(),
      createdAt: new Date()
    };

    this.templates.set(template.id, template);
    this.saveToStorage();
    return template;
  }

  async sendFromTemplate(
    templateId: string, 
    sessionId: string, 
    variables: Record<string, string> = {}
  ): Promise<void> {
    const template = this.templates.get(templateId);
    if (!template || !template.isActive) return;

    const notification = {
      title: this.replaceVariables(template.title, variables),
      body: this.replaceVariables(template.body, variables),
      icon: template.icon,
      image: template.image,
      actions: template.actions,
      data: { templateId, variables }
    };

    await this.sendToSubscription(sessionId, notification);
  }

  // Campaign Management
  createCampaign(campaignData: Omit<NotificationCampaign, 'id' | 'analytics' | 'createdAt' | 'updatedAt'>): NotificationCampaign {
    const campaign: NotificationCampaign = {
      ...campaignData,
      id: this.generateId(),
      analytics: {
        sent: 0,
        delivered: 0,
        clicked: 0,
        dismissed: 0,
        conversionRate: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.campaigns.set(campaign.id, campaign);
    this.saveToStorage();
    return campaign;
  }

  async executeCampaign(campaignId: string): Promise<void> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign || !campaign.isActive) return;

    const targetSubscriptions = this.getSubscriptionsByFilters(campaign.targetAudience);
    
    for (const subscription of targetSubscriptions) {
      const notification = {
        title: campaign.title,
        body: campaign.body,
        icon: campaign.icon,
        image: campaign.image,
        actions: campaign.actions,
        data: { campaignId }
      };

      await this.sendToSubscription(subscription.sessionId, notification);
      campaign.analytics.sent++;
    }

    campaign.updatedAt = new Date();
    this.campaigns.set(campaignId, campaign);
    this.saveToStorage();
  }

  // Analytics
  trackNotificationClick(notificationId: string, sessionId: string): void {
    // Track click event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'notification_click', {
        event_category: 'engagement',
        event_label: notificationId,
        session_id: sessionId
      });
    }
  }

  trackNotificationDismiss(notificationId: string, sessionId: string): void {
    // Track dismiss event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'notification_dismiss', {
        event_category: 'engagement',
        event_label: notificationId,
        session_id: sessionId
      });
    }
  }

  // Automated Notifications
  async sendAbandonedCartNotification(sessionId: string, cartItems: any[]): Promise<void> {
    const notification = {
      title: '🛒 ¡No olvides tu carrito!',
      body: `Tienes ${cartItems.length} artículo${cartItems.length > 1 ? 's' : ''} esperándote`,
      icon: '/cart-icon.png',
      actions: [
        { action: 'view_cart', title: 'Ver Carrito' },
        { action: 'dismiss', title: 'Cerrar' }
      ],
      data: { type: 'abandoned_cart', cartItems }
    };

    await this.sendToSubscription(sessionId, notification);
  }

  async sendPromotionalNotification(sessionId: string, offer: any): Promise<void> {
    const notification = {
      title: '🎉 ¡Oferta especial para ti!',
      body: `${offer.discount}% de descuento - Solo por tiempo limitado`,
      icon: '/promo-icon.png',
      image: offer.image,
      actions: [
        { action: 'view_offer', title: 'Ver Oferta' },
        { action: 'dismiss', title: 'Quizás después' }
      ],
      data: { type: 'promotion', offer }
    };

    await this.sendToSubscription(sessionId, notification);
  }

  async sendWelcomeNotification(sessionId: string): Promise<void> {
    const notification = {
      title: '🎉 ¡Bienvenido!',
      body: 'Gracias por activar las notificaciones. Te mantendremos al día con las mejores ofertas.',
      icon: '/welcome-icon.png',
      actions: [
        { action: 'explore', title: 'Explorar' },
        { action: 'settings', title: 'Configurar' }
      ],
      data: { type: 'welcome' }
    };

    await this.sendToSubscription(sessionId, notification);
  }

  // Utility Methods
  private getVapidPublicKey(): string {
    // In production, this should come from environment variables
    return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'YOUR_VAPID_PUBLIC_KEY';
  }

  private generateId(): string {
    return `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private isQuietHour(quietHours: NotificationPreferences['quietHours']): boolean {
    if (!quietHours.enabled) return false;

    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    return currentTime >= quietHours.start || currentTime <= quietHours.end;
  }

  private shouldSendBasedOnFrequency(subscription: PushSubscription): boolean {
    if (!subscription.lastNotifiedAt) return true;

    const now = new Date();
    const timeDiff = now.getTime() - subscription.lastNotifiedAt.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    switch (subscription.preferences.frequency) {
      case 'immediate':
        return true;
      case 'daily':
        return hoursDiff >= 24;
      case 'weekly':
        return hoursDiff >= 168; // 7 days
      case 'never':
        return false;
      default:
        return true;
    }
  }

  private getSubscriptionsBySegment(segmentId: string): PushSubscription[] {
    // Implementation would depend on your segmentation logic
    return Array.from(this.subscriptions.values()).filter(sub => sub.isActive);
  }

  private getSubscriptionsByFilters(targetAudience: NotificationCampaign['targetAudience']): PushSubscription[] {
    return Array.from(this.subscriptions.values()).filter(subscription => {
      if (!subscription.isActive) return false;
      
      // Apply filters based on target audience criteria
      // This is a simplified implementation
      return true;
    });
  }

  private replaceVariables(text: string, variables: Record<string, string>): string {
    let result = text;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      result = result.replace(regex, value);
    });
    return result;
  }

  private initializeDefaultTemplates(): void {
    if (this.templates.size === 0) {
      // Welcome template
      this.createTemplate({
        name: 'Bienvenida',
        category: 'welcome',
        title: '🎉 ¡Bienvenido {{name}}!',
        body: 'Gracias por unirte. Mantente al día con nuestras actualizaciones.',
        icon: '/welcome-icon.png',
        variables: ['name'],
        isActive: true
      });

      // Promotional template
      this.createTemplate({
        name: 'Oferta Especial',
        category: 'promotional',
        title: '🔥 ¡Oferta limitada!',
        body: '{{discount}}% de descuento en {{product}} - Solo hoy',
        icon: '/promo-icon.png',
        variables: ['discount', 'product'],
        isActive: true
      });

      // Reminder template
      this.createTemplate({
        name: 'Recordatorio',
        category: 'reminder',
        title: '⏰ Recordatorio',
        body: 'No olvides {{action}}',
        icon: '/reminder-icon.png',
        variables: ['action'],
        isActive: true
      });
    }
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('push_subscriptions', JSON.stringify(Array.from(this.subscriptions.entries())));
      localStorage.setItem('push_campaigns', JSON.stringify(Array.from(this.campaigns.entries())));
      localStorage.setItem('push_templates', JSON.stringify(Array.from(this.templates.entries())));
      localStorage.setItem('push_history', JSON.stringify(this.notificationHistory.slice(-100))); // Keep last 100
    }
  }

  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const subscriptions = localStorage.getItem('push_subscriptions');
        if (subscriptions) {
          this.subscriptions = new Map(JSON.parse(subscriptions));
        }

        const campaigns = localStorage.getItem('push_campaigns');
        if (campaigns) {
          this.campaigns = new Map(JSON.parse(campaigns));
        }

        const templates = localStorage.getItem('push_templates');
        if (templates) {
          this.templates = new Map(JSON.parse(templates));
        }

        const history = localStorage.getItem('push_history');
        if (history) {
          this.notificationHistory = JSON.parse(history);
        }
      } catch (error) {
        console.error('Failed to load push notification data from storage:', error);
      }
    }
  }

  // Public API methods
  getSubscriptions(): PushSubscription[] {
    return Array.from(this.subscriptions.values());
  }

  getCampaigns(): NotificationCampaign[] {
    return Array.from(this.campaigns.values());
  }

  getTemplates(): NotificationTemplate[] {
    return Array.from(this.templates.values());
  }

  getNotificationHistory(): PushNotification[] {
    return this.notificationHistory;
  }

  getAnalytics(): any {
    const totalSent = this.notificationHistory.length;
    const campaigns = Array.from(this.campaigns.values());
    const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.analytics.clicked, 0);
    
    return {
      totalSubscriptions: this.subscriptions.size,
      activeSubscriptions: Array.from(this.subscriptions.values()).filter(sub => sub.isActive).length,
      totalSent,
      totalClicks,
      clickRate: totalSent > 0 ? (totalClicks / totalSent) * 100 : 0,
      campaignCount: campaigns.length,
      templateCount: this.templates.size
    };
  }
}

// Singleton instance - lazy initialization
let _pushNotificationService: PushNotificationService | null = null;

export const getPushNotificationService = (): PushNotificationService | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  if (!_pushNotificationService) {
    _pushNotificationService = new PushNotificationService();
  }
  
  return _pushNotificationService;
};

// For backward compatibility
export const pushNotificationService = getPushNotificationService();