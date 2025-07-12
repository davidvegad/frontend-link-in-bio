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

  const isButtonDisabled = !profileData.name || !profileData.bio;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg mx-auto transform transition-all duration-500 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">Tu Información Básica</h1>
        <p className="text-gray-600 mb-8 text-center">Esta información se mostrará públicamente en tu perfil.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={profileData.name || ''}
                onChange={(e) => { updateProfileData({ name: e.target.value }); setShowError(false); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tu nombre o el de tu marca"
                required
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                Biografía
              </label>
              <textarea
                id="bio"
                value={profileData.bio || ''}
                onChange={(e) => { updateProfileData({ bio: e.target.value }); setShowError(false); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Una breve descripción sobre ti"
                rows={3}
                required
              />
            </div>
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto de perfil (Opcional)
              </label>
              <div className="flex flex-col items-center justify-center gap-2">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" className="w-28 h-28 rounded-full object-cover border-4 border-gray-200" />
                ) : (
                  <UserCircle className="w-28 h-28 text-gray-300" />
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
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm py-1 px-3 rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Subir imagen
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <button
              type="submit"
              className={`py-3 px-4 text-lg font-semibold transition-all duration-300 shadow-md border-2 rounded-full w-full max-w-xs cursor-pointer
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
            <p className="text-red-500 text-center mt-4 text-sm">Por favor, completa todos los campos requeridos.</p>
          )}
        </form>
      </div>
    </div>
  );
}