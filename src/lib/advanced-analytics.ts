// Advanced Analytics and Reporting System
export interface AnalyticsEvent {
  id: string;
  eventName: string;
  timestamp: Date;
  userId?: string;
  sessionId: string;
  properties: Record<string, any>;
  page: string;
  referrer?: string;
  userAgent?: string;
  ipAddress?: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
  };
  device: {
    type: 'mobile' | 'tablet' | 'desktop';
    browser?: string;
    os?: string;
  };
}

export interface FunnelStep {
  id: string;
  name: string;
  eventName: string;
  conditions?: Record<string, any>;
  order: number;
}

export interface Funnel {
  id: string;
  name: string;
  description: string;
  steps: FunnelStep[];
  dateRange: {
    start: Date;
    end: Date;
  };
  isActive: boolean;
  createdAt: Date;
}

export interface FunnelAnalysis {
  funnelId: string;
  totalUsers: number;
  stepData: {
    stepId: string;
    stepName: string;
    users: number;
    conversionRate: number;
    dropoffRate: number;
    avgTimeToNext?: number; // minutes
  }[];
  overallConversionRate: number;
  generatedAt: Date;
}

export interface Cohort {
  id: string;
  name: string;
  definition: {
    type: 'first_visit' | 'first_purchase' | 'signup' | 'custom';
    dateRange: {
      start: Date;
      end: Date;
    };
    filters?: Record<string, any>;
  };
  periods: CohortPeriod[];
  createdAt: Date;
}

export interface CohortPeriod {
  period: number; // 0 = initial period, 1 = week 1, etc.
  users: number;
  retentionRate: number;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  type: 'dashboard' | 'funnel' | 'cohort' | 'custom';
  config: {
    metrics: string[];
    dimensions: string[];
    filters?: Record<string, any>;
    dateRange: {
      start: Date;
      end: Date;
    };
    visualization: 'table' | 'line_chart' | 'bar_chart' | 'pie_chart' | 'funnel' | 'heatmap';
  };
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    recipients: string[];
    format: 'pdf' | 'csv' | 'email';
  };
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  calculation: string; // SQL-like expression
  format: 'number' | 'percentage' | 'currency' | 'duration';
  category: 'engagement' | 'conversion' | 'revenue' | 'performance';
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'funnel';
  config: {
    metric?: string;
    visualization?: string;
    dateRange?: string;
    filters?: Record<string, any>;
  };
  position: { x: number; y: number; width: number; height: number };
}

// Advanced Analytics Service
export class AdvancedAnalyticsService {
  private events: AnalyticsEvent[] = [];
  private funnels: Map<string, Funnel> = new Map();
  private cohorts: Map<string, Cohort> = new Map();
  private reports: Map<string, Report> = new Map();
  private customMetrics: Map<string, MetricDefinition> = new Map();

  constructor() {
    this.loadFromStorage();
    this.initializeDefaultMetrics();
  }

