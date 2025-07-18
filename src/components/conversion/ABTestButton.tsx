'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useABTest } from '@/lib/ab-testing';
import { cn } from '@/lib/utils';

interface ABTestButtonProps {
  testId: string;
  href: string;
  className?: string;
  trackingGoal?: string;
  children?: React.ReactNode;
}

export default function ABTestButton({ 
  testId, 
  href, 
  className,
  trackingGoal,
  children 
}: ABTestButtonProps) {
  const [isClient, setIsClient] = useState(false);
  const { variant, trackConversion, trackExposure, config } = useABTest(testId);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Track exposure when component mounts
  useEffect(() => {
    if (variant && isClient) {
      trackExposure();
    }
  }, [variant, trackExposure, isClient]);

  // If not client-side yet or no variant, show default
  if (!isClient || !variant) {
    return (
      <Link 
        href={href}
        className={cn(
          'inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300',
          'bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-xl',
          className
        )}
      >
        {children || 'Crear mi página gratis'}
      </Link>
    );
  }

  const handleClick = () => {
    trackConversion(trackingGoal);
  };

  // Apply variant-specific styling
  const variantStyles = {
    control: 'bg-white text-blue-600 hover:bg-gray-100',
    'variant-a': 'bg-green-500 text-white hover:bg-green-600 animate-pulse',
    'variant-b': 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const buttonClasses = cn(
    'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-xl transform hover:-translate-y-1',
    variantStyles[variant.id as keyof typeof variantStyles] || variantStyles.control,
    sizeStyles[config.size as keyof typeof sizeStyles] || sizeStyles.lg,
    config.color, // Allow config to override default colors
    className
  );

  return (
    <Link 
      href={href}
      onClick={handleClick}
      className={buttonClasses}
    >
      {config.text || children || 'Crear mi página gratis'}
    </Link>
  );
}