'use client';

import React, { useState } from 'react';
import { Languages, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
  showIcon?: boolean;
  compact?: boolean;
}

export default function LanguageSelector({ 
  className, 
  showIcon = true, 
  compact = false 
}: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className={cn('relative', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="text-lg">{currentLanguage?.flag}</span>
          <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors',
                  'first:rounded-t-lg last:rounded-b-lg',
                  language === lang.code && 'bg-blue-50 text-blue-600'
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.name}</span>
                {language === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
      >
        {showIcon && <Languages className="w-4 h-4" />}
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                {t('settings.language')}
              </div>
              
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors',
                    language === lang.code && 'bg-blue-50 text-blue-600'
                  )}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {language === lang.code && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Simple language toggle button
export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };
  
  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors',
        className
      )}
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <span className="text-xl">
        {language === 'es' ? '🇺🇸' : '🇪🇸'}
      </span>
    </button>
  );
}

// Language indicator (read-only)
export function LanguageIndicator({ className }: { className?: string }) {
  const { language } = useLanguage();
  
  const languageInfo = {
    es: { flag: '🇪🇸', name: 'ES' },
    en: { flag: '🇺🇸', name: 'EN' }
  };
  
  const current = languageInfo[language];
  
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <span className="text-lg">{current.flag}</span>
      <span className="text-sm font-medium text-gray-600">{current.name}</span>
    </div>
  );
}