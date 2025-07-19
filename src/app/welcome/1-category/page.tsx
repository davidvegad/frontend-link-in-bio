'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  Paintbrush, 
  Briefcase, 
  User, 
  Mic, 
  Share, 
  Users, 
  DollarSign, 
  Image, 
  ShoppingCart, 
  Heart, 
  Target, 
  Headphones, 
  Sparkles, 
  Link,
  ArrowRight,
  CheckCircle,
  Rocket,
  Star,
  ChevronLeft
} from 'lucide-react';
import React, { useState, useEffect } from 'react';

const getProfileTypes = (t: any) => [
  { id: 'creator', name: t('welcome.category.creator'), icon: <Mic className="w-5 h-5" />, description: t('welcome.category.creatorDesc') },
  { id: 'artist', name: t('welcome.category.artist'), icon: <Paintbrush className="w-5 h-5" />, description: t('welcome.category.artistDesc') },
  { id: 'business', name: t('welcome.category.business'), icon: <Briefcase className="w-5 h-5" />, description: t('welcome.category.businessDesc') },
  { id: 'individual', name: t('welcome.category.individual'), icon: <User className="w-5 h-5" />, description: t('welcome.category.individualDesc') },
];

const getPurposeOptions = (t: any): Record<string, { id: string; name: string; icon?: React.ReactNode; description?: string }[]> => ({
  creator: [
    { id: 'promote_content', name: t('welcome.purpose.promoteContent'), icon: <Share className="w-5 h-5" />, description: t('welcome.purpose.promoteContentDesc') },
    { id: 'grow_audience', name: t('welcome.purpose.growAudience'), icon: <Users className="w-5 h-5" />, description: t('welcome.purpose.growAudienceDesc') },
    { id: 'monetize', name: t('welcome.purpose.monetize'), icon: <DollarSign className="w-5 h-5" />, description: t('welcome.purpose.monetizeDesc') },
  ],
  artist: [
    { id: 'showcase_portfolio', name: t('welcome.purpose.showcasePortfolio'), icon: <Image className="w-5 h-5" />, description: t('welcome.purpose.showcasePortfolioDesc') },
    { id: 'sell_art', name: t('welcome.purpose.sellArt'), icon: <ShoppingCart className="w-5 h-5" />, description: t('welcome.purpose.sellArtDesc') },
    { id: 'connect_fans', name: t('welcome.purpose.connectFans'), icon: <Heart className="w-5 h-5" />, description: t('welcome.purpose.connectFansDesc') },
  ],
  business: [
    { id: 'generate_leads', name: t('welcome.purpose.generateLeads'), icon: <Target className="w-5 h-5" />, description: t('welcome.purpose.generateLeadsDesc') },
    { id: 'drive_sales', name: t('welcome.purpose.driveSales'), icon: <DollarSign className="w-5 h-5" />, description: t('welcome.purpose.driveSalesDesc') },
    { id: 'customer_support', name: t('welcome.purpose.customerSupport'), icon: <Headphones className="w-5 h-5" />, description: t('welcome.purpose.customerSupportDesc') },
  ],
  individual: [
    { id: 'professional_profile', name: t('welcome.purpose.professionalProfile'), icon: <User className="w-5 h-5" />, description: t('welcome.purpose.professionalProfileDesc') },
    { id: 'personal_hobbies', name: t('welcome.purpose.personalHobbies'), icon: <Sparkles className="w-5 h-5" />, description: t('welcome.purpose.personalHobbiesDesc') },
    { id: 'social_links', name: t('welcome.purpose.socialLinks'), icon: <Link className="w-5 h-5" />, description: t('welcome.purpose.socialLinksDesc') },
  ],
});

const CategoryCard = ({ 
  option, 
  isSelected, 
  onClick, 
  disabled = false 
}: { 
  option: { id: string; name: string; icon?: React.ReactNode; description?: string }; 
  isSelected: boolean; 
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative p-6 rounded-2xl border-2 transition-all duration-300 text-left w-full
        ${isSelected 
          ? 'border-green-500 bg-green-50 shadow-lg scale-105' 
          : disabled 
            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
            : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md hover:scale-102'
        }
        ${!disabled && 'cursor-pointer'}
      `}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <CheckCircle className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        {option.icon && (
          <div className={`
            flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
            ${isSelected 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-600 group-hover:bg-green-100 group-hover:text-green-600'
            }
          `}>
            {option.icon}
          </div>
        )}
        
        <div className={`flex-1 min-w-0 ${!option.icon ? 'ml-0' : ''}`}>
          <h3 className={`
            font-semibold text-lg transition-colors duration-300
            ${isSelected ? 'text-green-900' : 'text-gray-900'}
          `}>
            {option.name}
          </h3>
          {option.description && (
            <p className={`
              text-sm mt-1 transition-colors duration-300
              ${isSelected ? 'text-green-700' : 'text-gray-600'}
            `}>
              {option.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default function CategoryPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const profileTypes = getProfileTypes(t);
  const purposeOptions = getPurposeOptions(t);

  const handleProfileSelect = (type: string) => {
    updateProfileData({ profile_type: type, purpose: '' });
    
    // Animate to next step
    setIsAnimating(true);
    setTimeout(() => {
      setStep(2);
      setIsAnimating(false);
    }, 300);
  };

  const handlePurposeSelect = (purpose: string) => {
    updateProfileData({ purpose });
  };

  const handleBack = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'welcome_category_completed', {
        event_category: 'onboarding',
        profile_type: profileData.profile_type,
        purpose: profileData.purpose
      });
    }
    
    router.push('/welcome/2-style');
  };

  const canProceed = profileData.profile_type && profileData.purpose;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Rocket className="w-4 h-4 mr-2" />
            {t('welcome.category.welcomeBadge')}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome.category.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('welcome.category.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.category.step')} {step} {t('welcome.category.of')} 2</span>
            <span className="text-sm font-medium text-gray-700">{step === 1 ? '50%' : '100%'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: step === 1 ? '50%' : '100%' }}
            ></div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Profile Type */}
            {step === 1 && (
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t('welcome.category.profileQuestion')}
                  </h2>
                  <p className="text-gray-600">
                    {t('welcome.category.profileSubtitle')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {profileTypes.map((profileType) => (
                    <CategoryCard
                      key={profileType.id}
                      option={profileType}
                      isSelected={profileData.profile_type === profileType.id}
                      onClick={() => handleProfileSelect(profileType.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Purpose */}
            {step === 2 && (
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                <div className="text-center mb-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {t('welcome.category.back')}
                  </button>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {t('welcome.category.purposeQuestion')}
                  </h2>
                  <p className="text-gray-600">
                    {t('welcome.category.purposeSubtitle')}
                  </p>
                </div>

                {profileData.profile_type && (
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {purposeOptions[profileData.profile_type]?.map((purpose) => (
                      <CategoryCard
                        key={purpose.id}
                        option={purpose}
                        isSelected={profileData.purpose === purpose.id}
                        onClick={() => handlePurposeSelect(purpose.id)}
                      />
                    ))}
                  </div>
                )}

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
                    {t('welcome.category.continue')}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Features preview */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('welcome.category.whatYouGet')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.category.feature1Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.category.feature1Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.category.feature2Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.category.feature2Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.category.feature3Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.category.feature3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
