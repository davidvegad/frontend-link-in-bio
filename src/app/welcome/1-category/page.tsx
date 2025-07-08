'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

const profileTypes = [
  { id: 'creator', name: 'Creador de Contenido' },
  { id: 'artist', name: 'Artista' },
  { id: 'business', name: 'Negocio' },
  { id: 'individual', name: 'Individual' },
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

const Bubble = ({ text, onClick, isSelected }: { text: string; onClick: () => void; isSelected: boolean }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-4 py-2 rounded-full border transition-all duration-200 ${isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
    {text}
  </button>
);

export default function CategoryPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();

  const handleProfileSelect = (type: string) => {
    updateProfileData({ profile_type: type, purpose: '' }); // Reset purpose
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">¡Bienvenido! Comencemos.</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Primero, ¿quién eres?</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {profileTypes.map(p => (
                <Bubble key={p.id} text={p.name} onClick={() => handleProfileSelect(p.id)} isSelected={profileData.profile_type === p.id} />
              ))}
            </div>
          </div>

          {profileData.profile_type && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">¿Para qué usarás tu página?</h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {purposeOptions[profileData.profile_type].map(p => (
                  <Bubble key={p.id} text={p.name} onClick={() => handlePurposeSelect(p.id)} isSelected={profileData.purpose === p.id} />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!profileData.profile_type || !profileData.purpose}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}
