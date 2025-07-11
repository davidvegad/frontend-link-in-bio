'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { Paintbrush, Briefcase, User, Mic } from 'lucide-react';
import React from 'react';

const profileTypes = [
  { id: 'creator', name: 'Creador de Contenido', icon: <Mic className="w-5 h-5 mr-2" /> },
  { id: 'artist', name: 'Artista', icon: <Paintbrush className="w-5 h-5 mr-2" /> },
  { id: 'business', name: 'Negocio', icon: <Briefcase className="w-5 h-5 mr-2" /> },
  { id: 'individual', name: 'Individual', icon: <User className="w-5 h-5 mr-2" /> },
];

const purposeOptions: Record<string, { id: string; name: string }[]> = {
  creator: [
    { id: 'promote_content', name: 'Promocionar mi contenido' },
    { id: 'grow_audience', name: 'Hacer crecer mi audiencia' },
    { id: 'monetize', name: 'Monetizar mis creaciones' },
  ],
  artist: [
    { id: 'showcase_portfolio', name: 'Mostrar mi portafolio' },
    { id: 'sell_art', name: 'Vender mi arte' },
    { id: 'connect_fans', name: 'Conectar con mis fans' },
  ],
  business: [
    { id: 'generate_leads', name: 'Generar leads' },
    { id: 'drive_sales', name: 'Impulsar ventas' },
    { id: 'customer_support', name: 'Ofrecer soporte' },
  ],
  individual: [
    { id: 'professional_profile', name: 'Perfil profesional' },
    { id: 'personal_hobbies', name: 'Hobbies y proyectos' },
    { id: 'social_links', name: 'Consolidar mis redes' },
  ],
};

const Bubble = ({ text, icon, onClick, isSelected, groupHasSelection }: { text: string; icon?: React.ReactNode; onClick: () => void; isSelected: boolean; groupHasSelection: boolean; }) => {
  const baseStyle: React.CSSProperties = {
    padding: '0.2rem 1.5rem',
  };

  const conditionalStyle: React.CSSProperties = isSelected ? { color: 'white' } : {};

  const finalStyle = { ...baseStyle, ...conditionalStyle };

  return (
    <button
      type="button"
      onClick={onClick}
      style={finalStyle}
      className={`
        flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ease-in-out
        text-base rounded-[50px_20px_50px_20px]
        ${isSelected 
          ? 'bg-[#750a97] font-bold border-transparent shadow-xl transform scale-105' 
          : groupHasSelection
            ? 'bg-gray-100 text-gray-700 border-gray-200 opacity-50 hover:opacity-100 hover:shadow-md'
            : 'bg-white text-black font-bold border-gray-300 hover:bg-gray-100'
        }
      `}
    >
      {icon}
      {text}
    </button>
  );
};

export default function CategoryPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();

  const handleProfileSelect = (type: string) => {
    updateProfileData({ profile_type: type, purpose: '' });
  };

  const handlePurposeSelect = (purpose: string) => {
    updateProfileData({ purpose });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.profile_type || !profileData.purpose) {
      alert('Por favor, selecciona una opción para cada categoría.');
      return;
    }
    router.push('/welcome/2-style');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <style jsx>{`
        .responsive-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          justify-items: center;
        }

        @media (min-width: 768px) {
          .responsive-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .responsive-container > :global(button) {
             margin: 0.5rem;
          }
        }
      `}</style>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl transform transition-all duration-500 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido! Comencemos.</h1>
          <p className="text-gray-600 mt-2">Personaliza tu experiencia respondiendo dos preguntas rápidas.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">Primero, ¿quién eres?</h2>
            <div className="responsive-container">
              {profileTypes.map(p => (
                <Bubble 
                  key={p.id} 
                  text={p.name} 
                  icon={p.icon}
                  onClick={() => handleProfileSelect(p.id)} 
                  isSelected={profileData.profile_type === p.id} 
                  groupHasSelection={!!profileData.profile_type}
                />
              ))}
            </div>
          </div>

          {profileData.profile_type && (
            <div className="mb-10 transition-opacity duration-500 ease-in-out opacity-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">¿Para qué usarás tu página?</h2>
              <div className="responsive-container">
                {purposeOptions[profileData.profile_type].map(p => (
                  <Bubble 
                    key={p.id} 
                    text={p.name} 
                    onClick={() => handlePurposeSelect(p.id)} 
                    isSelected={profileData.purpose === p.id} 
                    groupHasSelection={!!profileData.purpose}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!profileData.profile_type || !profileData.purpose}
              style={{ marginTop: '3rem', borderRadius: '9999px', width: '50%', height: '40px' }}
              className="bg-indigo-600 text-white py-3 px-4 text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
