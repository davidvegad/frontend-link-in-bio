'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import LivePreview from '@/app/components/LivePreview';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

// Definición de la interfaz para un enlace unificado
interface Link {
  id?: number | string; // Puede ser un número del backend o un string temporal del frontend
  title: string;
  url: string;
  type: string; // 'generic', 'instagram', 'whatsapp', etc.
}

const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', placeholder: 'Tu usuario de Instagram', baseUrl: 'https://www.instagram.com/' },
  { id: 'tiktok', name: 'TikTok', placeholder: 'Tu usuario de TikTok', baseUrl: 'https://www.tiktok.com/@' },
  { id: 'whatsapp', name: 'WhatsApp', placeholder: 'Tu número de WhatsApp' },
  { id: 'youtube', name: 'YouTube', placeholder: 'URL de tu canal de YouTube' },
  { id: 'x', name: 'X (Twitter)', placeholder: 'Tu usuario de X', baseUrl: 'https://twitter.com/' },
  { id: 'facebook', name: 'Facebook', placeholder: 'URL de tu perfil de Facebook' },
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
  const [links, setLinks] = useState<Link[]>(profileData.links || []);
  const [whatsappCountryCode, setWhatsappCountryCode] = useState('+1');

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
    } else if (platformId === 'whatsapp' && value) {
      const phoneNumber = value.replace(/[^0-9]/g, '');
      finalUrl = `https://wa.me/${whatsappCountryCode.replace('+', '')}${phoneNumber}`;
    }

    setLinks(prevLinks => {
      const existingLink = prevLinks.find(l => l.type === platformId);
      if (existingLink) {
        // Actualizar enlace social existente
        return prevLinks.map(l => l.type === platformId ? { ...l, url: finalUrl } : l);
      } else {
        // Añadir nuevo enlace social
        return [...prevLinks, { id: `social-${platformId}`, title: platform.name, url: finalUrl, type: platformId }];
      }
    });
  };

  const handleWhatsappCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setWhatsappCountryCode(newCountryCode);

    const whatsappLink = links.find(l => l.type === 'whatsapp');
    if (whatsappLink) {
        const currentUrl = whatsappLink.url;
        const numberMatch = currentUrl.match(/\d+$/);
        if (numberMatch) {
            const phoneNumber = numberMatch[0];
            const newWhatsappUrl = `https://wa.me/${newCountryCode.replace('+', '')}${phoneNumber}`;
            setLinks(prevLinks => prevLinks.map(l => l.type === 'whatsapp' ? { ...l, url: newWhatsappUrl } : l));
        }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtrar enlaces sin título o URL para no enviarlos al backend
    const validLinks = links.filter(link => link.title.trim() !== '' && link.url.trim() !== '');
    updateProfileData({ links: validLinks });
    router.push('/welcome/7-publish');
  };

  // Función para obtener el valor a mostrar en el input (sin baseUrl)
  const getDisplayValue = (link: Link | undefined, platform: any) => {
    if (!link || !link.url) return '';
    if (platform.id === 'whatsapp') {
        const match = link.url.match(/\d+$/);
        return match ? match[0] : '';
    }
    return link.url.replace(platform.baseUrl || '', '');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-6xl mx-auto transform transition-all duration-500 hover:shadow-2xl flex flex-col lg:flex-row gap-12">
        
        <div className="lg:w-1/3 flex justify-center items-start">
          <LivePreview profileData={{...profileData, slug: 'preview'} as unknown as import('@/app/utils/styleUtils').ProfileData} />
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Añade tus Enlaces</h1>
          <p className="text-gray-600 mb-8 text-center">Conecta tus redes sociales y otros sitios importantes.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border-b pb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Redes Sociales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialPlatforms.map(platform => {
                  const currentLink = links.find(l => l.type === platform.id);
                  return (
                    <div key={platform.id}>
                      <label htmlFor={platform.id} className="block text-sm font-medium text-gray-700 mb-1">{platform.name}</label>
                      {platform.id === 'whatsapp' ? (
                        <div className="flex">
                          <select
                            value={whatsappCountryCode}
                            onChange={handleWhatsappCountryCodeChange}
                            className="px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            {countryCodes.map(country => (
                              <option key={country.code} value={country.dial_code}>
                                {country.dial_code} ({country.code})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            id={platform.id}
                            value={getDisplayValue(currentLink, platform)}
                            onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder={platform.placeholder}
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          id={platform.id}
                          value={getDisplayValue(currentLink, platform)}
                          onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder={platform.placeholder}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-b pb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Enlaces Personalizados</h2>
                <button type="button" onClick={addCustomLink} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold text-sm">+ Añadir Enlace</button>
              </div>
              <div className="space-y-4">
                {links.filter(l => l.type === 'generic').map(link => (
                  <div key={link.id} className="flex flex-col sm:flex-row items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleCustomLinkChange(link.id!, 'title', e.target.value)}
                      className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Título"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleCustomLinkChange(link.id!, 'url', e.target.value)}
                      className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://ejemplo.com"
                    />
                    <button type="button" onClick={() => removeLink(link.id!)} className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-200">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-full max-w-xs bg-[#b013a3] text-white py-3 px-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md border-2 border-transparent hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b013a3]"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}