'use client';

import { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  X, 
  TrendingUp, 
  Target, 
  Palette, 
  Users,
  ChevronRight,
  Star,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Recommendation } from '@/lib/recommendations';
import { useRecommendations } from '@/hooks/useRecommendations';

interface RecommendationWidgetProps {
  className?: string;
  maxRecommendations?: number;
  showDismiss?: boolean;
  variant?: 'floating' | 'inline' | 'sidebar';
  position?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

export default function RecommendationWidget({
  className,
  maxRecommendations = 3,
  showDismiss = true,
  variant = 'floating',
  position = 'bottom-right'
}: RecommendationWidgetProps) {
  const { 
    recommendations, 
    isLoading, 
    handleRecommendationClick, 
    handleRecommendationDismiss 
  } = useRecommendations();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleRecommendations, setVisibleRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const filtered = recommendations
      .filter(rec => rec.confidence > 0.5) // Only show high-confidence recommendations
      .slice(0, maxRecommendations);
    setVisibleRecommendations(filtered);
  }, [recommendations, maxRecommendations]);

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'content': return TrendingUp;
      case 'product': return Star;
      case 'action': return Zap;
      case 'design': return Palette;
      default: return Lightbulb;
    }
  };

  const getRecommendationColor = (priority: string, type: string) => {
    if (priority === 'high') {
      return 'from-red-500 to-pink-500';
    }
    if (type === 'product') {
      return 'from-green-500 to-emerald-500';
    }
    if (type === 'design') {
      return 'from-purple-500 to-blue-500';
    }
    return 'from-blue-500 to-indigo-500';
  };

  const handleClick = (recommendation: Recommendation) => {
    handleRecommendationClick(recommendation);
    if (recommendation.actionUrl) {
      window.open(recommendation.actionUrl, '_blank');
    }
  };

  const handleDismiss = (recommendation: Recommendation, e: React.MouseEvent) => {
    e.stopPropagation();
    handleRecommendationDismiss(recommendation);
  };

  if (isLoading || visibleRecommendations.length === 0) {
    return null;
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'floating':
        return cn(
          'fixed z-50 w-80',
          {
            'top-4 right-4': position === 'top-right',
            'bottom-4 right-4': position === 'bottom-right',
            'bottom-4 left-4': position === 'bottom-left',
            'top-4 left-4': position === 'top-left',
          }
        );
      case 'sidebar':
        return 'w-full max-w-sm';
      case 'inline':
      default:
        return 'w-full';
    }
  };

  return (
    <div className={cn(getVariantStyles(), className)}>
      {variant === 'floating' && (
        <div className="mb-4">
          {!isExpanded ? (
            // Collapsed floating button
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse hover:animate-none"
            >
              <div className="flex items-center">
                <Lightbulb className="w-6 h-6" />
                {visibleRecommendations.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {visibleRecommendations.length}
                  </span>
                )}
              </div>
            </button>
          ) : (
            // Expanded floating widget
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    <h3 className="font-semibold">Recomendaciones</h3>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-white/80 mt-1">
                  Basadas en tu actividad
                </p>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {visibleRecommendations.map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    onClick={handleClick}
                    onDismiss={showDismiss ? handleDismiss : undefined}
                    getIcon={getRecommendationIcon}
                    getColor={getRecommendationColor}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {variant !== 'floating' && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center">
              <Lightbulb className="w-6 h-6 mr-3" />
              <div>
                <h3 className="text-xl font-bold">Recomendaciones Inteligentes</h3>
                <p className="text-sm text-white/80 mt-1">
                  Personalizadas para maximizar tus resultados
                </p>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {visibleRecommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                onClick={handleClick}
                onDismiss={showDismiss ? handleDismiss : undefined}
                getIcon={getRecommendationIcon}
                getColor={getRecommendationColor}
                variant="large"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: (rec: Recommendation) => void;
  onDismiss?: (rec: Recommendation, e: React.MouseEvent) => void;
  getIcon: (type: string) => any;
  getColor: (priority: string, type: string) => string;
  variant?: 'compact' | 'large';
}

function RecommendationCard({
  recommendation,
  onClick,
  onDismiss,
  getIcon,
  getColor,
  variant = 'compact'
}: RecommendationCardProps) {
  const Icon = getIcon(recommendation.type);
  const gradientColor = getColor(recommendation.priority, recommendation.type);

  return (
    <div
      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
      onClick={() => onClick(recommendation)}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(
          'flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center',
          gradientColor
        )}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {recommendation.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {recommendation.description}
              </p>
              
              {variant === 'large' && (
                <div className="flex items-center mt-3 space-x-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Target className="w-3 h-3 mr-1" />
                    <span>{Math.round(recommendation.confidence * 100)}% relevancia</span>
                  </div>
                  <div className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    {
                      'bg-red-100 text-red-800': recommendation.priority === 'high',
                      'bg-yellow-100 text-yellow-800': recommendation.priority === 'medium',
                      'bg-green-100 text-green-800': recommendation.priority === 'low',
                    }
                  )}>
                    {recommendation.priority}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              {onDismiss && (
                <button
                  onClick={(e) => onDismiss(recommendation, e)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          {variant === 'compact' && (
            <div className="mt-2">
              <span className="inline-flex items-center text-xs text-blue-600 font-medium">
                {recommendation.actionText}
                <ChevronRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}