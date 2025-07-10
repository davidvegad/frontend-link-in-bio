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
  button_text_opacity?: number; // Nuevo campo
  button_background_opacity?: number; // Nuevo
  button_border_color?: string; // Nuevo
  button_border_opacity?: number; // Nuevo
  button_shadow_color?: string; // Nuevo
  button_shadow_opacity?: number; // Nuevo
}

interface DesignCustomizerProps {
  profileData: ProfileData;
  updateProfileData: (newData: Partial<ProfileData>) => void;
  setBackgroundImageFile: (file: File | null) => void;
}

const predefinedThemes = [
  { id: 'sky', name: 'Cielo', start: '#60a5fa', end: '#3b82f6', textColor: 'text-white' },
  
  { id: 'aurora', name: 'Aurora', start: '#8b5cf6', end: '#ec4899', textColor: 'text-white' },
  { id: 'sunset', name: 'Atardecer', start: '#facc15', end: '#f43f5e', textColor: 'text-white' },
  { id: 'oasis', name: 'Oasis', start: '#6d28d9', end: '#10b981', textColor: 'text-white' },
  { id: 'flower', name: 'Flor', start: '#ec4899', end: '#f472b6', textColor: 'text-white' },
  { id: 'breeze', name: 'Brisa', start: '#a7f3d0', end: '#6ee7b7', textColor: 'text-black' }, // Claro
  { id: 'nebula', name: 'Nébula', start: '#6366f1', end: '#a855f7', textColor: 'text-white' },
  { id: 'obsidian', name: 'Obsidiana', start: '#6b7280', end: '#9ca3af', textColor: 'text-black' }, // Cambiado a colores más claros
  { id: 'lightning', name: 'Rayo', start: '#facc15', end: '#f97316', textColor: 'text-white' },
  { id: 'splash', name: 'Salpicón', start: '#ef4444', end: '#3b82f6', textColor: 'text-white' },
  { id: 'flamingo', name: 'Flamenco', start: '#fb7185', end: '#f43f5e', textColor: 'text-white' },
  { id: 'fog', name: 'Niebla', start: '#e5e7eb', end: '#9ca3af', textColor: 'text-black' }, // Claro
  { id: 'ivory', name: 'Marfil', start: '#f5f5dc', end: '#f0f0c0', textColor: 'text-black' }, // Claro
  { id: 'solstice', name: 'Solsticio', start: '#fde047', end: '#f97316', textColor: 'text-black' }, // Claro
  { id: 'meadow', name: 'Pradera', start: '#84cc16', end: '#4ade80', textColor: 'text-black' }, // Claro
  { id: 'brio', name: 'Brío', start: '#f97316', end: '#facc15', textColor: 'text-black' }, // Claro
  { id: 'velvet', name: 'Terciopelo', start: '#7e22ce', end: '#9333ea', textColor: 'text-white' },
  { id: 'laguna', name: 'Laguna', start: '#a855f7', end: '#d946ef', textColor: 'text-white' },
  { id: 'stone', name: 'Piedra', start: '#78716c', end: '#57534e', textColor: 'text-white' },
  { id: 'cloud', name: 'Nube', start: '#e0f2fe', end: '#bfdbfe', textColor: 'text-black' }, // Claro
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
        <div className="flex flex-wrap gap-4 overflow-x-auto pb-4">
          {predefinedThemes.map(themeOption => (
            <div
              key={themeOption.id}
              onClick={() =>
                updateProfileData({
                  theme: themeOption.id, // Mantener el ID del tema para referencia
                  custom_gradient_start: themeOption.start, // Establecer el color de inicio
                  custom_gradient_end: themeOption.end,   // Establecer el color de fin
                  background_image: null, // Limpiar imagen de fondo
                })
              }
              className="cursor-pointer flex-shrink-0 w-[112px]"
            >
              <div
                className={`w-full h-[96px] rounded-lg flex items-center justify-center font-semibold text-sm text-center ${themeOption.textColor} ${
                  profileData.theme === themeOption.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''
                }`}
                style={{ background: `linear-gradient(to right, ${themeOption.start}, ${themeOption.end})` }} // Aplicar el gradiente aquí
              >
                {themeOption.name} {/* Mostrar el nombre del tema */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Degradado Personalizado */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Degradado Personalizado</h3>
        <div className="space-y-4"> {/* Contenedor para las dos filas */}
          {/* Fila Color Superior */}
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-700 w-24">Color Superior</label>
            <input
              type="text"
              value={profileData.custom_gradient_start || ''}
              onChange={e => updateProfileData({ custom_gradient_start: e.target.value })}
              onFocus={() => updateProfileData({ theme: 'custom' })} // Seleccionar tema 'custom' al editar
              className="w-32 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
              placeholder="#RRGGBB"
            />
            <div
              className="w-8 h-8 rounded-md border border-gray-300"
              style={{ backgroundColor: profileData.custom_gradient_start || '#FFFFFF' }}
            ></div>
            <button
              onClick={() => navigator.clipboard.writeText(profileData.custom_gradient_start || '')}
              className="p-1 text-gray-500 hover:text-gray-800 rounded-full"
              aria-label="Copiar color superior"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>
            </button>
            <input
              type="color"
              value={profileData.custom_gradient_start || '#FFFFFF'}
              onChange={e => updateProfileData({ custom_gradient_start: e.target.value })}
              className="w-8 h-8 p-0 border-none cursor-pointer"
            />
          </div>

          {/* Fila Color Inferior */}
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-700 w-24">Color Inferior</label>
            <input
              type="text"
              value={profileData.custom_gradient_end || ''}
              onChange={e => updateProfileData({ custom_gradient_end: e.target.value })}
              onFocus={() => updateProfileData({ theme: 'custom' })} // Seleccionar tema 'custom' al editar
              className="w-32 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
              placeholder="#RRGGBB"
            />
            <div
              className="w-8 h-8 rounded-md border border-gray-300"
              style={{ backgroundColor: profileData.custom_gradient_end || '#000000' }}
            ></div>
            <button
              onClick={() => navigator.clipboard.writeText(profileData.custom_gradient_end || '')}
              className="p-1 text-gray-500 hover:text-gray-800 rounded-full"
              aria-label="Copiar color inferior"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>
            </button>
            <input
              type="color"
              value={profileData.custom_gradient_end || '#000000'}
              onChange={e => updateProfileData({ custom_gradient_end: e.target.value })}
              className="w-8 h-8 p-0 border-none cursor-pointer"
            />
          </div>
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
            <div className="flex items-center space-x-2"> {/* Usar space-x-2 para alinear */}
              <label htmlFor="buttonColor" className="font-medium text-gray-700 w-16">Fondo</label> {/* Ancho fijo para la etiqueta */}
              <input
                type="color"
                id="buttonColor"
                value={profileData.button_color || '#000000'}
                onChange={e => updateProfileData({ button_color: e.target.value })}
                className="w-8 h-8 p-0 border-none cursor-pointer" // Tamaño más pequeño para el selector de color
              />
              <input
                type="text"
                value={profileData.button_color || ''}
                onChange={e => updateProfileData({ button_color: e.target.value })}
                className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm" // Cuadro de texto para el código
                placeholder="#RRGGBB"
              />
              <button
                onClick={() => navigator.clipboard.writeText(profileData.button_color || '')}
                className="p-1 text-gray-500 hover:text-gray-800 rounded-full"
                aria-label="Copiar color de fondo del botón"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>
              </button>
            </div>
            {/* Subsección Color de Fuente */}
            <div className="space-y-2">
              <h5 className="text-base font-medium text-gray-700">Color de Fuente</h5>
              <div className="flex items-center space-x-2"> {/* Usar space-x-2 para alinear */}
                <label htmlFor="buttonTextColor" className="font-medium text-gray-700 w-16">Color</label> {/* Ancho fijo para la etiqueta */}
                <input
                  type="color"
                  id="buttonTextColor"
                  value={profileData.button_text_color || '#FFFFFF'}
                  onChange={e => updateProfileData({ button_text_color: e.target.value })}
                  className="w-8 h-8 p-0 border-none cursor-pointer" // Tamaño más pequeño para el selector de color
                />
                <input
                  type="text"
                  value={profileData.button_text_color || ''}
                  onChange={e => updateProfileData({ button_text_color: e.target.value })}
                  className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm" // Cuadro de texto para el código
                  placeholder="#RRGGBB"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(profileData.button_text_color || '')}
                  className="p-1 text-gray-500 hover:text-gray-800 rounded-full"
                  aria-label="Copiar color de texto del botón"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="buttonTextOpacity" className="font-medium text-gray-700">Transparencia</label>
                <input
                  type="range"
                  id="buttonTextOpacity"
                  min="0"
                  max="100" // Cambiado a 100
                  step="1"   // Cambiado a 1
                  value={(profileData.button_text_opacity ?? 1) * 100} // Multiplicar por 100 para mostrar en %
                  onChange={e => updateProfileData({ button_text_opacity: parseFloat(e.target.value) / 100 })} // Dividir por 100 para guardar como decimal
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">{(profileData.button_text_opacity ?? 1) * 100}%</span> {/* Mostrar en % */}
              </div>
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
