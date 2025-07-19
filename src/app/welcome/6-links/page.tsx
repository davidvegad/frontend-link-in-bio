'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useProfile } from '../../../context/ProfileContext';
import { useTranslation } from '@/contexts/LanguageContext';
import LivePreview from '../../components/LivePreview';
import { useState, useEffect } from 'react';
import {
  Trash2,
  ArrowRight,
  ChevronLeft,
  Link as LinkIcon,
  Monitor,
  Plus,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  MessageCircle,
  Globe,
  ExternalLink,
  Eye,
  Users,
  Zap,
  Share2
} from 'lucide-react';

// Definición de la interfaz para un enlace unificado
interface Link {
  id?: number | string; // Puede ser un número del backend o un string temporal del frontend
  title: string;
  url: string;
  type: string; // 'generic', 'instagram', 'whatsapp', etc.
}

const getSocialPlatforms = (t: any) => [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    placeholder: t('welcome.links.instagram.placeholder'), 
    baseUrl: 'https://www.instagram.com/',
    icon: <Instagram className="w-5 h-5" />,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  { 
    id: 'tiktok', 
    name: 'TikTok', 
    placeholder: t('welcome.links.tiktok.placeholder'), 
    baseUrl: 'https://www.tiktok.com/@',
    icon: <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>,
    color: 'bg-black'
  },
  { 
    id: 'whatsapp', 
    name: 'WhatsApp', 
    placeholder: t('welcome.links.whatsapp.placeholder'),
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'bg-green-500'
  },
  { 
    id: 'youtube', 
    name: 'YouTube', 
    placeholder: t('welcome.links.youtube.placeholder'),
    icon: <Youtube className="w-5 h-5" />,
    color: 'bg-red-500'
  },
  { 
    id: 'x', 
    name: 'X (Twitter)', 
    placeholder: t('welcome.links.twitter.placeholder'), 
    baseUrl: 'https://twitter.com/',
    icon: <Twitter className="w-5 h-5" />,
    color: 'bg-gray-900'
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    placeholder: t('welcome.links.facebook.placeholder'),
    icon: <Facebook className="w-5 h-5" />,
    color: 'bg-blue-600'
  },
];

const countryCodes = [
    { code: 'US', dial_code: '+1', name: 'United States' },
    { code: 'ES', dial_code: '+34', name: 'España' },
    { code: 'MX', dial_code: '+52', name: 'México' },
    { code: 'AR', dial_code: '+54', name: 'Argentina' },
    { code: 'CO', dial_code: '+57', name: 'Colombia' },
    { code: 'PE', dial_code: '+51', name: 'Perú' },
    { code: 'CL', dial_code: '+56', name: 'Chile' },
    { code: 'EC', dial_code: '+593', name: 'Ecuador' },
    { code: 'GT', dial_code: '+502', name: 'Guatemala' },
    { code: 'SV', dial_code: '+503', name: 'El Salvador' },
    { code: 'HN', dial_code: '+504', name: 'Honduras' },
    { code: 'NI', dial_code: '+505', name: 'Nicaragua' },
    { code: 'CR', dial_code: '+506', name: 'Costa Rica' },
    { code: 'PA', dial_code: '+507', name: 'Panamá' },
    { code: 'DO', dial_code: '+1-809', name: 'República Dominicana' },
    { code: 'VE', dial_code: '+58', name: 'Venezuela' },
    { code: 'BO', dial_code: '+591', name: 'Bolivia' },
    { code: 'PY', dial_code: '+595', name: 'Paraguay' },
    { code: 'UY', dial_code: '+598', name: 'Uruguay' },
  ];

