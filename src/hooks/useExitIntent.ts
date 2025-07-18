'use client';

import { useEffect, useState, useCallback } from 'react';

interface ExitIntentOptions {
  sensitivity?: number; // Mouse movement sensitivity (pixels from top)
  delay?: number; // Delay before showing again (milliseconds)
  onlyOnce?: boolean; // Show only once per session
  sessionStorageKey?: string; // Key for session storage
}

export function useExitIntent(options: ExitIntentOptions = {}) {
  const {
    sensitivity = 20,
    delay = 1000,
    onlyOnce = true,
    sessionStorageKey = 'exitIntentShown'
  } = options;

  const [isTriggered, setIsTriggered] = useState(false);
  const [canShow, setCanShow] = useState(true);

  const checkIfAlreadyShown = useCallback(() => {
    if (typeof window === 'undefined') return false;
    
    try {
      return sessionStorage.getItem(sessionStorageKey) === 'true';
    } catch {
      return false;
    }
  }, [sessionStorageKey]);

  const markAsShown = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    try {
      sessionStorage.setItem(sessionStorageKey, 'true');
    } catch {
      // Ignore errors
    }
  }, [sessionStorageKey]);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger if mouse is leaving from the top of the page
    if (e.clientY <= sensitivity && e.relatedTarget === null) {
      if (canShow && !isTriggered) {
        setIsTriggered(true);
        
        if (onlyOnce) {
          markAsShown();
          setCanShow(false);
        } else {
          // Set temporary cooldown
          setCanShow(false);
          setTimeout(() => setCanShow(true), delay);
        }
      }
    }
  }, [sensitivity, canShow, isTriggered, onlyOnce, markAsShown, delay]);

  const reset = useCallback(() => {
    setIsTriggered(false);
    if (!onlyOnce) {
      setCanShow(true);
    }
  }, [onlyOnce]);

  const forceReset = useCallback(() => {
    setIsTriggered(false);
    setCanShow(true);
    
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(sessionStorageKey);
      } catch {
        // Ignore errors
      }
    }
  }, [sessionStorageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already shown
    if (onlyOnce && checkIfAlreadyShown()) {
      setCanShow(false);
      return;
    }

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave, onlyOnce, checkIfAlreadyShown]);

  return {
    isTriggered,
    reset,
    forceReset,
    canShow
  };
}