'use client';

import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Filter, Star, Globe, MessageCircle, Camera, Code, Music, Users, ChevronLeft, Phone, Link } from 'lucide-react';
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
  category: 'popular' | 'social' | 'messaging' | 'creative' | 'professional' | 'gaming' | 'music' | 'other';
  description?: string;
}

const socialNetworks: SocialNetwork[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    placeholder: 'tu_usuario',
    urlPattern: 'https://instagram.com/{username}',
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    category: 'popular',
    description: 'Comparte fotos y videos'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    placeholder: 'tu.perfil',
    urlPattern: 'https://facebook.com/{username}',
    color: 'bg-blue-600',
    category: 'popular',
    description: 'Red social principal'
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    placeholder: 'tu_usuario',
    urlPattern: 'https://twitter.com/{username}',
    color: 'bg-gray-900',
    category: 'popular',
    description: 'Microblogging y noticias'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    placeholder: 'tu-perfil',
    urlPattern: 'https://linkedin.com/in/{username}',
    color: 'bg-blue-700',
    category: 'professional',
    description: 'Red profesional'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    placeholder: 'tu_canal',
    urlPattern: 'https://youtube.com/@{username}',
    color: 'bg-red-600',
    category: 'popular',
    description: 'Videos y contenido'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    placeholder: 'tu_usuario',
    urlPattern: 'https://tiktok.com/@{username}',
    color: 'bg-black',
    category: 'popular',
    description: 'Videos cortos'
  },
  {
    id: 'github',
    name: 'GitHub',
    placeholder: 'tu_usuario',
    urlPattern: 'https://github.com/{username}',
    color: 'bg-gray-800',
    category: 'professional',
    description: 'Código y proyectos'
  },
  {
    id: 'discord',
    name: 'Discord',
    placeholder: 'URL del servidor',
    urlPattern: '{username}',
    color: 'bg-indigo-600',
    category: 'gaming',
    description: 'Chat de gaming'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    placeholder: 'tu_canal',
    urlPattern: 'https://twitch.tv/{username}',
    color: 'bg-purple-600',
    category: 'gaming',
    description: 'Streaming en vivo'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    placeholder: 'URL de tu perfil',
    urlPattern: '{username}',
    color: 'bg-green-600',
    category: 'music',
    description: 'Música y playlists'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    placeholder: '+1234567890',
    urlPattern: 'https://wa.me/{username}',
    color: 'bg-green-500',
    category: 'popular',
    description: 'Mensajería directa'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    placeholder: 'tu_usuario',
    urlPattern: 'https://t.me/{username}',
    color: 'bg-blue-500',
    category: 'messaging',
    description: 'Chat y canales'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    placeholder: 'tu_usuario',
    urlPattern: 'https://snapchat.com/add/{username}',
    color: 'bg-yellow-400',
    category: 'social',
    description: 'Fotos temporales'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    placeholder: 'tu_usuario',
    urlPattern: 'https://pinterest.com/{username}',
    color: 'bg-red-500',
    category: 'creative',
    description: 'Ideas e inspiración'
  },
  {
    id: 'behance',
    name: 'Behance',
    placeholder: 'tu_usuario',
    urlPattern: 'https://behance.net/{username}',
    color: 'bg-blue-500',
    category: 'creative',
    description: 'Portfolio creativo'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    placeholder: 'tu_usuario',
    urlPattern: 'https://dribbble.com/{username}',
    color: 'bg-pink-500',
    category: 'creative',
    description: 'Diseño y arte'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    placeholder: 'tu_usuario',
    urlPattern: 'https://reddit.com/u/{username}',
    color: 'bg-orange-600',
    category: 'social',
    description: 'Comunidades y foros'
  },
  {
    id: 'email',
    name: 'Email',
    placeholder: 'tu@email.com',
    urlPattern: 'mailto:{username}',
    color: 'bg-gray-600',
    category: 'other',
    description: 'Contacto directo'
  },
  {
    id: 'website',
    name: 'Website',
    placeholder: 'https://tu-sitio.com',
    urlPattern: '{username}',
    color: 'bg-gray-700',
    category: 'other',
    description: 'Tu sitio web'
  }
];

// Códigos de país para WhatsApp
const countryCodes = [
  { code: '+1', country: 'Estados Unidos/Canadá', flag: '🇺🇸' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: '+33', country: 'Francia', flag: '🇫🇷' },
  { code: '+49', country: 'Alemania', flag: '🇩🇪' },
  { code: '+39', country: 'Italia', flag: '🇮🇹' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+7', country: 'Rusia', flag: '🇷🇺' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+81', country: 'Japón', flag: '🇯🇵' },
  { code: '+82', country: 'Corea del Sur', flag: '🇰🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+27', country: 'Sudáfrica', flag: '🇿🇦' },
];