export default function LinksPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const { t } = useTranslation();
  const [links, setLinks] = useState<Link[]>(profileData.links || []);
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('+1');
  const [whatsappLocalNumber, setWhatsappLocalNumber] = useState('');
  const [activeTab, setActiveTab] = useState('social');

  // Sincronizar el estado local de enlaces con el contexto del perfil
  useEffect(() => {
    updateProfileData({ links });
  }, [links]);

  const handleSocialLinkChange = (platformId: string, value: string) => {
    const platform = socialPlatforms.find(p => p.id === platformId);
    if (!platform) return;

    let finalUrl = value;
    if (platform.baseUrl && value && !value.startsWith('http')) {
      finalUrl = `${platform.baseUrl}${value}`;
    }

    setLinks(prevLinks => {
      const existingLink = prevLinks.find(l => l.type === platformId);
      if (existingLink) {
        // Actualizar enlace social existente
        return prevLinks.map(l => l.type === platformId ? { ...l, url: finalUrl } : l);
      } else if (finalUrl) {
        // Añadir nuevo enlace social solo si hay una URL válida
        return [...prevLinks, { id: `social-${platformId}`, title: platform.name, url: finalUrl, type: platformId }];
      }
      return prevLinks;
    });
  };

  const handleWhatsappNumberChange = (value: string) => {
    // Solo mantener números
    const phoneNumber = value.replace(/[^0-9]/g, '');
    setWhatsappLocalNumber(phoneNumber);

    // Crear URL solo si hay número
    if (phoneNumber) {
      const finalUrl = `https://wa.me/${whatsappCountryCode.replace('+', '')}${phoneNumber}`;
      setLinks(prevLinks => {
        const existingLink = prevLinks.find(l => l.type === 'whatsapp');
        if (existingLink) {
          return prevLinks.map(l => l.type === 'whatsapp' ? { ...l, url: finalUrl } : l);
        } else {
          return [...prevLinks, { id: 'social-whatsapp', title: 'WhatsApp', url: finalUrl, type: 'whatsapp' }];
        }
      });
    } else {
      // Remover enlace si no hay número
      setLinks(prevLinks => prevLinks.filter(l => l.type !== 'whatsapp'));
    }
  };

  const handleWhatsappCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setWhatsappCountryCode(newCountryCode);

    // Actualizar URL si hay número local
    if (whatsappLocalNumber) {
      const newWhatsappUrl = `https://wa.me/${newCountryCode.replace('+', '')}${whatsappLocalNumber}`;
      setLinks(prevLinks => prevLinks.map(l => l.type === 'whatsapp' ? { ...l, url: newWhatsappUrl } : l));
    }
  };

  const addCustomLink = () => {
    setLinks(prevLinks => [...prevLinks, { id: `custom-${Date.now()}`, title: '', url: '', type: 'generic' }]);
  };

  const handleCustomLinkChange = (id: number | string, field: 'title' | 'url', value: string) => {
    setLinks(prevLinks => prevLinks.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  const removeLink = (id: number | string) => {
    setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
  };

  const handleBack = () => {
    router.push('/welcome/5-buttons');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtrar enlaces sin título o URL para no enviarlos al backend
    const validLinks = links.filter(link => link.title.trim() !== '' && link.url.trim() !== '');
    updateProfileData({ links: validLinks });
    
    // Track completion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'welcome_links_completed', {
        event_category: 'onboarding',
        total_links: validLinks.length,
        social_links: validLinks.filter(l => l.type !== 'generic').length,
        custom_links: validLinks.filter(l => l.type === 'generic').length
      });
    }
    
    router.push('/welcome/7-publish');
  };

  // Función para obtener el valor a mostrar en el input (sin baseUrl)
  const getDisplayValue = (link: Link | undefined, platform: any) => {
    if (!link || !link.url) return '';
    if (platform.id === 'whatsapp') {
        return whatsappLocalNumber;
    }
    return link.url.replace(platform.baseUrl || '', '');
  };

  // Inicializar el número local de WhatsApp al cargar
  useEffect(() => {
    const whatsappLink = links.find(l => l.type === 'whatsapp');
    if (whatsappLink && whatsappLink.url && !whatsappLocalNumber) {
      const match = whatsappLink.url.match(/https:\/\/wa\.me\/(\d+)/);
      if (match) {
        const fullNumber = match[1];
        const countryCodeDigits = whatsappCountryCode.replace(/[^0-9]/g, '');
        if (fullNumber.startsWith(countryCodeDigits)) {
          setWhatsappLocalNumber(fullNumber.substring(countryCodeDigits.length));
        } else {
          setWhatsappLocalNumber(fullNumber);
        }
      }
    }
  }, [links, whatsappCountryCode, whatsappLocalNumber]);

  const socialPlatforms = getSocialPlatforms(t);
  const canProceed = links.some(link => link.title.trim() !== '' && link.url.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('welcome.links.back')}
          </button>

          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <LinkIcon className="w-4 h-4 mr-2" />
            {t('welcome.links.step')} 6 {t('welcome.links.of')} 7
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('welcome.links.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('welcome.links.subtitle')}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{t('welcome.links.progress')}</span>
            <span className="text-sm font-medium text-gray-700">86%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: '86%' }}
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
                      {t('welcome.links.livePreview')}
                    </span>
                  </div>
                  <LivePreview profileData={{...profileData, slug: 'preview'} as unknown as import('@/app/utils/styleUtils').ProfileData} />
                </div>
              </div>

              {/* Links Configuration */}
              <div className="lg:w-2/3 p-8">
          
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Tab Navigation */}
                  <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                    <button
                      type="button"
                      onClick={() => setActiveTab('social')}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'social' 
                          ? 'bg-white text-blue-700 shadow-sm' 
                          : 'bg-transparent text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {t('welcome.links.socialTab')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('custom')}
                      className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeTab === 'custom' 
                          ? 'bg-white text-blue-700 shadow-sm' 
                          : 'bg-transparent text-gray-600 hover:bg-white/50'
                      }`}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('welcome.links.customTab')}
                    </button>
                  </div>

                  {/* Social Links Tab */}
                  {activeTab === 'social' && (
                    <div className="space-y-6">
                      <div className="flex items-center mb-6">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <h2 className="text-xl font-semibold text-gray-800">{t('welcome.links.socialTitle')}</h2>
                      </div>
                      <p className="text-gray-600 mb-6">{t('welcome.links.socialDesc')}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {socialPlatforms.map(platform => {
                          const currentLink = links.find(l => l.type === platform.id);
                          const isConnected = currentLink && currentLink.url;
                          
                          return (
                            <div key={platform.id} className={`relative p-4 border-2 rounded-xl transition-all duration-300 ${
                              isConnected ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white hover:border-blue-300'
                            }`}>
                              <div className="flex items-center mb-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white mr-3 ${platform.color}`}>
                                  {platform.icon}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-900">{platform.name}</h3>
                                  {isConnected && (
                                    <div className="text-xs text-green-600 flex items-center">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                      {t('welcome.links.connected')}
                                    </div>
                                  )}
                                </div>
                              </div>
                              
                              {platform.id === 'whatsapp' ? (
                                <div className="space-y-2">
                                  <select
                                    value={whatsappCountryCode}
                                    onChange={handleWhatsappCountryCodeChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                                  >
                                    {countryCodes.map(country => (
                                      <option key={country.code} value={country.dial_code}>
                                        {country.dial_code} {country.name}
                                      </option>
                                    ))}
                                  </select>
                                  <input
                                    type="tel"
                                    id={platform.id}
                                    value={getDisplayValue(currentLink, platform)}
                                    onChange={(e) => handleWhatsappNumberChange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder={platform.placeholder}
                                  />
                                </div>
                              ) : (
                                <input
                                  type="text"
                                  id={platform.id}
                                  value={getDisplayValue(currentLink, platform)}
                                  onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  placeholder={platform.placeholder}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Custom Links Tab */}
                  {activeTab === 'custom' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <Globe className="w-5 h-5 text-purple-600 mr-2" />
                          <h2 className="text-xl font-semibold text-gray-800">{t('welcome.links.customTitle')}</h2>
                        </div>
                        <button 
                          type="button" 
                          onClick={addCustomLink} 
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium text-sm transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {t('welcome.links.addLink')}
                        </button>
                      </div>
                      <p className="text-gray-600 mb-6">{t('welcome.links.customDesc')}</p>
                      
                      <div className="space-y-4">
                        {links.filter(l => l.type === 'generic').length === 0 ? (
                          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
                            <ExternalLink className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('welcome.links.noCustomLinks')}</h3>
                            <p className="text-gray-600 mb-4">{t('welcome.links.noCustomLinksDesc')}</p>
                            <button 
                              type="button" 
                              onClick={addCustomLink} 
                              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              {t('welcome.links.addFirstLink')}
                            </button>
                          </div>
                        ) : (
                          links.filter(l => l.type === 'generic').map((link, index) => (
                            <div key={link.id} className="p-4 border-2 border-gray-200 rounded-xl bg-white hover:border-purple-300 transition-colors">
                              <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <ExternalLink className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="flex-1 space-y-3">
                                  <input
                                    type="text"
                                    value={link.title}
                                    onChange={(e) => handleCustomLinkChange(link.id!, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder={t('welcome.links.titlePlaceholder')}
                                  />
                                  <input
                                    type="url"
                                    value={link.url}
                                    onChange={(e) => handleCustomLinkChange(link.id!, 'url', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder={t('welcome.links.urlPlaceholder')}
                                  />
                                </div>
                                <button 
                                  type="button" 
                                  onClick={() => removeLink(link.id!)} 
                                  className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Continue button */}
                  <div className="flex justify-center pt-8">
                    <button
                      type="submit"
                      className={`
                        inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300
                        ${canProceed
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }
                      `}
                    >
                      {t('welcome.links.continue')}
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
              {t('welcome.links.tipsTitle')}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.links.tip1Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.links.tip1Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.links.tip2Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.links.tip2Desc')}</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{t('welcome.links.tip3Title')}</h4>
              <p className="text-sm text-gray-600">{t('welcome.links.tip3Desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}