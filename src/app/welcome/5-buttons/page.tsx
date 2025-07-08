'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

const buttonStyles = [
  { id: 'rounded-full', name: 'Redondeado' },
  { id: 'rounded-md', name: 'Semi-redondeado' },
  { id: 'rounded-none', name: 'Cuadrado' },
];

export default function ButtonsPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/welcome/6-links');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center">Personaliza tus Botones</h1>
        <p className="text-gray-600 mb-8 text-center">Así se verán los enlaces en tu página.</p>

        {/* Vista Previa */}
        <div className="mb-8 p-6 bg-gray-200 rounded-lg flex justify-center">
          <button className={`px-8 py-3 text-lg font-semibold transition-all ${profileData.button_style || 'rounded-full'}`}
            style={{ backgroundColor: profileData.button_color || '#000000', color: profileData.button_text_color || '#FFFFFF' }}>
            Botón de Ejemplo
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Controles de Color */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Colores</h3>
              <div className="flex items-center justify-between">
                <label htmlFor="bgColor" className="font-medium text-gray-700">Fondo</label>
                <input type="color" id="bgColor" value={profileData.button_color || '#000000'} onChange={e => updateProfileData({ button_color: e.target.value })} className="w-16 h-10 p-0 border-none cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="textColor" className="font-medium text-gray-700">Texto</label>
                <input type="color" id="textColor" value={profileData.button_text_color || '#FFFFFF'} onChange={e => updateProfileData({ button_text_color: e.target.value })} className="w-16 h-10 p-0 border-none cursor-pointer" />
              </div>
            </div>

            {/* Controles de Estilo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Forma del Borde</h3>
              <div className="flex flex-col space-y-2">
                {buttonStyles.map(bs => (
                  <div key={bs.id} 
                    onClick={() => updateProfileData({ button_style: bs.id })}
                    className={`p-3 border rounded-md cursor-pointer text-center ${profileData.button_style === bs.id ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300 hover:bg-gray-50'}`}>
                    {bs.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
