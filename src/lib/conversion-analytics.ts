/**
 * Conversion funnel analytics and optimization utilities
 */

export interface FunnelStep {
  id: string;
  name: string;
  description: string;
  selector?: string; // CSS selector for tracking
  url?: string; // URL pattern for page-based tracking
  event?: string; // Custom event name
}

export interface FunnelData {
  id: string;
  name: string;
  steps: FunnelStep[];
}

export interface FunnelMetrics {
  stepId: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  dropoffRate: number;
  averageTime?: number; // Time spent on step
}

export interface UserJourney {
  userId: string;
  sessionId: string;
  steps: Array<{
    stepId: string;
    timestamp: Date;
    timeSpent?: number;
    metadata?: Record<string, any>;
  }>;
  converted: boolean;
  conversionValue?: number;
}

// Predefined conversion funnels
export const CONVERSION_FUNNELS: Record<string, FunnelData> = {
  'signup-funnel': {
    id: 'signup-funnel',
    name: 'User Signup Funnel',
    steps: [
      {
        id: 'landing',
        name: 'Landing Page Visit',
        description: 'User visits homepage',
        url: '/'
      },
      {
        id: 'cta-click',
        name: 'CTA Click',
        description: 'User clicks main CTA button',
        event: 'signup_click'
      },
      {
        id: 'form-start',
        name: 'Form Started',
        description: 'User starts signup form',
        url: '/crear-pagina-gratis'
      },
      {
        id: 'form-submit',
        name: 'Form Submitted',
        description: 'User submits signup form',
        event: 'signup_submit'
      },
      {
        id: 'email-verify',
        name: 'Email Verified',
        description: 'User verifies email',
        event: 'email_verified'
      },
      {
        id: 'first-page',
        name: 'First Page Created',
        description: 'User creates their first page',
        event: 'first_page_created'
      }
    ]
  },
  'engagement-funnel': {
    id: 'engagement-funnel',
    name: 'User Engagement Funnel',
    steps: [
      {
        id: 'page-view',
        name: 'Page View',
        description: 'User views any page',
        url: '*'
      },
      {
        id: 'scroll-50',
        name: '50% Scroll',
        description: 'User scrolls 50% of page',
        event: 'scroll_depth_50'
      },
      {
        id: 'feature-explore',
        name: 'Features Explored',
        description: 'User explores features section',
        selector: '#features-section'
      },
      {
        id: 'template-view',
        name: 'Templates Viewed',
        description: 'User views template gallery',
        selector: '#templates-section'
      },
      {
        id: 'cta-engage',
        name: 'CTA Engagement',
        description: 'User engages with any CTA',
        event: 'cta_click'
      }
    ]
  }
};

class ConversionAnalytics {
  private static instance: ConversionAnalytics;
  private userJourneys: Map<string, UserJourney> = new Map();
  private sessionStartTime: Date = new Date();
  private currentStepStartTime: Date = new Date();

  static getInstance(): ConversionAnalytics {
    if (!ConversionAnalytics.instance) {
      ConversionAnalytics.instance = new ConversionAnalytics();
    }
    return ConversionAnalytics.instance;
  }

  /**
   * Get or create user journey
   */
  private getUserJourney(): UserJourney {
    const userId = this.getUserId();
    const sessionId = this.getSessionId();
    
    let journey = this.userJourneys.get(userId);
    if (!journey || journey.sessionId !== sessionId) {
      journey = {
        userId,
        sessionId,
        steps: [],
        converted: false
      };
      this.userJourneys.set(userId, journey);
    }
    
    return journey;
  }

