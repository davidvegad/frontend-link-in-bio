'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import LivePreview from '@/app/components/LivePreview';

const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', placeholder: 'Tu usuario de Instagram' },
  { id: 'tiktok', name: 'TikTok', placeholder: 'Tu usuario de TikTok' },
  { id: 'whatsapp', name: 'WhatsApp', placeholder: 'Tu número de WhatsApp' },
  { id: 'youtube', name: 'YouTube', placeholder: 'URL de tu canal de YouTube' },
  { id: 'x', name: 'X (Twitter)', placeholder: 'Tu usuario de X' },
  { id: 'facebook', name: 'Facebook', placeholder: 'URL de tu perfil de Facebook' },
];

interface CustomLink {
  id: number;
  title: string;
  url: string;
}

export default function LinksPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();

  const handleSocialLinkChange = (platform: string, value: string) => {
    const social_links = { ...profileData.social_links, [platform]: value };
    updateProfileData({ social_links });
  };

  const addCustomLink = () => {
    const custom_links = [...(profileData.custom_links || []), { id: Date.now(), title: '', url: '' }];
    updateProfileData({ custom_links });
  };

  const handleCustomLinkChange = (id: number, field: 'title' | 'url', value: string) => {
    const custom_links = (profileData.custom_links || []).map(link => link.id === id ? { ...link, [field]: value } : link);
    updateProfileData({ custom_links });
  };

  const removeCustomLink = (id: number) => {
    const custom_links = (profileData.custom_links || []).filter(link => link.id !== id);
    updateProfileData({ custom_links });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/welcome/7-publish');
  };

  const allLinks = [
    ...(profileData.social_links ? Object.entries(profileData.social_links).map(([id, url]) => ({ id, title: id, url })) : []),
    ...(profileData.custom_links || []),
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-6xl mx-auto transform transition-all duration-500 hover:shadow-2xl flex flex-col lg:flex-row gap-12">
        
        {/* Columna de Vista Previa */}
        <div className="lg:w-1/3 flex justify-center items-start">
          <LivePreview profileData={{ ...profileData, custom_links: allLinks }} />
        </div>

        {/* Columna de Controles */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Añade tus Enlaces</h1>
          <p className="text-gray-600 mb-8 text-center">Conecta tus redes sociales y otros sitios importantes.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border-b pb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Redes Sociales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {socialPlatforms.map(platform => (
                  <div key={platform.id}>
                    <label htmlFor={platform.id} className="block text-sm font-medium text-gray-700 mb-1">{platform.name}</label>
                    <input
                      type="text"
                      id={platform.id}
                      value={profileData.social_links?.[platform.id] || ''}
                      onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={platform.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b pb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Enlaces Personalizados</h2>
                <button type="button" onClick={addCustomLink} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 font-semibold text-sm">+ Añadir Enlace</button>
              </div>
              <div className="space-y-4">
                {(profileData.custom_links || []).map(link => (
                  <div key={link.id} className="flex flex-col sm:flex-row items-center gap-2 p-3 border border-gray-200 rounded-lg bg-white shadow-sm">
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleCustomLinkChange(link.id, 'title', e.target.value)}
                      className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Título"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleCustomLinkChange(link.id, 'url', e.target.value)}
                      className="w-full sm:w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="https://ejemplo.com"
                    />
                    <button type="button" onClick={() => removeCustomLink(link.id)} className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors duration-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
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