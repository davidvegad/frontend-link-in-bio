// Intelligent Recommendations System
export interface UserBehavior {
  userId?: string;
  sessionId: string;
  pageViews: PageView[];
  interactions: Interaction[];
  timeSpent: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  referrer?: string;
  location?: string;
}

export interface PageView {
  path: string;
  timestamp: number;
  duration: number;
  scrollDepth: number;
}

export interface Interaction {
  type: 'click' | 'hover' | 'form_fill' | 'download' | 'share';
  element: string;
  timestamp: number;
  value?: string;
}

export interface Recommendation {
  id: string;
  type: 'content' | 'product' | 'action' | 'design';
  title: string;
  description: string;
  confidence: number; // 0-1
  priority: 'high' | 'medium' | 'low';
  category: string;
  actionText: string;
  actionUrl?: string;
  data?: any;
}

export class RecommendationEngine {
  private userBehavior: UserBehavior;
  private rules: RecommendationRule[];

  constructor(userBehavior: UserBehavior) {
    this.userBehavior = userBehavior;
    this.rules = this.initializeRules();
  }

  private initializeRules(): RecommendationRule[] {
    return [
      // Content Recommendations
      {
        id: 'popular_content',
        condition: (behavior) => behavior.pageViews.length > 3,
        generate: (behavior) => ({
          id: 'popular_content_rec',
          type: 'content',
          title: 'Contenido Popular',
          description: 'Basado en tu actividad, esto podría interesarte',
          confidence: 0.7,
          priority: 'medium',
          category: 'content',
          actionText: 'Ver contenido',
          data: this.getPopularContent(behavior)
        })
      },

      // Conversion Optimization
      {
        id: 'exit_intent',
        condition: (behavior) => this.hasHighBounceRisk(behavior),
        generate: (behavior) => ({
          id: 'exit_intent_rec',
          type: 'action',
          title: 'Oferta Especial',
          description: 'Parece que te vas. ¡Tenemos algo especial para ti!',
          confidence: 0.9,
          priority: 'high',
          category: 'conversion',
          actionText: 'Ver oferta',
          actionUrl: '/oferta-especial'
        })
      },

      // Design Personalization
      {
        id: 'mobile_optimization',
        condition: (behavior) => behavior.deviceType === 'mobile',
        generate: (behavior) => ({
          id: 'mobile_opt_rec',
          type: 'design',
          title: 'Optimización Móvil',
          description: 'Mejora tu experiencia en móvil',
          confidence: 0.8,
          priority: 'medium',
          category: 'design',
          actionText: 'Optimizar',
          data: { layout: 'mobile-first', components: ['hero', 'cta'] }
        })
      },

      // Engagement Boost
      {
        id: 'low_engagement',
        condition: (behavior) => this.hasLowEngagement(behavior),
        generate: (behavior) => ({
          id: 'engagement_boost_rec',
          type: 'action',
          title: 'Aumentar Engagement',
          description: 'Consejos para mejorar la interacción con tu audiencia',
          confidence: 0.6,
          priority: 'medium',
          category: 'engagement',
          actionText: 'Ver consejos',
          data: this.getEngagementTips(behavior)
        })
      },

      // Product Recommendations
      {
        id: 'premium_features',
        condition: (behavior) => this.shouldRecommendPremium(behavior),
        generate: (behavior) => ({
          id: 'premium_rec',
          type: 'product',
          title: 'Funciones Premium',
          description: 'Desbloquea todo el potencial de tu página',
          confidence: 0.85,
          priority: 'high',
          category: 'upsell',
          actionText: 'Ver Premium',
          actionUrl: '/premium'
        })
      }
    ];
  }

  public generateRecommendations(): Recommendation[] {
    const recommendations: Recommendation[] = [];

    for (const rule of this.rules) {
      if (rule.condition(this.userBehavior)) {
        const recommendation = rule.generate(this.userBehavior);
        recommendations.push(recommendation);
      }
    }

    // Sort by priority and confidence
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.confidence - a.confidence;
    });
  }

  private hasHighBounceRisk(behavior: UserBehavior): boolean {
    const avgTimeSpent = behavior.timeSpent / behavior.pageViews.length;
    return avgTimeSpent < 30000 && behavior.interactions.length < 2; // Less than 30s avg and few interactions
  }

  private hasLowEngagement(behavior: UserBehavior): boolean {
    const interactionRate = behavior.interactions.length / behavior.pageViews.length;
    return interactionRate < 0.5; // Less than 0.5 interactions per page view
  }

  private shouldRecommendPremium(behavior: UserBehavior): boolean {
    const hasMultipleVisits = behavior.pageViews.length > 5;
    const hasHighEngagement = behavior.interactions.length > 10;
    const spentSignificantTime = behavior.timeSpent > 300000; // 5+ minutes
    
    return hasMultipleVisits && (hasHighEngagement || spentSignificantTime);
  }

  private getPopularContent(behavior: UserBehavior): any {
    // Mock popular content based on user behavior
    const categories = this.extractCategoriesFromBehavior(behavior);
    return {
      categories,
      suggestions: [
        'Como aumentar conversiones en 2024',
        'Estrategias de marketing para creators',
        'Diseño de páginas que venden'
      ]
    };
  }

  private getEngagementTips(behavior: UserBehavior): any {
    const tips = [];
    
    if (behavior.interactions.filter(i => i.type === 'click').length < 3) {
      tips.push('Añade más llamadas a la acción claras');
    }
    
    if (behavior.pageViews.every(pv => pv.scrollDepth < 0.5)) {
      tips.push('Mejora tu contenido above the fold');
    }
    
    return { tips, priority: 'medium' };
  }

  private extractCategoriesFromBehavior(behavior: UserBehavior): string[] {
    const paths = behavior.pageViews.map(pv => pv.path);
    const categories = new Set<string>();
    
    paths.forEach(path => {
      if (path.includes('producto')) categories.add('productos');
      if (path.includes('blog')) categories.add('contenido');
      if (path.includes('demo')) categories.add('demos');
      if (path.includes('precio')) categories.add('pricing');
    });
    
    return Array.from(categories);
  }
}

interface RecommendationRule {
  id: string;
  condition: (behavior: UserBehavior) => boolean;
  generate: (behavior: UserBehavior) => Recommendation;
}

// Analytics Integration
export class RecommendationAnalytics {
  static trackRecommendationShown(recommendation: Recommendation, userId?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'recommendation_shown', {
        event_category: 'recommendations',
        event_label: recommendation.id,
        recommendation_type: recommendation.type,
        recommendation_priority: recommendation.priority,
        confidence: recommendation.confidence,
        user_id: userId
      });
    }
  }

  static trackRecommendationClicked(recommendation: Recommendation, userId?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'recommendation_clicked', {
        event_category: 'recommendations',
        event_label: recommendation.id,
        recommendation_type: recommendation.type,
        recommendation_priority: recommendation.priority,
        confidence: recommendation.confidence,
        user_id: userId
      });
    }
  }

  static trackRecommendationDismissed(recommendation: Recommendation, userId?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'recommendation_dismissed', {
        event_category: 'recommendations',
        event_label: recommendation.id,
        recommendation_type: recommendation.type,
        user_id: userId
      });
    }
  }
}

// Utility Functions
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const detectDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const getUserLocation = async (): Promise<string | undefined> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return `${data.city}, ${data.country_name}`;
  } catch (error) {
    console.warn('Could not fetch user location:', error);
    return undefined;
  }
};