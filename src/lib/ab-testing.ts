/**
 * A/B Testing utilities for conversion optimization
 */

export interface ABTestVariant {
  id: string;
  name: string;
  weight: number; // Percentage of traffic (0-100)
  config: Record<string, any>;
}

export interface ABTest {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  variants: ABTestVariant[];
  startDate: Date;
  endDate?: Date;
  conversionGoal: string;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  userId: string;
  timestamp: Date;
  converted: boolean;
  conversionValue?: number;
}

// Predefined A/B tests
export const AB_TESTS: Record<string, ABTest> = {
  'hero-cta': {
    id: 'hero-cta',
    name: 'Hero CTA Button Test',
    description: 'Testing different CTA button text and colors in hero section',
    isActive: true,
    startDate: new Date('2024-01-01'),
    conversionGoal: 'signup_click',
    variants: [
      {
        id: 'control',
        name: 'Control - Original',
        weight: 50,
        config: {
          text: 'Crear mi página gratis',
          color: 'bg-white text-blue-600',
          size: 'lg'
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A - Urgency',
        weight: 50,
        config: {
          text: '¡Empezar GRATIS ahora!',
          color: 'bg-green-500 text-white',
          size: 'xl'
        }
      }
    ]
  },
  'features-cta': {
    id: 'features-cta',
    name: 'Features Section CTA Test',
    description: 'Testing CTA placement and messaging in features section',
    isActive: true,
    startDate: new Date('2024-01-01'),
    conversionGoal: 'features_cta_click',
    variants: [
      {
        id: 'control',
        name: 'Control - Bottom CTA',
        weight: 50,
        config: {
          position: 'bottom',
          text: 'Comenzar gratis',
          showSecondary: true
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A - Top & Bottom',
        weight: 50,
        config: {
          position: 'both',
          text: 'Crear página ahora',
          showSecondary: false
        }
      }
    ]
  },
  'pricing-display': {
    id: 'pricing-display',
    name: 'Pricing Information Test',
    description: 'Testing how pricing information affects conversions',
    isActive: true,
    startDate: new Date('2024-01-01'),
    conversionGoal: 'pricing_engagement',
    variants: [
      {
        id: 'control',
        name: 'Control - No Pricing',
        weight: 33,
        config: {
          showPricing: false,
          emphasis: 'free'
        }
      },
      {
        id: 'variant-a',
        name: 'Variant A - Show Premium',
        weight: 33,
        config: {
          showPricing: true,
          emphasis: 'value'
        }
      },
      {
        id: 'variant-b',
        name: 'Variant B - Limited Time',
        weight: 34,
        config: {
          showPricing: true,
          emphasis: 'urgency',
          limitedTime: true
        }
      }
    ]
  }
};

class ABTestingService {
  private static instance: ABTestingService;
  private userVariants: Map<string, Record<string, string>> = new Map();
  private results: ABTestResult[] = [];

  static getInstance(): ABTestingService {
    if (!ABTestingService.instance) {
      ABTestingService.instance = new ABTestingService();
    }
    return ABTestingService.instance;
  }

  /**
   * Get user ID from localStorage or generate new one
   */
  private getUserId(): string {
    if (typeof window === 'undefined') return 'server';
    
    let userId = localStorage.getItem('ab_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('ab_user_id', userId);
    }
    return userId;
  }

  /**
   * Get variant for a specific test and user
   */
  getVariant(testId: string): ABTestVariant | null {
    const test = AB_TESTS[testId];
    if (!test || !test.isActive) return null;

    const userId = this.getUserId();
    
    // Check if user already has a variant assigned
    let userVariants = this.userVariants.get(userId);
    if (!userVariants) {
      userVariants = this.loadUserVariants(userId);
      this.userVariants.set(userId, userVariants);
    }

    if (userVariants[testId]) {
      return test.variants.find(v => v.id === userVariants[testId]) || null;
    }

    // Assign new variant based on weights
    const variant = this.assignVariant(test, userId);
    if (variant) {
      userVariants[testId] = variant.id;
      this.saveUserVariants(userId, userVariants);
      this.userVariants.set(userId, userVariants);
    }

    return variant;
  }

  /**
   * Assign variant based on user ID and weights
   */
  private assignVariant(test: ABTest, userId: string): ABTestVariant | null {
    if (test.variants.length === 0) return null;

    // Create deterministic hash from userId and testId
    const hash = this.hashString(userId + test.id);
    const randomValue = (hash % 10000) / 100; // 0-99.99

    let cumulativeWeight = 0;
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (randomValue < cumulativeWeight) {
        return variant;
      }
    }

    // Fallback to first variant
    return test.variants[0];
  }

  /**
   * Simple hash function for consistent variant assignment
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Track conversion event
   */
  trackConversion(testId: string, conversionGoal: string, value?: number): void {
    const userId = this.getUserId();
    const userVariants = this.userVariants.get(userId) || this.loadUserVariants(userId);
    const variantId = userVariants[testId];

    if (!variantId) return; // User not in test

    const result: ABTestResult = {
      testId,
      variantId,
      userId,
      timestamp: new Date(),
      converted: true,
      conversionValue: value
    };

    this.results.push(result);
    this.saveResult(result);

    // Track in analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        test_id: testId,
        variant_id: variantId,
        conversion_goal: conversionGoal,
        value: value || 1
      });
    }
  }

  /**
   * Track test exposure (user saw the variant)
   */
  trackExposure(testId: string): void {
    const userId = this.getUserId();
    const userVariants = this.userVariants.get(userId) || this.loadUserVariants(userId);
    const variantId = userVariants[testId];

    if (!variantId) return;

    // Track in analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ab_test_exposure', {
        test_id: testId,
        variant_id: variantId
      });
    }
  }

  /**
   * Load user variants from localStorage
   */
  private loadUserVariants(userId: string): Record<string, string> {
    if (typeof window === 'undefined') return {};
    
    try {
      const stored = localStorage.getItem(`ab_variants_${userId}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Save user variants to localStorage
   */
  private saveUserVariants(userId: string, variants: Record<string, string>): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(`ab_variants_${userId}`, JSON.stringify(variants));
    } catch (error) {
      console.warn('Failed to save A/B test variants:', error);
    }
  }

  /**
   * Save result to localStorage (in production, send to analytics backend)
   */
  private saveResult(result: ABTestResult): void {
    if (typeof window === 'undefined') return;
    
    try {
      const existing = localStorage.getItem('ab_test_results');
      const results = existing ? JSON.parse(existing) : [];
      results.push(result);
      
      // Keep only last 100 results to avoid storage bloat
      if (results.length > 100) {
        results.splice(0, results.length - 100);
      }
      
      localStorage.setItem('ab_test_results', JSON.stringify(results));
    } catch (error) {
      console.warn('Failed to save A/B test result:', error);
    }
  }

  /**
   * Get test results for analysis
   */
  getResults(testId?: string): ABTestResult[] {
    if (testId) {
      return this.results.filter(r => r.testId === testId);
    }
    return this.results;
  }

  /**
   * Calculate conversion rates for a test
   */
  getConversionRates(testId: string): Record<string, { exposures: number; conversions: number; rate: number }> {
    const results = this.getResults(testId);
    const stats: Record<string, { exposures: number; conversions: number; rate: number }> = {};

    results.forEach(result => {
      if (!stats[result.variantId]) {
        stats[result.variantId] = { exposures: 0, conversions: 0, rate: 0 };
      }
      
      stats[result.variantId].exposures++;
      if (result.converted) {
        stats[result.variantId].conversions++;
      }
    });

    // Calculate rates
    Object.keys(stats).forEach(variantId => {
      const { exposures, conversions } = stats[variantId];
      stats[variantId].rate = exposures > 0 ? (conversions / exposures) * 100 : 0;
    });

    return stats;
  }
}

// Export singleton instance
export const abTesting = ABTestingService.getInstance();

// Hook for React components
export function useABTest(testId: string) {
  const variant = abTesting.getVariant(testId);
  
  const trackConversion = (goal?: string, value?: number) => {
    const test = AB_TESTS[testId];
    abTesting.trackConversion(testId, goal || test?.conversionGoal || 'conversion', value);
  };

  const trackExposure = () => {
    abTesting.trackExposure(testId);
  };

  return {
    variant,
    trackConversion,
    trackExposure,
    isControl: variant?.id === 'control',
    config: variant?.config || {}
  };
}