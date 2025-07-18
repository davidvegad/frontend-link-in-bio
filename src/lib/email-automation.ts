// Email Marketing Automation System
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  htmlContent: string;
  textContent: string;
  variables: string[]; // Variables like {{firstName}}, {{company}}
  category: 'welcome' | 'nurturing' | 'promotional' | 'transactional' | 'reactivation';
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailCampaign {
  id: string;
  name: string;
  description: string;
  templateId: string;
  audienceSegments: string[];
  scheduledAt?: Date;
  sentAt?: Date;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  type: 'one_time' | 'recurring' | 'automated';
  recurringConfig?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    dayOfWeek?: number;
    dayOfMonth?: number;
    endDate?: Date;
  };
  automationConfig?: {
    trigger: EmailTrigger;
    delay: number; // minutes
    conditions?: EmailCondition[];
  };
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    bounced: number;
    complained: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailTrigger {
  type: 'signup' | 'page_visit' | 'download' | 'inactivity' | 'purchase' | 'birthday' | 'custom';
  config: {
    eventName?: string;
    pagePath?: string;
    days?: number; // for inactivity trigger
    customConditions?: Record<string, any>;
  };
}

export interface EmailCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater_than' | 'less_than';
  value: string | number;
}

export interface EmailSequence {
  id: string;
  name: string;
  description: string;
  trigger: EmailTrigger;
  emails: SequenceEmail[];
  isActive: boolean;
  stats: {
    subscribers: number;
    completionRate: number;
    avgOpenRate: number;
    avgClickRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SequenceEmail {
  id: string;
  templateId: string;
  delay: number; // hours after previous email or trigger
  conditions?: EmailCondition[];
  isActive: boolean;
}

export interface EmailSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced' | 'complained';
  segments: string[];
  customFields: Record<string, any>;
  preferences: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'never';
    categories: string[];
  };
  subscribedAt: Date;
  lastEmailAt?: Date;
  tags: string[];
}

export interface EmailSegment {
  id: string;
  name: string;
  description: string;
  conditions: EmailCondition[];
  subscriberCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailAnalytics {
  campaignId: string;
  subscriberId: string;
  eventType: 'sent' | 'delivered' | 'opened' | 'clicked' | 'unsubscribed' | 'bounced' | 'complained';
  eventData?: {
    linkUrl?: string;
    userAgent?: string;
    ipAddress?: string;
    location?: string;
  };
  timestamp: Date;
}

// Email Automation Service
export class EmailAutomationService {
  private templates: Map<string, EmailTemplate> = new Map();
  private campaigns: Map<string, EmailCampaign> = new Map();
  private sequences: Map<string, EmailSequence> = new Map();
  private subscribers: Map<string, EmailSubscriber> = new Map();
  private segments: Map<string, EmailSegment> = new Map();
  private analytics: EmailAnalytics[] = [];

  constructor() {
    this.loadFromStorage();
    this.initializeDefaultTemplates();
  }

