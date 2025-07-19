'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import {
  CheckCircle,
  Copy,
  ExternalLink,
  Share2,
  Sparkles,
  Trophy,
  Users,
  Heart,
  Rocket,
  Monitor,
  Smartphone,
  Globe,
  Star,
  ChevronLeft
} from 'lucide-react';
import LivePreview from '../../components/LivePreview';

export default function PublishPage() {
  const { profileData, submitProfile } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const saveAndRedirect = async () => {
      try {
        setIsLoading(true);
        // Generar el slug antes de enviar al backend
        const slug = profileData.name?.toLowerCase().replace(/\s+/g, '-') || 'tu-perfil';
        
        // Enviar el slug al backend junto con el resto de los datos
        await submitProfile(slug);
        
        setPublicUrl(`${window.location.origin}/${slug}`);
        setIsSuccess(true);
        
        // Track completion
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'welcome_flow_completed', {
            event_category: 'onboarding',
            profile_type: profileData.profile_type,
            has_avatar: !!profileData.avatar,
            total_links: profileData.links?.length || 0
          });
        }
      } catch (error) {
        console.error("Error al guardar y redirigir:", error);
        // Optionally, show an error message to the user
      } finally {
        setIsLoading(false);
      }
    };
    saveAndRedirect();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleBack = () => {
    router.push('/welcome/6-links');
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.name} - ${t('welcome.publish.shareTitle')}`,
          text: t('welcome.publish.shareText'),
          url: publicUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy
      copyToClipboard();
    }
  };

  const openProfile = () => {
    window.open(publicUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('welcome.publish.publishing')}</h2>
          <p className="text-gray-600">{t('welcome.publish.publishingDesc')}</p>
        </div>
      </div>
    );
  }

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
            {t('welcome.publish.back')}
          </button>

          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            {t('welcome.publish.completed')}
          </div>
          
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('welcome.publish.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('welcome.publish.subtitle')}
            </p>
          </div>
        </div>

        {/* Progress indicator - 100% */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.publish.progress')}</span>
            <span className="text-sm font-medium text-gray-700">100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out w-full"></div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              
              {/* Live Preview */}
              <div className="lg:w-1/3 bg-gray-50 p-6 flex items-center justify-center min-h-[500px]">
                <div className="w-full max-w-sm">
                  <div className="flex items-center mb-4">
                    <Monitor className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {t('welcome.publish.finalPreview')}
                    </span>
                  </div>
                  <LivePreview profileData={{...profileData, slug: 'preview'} as unknown as import('@/app/utils/styleUtils').ProfileData} />
                </div>
              </div>

              {/* Publish Success */}
              <div className="lg:w-2/3 p-8">
                <div className="space-y-8">
                  {/* URL Section */}
                  <div>
                    <div className="flex items-center mb-4">
                      <Globe className="w-5 h-5 text-green-600 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-800">{t('welcome.publish.yourUrl')}</h2>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-green-600 font-mono text-sm break-all">{publicUrl}</span>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={copyToClipboard}
                            className="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            {copied ? t('welcome.publish.copied') : t('welcome.publish.copy')}
                          </button>
                          <button 
                            onClick={openProfile}
                            className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            {t('welcome.publish.view')}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {t('welcome.publish.urlHint')}
                      </p>
                    </div>
                  </div>

                  {/* Share Section */}
                  <div>
                    <div className="flex items-center mb-4">
                      <Share2 className="w-5 h-5 text-blue-600 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-800">{t('welcome.publish.shareTitle')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button
                        onClick={shareProfile}
                        className="inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <Share2 className="w-5 h-5 mr-2" />
                        {t('welcome.publish.shareButton')}
                      </button>
                      <button
                        onClick={goToDashboard}
                        className="inline-flex items-center justify-center px-6 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        <Rocket className="w-5 h-5 mr-2" />
                        {t('welcome.publish.dashboard')}
                      </button>
                    </div>
                  </div>

                  {/* Stats Preview */}
                  <div>
                    <div className="flex items-center mb-4">
                      <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                      <h2 className="text-xl font-semibold text-gray-800">{t('welcome.publish.whatsNext')}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">{t('welcome.publish.feature1')}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">{t('welcome.publish.feature2')}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">{t('welcome.publish.feature3')}</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-xl">
                        <Smartphone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">{t('welcome.publish.feature4')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Congratulations section */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl p-8">
            <Heart className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">{t('welcome.publish.congratulations')}</h3>
            <p className="text-lg opacity-90 mb-6">{t('welcome.publish.congratulationsDesc')}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-4 py-2 rounded-full">{t('welcome.publish.achievement1')}</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">{t('welcome.publish.achievement2')}</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">{t('welcome.publish.achievement3')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
