'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Zap, Flame, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UrgencyButtonProps {
  href: string;
  children?: React.ReactNode;
  text?: string;
  urgencyType?: 'time' | 'scarcity' | 'social_proof' | 'limited_offer';
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  timeLeft?: number; // seconds
  spotsLeft?: number;
  usersViewing?: number;
  onClick?: () => void;
}

export default function UrgencyButton({
  href,
  children,
  text = 'Crear mi página gratis',
  urgencyType = 'time',
  className,
  variant = 'primary',
  size = 'lg',
  timeLeft = 3600, // 1 hour default
  spotsLeft = 47,
  usersViewing = 23,
  onClick
}: UrgencyButtonProps) {
  const [currentTimeLeft, setCurrentTimeLeft] = useState(timeLeft);
  const [currentSpotsLeft, setCurrentSpotsLeft] = useState(spotsLeft);
  const [isVisible, setIsVisible] = useState(true);

  // Time countdown
  useEffect(() => {
    if (urgencyType === 'time' && currentTimeLeft > 0) {
      const timer = setInterval(() => {
        setCurrentTimeLeft(prev => {
          if (prev <= 1) {
            setIsVisible(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [urgencyType, currentTimeLeft]);

  // Simulate spots decreasing
  useEffect(() => {
    if (urgencyType === 'scarcity' && currentSpotsLeft > 0) {
      const timer = setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
          setCurrentSpotsLeft(prev => Math.max(0, prev - 1));
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(timer);
    }
  }, [urgencyType, currentSpotsLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getUrgencyElement = () => {
    switch (urgencyType) {
      case 'time':
        return (
          <div className="flex items-center text-xs mb-2">
            <Clock className="w-3 h-3 mr-1" />
            <span>Oferta termina en: {formatTime(currentTimeLeft)}</span>
          </div>
        );
      
      case 'scarcity':
        return (
          <div className="flex items-center text-xs mb-2">
            <AlertCircle className="w-3 h-3 mr-1" />
            <span>Solo quedan {currentSpotsLeft} espacios</span>
          </div>
        );
      
      case 'social_proof':
        return (
          <div className="flex items-center text-xs mb-2">
            <Users className="w-3 h-3 mr-1" />
            <span>{usersViewing} personas viendo esto ahora</span>
          </div>
        );
      
      case 'limited_offer':
        return (
          <div className="flex items-center text-xs mb-2">
            <Flame className="w-3 h-3 mr-1" />
            <span>Oferta limitada por tiempo limitado</span>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getVariantStyles = () => {
    const variants = {
      primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
      secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
      danger: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white',
      success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
    };
    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl'
    };
    return sizes[size];
  };

  const getUrgencyColor = () => {
    switch (urgencyType) {
      case 'time':
        return currentTimeLeft < 600 ? 'text-red-200' : 'text-yellow-200'; // Red if less than 10 minutes
      case 'scarcity':
        return currentSpotsLeft < 10 ? 'text-red-200' : 'text-yellow-200';
      case 'social_proof':
        return 'text-blue-200';
      case 'limited_offer':
        return 'text-orange-200';
      default:
        return 'text-yellow-200';
    }
  };

  if (!isVisible) {
    return null;
  }

  const urgencyElement = getUrgencyElement();
  const urgencyColor = getUrgencyColor();

  const handleClick = () => {
    onClick?.();
    
    // Track urgency button click
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'urgency_button_click', {
        event_category: 'conversion',
        event_label: urgencyType,
        urgency_type: urgencyType,
        time_left: urgencyType === 'time' ? currentTimeLeft : undefined,
        spots_left: urgencyType === 'scarcity' ? currentSpotsLeft : undefined
      });
    }
  };

  return (
    <div className="relative">
      <Link
        href={href}
        onClick={handleClick}
        className={cn(
          'group relative inline-flex flex-col items-center justify-center rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95',
          'shadow-2xl hover:shadow-3xl',
          'border-2 border-transparent hover:border-white/20',
          'animate-pulse hover:animate-none',
          getVariantStyles(),
          getSizeStyles(),
          className
        )}
      >
        {/* Urgency indicator */}
        {urgencyElement && (
          <div className={cn('text-center', urgencyColor)}>
            {urgencyElement}
          </div>
        )}
        
        {/* Main text */}
        <div className="flex items-center">
          {urgencyType === 'time' && <Zap className="w-5 h-5 mr-2" />}
          {urgencyType === 'scarcity' && <Flame className="w-5 h-5 mr-2" />}
          {urgencyType === 'social_proof' && <Users className="w-5 h-5 mr-2" />}
          {urgencyType === 'limited_offer' && <AlertCircle className="w-5 h-5 mr-2" />}
          <span>{text}</span>
          {children}
        </div>

        {/* Animated background effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent rounded-xl animate-pulse"></div>
        </div>

        {/* Urgency pulse ring */}
        {(urgencyType === 'time' && currentTimeLeft < 600) || (urgencyType === 'scarcity' && currentSpotsLeft < 10) ? (
          <div className="absolute -inset-1 bg-red-500 rounded-xl opacity-30 animate-ping"></div>
        ) : null}
      </Link>

      {/* Floating badge for extreme urgency */}
      {urgencyType === 'time' && currentTimeLeft < 300 && ( // Less than 5 minutes
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
          ¡ÚLTIMOS MINUTOS!
        </div>
      )}

      {urgencyType === 'scarcity' && currentSpotsLeft <= 5 && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
          ¡CASI AGOTADO!
        </div>
      )}
    </div>
  );
}