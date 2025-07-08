'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Añade tus Enlaces</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Redes Sociales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map(platform => (
                <div key={platform.id}>
                  <label htmlFor={platform.id} className="block text-sm font-medium text-gray-700">{platform.name}</label>
                  <input
                    type="text"
                    id={platform.id}
                    value={profileData.social_links?.[platform.id] || ''}
                    onChange={(e) => handleSocialLinkChange(platform.id, e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder={platform.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Enlaces Personalizados</h2>
              <button type="button" onClick={addCustomLink} className="text-indigo-600 hover:text-indigo-800 font-semibold">+ Añadir Enlace</button>
            </div>
            <div className="space-y-4">
              {(profileData.custom_links || []).map(link => (
                <div key={link.id} className="flex items-center space-x-2 p-2 border rounded-md">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) => handleCustomLinkChange(link.id, 'title', e.target.value)}
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Título"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => handleCustomLinkChange(link.id, 'url', e.target.value)}
                    className="w-2/3 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="https://ejemplo.com"
                  />
                  <button type="button" onClick={() => removeCustomLink(link.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
