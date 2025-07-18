'use client';

import React, { useState } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { getSocialIcon } from './SocialIcons';

interface SocialIconModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddIcon: (socialType: string, username: string, url: string) => void;
}

interface SocialNetwork {
  id: string;
  name: string;
  placeholder: string;
  urlPattern: string;
  color: string;
}

const socialNetworks: SocialNetwork[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    placeholder: 'tu_usuario',
    urlPattern: 'https://instagram.com/{username}',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    placeholder: 'tu.perfil',
    urlPattern: 'https://facebook.com/{username}',
    color: 'bg-blue-600'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    placeholder: 'tu_usuario',
    urlPattern: 'https://twitter.com/{username}',
    color: 'bg-gray-900'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    placeholder: 'tu-perfil',
    urlPattern: 'https://linkedin.com/in/{username}',
    color: 'bg-blue-700'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    placeholder: 'tu_canal',
    urlPattern: 'https://youtube.com/@{username}',
    color: 'bg-red-600'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    placeholder: 'tu_usuario',
    urlPattern: 'https://tiktok.com/@{username}',
    color: 'bg-black'
  },
  {
    id: 'github',
    name: 'GitHub',
    placeholder: 'tu_usuario',
    urlPattern: 'https://github.com/{username}',
    color: 'bg-gray-800'
  },
  {
    id: 'discord',
    name: 'Discord',
    placeholder: 'URL del servidor',
    urlPattern: '{username}',
    color: 'bg-indigo-600'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    placeholder: 'tu_canal',
    urlPattern: 'https://twitch.tv/{username}',
    color: 'bg-purple-600'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    placeholder: 'URL de tu perfil',
    urlPattern: '{username}',
    color: 'bg-green-600'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    placeholder: '+1234567890',
    urlPattern: 'https://wa.me/{username}',
    color: 'bg-green-500'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    placeholder: 'tu_usuario',
    urlPattern: 'https://t.me/{username}',
    color: 'bg-blue-500'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    placeholder: 'tu_usuario',
    urlPattern: 'https://snapchat.com/add/{username}',
    color: 'bg-yellow-400'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    placeholder: 'tu_usuario',
    urlPattern: 'https://pinterest.com/{username}',
    color: 'bg-red-500'
  },
  {
    id: 'behance',
    name: 'Behance',
    placeholder: 'tu_usuario',
    urlPattern: 'https://behance.net/{username}',
    color: 'bg-blue-500'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    placeholder: 'tu_usuario',
    urlPattern: 'https://dribbble.com/{username}',
    color: 'bg-pink-500'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    placeholder: 'tu_usuario',
    urlPattern: 'https://reddit.com/u/{username}',
    color: 'bg-orange-600'
  },
  {
    id: 'email',
    name: 'Email',
    placeholder: 'tu@email.com',
    urlPattern: 'mailto:{username}',
    color: 'bg-gray-600'
  },
  {
    id: 'website',
    name: 'Website',
    placeholder: 'https://tu-sitio.com',
    urlPattern: '{username}',
    color: 'bg-gray-700'
  }
];

const SocialIconModal: React.FC<SocialIconModalProps> = ({
  isOpen,
  onClose,
  onAddIcon,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetwork | null>(null);
  const [username, setUsername] = useState('');

  const filteredNetworks = socialNetworks.filter(network =>
    network.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectNetwork = (network: SocialNetwork) => {
    setSelectedNetwork(network);
    setUsername('');
  };

  const handleAddIcon = () => {
    if (selectedNetwork && username.trim()) {
      const finalUrl = selectedNetwork.urlPattern.replace('{username}', username.trim());
      onAddIcon(selectedNetwork.id, username.trim(), finalUrl);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedNetwork(null);
    setUsername('');
    setSearchTerm('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Añadir Icono Social</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {!selectedNetwork ? (
            <>
              {/* Buscador */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar red social..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Grid de iconos */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto">
                {filteredNetworks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => handleSelectNetwork(network)}
                    className={`${network.color} text-white p-4 rounded-lg hover:opacity-90 transition-opacity flex flex-col items-center justify-center gap-2 aspect-square`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getSocialIcon(network.id, 28, 'text-white')}
                    </div>
                    <span className="text-xs font-medium text-center">{network.name}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Formulario para ingresar usuario */}
              <div className="text-center mb-6">
                <div className={`${selectedNetwork.color} text-white p-6 rounded-lg inline-block mb-4`}>
                  <div className="w-12 h-12 flex items-center justify-center">
                    {getSocialIcon(selectedNetwork.id, 48, 'text-white')}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{selectedNetwork.name}</h3>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedNetwork.id === 'email' ? 'Email' : 
                   selectedNetwork.id === 'website' ? 'URL completa' :
                   selectedNetwork.id === 'discord' ? 'URL del servidor' :
                   selectedNetwork.id === 'spotify' ? 'URL de tu perfil' :
                   'Nombre de usuario'}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={selectedNetwork.placeholder}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {selectedNetwork.id === 'email' ? 'Ingresa tu dirección de email' :
                   selectedNetwork.id === 'website' ? 'Ingresa la URL completa de tu sitio web' :
                   selectedNetwork.id === 'discord' ? 'Ingresa la URL completa del servidor' :
                   selectedNetwork.id === 'spotify' ? 'Ingresa la URL completa de tu perfil' :
                   `Tu perfil será: ${selectedNetwork.urlPattern.replace('{username}', username || selectedNetwork.placeholder)}`}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedNetwork(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Volver
                </button>
                <button
                  onClick={handleAddIcon}
                  disabled={!username.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Añadir
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialIconModal;