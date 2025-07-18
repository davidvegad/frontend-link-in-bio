// CRM Integration System
export interface Contact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  position?: string;
  website?: string;
  notes?: string;
  tags: string[];
  source: string;
  leadScore: number;
  status: 'cold' | 'warm' | 'hot' | 'customer' | 'churned';
  createdAt: Date;
  lastInteraction: Date;
  customFields: Record<string, any>;
}

export interface Lead {
  id: string;
  contactId: string;
  source: string;
  campaign?: string;
  medium?: string;
  content?: string;
  value?: number;
  stage: 'awareness' | 'interest' | 'consideration' | 'intent' | 'evaluation' | 'purchase';
  probability: number;
  expectedCloseDate?: Date;
  actualCloseDate?: Date;
  notes?: string;
  activities: Activity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  contactId: string;
  leadId?: string;
  type: 'email' | 'call' | 'meeting' | 'note' | 'task' | 'page_visit' | 'form_submission' | 'download' | 'click';
  title: string;
  description?: string;
  outcome?: string;
  scheduledAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface CRMIntegration {
  id: string;
  name: string;
  type: 'hubspot' | 'salesforce' | 'pipedrive' | 'mailchimp' | 'constantcontact' | 'custom';
  isActive: boolean;
  config: Record<string, any>;
  lastSync?: Date;
}

// CRM Service Class
export class CRMService {
  private integrations: Map<string, CRMIntegration> = new Map();
  private contacts: Map<string, Contact> = new Map();
  private leads: Map<string, Lead> = new Map();
  private activities: Map<string, Activity> = new Map();

  constructor() {
    this.loadFromStorage();
  }

  // Integration Management
  addIntegration(integration: CRMIntegration) {
    this.integrations.set(integration.id, integration);
    this.saveToStorage();
  }

  removeIntegration(integrationId: string) {
    this.integrations.delete(integrationId);
    this.saveToStorage();
  }

  getActiveIntegrations(): CRMIntegration[] {
    return Array.from(this.integrations.values()).filter(integration => integration.isActive);
  }

  // Contact Management
  async createContact(contactData: Partial<Contact>): Promise<Contact> {
    const contact: Contact = {
      id: this.generateId(),
      email: contactData.email || '',
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      phone: contactData.phone,
      company: contactData.company,
      position: contactData.position,
      website: contactData.website,
      notes: contactData.notes,
      tags: contactData.tags || [],
      source: contactData.source || 'website',
      leadScore: this.calculateLeadScore(contactData),
      status: 'cold',
      createdAt: new Date(),
      lastInteraction: new Date(),
      customFields: contactData.customFields || {}
    };

    this.contacts.set(contact.id, contact);
    
    // Sync with external CRMs
    await this.syncContactWithIntegrations(contact);
    
    this.saveToStorage();
    return contact;
  }

  async updateContact(contactId: string, updates: Partial<Contact>): Promise<Contact | null> {
    const contact = this.contacts.get(contactId);
    if (!contact) return null;

    const updatedContact = { ...contact, ...updates };
    updatedContact.leadScore = this.calculateLeadScore(updatedContact);
    
    this.contacts.set(contactId, updatedContact);
    
    // Sync with external CRMs
    await this.syncContactWithIntegrations(updatedContact);
    
    this.saveToStorage();
    return updatedContact;
  }

  getContact(contactId: string): Contact | null {
    return this.contacts.get(contactId) || null;
  }

  getContactByEmail(email: string): Contact | null {
    return Array.from(this.contacts.values()).find(contact => contact.email === email) || null;
  }

  getAllContacts(): Contact[] {
    return Array.from(this.contacts.values());
  }

