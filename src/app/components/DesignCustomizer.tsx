'use client';

import React from 'react';
import Image from 'next/image';

interface ProfileData {
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: string | File | null;
  button_style?: string;
  button_color?: string;
  button_text_color?: string;
}

interface DesignCustomizerProps {
  profileData: ProfileData;
  updateProfileData: (newData: Partial<ProfileData>) => void;
  setBackgroundImageFile: (file: File | null) => void;
}

const predefinedThemes = [
  { id: 'sky', name: 'Cielo', gradient: 'bg-gradient-to-r from-sky-400 to-blue-500' },
  { id: 'midnight', name: 'Medianoche', gradient: 'bg-gradient-to-r from-gray-800 to-black' },
  { id: 'aurora', name: 'Aurora', gradient: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'sunset', name: 'Atardecer', gradient: 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500' },
];

const buttonStylesOptions = [
  { id: 'rounded-full', name: 'Redondeado', class: 'rounded-full' },
  { id: 'rounded-md', name: 'Semi-redondeado', class: 'rounded-md' },
  { id: 'rounded-none', name: 'Cuadrado', class: 'rounded-none' },
];

const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  profileData,
  updateProfileData,
  setBackgroundImageFile,
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundImageFile(e.target.files[0]);
      updateProfileData({ background_image: e.target.files[0] });
    }
  };

  const handleClearBackgroundImage = () => {
    setBackgroundImageFile(null);
    updateProfileData({ background_image: null });
  };

  return (
    <section id="design-section" className="mb-8 border-b pb-6">
      <h2 className="text-2xl font-semibold mb-4">Diseño de tu Página</h2>

      {/* Temas Prediseñados */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Temas Prediseñados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {predefinedThemes.map(themeOption => (
            <div
              key={themeOption.id}
              onClick={() =>
                updateProfileData({
                  theme: themeOption.id,
                  custom_gradient_start: '',
                  custom_gradient_end: '',
                  background_image: null,
                })
              }
              className="cursor-pointer"
            >
              <div
                className={`w-full h-16 rounded-md ${themeOption.gradient} ${
                  profileData.theme === themeOption.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                }`}
              ></div>
              <p className="text-center text-sm mt-2">{themeOption.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Degradado Personalizado */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Degradado Personalizado</h3>
        <div
          className="flex items-center justify-center space-x-4"
          onClick={() => updateProfileData({ theme: 'custom' })}
        >
          <div>
            <label htmlFor="gradientStart" className="block text-sm font-medium text-gray-700">Inicio</label>
            <input
              type="color"
              id="gradientStart"
              value={profileData.custom_gradient_start || '#FFFFFF'}
              onChange={e => updateProfileData({ custom_gradient_start: e.target.value })}
              className="w-24 h-12 p-0 border-none cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="gradientEnd" className="block text-sm font-medium text-gray-700">Fin</label>
            <input
              type="color"
              id="gradientEnd"
              value={profileData.custom_gradient_end || '#000000'}
              onChange={e => updateProfileData({ custom_gradient_end: e.target.value })}
              className="w-24 h-12 p-0 border-none cursor-pointer"
            />
          </div>
          <div
            className={`w-32 h-12 rounded-md ${profileData.theme === 'custom' ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
            style={{
              background: `linear-gradient(to right, ${profileData.custom_gradient_start || '#FFFFFF'}, ${profileData.custom_gradient_end || '#000000'})`,
            }}
          ></div>
        </div>
      </div>

      {/* Imagen de Fondo */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Imagen de Fondo</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
        />
        {profileData.background_image && (
          <div className="mt-2 flex items-center space-x-2">
            {typeof profileData.background_image === 'string' ? (
              <Image src={profileData.background_image} alt="Background Preview" width={100} height={100} className="rounded-md object-cover" />
            ) : (
              <p className="text-sm text-gray-500">Archivo seleccionado: {profileData.background_image.name}</p>
            )}
            <button
              type="button"
              onClick={handleClearBackgroundImage}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Estilo de Botones */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Estilo de Botones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Controles de Color */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Colores</h4>
            <div className="flex items-center justify-between">
              <label htmlFor="buttonColor" className="font-medium text-gray-700">Fondo</label>
              <input
                type="color"
                id="buttonColor"
                value={profileData.button_color || '#000000'}
                onChange={e => updateProfileData({ button_color: e.target.value })}
                className="w-16 h-10 p-0 border-none cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="buttonTextColor" className="font-medium text-gray-700">Texto</label>
              <input
                type="color"
                id="buttonTextColor"
                value={profileData.button_text_color || '#FFFFFF'}
                onChange={e => updateProfileData({ button_text_color: e.target.value })}
                className="w-16 h-10 p-0 border-none cursor-pointer"
              />
            </div>
          </div>

          {/* Controles de Forma */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Forma del Borde</h4>
            <div className="flex flex-col space-y-2">
              {buttonStylesOptions.map(bs => (
                <div
                  key={bs.id}
                  onClick={() => updateProfileData({ button_style: bs.id })}
                  className={`p-3 border rounded-md cursor-pointer text-center ${
                    profileData.button_style === bs.id ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {bs.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Vista Previa del Botón */}
        <div className="mt-6 p-4 bg-gray-200 rounded-lg flex justify-center">
          <button
            className={`px-8 py-3 text-lg font-semibold transition-all ${
              buttonStylesOptions.find(bs => bs.id === profileData.button_style)?.class || 'rounded-full'
            }`}
            style={{
              backgroundColor: profileData.button_color || '#000000',
              color: profileData.button_text_color || '#FFFFFF',
            }}
          >
            Botón de Ejemplo
          </button>
        </div>
      </div>
    </section>
  );
};

export default DesignCustomizer;