  // Event Tracking
  trackEvent(eventData: Partial<AnalyticsEvent>): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: this.generateId(),
      eventName: eventData.eventName || 'unknown',
      timestamp: new Date(),
      userId: eventData.userId,
      sessionId: eventData.sessionId || this.generateSessionId(),
      properties: eventData.properties || {},
      page: eventData.page || window.location.pathname,
      referrer: eventData.referrer || document.referrer,
      userAgent: navigator.userAgent,
      location: eventData.location,
      device: {
        type: this.detectDeviceType(),
        browser: this.detectBrowser(),
        os: this.detectOS()
      }
    };

    this.events.push(event);
    this.saveToStorage();
    
    // Send to external analytics if configured
    this.sendToExternalAnalytics(event);
    
    return event;
  }

  // Page View Tracking
  trackPageView(page: string, userId?: string, properties?: Record<string, any>) {
    return this.trackEvent({
      eventName: 'page_view',
      page,
      userId,
      properties: {
        ...properties,
        title: document.title,
        url: window.location.href
      }
    });
  }

  // Conversion Tracking
  trackConversion(goalName: string, value?: number, userId?: string, properties?: Record<string, any>) {
    return this.trackEvent({
      eventName: 'conversion',
      userId,
      properties: {
        goal: goalName,
        value,
        ...properties
      }
    });
  }

  // Custom Event Tracking
  trackCustomEvent(eventName: string, properties?: Record<string, any>, userId?: string) {
    return this.trackEvent({
      eventName,
      userId,
      properties
    });
  }

  // Funnel Analysis
  createFunnel(funnelData: Partial<Funnel>): Funnel {
    const funnel: Funnel = {
      id: this.generateId(),
      name: funnelData.name || 'New Funnel',
      description: funnelData.description || '',
      steps: funnelData.steps || [],
      dateRange: funnelData.dateRange || {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        end: new Date()
      },
      isActive: funnelData.isActive ?? true,
      createdAt: new Date()
    };

    this.funnels.set(funnel.id, funnel);
    this.saveToStorage();
    return funnel;
  }

  analyzeFunnel(funnelId: string): FunnelAnalysis | null {
    const funnel = this.funnels.get(funnelId);
    if (!funnel) return null;

    const relevantEvents = this.events.filter(event => 
      event.timestamp >= funnel.dateRange.start && 
      event.timestamp <= funnel.dateRange.end
    );

    // Group events by user/session
    const userJourneys = this.groupEventsByUser(relevantEvents);
    
    // Calculate funnel metrics
    const stepData: FunnelAnalysis['stepData'] = [];
    let previousStepUsers = new Set<string>();
    
    funnel.steps.forEach((step, index) => {
      const stepUsers = new Set<string>();
      
      userJourneys.forEach((events, userId) => {
        const hasStepEvent = events.some(event => 
          event.eventName === step.eventName &&
          this.eventMatchesConditions(event, step.conditions)
        );
        
        if (hasStepEvent) {
          stepUsers.add(userId);
        }
      });

      const stepUserCount = stepUsers.size;
      const conversionRate = index === 0 ? 100 : 
        (previousStepUsers.size > 0 ? (stepUserCount / previousStepUsers.size) * 100 : 0);
      const dropoffRate = 100 - conversionRate;

      stepData.push({
        stepId: step.id,
        stepName: step.name,
        users: stepUserCount,
        conversionRate,
        dropoffRate,
        avgTimeToNext: this.calculateAvgTimeToNextStep(userJourneys, step, funnel.steps[index + 1])
      });

      previousStepUsers = stepUsers;
    });

    const totalUsers = stepData[0]?.users || 0;
    const finalUsers = stepData[stepData.length - 1]?.users || 0;
    const overallConversionRate = totalUsers > 0 ? (finalUsers / totalUsers) * 100 : 0;

    return {
      funnelId,
      totalUsers,
      stepData,
      overallConversionRate,
      generatedAt: new Date()
    };
  }

  // Cohort Analysis
  createCohort(cohortData: Partial<Cohort>): Cohort {
    const cohort: Cohort = {
      id: this.generateId(),
      name: cohortData.name || 'New Cohort',
      definition: cohortData.definition || {
        type: 'first_visit',
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date()
        }
      },
      periods: [],
      createdAt: new Date()
    };

    this.cohorts.set(cohort.id, cohort);
    this.calculateCohortData(cohort);
    this.saveToStorage();
    return cohort;
  }

  private calculateCohortData(cohort: Cohort) {
    const { definition } = cohort;
    
    // Get initial cohort users
    const initialUsers = this.getUsersByCriteria(definition);
    
    // Calculate retention for each period
    const periods: CohortPeriod[] = [];
    const totalWeeks = Math.ceil((Date.now() - definition.dateRange.start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    
    for (let week = 0; week < Math.min(totalWeeks, 12); week++) {
      const periodStart = new Date(definition.dateRange.start.getTime() + week * 7 * 24 * 60 * 60 * 1000);
      const periodEnd = new Date(periodStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      let activeUsers = 0;
      
      if (week === 0) {
        activeUsers = initialUsers.size;
      } else {
        // Count users who had activity in this period
        const periodEvents = this.events.filter(event => 
          event.timestamp >= periodStart && 
          event.timestamp < periodEnd &&
          initialUsers.has(event.userId || event.sessionId)
        );
        
        activeUsers = new Set(periodEvents.map(e => e.userId || e.sessionId)).size;
      }
      
      const retentionRate = initialUsers.size > 0 ? (activeUsers / initialUsers.size) * 100 : 0;
      
      periods.push({
        period: week,
        users: activeUsers,
        retentionRate
      });
    }
    
    cohort.periods = periods;
  }

  // Report Generation
  createReport(reportData: Partial<Report>): Report {
    const report: Report = {
      id: this.generateId(),
      name: reportData.name || 'New Report',
      description: reportData.description || '',
      type: reportData.type || 'dashboard',
      config: reportData.config || {
        metrics: ['page_views', 'unique_visitors'],
        dimensions: ['date'],
        dateRange: {
          start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          end: new Date()
        },
        visualization: 'line_chart'
      },
      schedule: reportData.schedule,
      isPublic: reportData.isPublic ?? false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.reports.set(report.id, report);
    this.saveToStorage();
    return report;
  }

  generateReportData(reportId: string): any {
    const report = this.reports.get(reportId);
    if (!report) return null;

    const { config } = report;
    const filteredEvents = this.events.filter(event => 
      event.timestamp >= config.dateRange.start && 
      event.timestamp <= config.dateRange.end
    );

    // Apply filters
    const eventsAfterFilters = config.filters ? 
      filteredEvents.filter(event => this.eventMatchesFilters(event, config.filters!)) : 
      filteredEvents;

    // Calculate metrics
    const data: any = {};
    
    config.metrics.forEach(metric => {
      data[metric] = this.calculateMetric(metric, eventsAfterFilters, config.dimensions);
    });

    return {
      reportId,
      data,
      config,
      generatedAt: new Date(),
      totalEvents: eventsAfterFilters.length
    };
  }

  // Real-time Analytics
  getRealTimeData(minutesBack: number = 30) {
    const cutoffTime = new Date(Date.now() - minutesBack * 60 * 1000);
    const recentEvents = this.events.filter(event => event.timestamp >= cutoffTime);
    
    return {
      totalEvents: recentEvents.length,
      uniqueVisitors: new Set(recentEvents.map(e => e.userId || e.sessionId)).size,
      pageViews: recentEvents.filter(e => e.eventName === 'page_view').length,
      conversions: recentEvents.filter(e => e.eventName === 'conversion').length,
      topPages: this.getTopPages(recentEvents),
      topReferrers: this.getTopReferrers(recentEvents),
      deviceBreakdown: this.getDeviceBreakdown(recentEvents),
      locationBreakdown: this.getLocationBreakdown(recentEvents)
    };
  }

  // Engagement Metrics
  calculateEngagementMetrics(dateRange: { start: Date; end: Date }) {
    const events = this.events.filter(event => 
      event.timestamp >= dateRange.start && 
      event.timestamp <= dateRange.end
    );

    const sessions = this.groupEventsBySession(events);
    const users = this.groupEventsByUser(events);

    return {
      totalSessions: sessions.size,
      totalUsers: users.size,
      avgSessionDuration: this.calculateAvgSessionDuration(sessions),
      bounceRate: this.calculateBounceRate(sessions),
      pagesPerSession: this.calculatePagesPerSession(sessions),
      newVsReturning: this.calculateNewVsReturning(users),
      topExitPages: this.getTopExitPages(sessions),
      userEngagementScore: this.calculateUserEngagementScore(users)
    };
  }

  // Revenue Analytics
  calculateRevenueMetrics(dateRange: { start: Date; end: Date }) {
    const conversionEvents = this.events.filter(event => 
      event.eventName === 'conversion' &&
      event.timestamp >= dateRange.start && 
      event.timestamp <= dateRange.end &&
      event.properties.value
    );

    const totalRevenue = conversionEvents.reduce((sum, event) => 
      sum + (event.properties.value || 0), 0
    );

    const transactions = conversionEvents.length;
    const avgOrderValue = transactions > 0 ? totalRevenue / transactions : 0;

    return {
      totalRevenue,
      transactions,
      avgOrderValue,
      revenueByDay: this.calculateRevenueByDay(conversionEvents),
      revenueBySource: this.calculateRevenueBySource(conversionEvents),
      topProducts: this.getTopProducts(conversionEvents)
    };
  }

  // A/B Test Analytics
  analyzeABTest(testId: string, dateRange: { start: Date; end: Date }) {
    const testEvents = this.events.filter(event => 
      event.properties.testId === testId &&
      event.timestamp >= dateRange.start && 
      event.timestamp <= dateRange.end
    );

    const variants = new Map<string, any>();
    
    testEvents.forEach(event => {
      const variant = event.properties.variant || 'control';
      
      if (!variants.has(variant)) {
        variants.set(variant, {
          variant,
          exposures: 0,
          conversions: 0,
          revenue: 0
        });
      }
      
      const variantData = variants.get(variant)!;
      
      if (event.eventName === 'ab_test_exposure') {
        variantData.exposures++;
      } else if (event.eventName === 'conversion') {
        variantData.conversions++;
        variantData.revenue += event.properties.value || 0;
      }
    });

    return Array.from(variants.values()).map(variant => ({
      ...variant,
      conversionRate: variant.exposures > 0 ? (variant.conversions / variant.exposures) * 100 : 0,
      avgRevenue: variant.conversions > 0 ? variant.revenue / variant.conversions : 0
    }));
  }

  // Utility Methods
  private groupEventsByUser(events: AnalyticsEvent[]): Map<string, AnalyticsEvent[]> {
    const grouped = new Map<string, AnalyticsEvent[]>();
    
    events.forEach(event => {
      const key = event.userId || event.sessionId;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(event);
    });
    
    return grouped;
  }

  private groupEventsBySession(events: AnalyticsEvent[]): Map<string, AnalyticsEvent[]> {
    const grouped = new Map<string, AnalyticsEvent[]>();
    
    events.forEach(event => {
      if (!grouped.has(event.sessionId)) {
        grouped.set(event.sessionId, []);
      }
      grouped.get(event.sessionId)!.push(event);
    });
    
    return grouped;
  }

  private calculateMetric(metric: string, events: AnalyticsEvent[], dimensions: string[]): any {
    switch (metric) {
      case 'page_views':
        return events.filter(e => e.eventName === 'page_view').length;
      case 'unique_visitors':
        return new Set(events.map(e => e.userId || e.sessionId)).size;
      case 'sessions':
        return new Set(events.map(e => e.sessionId)).size;
      case 'bounce_rate':
        return this.calculateBounceRate(this.groupEventsBySession(events));
      case 'avg_session_duration':
        return this.calculateAvgSessionDuration(this.groupEventsBySession(events));
      case 'conversion_rate':
        const totalUsers = new Set(events.map(e => e.userId || e.sessionId)).size;
        const conversions = events.filter(e => e.eventName === 'conversion').length;
        return totalUsers > 0 ? (conversions / totalUsers) * 100 : 0;
      default:
        return 0;
    }
  }

  private calculateAvgSessionDuration(sessions: Map<string, AnalyticsEvent[]>): number {
    let totalDuration = 0;
    let validSessions = 0;

    sessions.forEach(sessionEvents => {
      if (sessionEvents.length > 1) {
        const sortedEvents = sessionEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        const duration = sortedEvents[sortedEvents.length - 1].timestamp.getTime() - sortedEvents[0].timestamp.getTime();
        totalDuration += duration;
        validSessions++;
      }
    });

    return validSessions > 0 ? totalDuration / validSessions / 60000 : 0; // Convert to minutes
  }

  private calculateBounceRate(sessions: Map<string, AnalyticsEvent[]>): number {
    let singlePageSessions = 0;
    
    sessions.forEach(sessionEvents => {
      const pageViews = sessionEvents.filter(e => e.eventName === 'page_view');
      if (pageViews.length === 1) {
        singlePageSessions++;
      }
    });

    return sessions.size > 0 ? (singlePageSessions / sessions.size) * 100 : 0;
  }

  private detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (typeof window === 'undefined') return 'desktop';
    
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  private detectBrowser(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Other';
  }

  private detectOS(): string {
    if (typeof navigator === 'undefined') return 'unknown';
    
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Other';
  }

  private eventMatchesConditions(event: AnalyticsEvent, conditions?: Record<string, any>): boolean {
    if (!conditions) return true;
    
    return Object.entries(conditions).every(([key, value]) => {
      if (key in event.properties) {
        return event.properties[key] === value;
      }
      return false;
    });
  }

  private eventMatchesFilters(event: AnalyticsEvent, filters: Record<string, any>): boolean {
    return Object.entries(filters).every(([key, value]) => {
      if (key === 'page') return event.page === value;
      if (key === 'eventName') return event.eventName === value;
      if (key === 'device.type') return event.device.type === value;
      if (key in event.properties) return event.properties[key] === value;
      return true;
    });
  }

  private getUsersByCriteria(definition: Cohort['definition']): Set<string> {
    const users = new Set<string>();
    
    const relevantEvents = this.events.filter(event => 
      event.timestamp >= definition.dateRange.start && 
      event.timestamp <= definition.dateRange.end
    );

    relevantEvents.forEach(event => {
      let matches = false;
      
      switch (definition.type) {
        case 'first_visit':
          matches = event.eventName === 'page_view';
          break;
        case 'signup':
          matches = event.eventName === 'signup';
          break;
        case 'first_purchase':
          matches = event.eventName === 'conversion' && event.properties.type === 'purchase';
          break;
        default:
          matches = true;
      }
      
      if (matches) {
        users.add(event.userId || event.sessionId);
      }
    });
    
    return users;
  }

  private sendToExternalAnalytics(event: AnalyticsEvent) {
    // Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.eventName, {
        custom_parameter: JSON.stringify(event.properties),
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Send to other analytics services (Mixpanel, Amplitude, etc.)
    // Implementation would go here
  }

  private initializeDefaultMetrics() {
    if (this.customMetrics.size === 0) {
      this.customMetrics.set('page_views', {
        id: 'page_views',
        name: 'Page Views',
        description: 'Total number of page views',
        calculation: 'COUNT(events WHERE eventName = "page_view")',
        format: 'number',
        category: 'engagement'
      });

      this.customMetrics.set('unique_visitors', {
        id: 'unique_visitors',
        name: 'Unique Visitors',
        description: 'Number of unique visitors',
        calculation: 'COUNT(DISTINCT userId OR sessionId)',
        format: 'number',
        category: 'engagement'
      });

      this.customMetrics.set('conversion_rate', {
        id: 'conversion_rate',
        name: 'Conversion Rate',
        description: 'Percentage of visitors who convert',
        calculation: '(COUNT(conversions) / COUNT(unique_visitors)) * 100',
        format: 'percentage',
        category: 'conversion'
      });
    }
  }

  private getTopPages(events: AnalyticsEvent[]): Array<{ page: string; views: number }> {
    const pageViews = new Map<string, number>();
    
    events.filter(e => e.eventName === 'page_view').forEach(event => {
      pageViews.set(event.page, (pageViews.get(event.page) || 0) + 1);
    });
    
    return Array.from(pageViews.entries())
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  private getTopReferrers(events: AnalyticsEvent[]): Array<{ referrer: string; visits: number }> {
    const referrers = new Map<string, number>();
    
    events.forEach(event => {
      const referrer = event.referrer || 'Direct';
      referrers.set(referrer, (referrers.get(referrer) || 0) + 1);
    });
    
    return Array.from(referrers.entries())
      .map(([referrer, visits]) => ({ referrer, visits }))
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 10);
  }

  private getDeviceBreakdown(events: AnalyticsEvent[]) {
    const devices = { mobile: 0, tablet: 0, desktop: 0 };
    
    events.forEach(event => {
      devices[event.device.type]++;
    });
    
    return devices;
  }

  private getLocationBreakdown(events: AnalyticsEvent[]) {
    const locations = new Map<string, number>();
    
    events.forEach(event => {
      const country = event.location?.country || 'Unknown';
      locations.set(country, (locations.get(country) || 0) + 1);
    });
    
    return Array.from(locations.entries())
      .map(([country, visits]) => ({ country, visits }))
      .sort((a, b) => b.visits - a.visits);
  }

  private generateId(): string {
    return `analytics_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      // Only store recent events to prevent storage overflow
      const recentEvents = this.events.slice(-10000); // Keep last 10k events
      localStorage.setItem('analytics_events', JSON.stringify(recentEvents));
      localStorage.setItem('analytics_funnels', JSON.stringify(Array.from(this.funnels.entries())));
      localStorage.setItem('analytics_cohorts', JSON.stringify(Array.from(this.cohorts.entries())));
      localStorage.setItem('analytics_reports', JSON.stringify(Array.from(this.reports.entries())));
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      try {
        const events = localStorage.getItem('analytics_events');
        if (events) {
          this.events = JSON.parse(events).map((e: any) => ({
            ...e,
            timestamp: new Date(e.timestamp)
          }));
        }

        const funnels = localStorage.getItem('analytics_funnels');
        if (funnels) {
          this.funnels = new Map(JSON.parse(funnels));
        }

        const cohorts = localStorage.getItem('analytics_cohorts');
        if (cohorts) {
          this.cohorts = new Map(JSON.parse(cohorts));
        }

        const reports = localStorage.getItem('analytics_reports');
        if (reports) {
          this.reports = new Map(JSON.parse(reports));
        }
      } catch (error) {
        console.error('Failed to load analytics data from storage:', error);
      }
    }
  }

  // Additional utility methods would go here...
  private calculateAvgTimeToNextStep(userJourneys: Map<string, AnalyticsEvent[]>, currentStep: FunnelStep, nextStep?: FunnelStep): number | undefined {
    if (!nextStep) return undefined;
    
    let totalTime = 0;
    let validTransitions = 0;
    
    userJourneys.forEach(events => {
      const sortedEvents = events.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      for (let i = 0; i < sortedEvents.length - 1; i++) {
        const current = sortedEvents[i];
        const next = sortedEvents[i + 1];
        
        if (current.eventName === currentStep.eventName && 
            next.eventName === nextStep.eventName) {
          totalTime += (next.timestamp.getTime() - current.timestamp.getTime()) / 60000; // Convert to minutes
          validTransitions++;
          break; // Only count first transition per user
        }
      }
    });
    
    return validTransitions > 0 ? totalTime / validTransitions : undefined;
  }

  private calculatePagesPerSession(sessions: Map<string, AnalyticsEvent[]>): number {
    let totalPages = 0;
    
    sessions.forEach(sessionEvents => {
      const pageViews = sessionEvents.filter(e => e.eventName === 'page_view').length;
      totalPages += pageViews;
    });
    
    return sessions.size > 0 ? totalPages / sessions.size : 0;
  }

  private calculateNewVsReturning(users: Map<string, AnalyticsEvent[]>) {
    let newUsers = 0;
    let returningUsers = 0;
    
    users.forEach((userEvents, userId) => {
      // Simple heuristic: if user has events spanning more than a day, consider returning
      const sortedEvents = userEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      const timeSpan = sortedEvents[sortedEvents.length - 1].timestamp.getTime() - sortedEvents[0].timestamp.getTime();
      
      if (timeSpan > 24 * 60 * 60 * 1000) { // More than 24 hours
        returningUsers++;
      } else {
        newUsers++;
      }
    });
    
    return { newUsers, returningUsers };
  }

  private getTopExitPages(sessions: Map<string, AnalyticsEvent[]>): Array<{ page: string; exits: number }> {
    const exitPages = new Map<string, number>();
    
    sessions.forEach(sessionEvents => {
      const pageViews = sessionEvents.filter(e => e.eventName === 'page_view');
      if (pageViews.length > 0) {
        const lastPage = pageViews[pageViews.length - 1].page;
        exitPages.set(lastPage, (exitPages.get(lastPage) || 0) + 1);
      }
    });
    
    return Array.from(exitPages.entries())
      .map(([page, exits]) => ({ page, exits }))
      .sort((a, b) => b.exits - a.exits)
      .slice(0, 10);
  }

  private calculateUserEngagementScore(users: Map<string, AnalyticsEvent[]>): number {
    let totalScore = 0;
    
    users.forEach(userEvents => {
      let score = 0;
      
      // Points for different types of engagement
      score += userEvents.filter(e => e.eventName === 'page_view').length * 1;
      score += userEvents.filter(e => e.eventName === 'click').length * 2;
      score += userEvents.filter(e => e.eventName === 'download').length * 5;
      score += userEvents.filter(e => e.eventName === 'conversion').length * 10;
      
      // Bonus for session duration
      const sortedEvents = userEvents.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      if (sortedEvents.length > 1) {
        const durationMinutes = (sortedEvents[sortedEvents.length - 1].timestamp.getTime() - sortedEvents[0].timestamp.getTime()) / 60000;
        score += Math.min(durationMinutes / 5, 10); // Max 10 points for duration
      }
      
      totalScore += score;
    });
    
    return users.size > 0 ? totalScore / users.size : 0;
  }

  private calculateRevenueByDay(conversionEvents: AnalyticsEvent[]) {
    const revenueByDay = new Map<string, number>();
    
    conversionEvents.forEach(event => {
      const date = event.timestamp.toISOString().split('T')[0];
      const revenue = event.properties.value || 0;
      revenueByDay.set(date, (revenueByDay.get(date) || 0) + revenue);
    });
    
    return Array.from(revenueByDay.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  private calculateRevenueBySource(conversionEvents: AnalyticsEvent[]) {
    const revenueBySource = new Map<string, number>();
    
    conversionEvents.forEach(event => {
      const source = event.properties.source || 'Direct';
      const revenue = event.properties.value || 0;
      revenueBySource.set(source, (revenueBySource.get(source) || 0) + revenue);
    });
    
    return Array.from(revenueBySource.entries())
      .map(([source, revenue]) => ({ source, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }

  private getTopProducts(conversionEvents: AnalyticsEvent[]) {
    const productRevenue = new Map<string, { sales: number; revenue: number }>();
    
    conversionEvents.forEach(event => {
      const product = event.properties.product || 'Unknown';
      const revenue = event.properties.value || 0;
      
      if (!productRevenue.has(product)) {
        productRevenue.set(product, { sales: 0, revenue: 0 });
      }
      
      const productData = productRevenue.get(product)!;
      productData.sales++;
      productData.revenue += revenue;
    });
    
    return Array.from(productRevenue.entries())
      .map(([product, data]) => ({ product, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
  }
}

// Singleton instance
export const advancedAnalyticsService = new AdvancedAnalyticsService();