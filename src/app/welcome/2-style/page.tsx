'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  Palette,
  Layout,
  Image,
  Minimize2,
  Users,
  Star,
  Sparkles,
  Eye,
  Heart
} from 'lucide-react';

const getStyleOptions = (t: any) => [
  {
    id: 'minimalist',
    name: t('welcome.style.minimalist'),
    description: t('welcome.style.minimalistDesc'),
    icon: <Minimize2 className="w-6 h-6" />,
    preview: '/preview-minimalist.jpg',
    color: 'blue',
    features: [
      t('welcome.style.minimalistFeature1'),
      t('welcome.style.minimalistFeature2'),
      t('welcome.style.minimalistFeature3')
    ]
  },
  {
    id: 'featured-image',
    name: t('welcome.style.featuredImage'),
    description: t('welcome.style.featuredImageDesc'),
    icon: <Users className="w-6 h-6" />,
    preview: '/preview-featured.jpg',
    color: 'green',
    features: [
      t('welcome.style.featuredFeature1'),
      t('welcome.style.featuredFeature2'),
      t('welcome.style.featuredFeature3')
    ]
  },
  {
    id: 'full-background',
    name: t('welcome.style.fullBackground'),
    description: t('welcome.style.fullBackgroundDesc'),
    icon: <Image className="w-6 h-6" />,
    preview: '/preview-fullbg.jpg',
    color: 'purple',
    features: [
      t('welcome.style.fullBgFeature1'),
      t('welcome.style.fullBgFeature2'),
      t('welcome.style.fullBgFeature3')
    ]
  },
  {
    id: 'creative',
    name: t('welcome.style.creative'),
    description: t('welcome.style.creativeDesc'),
    icon: <Sparkles className="w-6 h-6" />,
    preview: '/preview-creative.jpg',
    color: 'pink',
    features: [
      t('welcome.style.creativeFeature1'),
      t('welcome.style.creativeFeature2'),
      t('welcome.style.creativeFeature3')
    ]
  }
];

const StyleCard = ({ 
  option, 
  isSelected, 
  onClick 
}: { 
  option: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    preview: string;
    color: string;
    features: string[];
  };
  isSelected: boolean;
  onClick: () => void;
}) => {
  const colorClasses = {
    blue: {
      border: 'border-blue-500',
      bg: 'bg-blue-50',
      icon: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-600',
      text: 'text-blue-900',
      subtext: 'text-blue-700'
    },
    green: {
      border: 'border-green-500',
      bg: 'bg-green-50',
      icon: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconText: 'text-green-600',
      text: 'text-green-900',
      subtext: 'text-green-700'
    },
    purple: {
      border: 'border-purple-500',
      bg: 'bg-purple-50',
      icon: 'bg-purple-500',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-600',
      text: 'text-purple-900',
      subtext: 'text-purple-700'
    },
    pink: {
      border: 'border-pink-500',
      bg: 'bg-pink-50',
      icon: 'bg-pink-500',
      iconBg: 'bg-pink-100',
      iconText: 'text-pink-600',
      text: 'text-pink-900',
      subtext: 'text-pink-700'
    }
  };

  const colors = colorClasses[option.color as keyof typeof colorClasses];

  return (
    <div
      onClick={onClick}
      className={`
        group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
        ${isSelected 
          ? `${colors.border} ${colors.bg} shadow-xl scale-105` 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:scale-102'
        }
      `}
    >
      {isSelected && (
        <div className={`absolute -top-2 -right-2 w-8 h-8 ${colors.icon} rounded-full flex items-center justify-center`}>
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Preview mockup */}
      <div className="mb-6">
        <div className={`
          w-full h-32 rounded-xl border-2 transition-all duration-300 flex items-center justify-center
          ${isSelected ? colors.border : 'border-gray-200'}
          bg-gradient-to-br from-gray-50 to-gray-100
        `}>
          <div className={`
            w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300
            ${isSelected ? colors.icon + ' text-white' : colors.iconBg + ' ' + colors.iconText}
          `}>
            {option.icon}
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className={`
          font-bold text-xl mb-2 transition-colors duration-300
          ${isSelected ? colors.text : 'text-gray-900'}
        `}>
          {option.name}
        </h3>
        
        <p className={`
          text-sm mb-4 transition-colors duration-300
          ${isSelected ? colors.subtext : 'text-gray-600'}
        `}>
          {option.description}
        </p>

        {/* Features list */}
        <div className="space-y-2">
          {option.features.map((feature, index) => (
            <div key={index} className="flex items-center text-xs">
              <CheckCircle className={`
                w-3 h-3 mr-2 flex-shrink-0
                ${isSelected ? colors.iconText : 'text-gray-400'}
              `} />
              <span className={`
                transition-colors duration-300
                ${isSelected ? colors.subtext : 'text-gray-500'}
              `}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function StylePage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();

  const styleOptions = getStyleOptions(t);

  const handleStyleSelect = (styleId: string) => {
    updateProfileData({ template_style: styleId });
  };

  const handleBack = () => {
    router.push('/welcome/1-category');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'welcome_style_completed', {
        event_category: 'onboarding',
        style: profileData.template_style
      });
    }
    
    router.push('/welcome/3-info');
  };

  const canProceed = !!profileData.template_style;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('welcome.style.back')}
          </button>

          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            {t('welcome.style.step')} 2 {t('welcome.style.of')} 7
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome.style.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('welcome.style.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.style.progress')}</span>
            <span className="text-sm font-medium text-gray-700">29%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: '29%' }}
            ></div>
          </div>
        </div>

        {/* Styles grid */}
        <div className="max-w-6xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {styleOptions.map((option) => (
                <StyleCard
                  key={option.id}
                  option={option}
                  isSelected={profileData.template_style === option.id}
                  onClick={() => handleStyleSelect(option.id)}
                />
              ))}
            </div>

            {/* Continue button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!canProceed}
                className={`
                  inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300
                  ${canProceed
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700 hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {t('welcome.style.continue')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </form>
        </div>

        {/* Info section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('welcome.style.whyMatters')}
            </h3>
            <p className="text-gray-600">
              {t('welcome.style.whyMattersDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.style.benefit1Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.style.benefit1Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.style.benefit2Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.style.benefit2Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.style.benefit3Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.style.benefit3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}