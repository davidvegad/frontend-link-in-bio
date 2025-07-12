'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { Paintbrush, Briefcase, User, Mic, Share, Users, DollarSign, Image, ShoppingCart, Heart, Target, Headphones, Sparkles, Link } from 'lucide-react';
import React, { useState } from 'react';

const profileTypes = [
  { id: 'creator', name: 'Creador de Contenido', icon: <Mic className="w-5 h-5 mr-2" /> },
  { id: 'artist', name: 'Artista', icon: <Paintbrush className="w-5 h-5 mr-2" /> },
  { id: 'business', name: 'Negocio', icon: <Briefcase className="w-5 h-5 mr-2" /> },
  { id: 'individual', name: 'Individual', icon: <User className="w-5 h-5 mr-2" /> },
];

const purposeOptions: Record<string, { id: string; name: string; icon?: React.ReactNode }[]> = {
  creator: [
    { id: 'promote_content', name: 'Promocionar mi contenido', icon: <Share className="w-5 h-5 mr-2" /> },
    { id: 'grow_audience', name: 'Hacer crecer mi audiencia', icon: <Users className="w-5 h-5 mr-2" /> },
    { id: 'monetize', name: 'Monetizar mis creaciones', icon: <DollarSign className="w-5 h-5 mr-2" /> },
  ],
  artist: [
    { id: 'showcase_portfolio', name: 'Mostrar mi portafolio', icon: <Image className="w-5 h-5 mr-2" /> },
    { id: 'sell_art', name: 'Vender mi arte', icon: <ShoppingCart className="w-5 h-5 mr-2" /> },
    { id: 'connect_fans', name: 'Conectar con mis fans', icon: <Heart className="w-5 h-5 mr-2" /> },
  ],
  business: [
    { id: 'generate_leads', name: 'Generar leads', icon: <Target className="w-5 h-5 mr-2" /> },
    { id: 'drive_sales', name: 'Impulsar ventas', icon: <DollarSign className="w-5 h-5 mr-2" /> },
    { id: 'customer_support', name: 'Ofrecer soporte', icon: <Headphones className="w-5 h-5 mr-2" /> },
  ],
  individual: [
    { id: 'professional_profile', name: 'Perfil profesional', icon: <User className="w-5 h-5 mr-2" /> },
    { id: 'personal_hobbies', name: 'Hobbies y proyectos', icon: <Sparkles className="w-5 h-5 mr-2" /> },
    { id: 'social_links', name: 'Consolidar mis redes', icon: <Link className="w-5 h-5 mr-2" /> },
  ],
};

const Bubble = ({ text, icon, onClick, isSelected, groupHasSelection }: { text: string; icon?: React.ReactNode; onClick: () => void; isSelected: boolean; groupHasSelection: boolean; }) => {
  const baseClasses = "flex-shrink-0 flex items-center justify-center border-2 transition-all duration-300 ease-in-out cursor-pointer text-base rounded-[50px_20px_50px_20px] px-3 py-2";

  const selectedClasses = "bg-[#750a97] text-white font-bold border-transparent shadow-xl transform scale-105";
  const unselectedGroupHasSelectionClasses = "bg-gray-100 text-gray-700 border-gray-200 opacity-50 hover:opacity-100 hover:shadow-md";
  const unselectedClasses = "bg-white text-black font-bold border-gray-300 hover:bg-gray-100";

  const conditionalClasses = isSelected
    ? selectedClasses
    : groupHasSelection
      ? unselectedGroupHasSelectionClasses
      : unselectedClasses;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${conditionalClasses}`}
    >
      {icon}
      {text}
    </button>
  );
};

export default function CategoryPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const [profileTypeError, setProfileTypeError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);

  const handleProfileSelect = (type: string) => {
    updateProfileData({ profile_type: type, purpose: '' });
    setProfileTypeError(false);
    setPurposeError(false);
  };

  const handlePurposeSelect = (purpose: string) => {
    updateProfileData({ purpose });
    setProfileTypeError(false);
    setPurposeError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!profileData.profile_type) {
      setProfileTypeError(true);
      hasError = true;
    }
    if (!profileData.purpose) {
      setPurposeError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }
    router.push('/welcome/2-style');
  };

  const isButtonDisabled = !profileData.profile_type || !profileData.purpose;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl transform transition-all duration-500 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido! Comencemos.</h1>
          <p className="text-gray-600 mt-2">Personaliza tu experiencia respondiendo dos preguntas rápidas.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">Primero, ¿quién eres?</h2>
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 justify-items-center">
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
            {profileTypeError && (
              <p className="text-red-500 text-center mt-4 text-sm">Por favor, selecciona tu tipo de perfil.</p>
            )}
          </div>

          {profileData.profile_type && (
            <div className="mb-10 transition-opacity duration-500 ease-in-out opacity-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">¿Para qué usarás tu página?</h2>
              <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center gap-4 justify-items-center">
                {purposeOptions[profileData.profile_type].map(p => (
                  <Bubble 
                    key={p.id} 
                    text={p.name} 
                    icon={p.icon}
                    onClick={() => handlePurposeSelect(p.id)} 
                    isSelected={profileData.purpose === p.id} 
                    groupHasSelection={!!profileData.purpose}
                  />
                ))}
              </div>
              {purposeError && (
                <p className="text-red-500 text-center mt-4 text-sm">Por favor, selecciona para qué usarás tu página.</p>
              )}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <button
              type="submit"
              className={`py-3 px-4 text-lg font-semibold transition-all duration-300 shadow-md border-2 rounded-full w-1/2 md:w-2/5 cursor-pointer
                         ${isButtonDisabled
                           ? 'bg-gray-400 text-gray-700 border-transparent'
                           : 'bg-[#b013a3] text-white border-transparent'
                         }
                         hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b013a3]`}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
