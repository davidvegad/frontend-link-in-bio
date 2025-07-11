'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import { useState, useRef } from 'react';
import { UserCircle } from 'lucide-react';

export default function InfoPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const [showError, setShowError] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      updateProfileData({ avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileData.name || !profileData.bio) {
      setShowError(true);
      return;
    }
    router.push('/welcome/4-theme');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <style jsx>{`
        /* Estilo para el botón Continuar cuando está habilitado y en hover */
        button[type="submit"]:not([disabled]):hover {
          background-color: white !important;
          color: #b013a3 !important;
          border-color: #b013a3 !important;
        }

        /* Estilo para el botón Continuar cuando está habilitado y no en hover */
        button[type="submit"]:not([disabled]) {
          color: white !important;
        }
      `}</style>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Tu Información Básica</h1>
        <p className="text-gray-600 mb-6 text-center">Esta información se mostrará públicamente en tu perfil.</p>
        <form onSubmit={handleSubmit}>
          <div className="w-[90%] md:w-[60%] mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={profileData.name || ''}
                onChange={(e) => { updateProfileData({ name: e.target.value }); setShowError(false); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tu nombre o el de tu marca"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Biografía
              </label>
              <textarea
                id="bio"
                value={profileData.bio || ''}
                onChange={(e) => { updateProfileData({ bio: e.target.value }); setShowError(false); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Una breve descripción sobre ti"
                rows={3}
                required
              />
            </div>
            <div className="mb-6 text-center">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                Foto de perfil (Opcional)
              </label>
              <div className="flex flex-col items-center justify-center mb-4">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover mb-2" />
                ) : (
                  <UserCircle className="w-32 h-32 text-gray-400 mb-2 opacity-75" />
                )}
                <input
                  type="file"
                  id="avatar"
                  ref={fileInputRef}
                  onChange={handleAvatarChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleUploadClick}
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm"
                >
                  Subir imagen
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              style={{ margin: '3rem auto 0 auto', borderRadius: '9999px' }}
              className={`
                py-[0.75rem] px-4 text-lg font-semibold transition-all duration-300 shadow-md border-2 cursor-pointer w-[90%] md:w-1/2
              ${!profileData.name || !profileData.bio
                ? 'bg-gray-400 text-gray-700 border-transparent hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3]'
                : 'bg-[#b013a3] !text-white border-transparent hover:text-[#b013a3] hover:border-[#b013a3]'
              }
            `}
          >
            Continuar
          </button>
		  </div>
          {showError && (
            <p className="text-red-500 text-center mt-4 text-sm">Por favor, completa todos los campos requeridos.</p>
          )}
        </form>
      </div>
    </div>
  );
}
