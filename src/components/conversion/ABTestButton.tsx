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

  const handleClick = () => {
    if (trackingGoal) {
      trackConversion(trackingGoal);
    }
  };

  // Always render the same structure to avoid hydration issues
  return (
    <Link 
      href={href}
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300',
        'bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-xl',
        className
      )}
      suppressHydrationWarning
    >
      {children}
    </Link>
  );
}