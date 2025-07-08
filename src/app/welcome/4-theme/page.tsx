'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

const predefinedThemes = [
  { id: 'sky', name: 'Cielo', gradient: 'bg-gradient-to-r from-sky-400 to-blue-500' },
  { id: 'midnight', name: 'Medianoche', gradient: 'bg-gradient-to-r from-gray-800 to-black' },
  { id: 'aurora', name: 'Aurora', gradient: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'sunset', name: 'Atardecer', gradient: 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500' },
];

export default function ThemePage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/welcome/5-buttons');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateProfileData({ backgroundImage: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center">Personaliza tu Apariencia</h1>
        <p className="text-gray-600 mb-8 text-center">Dale a tu página un toque único.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">Elige un Tema Prediseñado</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {predefinedThemes.map(theme => (
                <div key={theme.id} onClick={() => updateProfileData({ theme: theme.id, custom_gradient_start: '', custom_gradient_end: '', background_image: null })} className="cursor-pointer">
                  <div className={`w-full h-16 rounded-md ${theme.gradient} ${profileData.theme === theme.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}></div>
                  <p className="text-center text-sm mt-2">{theme.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 border-b pb-6">
            <h2 className="text-lg font-semibold mb-4">O crea tu propio Degradado</h2>
            <div className="flex items-center justify-center space-x-4" onClick={() => updateProfileData({ theme: 'custom' }) }>
              <div>
                <label htmlFor="gradientStart" className="block text-sm font-medium text-gray-700">Inicio</label>
                <input type="color" id="gradientStart" value={profileData.custom_gradient_start || '#FFFFFF'} onChange={e => updateProfileData({ custom_gradient_start: e.target.value })} className="w-24 h-12 p-0 border-none cursor-pointer" />
              </div>
              <div>
                <label htmlFor="gradientEnd" className="block text-sm font-medium text-gray-700">Fin</label>
                <input type="color" id="gradientEnd" value={profileData.custom_gradient_end || '#000000'} onChange={e => updateProfileData({ custom_gradient_end: e.target.value })} className="w-24 h-12 p-0 border-none cursor-pointer" />
              </div>
              <div className={`w-32 h-12 rounded-md ${profileData.theme === 'custom' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`} style={{ background: `linear-gradient(to right, ${profileData.custom_gradient_start || '#FFFFFF'}, ${profileData.custom_gradient_end || '#000000'})` }}></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">O sube una Imagen de Fondo</h2>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" 
            />
             {profileData.background_image && <p className="text-sm text-gray-500 mt-2">Archivo seleccionado: {profileData.background_image.name}</p>}
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
