'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import { 
  Clipboard,
  ArrowRight,
  ChevronLeft,
  Palette,
  Upload,
  CheckCircle,
  Zap,
  Sparkles,
  Eye,
  Image as ImageIcon,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Camera,
  X,
  AlertCircle,
  Wand2,
  RefreshCw,
  Monitor
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import LivePreview from '../../components/LivePreview';

const predefinedThemes = [
  { id: 'sky', name: 'Cielo', start: '#60a5fa', end: '#3b82f6' },
  { id: 'aurora', name: 'Aurora', start: '#8b5cf6', end: '#ec4899' },
  { id: 'sunset', name: 'Atardecer', start: '#facc15', end: '#f43f5e' },
  { id: 'oasis', name: 'Oasis', start: '#6d28d9', end: '#10b981' },
  { id: 'flower', name: 'Flor', start: '#ec4899', end: '#f472b6' },
  { id: 'breeze', name: 'Brisa', start: '#a7f3d0', end: '#6ee7b7' },
  { id: 'nebula', name: 'Nébula', start: '#6366f1', end: '#a855f7' },
  { id: 'obsidian', name: 'Obsidiana', start: '#6b7280', end: '#9ca3af' },
  { id: 'lightning', name: 'Rayo', start: '#facc15', end: '#f97316' },
  { id: 'splash', name: 'Salpicón', start: '#ef4444', end: '#3b82f6' },
  { id: 'flamingo', name: 'Flamenco', start: '#fb7185', end: '#f43f5e' },
  { id: 'fog', name: 'Niebla', start: '#e5e7eb', end: '#9ca3af' },
  { id: 'ivory', name: 'Marfil', start: '#f5f5dc', end: '#f0f0c0' },
  { id: 'solstice', name: 'Solsticio', start: '#fde047', end: '#f97316' },
  { id: 'meadow', name: 'Pradera', start: '#84cc16', end: '#4ade80' },
  { id: 'brio', name: 'Brío', start: '#f97316', end: '#facc15' },
  { id: 'velvet', name: 'Terciopelo', start: '#7e22ce', end: '#9333ea' },
  { id: 'laguna', name: 'Laguna', start: '#a855f7', end: '#d946ef' },
  { id: 'stone', name: 'Piedra', start: '#78716c', end: '#57534e' },
  { id: 'cloud', name: 'Nube', start: '#e0f2fe', end: '#bfdbfe' },
];