// Categorías con sus íconos y nombres
const categories = [
  { id: 'popular', name: 'Populares', icon: Star, color: 'text-yellow-600' },
  { id: 'social', name: 'Social', icon: Users, color: 'text-blue-600' },
  { id: 'messaging', name: 'Mensajes', icon: MessageCircle, color: 'text-green-600' },
  { id: 'creative', name: 'Creativos', icon: Camera, color: 'text-purple-600' },
  { id: 'professional', name: 'Profesional', icon: Code, color: 'text-gray-600' },
  { id: 'gaming', name: 'Gaming', icon: Users, color: 'text-indigo-600' },
  { id: 'music', name: 'Música', icon: Music, color: 'text-pink-600' },
  { id: 'other', name: 'Otros', icon: Globe, color: 'text-gray-500' },
];

const SocialIconModal: React.FC<SocialIconModalProps> = ({
  isOpen,
  onClose,
  onAddIcon,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('popular');
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetwork | null>(null);
  const [username, setUsername] = useState('');
  const [validationError, setValidationError] = useState<string>('');
  
  // Estados específicos para WhatsApp
  const [whatsappInputType, setWhatsappInputType] = useState<'phone' | 'url'>('phone');
  const [selectedCountryCode, setSelectedCountryCode] = useState('+34'); // España por defecto
  const [phoneNumber, setPhoneNumber] = useState('');

  const filteredNetworks = useMemo(() => {
    let networks = socialNetworks;
    
    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      networks = networks.filter(network => network.category === selectedCategory);
    }
    
    // Filtrar por búsqueda
    if (searchTerm) {
      networks = networks.filter(network =>
        network.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return networks;
  }, [searchTerm, selectedCategory]);

  const handleSelectNetwork = (network: SocialNetwork) => {
    setSelectedNetwork(network);
    setUsername('');
    setValidationError('');
    
    // Reset WhatsApp specific states
    if (network.id === 'whatsapp') {
      setWhatsappInputType('phone');
      setPhoneNumber('');
      setSelectedCountryCode('+34');
    }
  };

  // Validación de URLs
  const validateUrl = (network: SocialNetwork, input: string): string => {
    const trimmedInput = input.trim();
    
    if (!trimmedInput) return 'Este campo es obligatorio';
    
    // Validaciones específicas por tipo de red
    switch (network.id) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedInput)) return 'Email no válido';
        break;
      case 'website':
      case 'discord':
      case 'spotify':
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(trimmedInput)) return 'Debe incluir http:// o https://';
        break;
      case 'whatsapp':
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(trimmedInput.replace(/\s+/g, ''))) return 'Número de teléfono no válido';
        break;
      default:
        // Validación básica para nombres de usuario
        if (trimmedInput.length < 2) return 'Mínimo 2 caracteres';
        if (trimmedInput.includes(' ')) return 'No debe contener espacios';
        if (!/^[a-zA-Z0-9._-]+$/.test(trimmedInput)) return 'Solo letras, números, puntos, guiones';
    }
    
    return '';
  };

  const handleAddIcon = () => {
    if (!selectedNetwork) return;
    
    let finalUsername = '';
    let finalUrl = '';
    
    if (selectedNetwork.id === 'whatsapp') {
      if (whatsappInputType === 'phone') {
        if (!phoneNumber.trim()) {
          setValidationError('Ingresa tu número de WhatsApp');
          return;
        }
        
        // Validar número de teléfono
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
          setValidationError('El número solo debe contener dígitos');
          return;
        }
        
        finalUsername = `${selectedCountryCode}${phoneNumber.replace(/\s+/g, '')}`;
        finalUrl = `https://wa.me/${selectedCountryCode.replace('+', '')}${phoneNumber.replace(/\s+/g, '')}`;
      } else {
        if (!username.trim()) {
          setValidationError('Ingresa la URL de WhatsApp');
          return;
        }
        
        // Validar URL de WhatsApp
        const whatsappUrlRegex = /^https:\/\/wa\.me\/.+/;
        if (!whatsappUrlRegex.test(username.trim())) {
          setValidationError('La URL debe tener el formato: https://wa.me/...');
          return;
        }
        
        finalUsername = username.trim();
        finalUrl = username.trim();
      }
    } else {
      if (!username.trim()) {
        setValidationError('Este campo es obligatorio');
        return;
      }
      
      const error = validateUrl(selectedNetwork, username);
      if (error) {
        setValidationError(error);
        return;
      }
      
      finalUsername = username.trim();
      finalUrl = selectedNetwork.urlPattern.replace('{username}', username.trim());
    }
    
    onAddIcon(selectedNetwork.id, finalUsername, finalUrl);
    handleClose();
  };

  const handleClose = () => {
    setSelectedNetwork(null);
    setUsername('');
    setSearchTerm('');
    setValidationError('');
    setSelectedCategory('popular');
    
    // Reset WhatsApp specific states
    setWhatsappInputType('phone');
    setPhoneNumber('');
    setSelectedCountryCode('+34');
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Añadir Red Social</h2>
            <p className="text-gray-600 text-sm mt-1">Conecta tus redes sociales para expandir tu alcance</p>
          </div>
          <button 
            onClick={handleClose} 
            className="text-gray-500 hover:text-gray-700 hover:bg-white rounded-full p-2 transition-all duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(95vh-140px)]">
          {!selectedNetwork ? (
            <>
              {/* Buscador mejorado */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar red social por nombre o descripción..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
                />
              </div>

              {/* Filtros por categoría */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 mr-2 ${category.color}`} />
                        {category.name}
                        <span className="ml-2 bg-white text-gray-500 text-xs px-2 py-0.5 rounded-full">
                          {socialNetworks.filter(n => n.category === category.id).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid de iconos mejorado */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                {filteredNetworks.map((network) => (
                  <button
                    key={network.id}
                    onClick={() => handleSelectNetwork(network)}
                    className={`${network.color} text-white p-6 rounded-2xl hover:opacity-90 hover:scale-105 transition-all duration-200 flex flex-col items-center justify-center gap-3 aspect-square group shadow-lg`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      {getSocialIcon(network.id, 32, 'text-white')}
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-bold block">{network.name}</span>
                      <span className="text-xs opacity-90 block mt-1">{network.description}</span>
                    </div>
                  </button>
                ))}
              </div>

              {filteredNetworks.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron redes sociales</h3>
                  <p className="text-gray-600">Intenta con otros términos de búsqueda o cambia de categoría</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Formulario mejorado para ingresar usuario */}
              <div className="text-center mb-4">
                <div className={`${selectedNetwork.color} text-white p-4 rounded-xl inline-block mb-3 shadow-lg group hover:scale-105 transition-all duration-300`}>
                  <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {getSocialIcon(selectedNetwork.id, 40, 'text-white')}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{selectedNetwork.name}</h3>
                <p className="text-sm text-gray-600">{selectedNetwork.description}</p>
              </div>

              {/* Formulario específico para WhatsApp */}
              {selectedNetwork.id === 'whatsapp' ? (
                <div className="mb-6 space-y-4">
                  {/* Selector de tipo de entrada */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">¿Cómo quieres agregar tu WhatsApp?</h4>
                    <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          setWhatsappInputType('phone');
                          setValidationError('');
                        }}
                        className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          whatsappInputType === 'phone'
                            ? 'bg-white text-green-700 shadow-sm ring-2 ring-green-200'
                            : 'bg-transparent text-gray-600 hover:bg-white/50'
                        }`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Por Número
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setWhatsappInputType('url');
                          setValidationError('');
                        }}
                        className={`flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          whatsappInputType === 'url'
                            ? 'bg-white text-green-700 shadow-sm ring-2 ring-green-200'
                            : 'bg-transparent text-gray-600 hover:bg-white/50'
                        }`}
                      >
                        <Link className="w-4 h-4 mr-2" />
                        Por URL
                      </button>
                    </div>
                  </div>

                  {/* Input por número de teléfono */}
                  {whatsappInputType === 'phone' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Número de WhatsApp
                      </label>
                      
                      <div className="space-y-3">
                        {/* Selector de código de país */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Código de País</label>
                          <select
                            value={selectedCountryCode}
                            onChange={(e) => setSelectedCountryCode(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 bg-white"
                          >
                            {countryCodes.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.code} - {country.country}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Input del número */}
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Número de Teléfono</label>
                          <div className="relative">
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => {
                                // Solo permitir números
                                const value = e.target.value.replace(/[^0-9]/g, '');
                                setPhoneNumber(value);
                                if (validationError) {
                                  setValidationError('');
                                }
                              }}
                              placeholder="123456789"
                              className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 ${
                                validationError 
                                  ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                                  : 'border-gray-300 bg-white focus:ring-green-200 focus:border-green-500'
                              } focus:outline-none focus:ring-2`}
                            />
                            
                            {/* Icono de estado */}
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              {validationError ? (
                                <span className="text-red-500 text-sm">⚠️</span>
                              ) : phoneNumber.trim() && /^[0-9]+$/.test(phoneNumber) ? (
                                <span className="text-green-500 text-sm">✅</span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        {/* Vista previa del número completo */}
                        {phoneNumber && (
                          <div className="p-2 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <span className="text-green-600 text-xs">📱</span>
                              <span className="text-xs font-medium text-green-800">
                                Número completo: {selectedCountryCode}{phoneNumber}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Input por URL */}
                  {whatsappInputType === 'url' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        URL de WhatsApp
                      </label>
                      
                      <div className="relative">
                        <input
                          type="url"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            if (validationError) {
                              setValidationError('');
                            }
                          }}
                          placeholder="https://wa.me/34123456789"
                          className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 ${
                            validationError 
                              ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                              : 'border-gray-300 bg-white focus:ring-green-200 focus:border-green-500'
                          } focus:outline-none focus:ring-2`}
                        />
                        
                        {/* Icono de estado */}
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          {validationError ? (
                            <span className="text-red-500 text-sm">⚠️</span>
                          ) : username.trim() && /^https:\/\/wa\.me\/.+/.test(username) ? (
                            <span className="text-green-500 text-sm">✅</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mensaje de error de validación */}
                  {validationError && (
                    <div className="p-2 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700">
                        <span className="text-xs">⚠️</span>
                        <span className="text-xs font-medium">{validationError}</span>
                      </div>
                    </div>
                  )}

                  {/* Mensaje de ayuda para WhatsApp */}
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-green-600 text-xs">💡</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-semibold text-green-900 mb-1">
                          {whatsappInputType === 'phone' ? 'Agregar por Número' : 'Agregar por URL'}
                        </h4>
                        <p className="text-xs text-green-700">
                          {whatsappInputType === 'phone' 
                            ? 'Selecciona tu país e ingresa solo el número (sin código de país)'
                            : 'Copia tu enlace de WhatsApp: https://wa.me/34123456789'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Formulario para otras redes sociales
                <div className="mb-8">
                  <label className="block text-base font-semibold text-gray-800 mb-3">
                    {selectedNetwork.id === 'email' ? 'Dirección de Email' : 
                     selectedNetwork.id === 'website' ? 'URL Completa del Sitio Web' :
                     selectedNetwork.id === 'discord' ? 'URL del Servidor de Discord' :
                     selectedNetwork.id === 'spotify' ? 'URL del Perfil de Spotify' :
                     'Nombre de Usuario'}
                  </label>
                  
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        // Limpiar error de validación al escribir
                        if (validationError) {
                          setValidationError('');
                        }
                      }}
                      placeholder={selectedNetwork.placeholder}
                      className={`w-full px-4 py-4 border-2 rounded-xl text-lg transition-all duration-200 ${
                        validationError 
                          ? 'border-red-500 bg-red-50 focus:ring-red-200 focus:border-red-500' 
                          : 'border-gray-300 bg-white focus:ring-blue-200 focus:border-blue-500'
                      } focus:outline-none focus:ring-4`}
                    />
                    
                    {/* Icono de estado */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {validationError ? (
                        <span className="text-red-500 text-xl">⚠️</span>
                      ) : username.trim() && !validateUrl(selectedNetwork, username) ? (
                        <span className="text-green-500 text-xl">✅</span>
                      ) : null}
                    </div>
                  </div>

                  {/* Mensaje de error de validación */}
                  {validationError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700">
                        <span className="text-sm">⚠️</span>
                        <span className="text-sm font-medium">{validationError}</span>
                      </div>
                    </div>
                  )}

                  {/* Mensaje de ayuda mejorado */}
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-sm">💡</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">
                          {selectedNetwork.id === 'email' ? 'Formato de Email' :
                           selectedNetwork.id === 'website' ? 'Formato de URL' :
                           selectedNetwork.id === 'discord' ? 'Formato de Discord' :
                           selectedNetwork.id === 'spotify' ? 'Formato de Spotify' :
                           'Vista Previa del Enlace'}
                        </h4>
                        <p className="text-sm text-blue-700">
                          {selectedNetwork.id === 'email' ? 'Ejemplo: tu@correo.com' :
                           selectedNetwork.id === 'website' ? 'Ejemplo: https://tu-sitio-web.com' :
                           selectedNetwork.id === 'discord' ? 'Ejemplo: https://discord.gg/tu-servidor' :
                           selectedNetwork.id === 'spotify' ? 'Ejemplo: https://open.spotify.com/user/tu-perfil' :
                           username ? selectedNetwork.urlPattern.replace('{username}', username) : selectedNetwork.urlPattern.replace('{username}', selectedNetwork.placeholder)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setSelectedNetwork(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Volver
                </button>
                <button
                  onClick={handleAddIcon}
                  disabled={selectedNetwork.id === 'whatsapp' 
                    ? (whatsappInputType === 'phone' ? !phoneNumber.trim() : !username.trim())
                    : (!username.trim() || !!validateUrl(selectedNetwork, username))
                  }
                  className={`flex-1 px-4 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    (selectedNetwork.id === 'whatsapp' 
                      ? (whatsappInputType === 'phone' ? !phoneNumber.trim() : !username.trim())
                      : (!username.trim() || !!validateUrl(selectedNetwork, username))
                    )
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : selectedNetwork.id === 'whatsapp'
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:scale-105 shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Plus size={16} />
                  Añadir {selectedNetwork.name}
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