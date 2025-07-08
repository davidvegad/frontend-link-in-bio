'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.template_style) {
      alert('Por favor, selecciona un estilo.');
      return;
    }
    router.push('/welcome/3-info');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-2 text-center">Elige un Estilo</h1>
        <p className="text-gray-600 mb-8 text-center">Define la estructura general de tu página.</p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-8">
            {styleOptions.map(option => (
              <div
                key={option.id}
                onClick={() => updateProfileData({ template_style: option.id })}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  profileData.template_style === option.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h3 className="font-semibold text-lg">{option.name}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            disabled={!profileData.template_style}
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
