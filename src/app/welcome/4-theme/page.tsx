'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { Clipboard } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import LivePreview from '@/app/components/LivePreview';

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
  const [copySuccess, setCopySuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('themes');

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(text);
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateProfileData({ 
        background_image: e.target.files[0],
        theme: '',
        custom_gradient_start: '',
        custom_gradient_end: '',
        background_preference: 'image',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-6xl mx-auto transform transition-all duration-500 hover:shadow-2xl flex flex-col lg:flex-row gap-12">
        
        <div className="lg:w-1/3 flex justify-center items-start">
          <LivePreview profileData={profileData} />
        </div>

        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Personaliza tu Apariencia</h1>
          <p className="text-gray-600 mb-8 text-center">Dale a tu página un toque único.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-200 rounded-lg mb-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('themes');
                  updateProfileData({
                    background_image: null,
                    background_preference: 'color',
                  });
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'themes' ? 'bg-white text-indigo-700 shadow-sm' : 'bg-transparent text-gray-600 hover:bg-white/50'}`}>
                Temas y Colores
              </button>
              <button
                type="button"
                onClick={handleUploadButtonClick}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'upload' ? 'bg-white text-indigo-700 shadow-sm' : 'bg-transparent text-gray-600 hover:bg-white/50'}`}>
                Subir Imagen
              </button>
            </div>

            {activeTab === 'themes' && (
              <div className="space-y-8">
                <div className="border-b pb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">Elige un Tema Prediseñado</h2>
                  <div className="overflow-x-auto pb-4">
                    <div className="grid grid-flow-col grid-rows-2 gap-4 auto-cols-[120px] sm:auto-cols-[140px]">
                      {predefinedThemes.map(theme => (
                        <div 
                          key={theme.id} 
                          onClick={() => handleThemeSelect(theme)}
                          className="cursor-pointer group text-center w-[120px] sm:w-[140px]"
                        >
                          <div 
                            className={`w-full h-20 rounded-lg transition-all duration-300 ${profileData.theme === theme.id ? 'ring-4 ring-offset-2 ring-indigo-500' : 'group-hover:ring-2 group-hover:ring-indigo-300'}`}
                            style={{ background: `linear-gradient(to right, ${theme.start}, ${theme.end})` }}
                          ></div>
                          <p className={`mt-2 text-sm font-medium ${profileData.theme === theme.id ? 'text-indigo-600' : 'text-gray-600'}`}>{theme.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-b pb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">O crea tu propio Degradado</h2>
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${profileData.theme === 'custom' ? 'bg-indigo-50 ring-2 ring-indigo-200' : ''}`}
                    onClick={handleCustomGradientClick}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-2">
                        <label htmlFor="gradientStart" className="block text-sm font-medium text-gray-700">Inicio</label>
                        <div className="flex items-center space-x-2">
                          <input type="color" id="gradientStart" value={profileData.custom_gradient_start || '#FFFFFF'} onChange={e => updateProfileData({ custom_gradient_start: e.target.value })} className="w-10 h-10 p-0 border-none rounded-md cursor-pointer" />
                          <input type="text" value={profileData.custom_gradient_start || ''} onChange={e => updateProfileData({ custom_gradient_start: e.target.value })} className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm" placeholder="#FFFFFF" />
                          <button type="button" onClick={() => handleCopy(profileData.custom_gradient_start || '')} className="p-2 text-gray-400 hover:text-gray-600">
                            <Clipboard size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="gradientEnd" className="block text-sm font-medium text-gray-700">Fin</label>
                        <div className="flex items-center space-x-2">
                          <input type="color" id="gradientEnd" value={profileData.custom_gradient_end || '#000000'} onChange={e => updateProfileData({ custom_gradient_end: e.target.value })} className="w-10 h-10 p-0 border-none rounded-md cursor-pointer" />
                          <input type="text" value={profileData.custom_gradient_end || ''} onChange={e => updateProfileData({ custom_gradient_end: e.target.value })} className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm" placeholder="#000000" />
                          <button type="button" onClick={() => handleCopy(profileData.custom_gradient_end || '')} className="p-2 text-gray-400 hover:text-gray-600">
                            <Clipboard size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                    {copySuccess && <p className="text-sm text-green-600 mt-2 text-center">¡Copiado!</p>}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Sube una Imagen de Fondo</h2>
                {profileData.background_image && <p className="text-sm text-green-600 mt-2">Archivo seleccionado: {profileData.background_image.name}</p>}
              </div>
            )}

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-full max-w-xs bg-[#b013a3] text-white py-3 px-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md border-2 border-transparent hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b013a3] cursor-pointer"
              >
                Continuar
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
  );
}
