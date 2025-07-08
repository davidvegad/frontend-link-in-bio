'use client';

import React from 'react';

// Interfaces
interface LinkData {
  id: number;
  title: string;
  url: string;
  type?: string;
  order?: number;
}

interface LinkManagerProps {
  socialLinks: Record<string, string>;
  customLinks: LinkData[];
  handleSocialLinkChange: (newSocialLinks: Record<string, string>) => void;
  handleCustomLinkChange: (id: number, field: 'title' | 'url', value: string) => void;
  addCustomLink: () => void;
  removeCustomLink: (id: number) => void;
}

// Data
const socialPlatforms = [
  { id: 'instagram', name: 'Instagram', placeholder: 'Tu usuario de Instagram' },
  { id: 'whatsapp', name: 'WhatsApp', placeholder: 'Tu número de WhatsApp' },
  { id: 'youtube', name: 'YouTube', placeholder: 'URL de tu canal de YouTube' },
  { id: 'tiktok', name: 'TikTok', placeholder: 'Tu usuario de TikTok' },
  { id: 'x', name: 'X (Twitter)', placeholder: 'Tu usuario de X' },
  { id: 'facebook', name: 'Facebook', placeholder: 'URL de tu perfil de Facebook' },
];

// Component
const LinkManager: React.FC<LinkManagerProps> = ({
  socialLinks,
  customLinks,
  handleSocialLinkChange,
  handleCustomLinkChange,
  addCustomLink,
  removeCustomLink,
}) => {

  const onSocialLinkChange = (platform: string, value: string) => {
    handleSocialLinkChange({ ...socialLinks, [platform]: value });
  };

  // Basic reordering. A more advanced implementation would use drag-and-drop.
  const moveCustomLink = (index: number, direction: 'up' | 'down') => {
    // This functionality would require updating the parent state and potentially the backend.
    // For now, it remains a UI placeholder.
    console.log("Moving link at index", index, direction);
  };

  return (
    <section id="links-section">
      <h2 className="text-2xl font-semibold mb-6">Gestión de Enlaces</h2>

      {/* Social Media Links */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Redes Sociales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map(platform => (
            <div key={platform.id}>
              <label htmlFor={platform.id} className="block text-sm font-medium text-gray-700 mb-1">{platform.name}</label>
              <input
                type="text"
                id={platform.id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={socialLinks[platform.id] || ''}
                onChange={(e) => onSocialLinkChange(platform.id, e.target.value)}
                placeholder={platform.placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Links */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Enlaces Personalizados</h3>
          <button 
            type="button" 
            onClick={addCustomLink} 
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 font-semibold"
          >
            + Añadir Enlace
          </button>
        </div>
        <div className="space-y-4">
          {(customLinks || []).map((link, index) => (
            <div key={link.id} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 p-3 border rounded-lg bg-gray-50">
              <div className="flex-grow w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => handleCustomLinkChange(link.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                  placeholder="Título del enlace"
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => handleCustomLinkChange(link.id, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
                  placeholder="https://ejemplo.com"
                />
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                {/* Reorder buttons (placeholder functionality) */}
                <button type="button" onClick={() => moveCustomLink(index, 'up')} disabled={index === 0} className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-40">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM4.22 6.22a.75.75 0 011.06 0L10 10.94l4.72-4.72a.75.75 0 111.06 1.06l-5.25 5.25a.75.75 0 01-1.06 0L4.22 7.28a.75.75 0 010-1.06z" clipRule="evenodd" transform="rotate(180 10 10)"></path></svg>
                </button>
                <button type="button" onClick={() => moveCustomLink(index, 'down')} disabled={index === customLinks.length - 1} className="p-1 text-gray-500 hover:text-gray-800 disabled:opacity-40">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a.75.75 0 01-.75-.75V4.75a.75.75 0 011.5 0v12.5a.75.75 0 01-.75.75zM4.22 13.78a.75.75 0 011.06 0L10 9.06l4.72 4.72a.75.75 0 11-1.06 1.06l-5.25-5.25a.75.75 0 01-1.06 0L4.22 12.72a.75.75 0 010-1.06z" clipRule="evenodd" transform="rotate(180 10 10)"></path></svg>
                </button>
                <button type="button" onClick={() => removeCustomLink(link.id)} className="p-1 text-red-500 hover:text-red-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinkManager;