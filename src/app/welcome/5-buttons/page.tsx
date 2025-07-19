'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import LivePreview from '../../components/LivePreview';
import { getButtonClasses, getButtonStyles, interpolateColor, predefinedThemes } from '../../utils/styleUtils';
import { useState, useEffect } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  Settings,
  Monitor,
  Palette,
  Square,
  Circle,
  CornerUpRight,
  Eye,
  Sparkles,
  MousePointer,
  Sliders,
  Wand2
} from 'lucide-react';

const getButtonStyleOptions = (t: any) => [
  { 
    id: 'rounded-full', 
    name: t('welcome.buttons.styles.rounded'), 
    icon: <Circle className="w-4 h-4" />,
    description: t('welcome.buttons.styles.roundedDesc')
  },
  { 
    id: 'rounded-md', 
    name: t('welcome.buttons.styles.semiRounded'), 
    icon: <CornerUpRight className="w-4 h-4" />,
    description: t('welcome.buttons.styles.semiRoundedDesc')
  },
  { 
    id: 'rounded-none', 
    name: t('welcome.buttons.styles.square'), 
    icon: <Square className="w-4 h-4" />,
    description: t('welcome.buttons.styles.squareDesc')
  },
];

export default function ButtonsPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');

  useEffect(() => {
    if (!profileData.button_style) {
      updateProfileData({ button_style: 'rounded-full' });
    }
    if (!profileData.button_color) {
      updateProfileData({ button_color: '#000000' });
    }
    if (!profileData.button_text_color) {
      updateProfileData({ button_text_color: '#FFFFFF' });
    }
  }, [profileData.button_style, profileData.button_color, profileData.button_text_color, updateProfileData]);

  const handleBack = () => {
    router.push('/welcome/4-theme');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'welcome_buttons_completed', {
        event_category: 'onboarding',
        button_style: profileData.button_style
      });
    }
    
    router.push('/welcome/6-links');
  };

  const buttonStyleOptions = getButtonStyleOptions(t);
  const canProceed = !!(profileData.button_style && profileData.button_color && profileData.button_text_color);
  const exampleButtonStyles = getButtonStyles(profileData as unknown as import('@/app/utils/styleUtils').ProfileData);

  // Paleta de blanco a negro
  const grayscalePalette = [
    '#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000'
  ];

  // Paleta de colores del degradado
  const getGradientPalette = () => {
    let startColor = '#FFFFFF';
    let endColor = '#000000';

    if (profileData.theme === 'custom' && profileData.custom_gradient_start && profileData.custom_gradient_end) {
      startColor = profileData.custom_gradient_start;
      endColor = profileData.custom_gradient_end;
    } else if (profileData.theme) {
      const selectedTheme = predefinedThemes.find(t => t.id === profileData.theme);
      if (selectedTheme) {
        startColor = selectedTheme.start;
        endColor = selectedTheme.end;
      }
    }

    const palette = [];
    for (let i = 0; i <= 4; i++) { // 5 colores intermedios
      palette.push(interpolateColor(startColor, endColor, i / 4));
    }
    return palette;
  };

  const gradientPalette = getGradientPalette();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('welcome.buttons.back')}
          </button>

          <div className="inline-flex items-center bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Settings className="w-4 h-4 mr-2" />
            {t('welcome.buttons.step')} 5 {t('welcome.buttons.of')} 7
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome.buttons.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('welcome.buttons.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.buttons.progress')}</span>
            <span className="text-sm font-medium text-gray-700">71%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: '71%' }}
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
                      {t('welcome.buttons.livePreview')}
                    </span>
                  </div>
                  <LivePreview profileData={{...profileData, slug: 'preview'} as unknown as import('@/app/utils/styleUtils').ProfileData} />
                </div>
              </div>

              {/* Button Customization */}
              <div className="lg:w-2/3 p-8">
          
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Tab Navigation */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => setActiveTab('quick')}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'quick' 
                          ? 'bg-white text-orange-700 shadow-sm' 
                          : 'bg-transparent text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t('welcome.buttons.quickTab')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('advanced')}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'advanced' 
                          ? 'bg-white text-orange-700 shadow-sm' 
                          : 'bg-transparent text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <Sliders className="w-4 h-4 mr-2" />
                      {t('welcome.buttons.advancedTab')}
                    </button>
                  </div>

                  {/* Quick Setup Tab */}
                  {activeTab === 'quick' && (
                    <div className="space-y-8">
                      {/* Button Styles */}
                      <div>
                        <div className="flex items-center mb-6">
                          <MousePointer className="w-5 h-5 text-orange-600 mr-2" />
                          <h3 className="text-xl font-semibold text-gray-800">{t('welcome.buttons.styleTitle')}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{t('welcome.buttons.styleDesc')}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {buttonStyleOptions.map((style) => (
                            <div
                              key={style.id}
                              onClick={() => updateProfileData({ button_style: style.id })}
                              className={`group relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                profileData.button_style === style.id
                                  ? 'border-orange-500 bg-orange-50 scale-105'
                                  : 'border-gray-200 bg-white hover:border-orange-300 hover:scale-102'
                              }`}
                            >
                              <div className="text-center">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                                  profileData.button_style === style.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                                }`}>
                                  {style.icon}
                                </div>
                                <h4 className={`font-semibold mb-2 transition-colors ${
                                  profileData.button_style === style.id ? 'text-orange-900' : 'text-gray-900'
                                }`}>
                                  {style.name}
                                </h4>
                                <p className={`text-sm transition-colors ${
                                  profileData.button_style === style.id ? 'text-orange-700' : 'text-gray-600'
                                }`}>
                                  {style.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Color Palettes */}
                      <div>
                        <div className="flex items-center mb-6">
                          <Palette className="w-5 h-5 text-pink-600 mr-2" />
                          <h3 className="text-xl font-semibold text-gray-800">{t('welcome.buttons.colorsTitle')}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{t('welcome.buttons.colorsDesc')}</p>
                        
                        <div className="space-y-6">
                          {/* Suggested Colors */}
                          <div>
                            <h4 className="text-lg font-medium text-gray-800 mb-4">{t('welcome.buttons.suggestedColors')}</h4>
                            <div className="flex flex-wrap gap-3">
                              {grayscalePalette.map(color => (
                                <button
                                  key={color}
                                  type="button"
                                  className={`w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                                    profileData.button_color === color 
                                      ? 'border-orange-500 ring-2 ring-orange-200' 
                                      : 'border-gray-300 hover:border-orange-300'
                                  }`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => updateProfileData({ button_color: color })}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                          
                          {/* Theme Colors */}
                          <div>
                            <h4 className="text-lg font-medium text-gray-800 mb-4">{t('welcome.buttons.themeColors')}</h4>
                            <div className="flex flex-wrap gap-3">
                              {gradientPalette.map(color => (
                                <button
                                  key={color}
                                  type="button"
                                  className={`w-12 h-12 rounded-xl border-2 transition-all duration-200 hover:scale-110 ${
                                    profileData.button_color === color 
                                      ? 'border-orange-500 ring-2 ring-orange-200' 
                                      : 'border-gray-300 hover:border-orange-300'
                                  }`}
                                  style={{ backgroundColor: color }}
                                  onClick={() => updateProfileData({ button_color: color })}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Button Preview */}
                      <div>
                        <div className="flex items-center mb-6">
                          <Eye className="w-5 h-5 text-purple-600 mr-2" />
                          <h3 className="text-xl font-semibold text-gray-800">{t('welcome.buttons.previewTitle')}</h3>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-8 flex justify-center">
                          <button
                            className={getButtonClasses(profileData.button_style)}
                            style={exampleButtonStyles}
                          >
                            {t('welcome.buttons.exampleButton')}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Advanced Tab */}
                  {activeTab === 'advanced' && (
                    <div className="space-y-8">
                      <div className="flex items-center mb-6">
                        <Wand2 className="w-5 h-5 text-purple-600 mr-2" />
                        <h3 className="text-xl font-semibold text-gray-800">{t('welcome.buttons.advancedTitle')}</h3>
                      </div>
                      <p className="text-gray-600 mb-6">{t('welcome.buttons.advancedDesc')}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <h4 className="text-lg font-medium text-gray-900">{t('welcome.buttons.colorsAndAppearance')}</h4>
                          <div className="space-y-2 border-b border-gray-100 pb-4">
                            <h5 className="text-base font-medium text-gray-800">{t('welcome.buttons.background')}</h5>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_color" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.color')}</label>
                              <input
                                type="color"
                                id="button_color"
                                value={profileData.button_color || '#000000'}
                                onChange={e => updateProfileData({ button_color: e.target.value })}
                                className="w-12 h-12 p-0 border-2 border-gray-300 rounded-lg cursor-pointer"
                              />
                              <input
                                type="text"
                                value={profileData.button_color || ''}
                                onChange={e => updateProfileData({ button_color: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="#000000"
                              />
                            </div>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_background_opacity" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.opacity')}</label>
                              <input
                                type="range"
                                id="button_background_opacity"
                                min="0" max="100" step="1"
                                value={((profileData as any).button_background_opacity ?? 1) * 100}
                                onChange={e => updateProfileData({ button_background_opacity: parseFloat(e.target.value) / 100 } as any)}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="text-sm text-gray-600 w-12 text-right">{(((profileData as any).button_background_opacity ?? 1) * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="space-y-2 border-b border-gray-100 pb-4">
                            <h5 className="text-base font-medium text-gray-800">{t('welcome.buttons.text')}</h5>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_text_color" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.color')}</label>
                              <input
                                type="color"
                                id="button_text_color"
                                value={profileData.button_text_color || '#FFFFFF'}
                                onChange={e => updateProfileData({ button_text_color: e.target.value })}
                                className="w-12 h-12 p-0 border-2 border-gray-300 rounded-lg cursor-pointer"
                              />
                              <input
                                type="text"
                                value={profileData.button_text_color || ''}
                                onChange={e => updateProfileData({ button_text_color: e.target.value })}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="#FFFFFF"
                              />
                            </div>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_text_opacity" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.opacity')}</label>
                              <input
                                type="range"
                                id="button_text_opacity"
                                min="0" max="100" step="1"
                                value={((profileData as any).button_text_opacity ?? 1) * 100}
                                onChange={e => updateProfileData({ button_text_opacity: parseFloat(e.target.value) / 100 } as any)}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="text-sm text-gray-600 w-12 text-right">{(((profileData as any).button_text_opacity ?? 1) * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="space-y-2 border-b border-gray-100 pb-4">
                            <h5 className="text-base font-medium text-gray-800">{t('welcome.buttons.border')}</h5>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_border_color" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.color')}</label>
                              <input
                                type="color"
                                id="button_border_color"
                                value={(profileData as any).button_border_color || '#000000'}
                                onChange={e => updateProfileData({ button_border_color: e.target.value } as any)}
                                className="w-12 h-12 p-0 border-2 border-gray-300 rounded-lg cursor-pointer"
                              />
                              <input
                                type="text"
                                value={(profileData as any).button_border_color || ''}
                                onChange={e => updateProfileData({ button_border_color: e.target.value } as any)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="#000000"
                              />
                            </div>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_border_opacity" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.opacity')}</label>
                              <input
                                type="range"
                                id="button_border_opacity"
                                min="0" max="100" step="1"
                                value={((profileData as any).button_border_opacity ?? 1) * 100}
                                onChange={e => updateProfileData({ button_border_opacity: parseFloat(e.target.value) / 100 } as any)}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="text-sm text-gray-600 w-12 text-right">{(((profileData as any).button_border_opacity ?? 1) * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h5 className="text-base font-medium text-gray-800">{t('welcome.buttons.shadow')}</h5>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_shadow_color" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.color')}</label>
                              <input
                                type="color"
                                id="button_shadow_color"
                                value={(profileData as any).button_shadow_color || '#000000'}
                                onChange={e => updateProfileData({ button_shadow_color: e.target.value } as any)}
                                className="w-12 h-12 p-0 border-2 border-gray-300 rounded-lg cursor-pointer"
                              />
                              <input
                                type="text"
                                value={(profileData as any).button_shadow_color || ''}
                                onChange={e => updateProfileData({ button_shadow_color: e.target.value } as any)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="#000000"
                              />
                            </div>
                            <div className="flex items-center space-x-3">
                              <label htmlFor="button_shadow_opacity" className="text-sm font-medium text-gray-600 w-20">{t('welcome.buttons.opacity')}</label>
                              <input
                                type="range"
                                id="button_shadow_opacity"
                                min="0" max="100" step="1"
                                value={((profileData as any).button_shadow_opacity ?? 1) * 100}
                                onChange={e => updateProfileData({ button_shadow_opacity: parseFloat(e.target.value) / 100 } as any)}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                              <span className="text-sm text-gray-600 w-12 text-right">{(((profileData as any).button_shadow_opacity ?? 1) * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <h4 className="text-lg font-medium text-gray-900">{t('welcome.buttons.shapeAndStyle')}</h4>
                          
                          <div className="space-y-3">
                            {buttonStyleOptions.map(style => (
                              <div
                                key={style.id}
                                onClick={() => updateProfileData({ button_style: style.id })}
                                className={`p-4 border-2 cursor-pointer transition-all duration-300 flex items-center space-x-3 ${
                                  style.id
                                } ${
                                  profileData.button_style === style.id 
                                    ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200' 
                                    : 'border-gray-300 hover:bg-gray-50 hover:border-orange-300'
                                }`}
                              >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  profileData.button_style === style.id
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {style.icon}
                                </div>
                                <div>
                                  <h5 className={`font-medium ${
                                    profileData.button_style === style.id ? 'text-orange-900' : 'text-gray-900'
                                  }`}>
                                    {style.name}
                                  </h5>
                                  <p className={`text-sm ${
                                    profileData.button_style === style.id ? 'text-orange-700' : 'text-gray-600'
                                  }`}>
                                    {style.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-6 p-6 bg-gray-50 rounded-xl flex justify-center items-center min-h-[120px]">
                            <button
                              className={getButtonClasses(profileData.button_style)}
                              style={exampleButtonStyles}
                            >
                              {t('welcome.buttons.exampleButton')}
                            </button>
                          </div>
                        </div>
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
                          ? 'bg-gradient-to-r from-orange-600 to-pink-600 text-white hover:from-orange-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {t('welcome.buttons.continue')}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tips section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('welcome.buttons.tipsTitle')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.buttons.tip1Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.buttons.tip1Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MousePointer className="w-6 h-6 text-pink-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.buttons.tip2Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.buttons.tip2Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.buttons.tip3Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.buttons.tip3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
