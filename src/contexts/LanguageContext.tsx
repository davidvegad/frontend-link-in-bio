'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, getTranslation, getStoredLanguage, setStoredLanguage, detectLanguage } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('es');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language on mount
  useEffect(() => {
    const initLanguage = async () => {
      try {
        const detectedLanguage = detectLanguage();
        setLanguageState(detectedLanguage);
      } catch (error) {
        console.error('Error detecting language:', error);
        setLanguageState('es');
      } finally {
        setIsLoading(false);
      }
    };

    initLanguage();
  }, []);

  // Translation function
  const t = (key: string): any => {
    return getTranslation(key, language);
  };

  // Set language with persistence
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
    
    // Update document language
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  };

  // Set initial document language
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    isLoading
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook for easy access to translations
export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}

// Component wrapper for conditional rendering based on language
interface LanguageWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function LanguageWrapper({ children, fallback }: LanguageWrapperProps) {
  const { isLoading } = useLanguage();
  
  if (isLoading) {
    return fallback || <div>Loading...</div>;
  }
  
  return <>{children}</>;
}

// Higher-order component for language support
export function withLanguage<P extends object>(Component: React.ComponentType<P>) {
  return function WithLanguageComponent(props: P) {
    return (
      <LanguageProvider>
        <Component {...props} />
      </LanguageProvider>
    );
  };
}