  searchContacts(query: string): Contact[] {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.contacts.values()).filter(contact =>
      contact.email.toLowerCase().includes(lowercaseQuery) ||
      contact.firstName?.toLowerCase().includes(lowercaseQuery) ||
      contact.lastName?.toLowerCase().includes(lowercaseQuery) ||
      contact.company?.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Lead Management
  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    const lead: Lead = {
      id: this.generateId(),
      contactId: leadData.contactId || '',
      source: leadData.source || 'website',
      campaign: leadData.campaign,
      medium: leadData.medium,
      content: leadData.content,
      value: leadData.value,
      stage: leadData.stage || 'awareness',
      probability: leadData.probability || this.calculateProbability(leadData.stage || 'awareness'),
      expectedCloseDate: leadData.expectedCloseDate,
      notes: leadData.notes,
      activities: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.leads.set(lead.id, lead);
    
    // Update contact's last interaction
    const contact = this.contacts.get(lead.contactId);
    if (contact) {
      contact.lastInteraction = new Date();
      this.contacts.set(contact.id, contact);
    }

    await this.syncLeadWithIntegrations(lead);
    this.saveToStorage();
    return lead;
  }

  async updateLeadStage(leadId: string, newStage: Lead['stage']): Promise<Lead | null> {
    const lead = this.leads.get(leadId);
    if (!lead) return null;

    lead.stage = newStage;
    lead.probability = this.calculateProbability(newStage);
    lead.updatedAt = new Date();

    if (newStage === 'purchase') {
      lead.actualCloseDate = new Date();
      
      // Update contact status to customer
      const contact = this.contacts.get(lead.contactId);
      if (contact) {
        contact.status = 'customer';
        this.contacts.set(contact.id, contact);
      }
    }

    this.leads.set(leadId, lead);
    await this.syncLeadWithIntegrations(lead);
    this.saveToStorage();
    return lead;
  }

  getLeadsByContact(contactId: string): Lead[] {
    return Array.from(this.leads.values()).filter(lead => lead.contactId === contactId);
  }

  // Activity Management
  async logActivity(activityData: Partial<Activity>): Promise<Activity> {
    const activity: Activity = {
      id: this.generateId(),
      contactId: activityData.contactId || '',
      leadId: activityData.leadId,
      type: activityData.type || 'note',
      title: activityData.title || '',
      description: activityData.description,
      outcome: activityData.outcome,
      scheduledAt: activityData.scheduledAt,
      completedAt: activityData.completedAt,
      createdAt: new Date(),
      metadata: activityData.metadata || {}
    };

    this.activities.set(activity.id, activity);

    // Update contact's last interaction
    const contact = this.contacts.get(activity.contactId);
    if (contact) {
      contact.lastInteraction = new Date();
      this.contacts.set(contact.id, contact);
    }

    // Add activity to lead if specified
    if (activity.leadId) {
      const lead = this.leads.get(activity.leadId);
      if (lead) {
        lead.activities.push(activity);
        lead.updatedAt = new Date();
        this.leads.set(lead.id, lead);
      }
    }

    await this.syncActivityWithIntegrations(activity);
    this.saveToStorage();
    return activity;
  }

  getActivitiesByContact(contactId: string): Activity[] {
    return Array.from(this.activities.values())
      .filter(activity => activity.contactId === contactId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Analytics and Reporting
  getLeadsByStage(): Record<Lead['stage'], number> {
    const stages: Record<Lead['stage'], number> = {
      awareness: 0,
      interest: 0,
      consideration: 0,
      intent: 0,
      evaluation: 0,
      purchase: 0
    };

    Array.from(this.leads.values()).forEach(lead => {
      stages[lead.stage]++;
    });

    return stages;
  }

  getConversionRate(): number {
    const totalLeads = this.leads.size;
    const purchasedLeads = Array.from(this.leads.values()).filter(lead => lead.stage === 'purchase').length;
    return totalLeads > 0 ? (purchasedLeads / totalLeads) * 100 : 0;
  }

  getLeadSourceAnalytics(): Record<string, number> {
    const sources: Record<string, number> = {};
    
    Array.from(this.leads.values()).forEach(lead => {
      sources[lead.source] = (sources[lead.source] || 0) + 1;
    });

    return sources;
  }

  getTotalPipelineValue(): number {
    return Array.from(this.leads.values())
      .filter(lead => lead.value && lead.stage !== 'purchase')
      .reduce((total, lead) => total + (lead.value || 0), 0);
  }

  getContactsByStatus(): Record<Contact['status'], number> {
    const statuses: Record<Contact['status'], number> = {
      cold: 0,
      warm: 0,
      hot: 0,
      customer: 0,
      churned: 0
    };

    Array.from(this.contacts.values()).forEach(contact => {
      statuses[contact.status]++;
    });

    return statuses;
  }

  // External CRM Integration Methods
  private async syncContactWithIntegrations(contact: Contact) {
    const activeIntegrations = this.getActiveIntegrations();
    
    for (const integration of activeIntegrations) {
      try {
        switch (integration.type) {
          case 'hubspot':
            await this.syncWithHubSpot(contact, integration);
            break;
          case 'salesforce':
            await this.syncWithSalesforce(contact, integration);
            break;
          case 'mailchimp':
            await this.syncWithMailchimp(contact, integration);
            break;
          // Add more integrations as needed
        }
      } catch (error) {
        console.error(`Failed to sync contact with ${integration.name}:`, error);
      }
    }
  }

  private async syncLeadWithIntegrations(lead: Lead) {
    const activeIntegrations = this.getActiveIntegrations();
    
    for (const integration of activeIntegrations) {
      try {
        switch (integration.type) {
          case 'hubspot':
            await this.syncLeadWithHubSpot(lead, integration);
            break;
          case 'salesforce':
            await this.syncLeadWithSalesforce(lead, integration);
            break;
          // Add more integrations as needed
        }
      } catch (error) {
        console.error(`Failed to sync lead with ${integration.name}:`, error);
      }
    }
  }

  private async syncActivityWithIntegrations(activity: Activity) {
    // Similar implementation for activity sync
  }

  // External CRM Specific Methods
  private async syncWithHubSpot(contact: Contact, integration: CRMIntegration) {
    if (!integration.config.apiKey) return;

    const hubspotContact = {
      email: contact.email,
      firstname: contact.firstName,
      lastname: contact.lastName,
      phone: contact.phone,
      company: contact.company,
      jobtitle: contact.position,
      website: contact.website,
      notes_last_contacted: contact.notes,
      hs_lead_status: contact.status,
      lifecyclestage: this.mapStatusToHubSpotLifecycle(contact.status)
    };

    // In a real implementation, make API call to HubSpot
    console.log('Would sync to HubSpot:', hubspotContact);
  }

  private async syncWithSalesforce(contact: Contact, integration: CRMIntegration) {
    // Salesforce integration implementation
    console.log('Would sync to Salesforce:', contact);
  }

  private async syncWithMailchimp(contact: Contact, integration: CRMIntegration) {
    if (!integration.config.apiKey || !integration.config.listId) return;

    const mailchimpContact = {
      email_address: contact.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: contact.firstName,
        LNAME: contact.lastName,
        PHONE: contact.phone,
        COMPANY: contact.company
      },
      tags: contact.tags
    };

    // In a real implementation, make API call to Mailchimp
    console.log('Would sync to Mailchimp:', mailchimpContact);
  }

  private async syncLeadWithHubSpot(lead: Lead, integration: CRMIntegration) {
    // HubSpot lead/deal sync implementation
  }

  private async syncLeadWithSalesforce(lead: Lead, integration: CRMIntegration) {
    // Salesforce opportunity sync implementation
  }

  // Utility Methods
  private calculateLeadScore(contact: Partial<Contact>): number {
    let score = 0;
    
    // Email provided
    if (contact.email) score += 20;
    
    // Personal info
    if (contact.firstName) score += 10;
    if (contact.lastName) score += 10;
    if (contact.phone) score += 15;
    
    // Professional info
    if (contact.company) score += 20;
    if (contact.position) score += 15;
    if (contact.website) score += 10;

    return Math.min(score, 100);
  }

  private calculateProbability(stage: Lead['stage']): number {
    const stageProbabilities = {
      awareness: 5,
      interest: 15,
      consideration: 30,
      intent: 50,
      evaluation: 75,
      purchase: 100
    };
    
    return stageProbabilities[stage];
  }

  private mapStatusToHubSpotLifecycle(status: Contact['status']): string {
    const mapping = {
      cold: 'lead',
      warm: 'marketingqualifiedlead',
      hot: 'salesqualifiedlead',
      customer: 'customer',
      churned: 'other'
    };
    
    return mapping[status];
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('crm_contacts', JSON.stringify(Array.from(this.contacts.entries())));
      localStorage.setItem('crm_leads', JSON.stringify(Array.from(this.leads.entries())));
      localStorage.setItem('crm_activities', JSON.stringify(Array.from(this.activities.entries())));
      localStorage.setItem('crm_integrations', JSON.stringify(Array.from(this.integrations.entries())));
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const contacts = localStorage.getItem('crm_contacts');
        if (contacts) {
          this.contacts = new Map(JSON.parse(contacts));
        }

        const leads = localStorage.getItem('crm_leads');
        if (leads) {
          this.leads = new Map(JSON.parse(leads));
        }

        const activities = localStorage.getItem('crm_activities');
        if (activities) {
          this.activities = new Map(JSON.parse(activities));
        }

        const integrations = localStorage.getItem('crm_integrations');
        if (integrations) {
          this.integrations = new Map(JSON.parse(integrations));
        }
      } catch (error) {
        console.error('Failed to load CRM data from storage:', error);
      }
    }
  }
}

// Singleton instance
export const crmService = new CRMService();

// Analytics tracking for CRM events
export class CRMAnalytics {
  static trackContactCreated(contact: Contact) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_created', {
        event_category: 'crm',
        event_label: contact.source,
        contact_source: contact.source,
        lead_score: contact.leadScore
      });
    }
  }

  static trackLeadStageChange(lead: Lead, oldStage: Lead['stage']) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lead_stage_change', {
        event_category: 'crm',
        event_label: `${oldStage}_to_${lead.stage}`,
        lead_source: lead.source,
        lead_value: lead.value,
        lead_probability: lead.probability
      });
    }
  }

  static trackActivityLogged(activity: Activity) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'activity_logged', {
        event_category: 'crm',
        event_label: activity.type,
        activity_type: activity.type
      });
    }
  }
}