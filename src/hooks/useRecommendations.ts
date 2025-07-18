'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  RecommendationEngine, 
  UserBehavior, 
  Recommendation,
  RecommendationAnalytics,
  generateSessionId,
  detectDeviceType,
  getUserLocation
} from '@/lib/recommendations';

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userBehavior, setUserBehavior] = useState<UserBehavior | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId] = useState(() => generateSessionId());

  // Initialize user behavior tracking
  useEffect(() => {
    const initializeBehavior = async () => {
      const deviceType = detectDeviceType();
      const location = await getUserLocation();
      
      const initialBehavior: UserBehavior = {
        sessionId,
        pageViews: [],
        interactions: [],
        timeSpent: 0,
        deviceType,
        referrer: typeof window !== 'undefined' ? document.referrer : undefined,
        location
      };

      setUserBehavior(initialBehavior);
      setIsLoading(false);
    };

    initializeBehavior();
  }, [sessionId]);

  // Track page views
  const trackPageView = useCallback((path: string) => {
    if (!userBehavior) return;

    const pageView = {
      path,
      timestamp: Date.now(),
      duration: 0,
      scrollDepth: 0
    };

    setUserBehavior(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        pageViews: [...prev.pageViews, pageView]
      };
    });
  }, [userBehavior]);

  // Track interactions
  const trackInteraction = useCallback((type: 'click' | 'hover' | 'form_fill' | 'download' | 'share', element: string, value?: string) => {
    if (!userBehavior) return;

    const interaction = {
      type,
      element,
      timestamp: Date.now(),
      value
    };

    setUserBehavior(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        interactions: [...prev.interactions, interaction]
      };
    });
  }, [userBehavior]);

  // Update time spent
  const updateTimeSpent = useCallback((additionalTime: number) => {
    setUserBehavior(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        timeSpent: prev.timeSpent + additionalTime
      };
    });
  }, []);

  // Update scroll depth
  const updateScrollDepth = useCallback((path: string, scrollDepth: number) => {
    setUserBehavior(prev => {
      if (!prev) return prev;
      
      const updatedPageViews = prev.pageViews.map(pv => 
        pv.path === path ? { ...pv, scrollDepth } : pv
      );
      
      return {
        ...prev,
        pageViews: updatedPageViews
      };
    });
  }, []);

  // Generate recommendations
  const generateRecommendations = useCallback(() => {
    if (!userBehavior) return;

    const engine = new RecommendationEngine(userBehavior);
    const newRecommendations = engine.generateRecommendations();
    
    // Track recommendations shown
    newRecommendations.forEach(rec => {
      RecommendationAnalytics.trackRecommendationShown(rec, userBehavior.userId);
    });
    
    setRecommendations(newRecommendations);
  }, [userBehavior]);

  // Auto-generate recommendations when behavior changes
  useEffect(() => {
    if (userBehavior && userBehavior.pageViews.length > 0) {
      const timer = setTimeout(generateRecommendations, 1000); // Debounce
      return () => clearTimeout(timer);
    }
  }, [userBehavior, generateRecommendations]);

  // Track recommendation interactions
  const handleRecommendationClick = useCallback((recommendation: Recommendation) => {
    RecommendationAnalytics.trackRecommendationClicked(recommendation, userBehavior?.userId);
    trackInteraction('click', `recommendation_${recommendation.id}`);
  }, [trackInteraction, userBehavior]);

  const handleRecommendationDismiss = useCallback((recommendation: Recommendation) => {
    RecommendationAnalytics.trackRecommendationDismissed(recommendation, userBehavior?.userId);
    setRecommendations(prev => prev.filter(rec => rec.id !== recommendation.id));
  }, [userBehavior]);

  // Time tracking effect
  useEffect(() => {
    const startTime = Date.now();
    
    const updateTime = () => {
      const currentTime = Date.now();
      updateTimeSpent(currentTime - startTime);
    };

    const interval = setInterval(updateTime, 5000); // Update every 5 seconds
    
    // Update on page unload
    const handleBeforeUnload = updateTime;
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      updateTime(); // Final update
    };
  }, [updateTimeSpent]);

  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      updateScrollDepth(window.location.pathname, scrollDepth);
    };

    const throttledScroll = throttle(handleScroll, 1000);
    window.addEventListener('scroll', throttledScroll);
    
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [updateScrollDepth]);

  return {
    recommendations,
    userBehavior,
    isLoading,
    trackPageView,
    trackInteraction,
    generateRecommendations,
    handleRecommendationClick,
    handleRecommendationDismiss
  };
}

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}