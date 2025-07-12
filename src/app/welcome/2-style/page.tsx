'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { useState } from 'react';

const styleOptions = [
  {
    id: 'minimalist',
    name: 'Minimalista y Profesional',
    description: 'Un diseño limpio y directo, centrado en tus enlaces.',
  },
  {
    id: 'featured-image',
    name: 'Foto de Perfil Destacada',
    description: 'Tu imagen de perfil toma el protagonismo en la parte superior.',
  },
  {
    id: 'full-background',
    name: 'Fondo a Pantalla Completa',
    description: 'Muestra una imagen de fondo que abarca toda la página.',
  },
];

export default function StylePage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.template_style) {
      setShowError(true);
      return;
    }
    router.push('/welcome/3-info');
  };

  const isButtonDisabled = !profileData.template_style;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl mx-auto transform transition-all duration-500 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Elige un Estilo</h1>
        <p className="text-gray-600 mb-8 text-center">Define la estructura general de tu página.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 mb-8">
            {styleOptions.map(option => (
              <div
                key={option.id}
                onClick={() => {
                  updateProfileData({ template_style: option.id });
                  setShowError(false);
                }}
                className={`p-4 border rounded-2xl cursor-pointer transition-all w-full md:w-3/5 md:max-w-md ${ 
                  profileData.template_style === option.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-400'
                }`}
              >
                <h3 className="font-semibold text-lg text-gray-800">{option.name}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button
              type="submit"
              className={`py-3 px-4 text-lg font-semibold transition-all duration-300 shadow-md border-2 rounded-full w-full md:w-3/5 md:max-w-md cursor-pointer
                         ${isButtonDisabled
                           ? 'bg-gray-400 text-gray-700 border-transparent'
                           : 'bg-[#b013a3] text-white border-transparent'
                         }
                         hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b013a3]`}
            >
              Continuar
            </button>
          </div>
          {showError && (
            <p className="text-red-500 text-center mt-4 text-sm">Por favor, selecciona un estilo antes de continuar.</p>
          )}
        </form>
      </div>
    </div>
  );
}