  // Template Management
  createTemplate(templateData: Partial<EmailTemplate>): EmailTemplate {
    const template: EmailTemplate = {
      id: this.generateId(),
      name: templateData.name || 'Nueva Plantilla',
      subject: templateData.subject || '',
      previewText: templateData.previewText || '',
      htmlContent: templateData.htmlContent || '',
      textContent: templateData.textContent || '',
      variables: this.extractVariables(templateData.htmlContent || ''),
      category: templateData.category || 'promotional',
      tags: templateData.tags || [],
      isActive: templateData.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.templates.set(template.id, template);
    this.saveToStorage();
    return template;
  }

  updateTemplate(templateId: string, updates: Partial<EmailTemplate>): EmailTemplate | null {
    const template = this.templates.get(templateId);
    if (!template) return null;

    const updatedTemplate = {
      ...template,
      ...updates,
      variables: updates.htmlContent ? this.extractVariables(updates.htmlContent) : template.variables,
      updatedAt: new Date()
    };

    this.templates.set(templateId, updatedTemplate);
    this.saveToStorage();
    return updatedTemplate;
  }

  getTemplate(templateId: string): EmailTemplate | null {
    return this.templates.get(templateId) || null;
  }

  getAllTemplates(): EmailTemplate[] {
    return Array.from(this.templates.values());
  }

  // Campaign Management
  createCampaign(campaignData: Partial<EmailCampaign>): EmailCampaign {
    const campaign: EmailCampaign = {
      id: this.generateId(),
      name: campaignData.name || 'Nueva Campaña',
      description: campaignData.description || '',
      templateId: campaignData.templateId || '',
      audienceSegments: campaignData.audienceSegments || [],
      scheduledAt: campaignData.scheduledAt,
      status: 'draft',
      type: campaignData.type || 'one_time',
      recurringConfig: campaignData.recurringConfig,
      automationConfig: campaignData.automationConfig,
      stats: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        unsubscribed: 0,
        bounced: 0,
        complained: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.campaigns.set(campaign.id, campaign);
    this.saveToStorage();
    return campaign;
  }

  async sendCampaign(campaignId: string): Promise<boolean> {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign || campaign.status !== 'draft') return false;

    const template = this.templates.get(campaign.templateId);
    if (!template) return false;

    // Get subscribers based on segments
    const subscribers = this.getSubscribersBySegments(campaign.audienceSegments);
    
    // Update campaign status
    campaign.status = 'sending';
    campaign.sentAt = new Date();
    this.campaigns.set(campaignId, campaign);

    // Send emails (in real implementation, this would use an email service)
    let sentCount = 0;
    for (const subscriber of subscribers) {
      if (await this.sendEmailToSubscriber(subscriber, template, campaign)) {
        sentCount++;
      }
    }

    // Update campaign stats
    campaign.stats.sent = sentCount;
    campaign.status = 'sent';
    this.campaigns.set(campaignId, campaign);
    this.saveToStorage();

    return true;
  }

  // Email Sequence Management
  createSequence(sequenceData: Partial<EmailSequence>): EmailSequence {
    const sequence: EmailSequence = {
      id: this.generateId(),
      name: sequenceData.name || 'Nueva Secuencia',
      description: sequenceData.description || '',
      trigger: sequenceData.trigger || {
        type: 'signup',
        config: {}
      },
      emails: sequenceData.emails || [],
      isActive: sequenceData.isActive ?? true,
      stats: {
        subscribers: 0,
        completionRate: 0,
        avgOpenRate: 0,
        avgClickRate: 0
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sequences.set(sequence.id, sequence);
    this.saveToStorage();
    return sequence;
  }

  async triggerSequence(sequenceId: string, subscriberId: string): Promise<boolean> {
    const sequence = this.sequences.get(sequenceId);
    const subscriber = this.subscribers.get(subscriberId);
    
    if (!sequence || !subscriber || !sequence.isActive) return false;

    // Schedule sequence emails
    for (let i = 0; i < sequence.emails.length; i++) {
      const sequenceEmail = sequence.emails[i];
      const template = this.templates.get(sequenceEmail.templateId);
      
      if (!template || !sequenceEmail.isActive) continue;

      // Check conditions
      if (sequenceEmail.conditions && !this.evaluateConditions(sequenceEmail.conditions, subscriber)) {
        continue;
      }

      // In real implementation, schedule email with delay
      setTimeout(() => {
        this.sendEmailToSubscriber(subscriber, template, null, sequenceId);
      }, sequenceEmail.delay * 60 * 60 * 1000); // Convert hours to milliseconds
    }

    return true;
  }

  // Subscriber Management
  addSubscriber(subscriberData: Partial<EmailSubscriber>): EmailSubscriber {
    const subscriber: EmailSubscriber = {
      id: this.generateId(),
      email: subscriberData.email || '',
      firstName: subscriberData.firstName,
      lastName: subscriberData.lastName,
      status: 'subscribed',
      segments: subscriberData.segments || [],
      customFields: subscriberData.customFields || {},
      preferences: subscriberData.preferences || {
        frequency: 'weekly',
        categories: []
      },
      subscribedAt: new Date(),
      tags: subscriberData.tags || []
    };

    this.subscribers.set(subscriber.id, subscriber);
    
    // Update segment counts
    this.updateSegmentCounts();
    
    // Trigger welcome sequences
    this.triggerWelcomeSequences(subscriber.id);
    
    this.saveToStorage();
    return subscriber;
  }

  unsubscribeSubscriber(subscriberId: string): boolean {
    const subscriber = this.subscribers.get(subscriberId);
    if (!subscriber) return false;

    subscriber.status = 'unsubscribed';
    this.subscribers.set(subscriberId, subscriber);
    this.saveToStorage();
    return true;
  }

  getSubscriberByEmail(email: string): EmailSubscriber | null {
    return Array.from(this.subscribers.values()).find(sub => sub.email === email) || null;
  }

  // Segment Management
  createSegment(segmentData: Partial<EmailSegment>): EmailSegment {
    const segment: EmailSegment = {
      id: this.generateId(),
      name: segmentData.name || 'Nuevo Segmento',
      description: segmentData.description || '',
      conditions: segmentData.conditions || [],
      subscriberCount: 0,
      isActive: segmentData.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.segments.set(segment.id, segment);
    this.updateSegmentCounts();
    this.saveToStorage();
    return segment;
  }

  getSubscribersBySegments(segmentIds: string[]): EmailSubscriber[] {
    if (segmentIds.length === 0) {
      return Array.from(this.subscribers.values()).filter(sub => sub.status === 'subscribed');
    }

    return Array.from(this.subscribers.values()).filter(subscriber => {
      if (subscriber.status !== 'subscribed') return false;
      
      return segmentIds.some(segmentId => {
        const segment = this.segments.get(segmentId);
        return segment && this.evaluateConditions(segment.conditions, subscriber);
      });
    });
  }

  // Analytics
  trackEmailEvent(
    campaignId: string | null,
    subscriberId: string,
    eventType: EmailAnalytics['eventType'],
    eventData?: EmailAnalytics['eventData']
  ) {
    const analytics: EmailAnalytics = {
      campaignId: campaignId || '',
      subscriberId,
      eventType,
      eventData,
      timestamp: new Date()
    };

    this.analytics.push(analytics);

    // Update campaign stats if applicable
    if (campaignId) {
      const campaign = this.campaigns.get(campaignId);
      if (campaign && eventType in campaign.stats) {
        (campaign.stats as any)[eventType]++;
        this.campaigns.set(campaignId, campaign);
      }
    }

    this.saveToStorage();
  }

  getEmailAnalytics(campaignId?: string): EmailAnalytics[] {
    if (campaignId) {
      return this.analytics.filter(a => a.campaignId === campaignId);
    }
    return this.analytics;
  }

  getCampaignStats(campaignId: string) {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign) return null;

    const openRate = campaign.stats.sent > 0 ? (campaign.stats.opened / campaign.stats.sent) * 100 : 0;
    const clickRate = campaign.stats.sent > 0 ? (campaign.stats.clicked / campaign.stats.sent) * 100 : 0;
    const unsubscribeRate = campaign.stats.sent > 0 ? (campaign.stats.unsubscribed / campaign.stats.sent) * 100 : 0;

    return {
      ...campaign.stats,
      openRate,
      clickRate,
      unsubscribeRate
    };
  }

  // Utility Methods
  private async sendEmailToSubscriber(
    subscriber: EmailSubscriber,
    template: EmailTemplate,
    campaign: EmailCampaign | null,
    sequenceId?: string
  ): Promise<boolean> {
    // Personalize email content
    const personalizedContent = this.personalizeContent(template.htmlContent, subscriber);
    const personalizedSubject = this.personalizeContent(template.subject, subscriber);

    // In real implementation, integrate with email service (SendGrid, Mailchimp, etc.)
    console.log('Sending email:', {
      to: subscriber.email,
      subject: personalizedSubject,
      content: personalizedContent,
      campaignId: campaign?.id,
      sequenceId
    });

    // Track send event
    this.trackEmailEvent(campaign?.id || null, subscriber.id, 'sent');

    // Update subscriber's last email timestamp
    subscriber.lastEmailAt = new Date();
    this.subscribers.set(subscriber.id, subscriber);

    return true;
  }

  private personalizeContent(content: string, subscriber: EmailSubscriber): string {
    let personalizedContent = content;
    
    // Replace variables
    personalizedContent = personalizedContent.replace(/\{\{firstName\}\}/g, subscriber.firstName || '');
    personalizedContent = personalizedContent.replace(/\{\{lastName\}\}/g, subscriber.lastName || '');
    personalizedContent = personalizedContent.replace(/\{\{email\}\}/g, subscriber.email);
    
    // Replace custom fields
    Object.entries(subscriber.customFields).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
      personalizedContent = personalizedContent.replace(regex, String(value));
    });

    return personalizedContent;
  }

  private extractVariables(content: string): string[] {
    const regex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    return variables;
  }

  private evaluateConditions(conditions: EmailCondition[], subscriber: EmailSubscriber): boolean {
    return conditions.every(condition => {
      const fieldValue = this.getFieldValue(condition.field, subscriber);
      
      switch (condition.operator) {
        case 'equals':
          return fieldValue === condition.value;
        case 'not_equals':
          return fieldValue !== condition.value;
        case 'contains':
          return String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'not_contains':
          return !String(fieldValue).toLowerCase().includes(String(condition.value).toLowerCase());
        case 'greater_than':
          return Number(fieldValue) > Number(condition.value);
        case 'less_than':
          return Number(fieldValue) < Number(condition.value);
        default:
          return false;
      }
    });
  }

  private getFieldValue(field: string, subscriber: EmailSubscriber): any {
    switch (field) {
      case 'email':
        return subscriber.email;
      case 'firstName':
        return subscriber.firstName;
      case 'lastName':
        return subscriber.lastName;
      case 'status':
        return subscriber.status;
      default:
        return subscriber.customFields[field];
    }
  }

  private updateSegmentCounts() {
    this.segments.forEach(segment => {
      segment.subscriberCount = this.getSubscribersBySegments([segment.id]).length;
    });
  }

  private async triggerWelcomeSequences(subscriberId: string) {
    const welcomeSequences = Array.from(this.sequences.values())
      .filter(seq => seq.isActive && seq.trigger.type === 'signup');
    
    for (const sequence of welcomeSequences) {
      await this.triggerSequence(sequence.id, subscriberId);
    }
  }

  private initializeDefaultTemplates() {
    if (this.templates.size === 0) {
      // Welcome email template
      this.createTemplate({
        name: 'Email de Bienvenida',
        subject: '¡Bienvenido {{firstName}}! 🎉',
        previewText: 'Gracias por unirte a nuestra comunidad',
        category: 'welcome',
        htmlContent: `
          <h1>¡Hola {{firstName}}!</h1>
          <p>Gracias por unirte a nuestra comunidad. Estamos emocionados de tenerte con nosotros.</p>
          <p>En los próximos días recibirás contenido valioso que te ayudará a sacar el máximo provecho de nuestra plataforma.</p>
          <a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Comenzar</a>
        `,
        textContent: 'Hola {{firstName}}! Gracias por unirte a nuestra comunidad...'
      });

      // Promotional template
      this.createTemplate({
        name: 'Oferta Especial',
        subject: '🔥 Oferta exclusiva para {{firstName}}',
        previewText: 'No te pierdas esta oportunidad limitada',
        category: 'promotional',
        htmlContent: `
          <h1>Oferta Especial Solo Para Ti</h1>
          <p>Hola {{firstName}},</p>
          <p>Tenemos una oferta especial que no querrás perderte.</p>
          <div style="background: #EF4444; color: white; padding: 20px; text-align: center; border-radius: 8px;">
            <h2>50% DE DESCUENTO</h2>
            <p>Válido hasta el final del mes</p>
          </div>
          <a href="#" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Aprovechar Oferta</a>
        `
      });
    }
  }

  private generateId(): string {
    return `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('email_templates', JSON.stringify(Array.from(this.templates.entries())));
      localStorage.setItem('email_campaigns', JSON.stringify(Array.from(this.campaigns.entries())));
      localStorage.setItem('email_sequences', JSON.stringify(Array.from(this.sequences.entries())));
      localStorage.setItem('email_subscribers', JSON.stringify(Array.from(this.subscribers.entries())));
      localStorage.setItem('email_segments', JSON.stringify(Array.from(this.segments.entries())));
      localStorage.setItem('email_analytics', JSON.stringify(this.analytics));
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const templates = localStorage.getItem('email_templates');
        if (templates) {
          this.templates = new Map(JSON.parse(templates));
        }

        const campaigns = localStorage.getItem('email_campaigns');
        if (campaigns) {
          this.campaigns = new Map(JSON.parse(campaigns));
        }

        const sequences = localStorage.getItem('email_sequences');
        if (sequences) {
          this.sequences = new Map(JSON.parse(sequences));
        }

        const subscribers = localStorage.getItem('email_subscribers');
        if (subscribers) {
          this.subscribers = new Map(JSON.parse(subscribers));
        }

        const segments = localStorage.getItem('email_segments');
        if (segments) {
          this.segments = new Map(JSON.parse(segments));
        }

        const analytics = localStorage.getItem('email_analytics');
        if (analytics) {
          this.analytics = JSON.parse(analytics);
        }
      } catch (error) {
        console.error('Failed to load email automation data from storage:', error);
      }
    }
  }
}

// Singleton instance
export const emailAutomationService = new EmailAutomationService();

// Integration with external email services
export class EmailServiceIntegration {
  static async sendWithSendGrid(emailData: any, apiKey: string) {
    // SendGrid integration implementation
    console.log('Would send via SendGrid:', emailData);
  }

  static async sendWithMailchimp(emailData: any, apiKey: string) {
    // Mailchimp integration implementation
    console.log('Would send via Mailchimp:', emailData);
  }

  static async sendWithBrevo(emailData: any, apiKey: string) {
    // Brevo (formerly Sendinblue) integration implementation
    console.log('Would send via Brevo:', emailData);
  }
}