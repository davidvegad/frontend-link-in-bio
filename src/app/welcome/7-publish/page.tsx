'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

export default function PublishPage() {
  const { profileData, submitProfile } = useProfile();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [publicUrl, setPublicUrl] = useState('');

  useEffect(() => {
    const saveAndRedirect = async () => {
      try {
        await submitProfile();
        // Asume que el slug se crea a partir del nombre de usuario o un campo similar
        const slug = profileData.name?.toLowerCase().replace(/\s+/g, '-') || 'tu-perfil';
        setPublicUrl(`${window.location.origin}/${slug}`);
        // NO redirigir automáticamente aquí. La redirección se hará con el botón.
      } catch (error) {
        console.error("Error al guardar y redirigir:", error);
        // Optionally, show an error message to the user
      }
    };
    saveAndRedirect();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">¡Todo Listo!</h1>
        <p className="text-gray-600 mb-6">Tu página ya está publicada y lista para ser compartida con el mundo.</p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tu URL pública:</label>
          <div className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
            <span className="text-indigo-600 font-mono">{publicUrl}</span>
            <button 
              onClick={copyToClipboard}
              className="bg-indigo-600 text-white py-1 px-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        <button
          onClick={goToDashboard}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Ir al Panel de Control
        </button>
      </div>
    </div>
  );
}