export default function ThemePage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('themes');
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profileData.background_preference === 'image') {
      setActiveTab('upload');
    } else {
      setActiveTab('themes');
    }
  }, [profileData.background_preference]);

  const handleUploadButtonClick = () => {
    setActiveTab('upload');
    fileInputRef.current?.click();
  };

  const handleRemoveBackground = () => {
    updateProfileData({ background_image: null });
    setBackgroundPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'welcome_theme_completed', {
        event_category: 'onboarding',
        theme: profileData.theme,
        background_preference: profileData.background_preference
      });
    }
    
    router.push('/welcome/5-buttons');
  };

  const handleThemeSelect = (theme: (typeof predefinedThemes)[0]) => {
    updateProfileData({
      theme: theme.id,
      custom_gradient_start: theme.start,
      custom_gradient_end: theme.end,
      background_image: null,
      background_preference: 'color',
    });
  };

  const handleCustomGradientClick = () => {
    updateProfileData({ 
      theme: 'custom', 
      background_image: null,
      background_preference: 'color',
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors({ background: t('welcome.theme.validation.imageTooLarge') });
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ background: t('welcome.theme.validation.imageInvalidType') });
        return;
      }

      setIsUploading(true);
      setErrors({});
      
      try {
        updateProfileData({ 
          background_image: file,
          theme: '',
          custom_gradient_start: '',
          custom_gradient_end: '',
          background_preference: 'image',
        });
        setBackgroundPreview(URL.createObjectURL(file));
      } catch (error) {
        setErrors({ background: t('welcome.theme.validation.imageUploadError') });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBack = () => {
    router.push('/welcome/3-info');
  };

  const canProceed = !!(profileData.theme || profileData.background_image);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('welcome.theme.back')}
          </button>

          <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4 mr-2" />
            {t('welcome.theme.step')} 4 {t('welcome.theme.of')} 7
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome.theme.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('welcome.theme.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.theme.progress')}</span>
            <span className="text-sm font-medium text-gray-700">57%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: '57%' }}
            ></div>
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
                      {t('welcome.theme.livePreview')}
                    </span>
                  </div>
                  <LivePreview profileData={{...profileData, slug: 'preview'} as unknown as import('@/app/utils/styleUtils').ProfileData} />
                </div>
              </div>

              {/* Theme Options */}
              <div className="lg:w-2/3 p-8">
          
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Tab Navigation */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('themes');
                        updateProfileData({
                          background_image: null,
                          background_preference: 'color',
                        });
                      }}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'themes' ? 'bg-white text-purple-700 shadow-sm' : 'bg-transparent text-gray-600 hover:bg-white/50'}`}
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      {t('welcome.theme.themesTab')}
                    </button>
                    <button
                      type="button"
                      onClick={handleUploadButtonClick}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'upload' ? 'bg-white text-purple-700 shadow-sm' : 'bg-transparent text-gray-600 hover:bg-white/50'}`}
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      {t('welcome.theme.uploadTab')}
                    </button>
                  </div>

                  {activeTab === 'themes' && (
                    <div className="space-y-8">
                      {/* Predefined Themes */}
                      <div className="border-b border-gray-100 pb-8">
                        <div className="flex items-center mb-6">
                          <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
                          <h2 className="text-xl font-semibold text-gray-800">{t('welcome.theme.predefinedTitle')}</h2>
                        </div>
                        <p className="text-gray-600 mb-6">{t('welcome.theme.predefinedDesc')}</p>
                        
                        <div className="overflow-x-auto pb-4">
                          <div className="grid grid-flow-col grid-rows-2 gap-4 auto-cols-[140px] sm:auto-cols-[160px]">
                            {predefinedThemes.map(theme => (
                              <div 
                                key={theme.id} 
                                onClick={() => handleThemeSelect(theme)}
                                className="cursor-pointer group text-center w-[140px] sm:w-[160px]"
                              >
                                <div className="relative">
                                  <div 
                                    className={`w-full h-24 rounded-xl transition-all duration-300 ${profileData.theme === theme.id ? 'ring-4 ring-offset-2 ring-purple-500 scale-105' : 'group-hover:ring-2 group-hover:ring-purple-300 group-hover:scale-102'}`}
                                    style={{ background: `linear-gradient(135deg, ${theme.start}, ${theme.end})` }}
                                  ></div>
                                  {profileData.theme === theme.id && (
                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                  )}
                                </div>
                                <p className={`mt-3 text-sm font-medium transition-colors ${profileData.theme === theme.id ? 'text-purple-600' : 'text-gray-600'}`}>{theme.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Custom Gradient */}
                      <div className="border-b border-gray-100 pb-8">
                        <div className="flex items-center mb-6">
                          <Wand2 className="w-5 h-5 text-indigo-600 mr-2" />
                          <h2 className="text-xl font-semibold text-gray-800">{t('welcome.theme.customTitle')}</h2>
                        </div>
                        <p className="text-gray-600 mb-6">{t('welcome.theme.customDesc')}</p>
                        
                        <div 
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${profileData.theme === 'custom' ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50 hover:border-purple-200'}`}
                          onClick={handleCustomGradientClick}
                        >
                          {/* Gradient Preview */}
                          {(profileData.custom_gradient_start && profileData.custom_gradient_end) && (
                            <div className="mb-6">
                              <div 
                                className="w-full h-16 rounded-lg border-2 border-gray-200"
                                style={{ background: `linear-gradient(135deg, ${profileData.custom_gradient_start}, ${profileData.custom_gradient_end})` }}
                              ></div>
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <label htmlFor="gradientStart" className="block text-sm font-medium text-gray-700">
                                {t('welcome.theme.colorStart')}
                              </label>
                              <div className="flex items-center space-x-3">
                                <input 
                                  type="color" 
                                  id="gradientStart" 
                                  value={profileData.custom_gradient_start || '#FFFFFF'} 
                                  onChange={e => updateProfileData({ custom_gradient_start: e.target.value })} 
                                  className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer" 
                                />
                                <input 
                                  type="text" 
                                  value={profileData.custom_gradient_start || ''} 
                                  onChange={e => updateProfileData({ custom_gradient_start: e.target.value })} 
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                  placeholder="#FFFFFF" 
                                />
                                <button 
                                  type="button" 
                                  onClick={() => handleCopy(profileData.custom_gradient_start || '')} 
                                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                  {copySuccess === profileData.custom_gradient_start ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <label htmlFor="gradientEnd" className="block text-sm font-medium text-gray-700">
                                {t('welcome.theme.colorEnd')}
                              </label>
                              <div className="flex items-center space-x-3">
                                <input 
                                  type="color" 
                                  id="gradientEnd" 
                                  value={profileData.custom_gradient_end || '#000000'} 
                                  onChange={e => updateProfileData({ custom_gradient_end: e.target.value })} 
                                  className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer" 
                                />
                                <input 
                                  type="text" 
                                  value={profileData.custom_gradient_end || ''} 
                                  onChange={e => updateProfileData({ custom_gradient_end: e.target.value })} 
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                                  placeholder="#000000" 
                                />
                                <button 
                                  type="button" 
                                  onClick={() => handleCopy(profileData.custom_gradient_end || '')} 
                                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                                >
                                  {copySuccess === profileData.custom_gradient_end ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {copySuccess && (
                            <p className="text-sm text-green-600 mt-4 text-center flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {t('welcome.theme.copied')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'upload' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-6">
                        <ImageIcon className="w-5 h-5 text-indigo-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-800">{t('welcome.theme.backgroundTitle')}</h2>
                      </div>
                      <p className="text-gray-600 mb-6">{t('welcome.theme.backgroundDesc')}</p>
                      
                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-300 transition-colors">
                        {backgroundPreview || profileData.background_image ? (
                          <div className="space-y-4">
                            {backgroundPreview && (
                              <img 
                                src={backgroundPreview} 
                                alt="Background Preview" 
                                className="w-full max-w-md mx-auto h-48 object-cover rounded-lg shadow-md" 
                              />
                            )}
                            
                            <div className="flex items-center justify-center space-x-4">
                              <p className="text-sm text-green-600 font-medium">
                                {profileData.background_image?.name || t('welcome.theme.imageSelected')}
                              </p>
                              <button
                                type="button"
                                onClick={handleRemoveBackground}
                                className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                              >
                                <X className="w-4 h-4 mr-1" />
                                {t('welcome.theme.remove')}
                              </button>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              disabled={isUploading}
                              className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors disabled:opacity-50"
                            >
                              <RefreshCw className="w-4 h-4 mr-2" />
                              {t('welcome.theme.changeImage')}
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                              {isUploading ? (
                                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Camera className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                            
                            <div>
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 font-medium"
                              >
                                <Upload className="w-4 h-4 mr-2" />
                                {t('welcome.theme.uploadImage')}
                              </button>
                              
                              <p className="text-xs text-gray-500 mt-3">
                                {t('welcome.theme.imageHint')}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {errors.background && (
                          <p className="text-red-500 text-sm mt-4 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.background}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Continue button */}
                  <div className="flex justify-center pt-8">
                    <button
                      type="submit"
                      disabled={!canProceed}
                      className={`
                        inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300
                        ${canProceed
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {t('welcome.theme.continue')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden" 
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tips section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('welcome.theme.tipsTitle')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.theme.tip1Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.theme.tip1Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.theme.tip2Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.theme.tip2Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.theme.tip3Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.theme.tip3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