  /**
   * Get user ID from localStorage
   */
  private getUserId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let userId = localStorage.getItem('analytics_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('analytics_user_id', userId);
    }
    return userId;
  }

  /**
   * Get session ID
   */
  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  /**
   * Track funnel step
   */
  trackStep(funnelId: string, stepId: string, metadata?: Record<string, any>): void {
    const journey = this.getUserJourney();
    const now = new Date();
    const timeSpent = now.getTime() - this.currentStepStartTime.getTime();

    // Add step to journey
    journey.steps.push({
      stepId,
      timestamp: now,
      timeSpent,
      metadata
    });

    // Update timing
    this.currentStepStartTime = now;

    // Track in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'funnel_step', {
        funnel_id: funnelId,
        step_id: stepId,
        user_id: journey.userId,
        session_id: journey.sessionId,
        time_spent: timeSpent,
        ...metadata
      });
    }

    // Save to localStorage
    this.saveJourney(journey);
  }

  /**
   * Track conversion
   */
  trackConversion(funnelId: string, value?: number, metadata?: Record<string, any>): void {
    const journey = this.getUserJourney();
    journey.converted = true;
    journey.conversionValue = value;

    // Track in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'funnel_conversion', {
        funnel_id: funnelId,
        user_id: journey.userId,
        session_id: journey.sessionId,
        conversion_value: value,
        steps_completed: journey.steps.length,
        total_time: new Date().getTime() - this.sessionStartTime.getTime(),
        ...metadata
      });
    }

    this.saveJourney(journey);
  }

  /**
   * Get funnel metrics
   */
  getFunnelMetrics(funnelId: string): FunnelMetrics[] {
    const funnel = CONVERSION_FUNNELS[funnelId];
    if (!funnel) return [];

    // In a real app, this would query your analytics backend
    // For now, return mock data structure
    return funnel.steps.map((step, index) => ({
      stepId: step.id,
      visitors: 1000 - (index * 200), // Mock decreasing visitors
      conversions: 800 - (index * 150), // Mock conversions
      conversionRate: ((800 - (index * 150)) / (1000 - (index * 200))) * 100,
      dropoffRate: index > 0 ? 20 : 0,
      averageTime: 30 + (index * 10) // Mock average time
    }));
  }

  /**
   * Get user journey
   */
  getCurrentJourney(): UserJourney {
    return this.getUserJourney();
  }

  /**
   * Save journey to localStorage
   */
  private saveJourney(journey: UserJourney): void {
    if (typeof window === 'undefined') return;
    
    try {
      const existing = localStorage.getItem('user_journeys');
      const journeys = existing ? JSON.parse(existing) : {};
      journeys[journey.userId] = journey;
      
      localStorage.setItem('user_journeys', JSON.stringify(journeys));
    } catch (error) {
      console.warn('Failed to save user journey:', error);
    }
  }

  /**
   * Initialize page tracking
   */
  initializePageTracking(): void {
    if (typeof window === 'undefined') return;

    // Track page view
    this.trackStep('signup-funnel', 'landing', {
      page: window.location.pathname,
      referrer: document.referrer
    });

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        if (scrollPercent >= 50 && maxScroll < 50) {
          this.trackStep('engagement-funnel', 'scroll-50');
        }
        
        if (scrollPercent >= 80 && maxScroll < 80) {
          this.trackStep('engagement-funnel', 'scroll-80');
        }
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track section visibility
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId === 'features-section') {
              this.trackStep('engagement-funnel', 'feature-explore');
            } else if (sectionId === 'templates-section') {
              this.trackStep('engagement-funnel', 'template-view');
            }
          }
        });
      }, { threshold: 0.5 });

      // Observe sections
      const sections = document.querySelectorAll('#features-section, #templates-section');
      sections.forEach(section => observer.observe(section));
    }

    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = new Date().getTime() - this.sessionStartTime.getTime();
      this.trackStep('engagement-funnel', 'session-end', {
        time_on_page: timeOnPage
      });
    });
  }

  /**
   * Track form interactions
   */
  trackFormInteraction(formId: string, action: string, field?: string): void {
    this.trackStep('signup-funnel', 'form-interact', {
      form_id: formId,
      action,
      field
    });
  }

  /**
   * Track button clicks
   */
  trackButtonClick(buttonType: string, location: string): void {
    this.trackStep('engagement-funnel', 'cta-engage', {
      button_type: buttonType,
      location
    });
  }

  /**
   * Generate conversion report
   */
  generateConversionReport(funnelId: string): {
    overview: {
      totalVisitors: number;
      totalConversions: number;
      overallConversionRate: number;
    };
    steps: FunnelMetrics[];
    recommendations: string[];
  } {
    const metrics = this.getFunnelMetrics(funnelId);
    const totalVisitors = metrics[0]?.visitors || 0;
    const totalConversions = metrics[metrics.length - 1]?.conversions || 0;
    const overallConversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0;

    // Generate recommendations based on dropoff
    const recommendations: string[] = [];
    metrics.forEach((metric, index) => {
      if (metric.dropoffRate > 25) {
        recommendations.push(`Alto abandono en paso ${index + 1}: ${metric.stepId}. Revisar UX.`);
      }
      if (metric.conversionRate < 10 && index > 0) {
        recommendations.push(`Baja conversión en ${metric.stepId}. Optimizar contenido.`);
      }
    });

    return {
      overview: {
        totalVisitors,
        totalConversions,
        overallConversionRate
      },
      steps: metrics,
      recommendations
    };
  }
}

// Export singleton instance
export const conversionAnalytics = ConversionAnalytics.getInstance();

// React hook for tracking
export function useConversionTracking(funnelId: string) {
  const trackStep = (stepId: string, metadata?: Record<string, any>) => {
    conversionAnalytics.trackStep(funnelId, stepId, metadata);
  };

  const trackConversion = (value?: number, metadata?: Record<string, any>) => {
    conversionAnalytics.trackConversion(funnelId, value, metadata);
  };

  const trackButtonClick = (buttonType: string, location: string) => {
    conversionAnalytics.trackButtonClick(buttonType, location);
  };

  return {
    trackStep,
    trackConversion,
    trackButtonClick,
    journey: conversionAnalytics.getCurrentJourney()
  };
}