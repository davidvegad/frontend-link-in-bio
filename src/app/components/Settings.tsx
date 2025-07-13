'use client';

import React, { useState } from 'react';

interface SettingsProps {
  currentSlug: string;
  onUpdateSlug: (newSlug: string) => Promise<void>;
  onDeleteAccount: () => Promise<void>;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ currentSlug, onUpdateSlug, onDeleteAccount, onLogout }) => {
  const [slug, setSlug] = useState(currentSlug);
  const [confirmDelete, setConfirmDelete] = useState('');

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only letters, numbers, and hyphens
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
  };

  const handleSlugSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (slug && slug !== currentSlug) {
      await onUpdateSlug(slug);
    }
  };

  const handleDeleteConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmDelete(e.target.value);
  };

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (confirmDelete === 'eliminar mi cuenta') {
      await onDeleteAccount();
    } else {
      alert('Por favor, escribe la frase exacta para confirmar la eliminación.');
    }
  };

  return (
    <section id="settings-section" className="space-y-8">
      <h2 className="text-2xl font-semibold">Ajustes de la Cuenta</h2>

      {/* Change Slug Section */}
      <div className="p-6 border rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">URL de tu Perfil</h3>
        <form onSubmit={handleSlugSubmit} className="space-y-4">
          <div className="flex items-center">
            <span className="text-gray-500 text-lg mr-2">linkin.bio/</span>
            <input
              type="text"
              value={slug}
              onChange={handleSlugChange}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
              placeholder="tu-nombre-de-usuario"
            />
          </div>
          <button 
            type="submit"
            disabled={slug === currentSlug || !slug}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Guardar URL
          </button>
        </form>
      </div>

      {/* Danger Zone Section */}
      <div className="p-6 border border-red-300 rounded-lg bg-red-50">
        <h3 className="text-xl font-semibold text-red-800 mb-4">Zona de Peligro</h3>
        <p className="text-red-700 mb-4">
          Esta acción es irreversible. Perderás todo tu perfil, enlaces y personalización. 
          Por favor, asegúrate de que realmente quieres eliminar tu cuenta.
        </p>
        <form onSubmit={handleDeleteSubmit} className="space-y-4">
            <label htmlFor="confirmDelete" className="block text-sm font-medium text-red-800">
                Para confirmar, escribe: <span className="font-bold">eliminar mi cuenta</span>
            </label>
            <input
                type="text"
                id="confirmDelete"
                value={confirmDelete}
                onChange={handleDeleteConfirmChange}
                className="w-full px-3 py-2 border border-red-400 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
            />
            <button 
                type="submit"
                disabled={confirmDelete !== 'eliminar mi cuenta'}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed"
            >
                Eliminar mi cuenta permanentemente
            </button>
        </form>
      </div>

      {/* Logout Button */}
      <div className="p-6 border rounded-lg bg-gray-50 text-center">
        <h3 className="text-xl font-semibold mb-4">Cerrar Sesión</h3>
        <p className="text-gray-700 mb-4">Haz clic para cerrar tu sesión actual.</p>
        <button 
          onClick={onLogout}
          className="px-6 py-2 bg-gray-700 text-white rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Cerrar Sesión
        </button>
      </div>
    </section>
  );
};

export default Settings;
