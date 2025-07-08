'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';

export default function InfoPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateProfileData({ avatar: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/welcome/4-theme');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Tu Información Básica</h1>
        <p className="text-gray-600 mb-6 text-center">Esta información se mostrará públicamente en tu perfil.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={profileData.name || ''}
              onChange={(e) => updateProfileData({ name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              onChange={(e) => updateProfileData({ bio: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Una breve descripción sobre ti"
              rows={3}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
              Foto de perfil (Opcional)
            </label>
            <input
              type="file"
              id="avatar"
              onChange={handleAvatarChange}
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
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
