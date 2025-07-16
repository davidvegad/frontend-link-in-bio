'use client';

import React from 'react';
import Image from 'next/image';

// Updated interface to include new fields
interface ProfileData {
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: string | File | null;
  background_preference?: 'image' | 'color';
  image_overlay?: 'none' | 'dark' | 'light';
  button_style?: string;
  button_color?: string;
  button_text_color?: string;
  button_text_opacity?: number;
  button_background_opacity?: number;
  button_border_color?: string;
  button_border_opacity?: number;
  button_shadow_color?: string;
  button_shadow_opacity?: number;
  font_family?: string;
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
  { id: 'breeze', name: 'Brisa', start: '#a7f3d0', end: '#6ee7b7', textColor: 'text-black' },
  { id: 'nebula', name: 'Nébula', start: '#6366f1', end: '#a855f7', textColor: 'text-white' },
  { id: 'obsidian', name: 'Obsidiana', start: '#6b7280', end: '#9ca3af', textColor: 'text-black' },
  { id: 'lightning', name: 'Rayo', start: '#facc15', end: '#f97316', textColor: 'text-white' },
  { id: 'splash', name: 'Salpicón', start: '#ef4444', end: '#3b82f6', textColor: 'text-white' },
  { id: 'flamingo', name: 'Flamenco', start: '#fb7185', end: '#f43f5e', textColor: 'text-white' },
  { id: 'fog', name: 'Niebla', start: '#e5e7eb', end: '#9ca3af', textColor: 'text-black' },
  { id: 'ivory', name: 'Marfil', start: '#f5f5dc', end: '#f0f0c0', textColor: 'text-black' },
  { id: 'solstice', name: 'Solsticio', start: '#fde047', end: '#f97316', textColor: 'text-black' },
  { id: 'meadow', name: 'Pradera', start: '#84cc16', end: '#4ade80', textColor: 'text-black' },
  { id: 'brio', name: 'Brío', start: '#f97316', end: '#facc15', textColor: 'text-black' },
  { id: 'velvet', name: 'Terciopelo', start: '#7e22ce', end: '#9333ea', textColor: 'text-white' },
  { id: 'laguna', name: 'Laguna', start: '#a855f7', end: '#d946ef', textColor: 'text-white' },
  { id: 'stone', name: 'Piedra', start: '#78716c', end: '#57534e', textColor: 'text-white' },
  { id: 'cloud', name: 'Nube', start: '#e0f2fe', end: '#bfdbfe', textColor: 'text-black' },
];

const buttonStylesOptions = [
  { id: 'rounded-full', name: 'Redondeado', class: 'rounded-full' },
  { id: 'rounded-md', name: 'Semi-redondeado', class: 'rounded-md' },
  { id: 'rounded-none', name: 'Cuadrado', class: 'rounded-none' },
];

const fontOptions = [
  { id: 'font-inter', name: 'Inter', class: 'font-inter' },
  { id: 'font-roboto-mono', name: 'Roboto Mono', class: 'font-roboto-mono' },
  { id: 'font-lora', name: 'Lora', class: 'font-lora' },
  { id: 'font-playfair-display', name: 'Playfair Display', class: 'font-playfair-display' },
  { id: 'font-montserrat', name: 'Montserrat', class: 'font-montserrat' },
  { id: 'font-poppins', name: 'Poppins', class: 'font-poppins' },
  { id: 'font-saira', name: 'Saira', class: 'font-saira' },
  { id: 'font-mulish', name: 'Mulish', class: 'font-mulish' },
  { id: 'font-roboto', name: 'Roboto', class: 'font-roboto' },
  { id: 'font-jost', name: 'Jost', class: 'font-jost' },
  { id: 'font-quicksand', name: 'Quicksand', class: 'font-quicksand' },
  { id: 'font-karla', name: 'Karla', class: 'font-karla' },
  { id: 'font-solway', name: 'Solway', class: 'font-solway' },
  { id: 'font-arvo', name: 'Arvo', class: 'font-arvo' },
  { id: 'font-berkshire-swash', name: 'Berkshire Swash', class: 'font-berkshire-swash' },
  { id: 'font-itim', name: 'Itim', class: 'font-itim' },
  { id: 'font-bellota', name: 'Bellota', class: 'font-bellota' },
  { id: 'font-aldrich', name: 'Aldrich', class: 'font-aldrich' },
  { id: 'font-palanquin-dark', name: 'Palanquin Dark', class: 'font-palanquin-dark' },
  { id: 'font-comic-neue', name: 'Comic Neue', class: 'font-comic-neue' },
  { id: 'font-source-sans-3', name: 'Source Sans Pro', class: 'font-source-sans-3' },
  { id: 'font-spectral', name: 'Spectral', class: 'font-spectral' },
  { id: 'font-open-sans', name: 'Open Sans', class: 'font-open-sans' },
  { id: 'font-lato', name: 'Lato', class: 'font-lato' },
  { id: 'font-oswald', name: 'Oswald', class: 'font-oswald' },
  { id: 'font-pt-sans', name: 'PT Sans', class: 'font-pt-sans' },
  { id: 'font-merriweather', name: 'Merriweather', class: 'font-merriweather' },
  { id: 'font-ubuntu', name: 'Ubuntu', class: 'font-ubuntu' },
  { id: 'font-nunito', name: 'Nunito', class: 'font-nunito' },
  { id: 'font-fira-sans', name: 'Fira Sans', class: 'font-fira-sans' },
  { id: 'font-crimson-text', name: 'Crimson Text', class: 'font-crimson-text' },
  { id: 'font-libre-baskerville', name: 'Libre Baskerville', class: 'font-libre-baskerville' },
  { id: 'font-work-sans', name: 'Work Sans', class: 'font-work-sans' },
  { id: 'font-caveat', name: 'Caveat', class: 'font-caveat' },
  { id: 'font-pacifico', name: 'Pacifico', class: 'font-pacifico' },
];

const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  profileData,
  updateProfileData,
  setBackgroundImageFile,
}) => {
  const [activeBackgroundTab, setActiveBackgroundTab] = React.useState<'colors' | 'upload' | 'gallery'>(
    profileData.background_preference === 'image' ? 'upload' : 'colors'
  );

  React.useEffect(() => {
    setActiveBackgroundTab(profileData.background_preference === 'image' ? 'upload' : 'colors');
  }, [profileData.background_preference]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackgroundImageFile(e.target.files[0]);
      updateProfileData({
        background_image: e.target.files[0],
        background_preference: 'image',
        theme: undefined,
        custom_gradient_start: undefined,
        custom_gradient_end: undefined,
      });
    }
  };

  const handleClearBackgroundImage = () => {
    setBackgroundImageFile(null);
    updateProfileData({ background_image: null, background_preference: 'color' });
  };

  const handleBackgroundTabChange = (option: 'colors' | 'upload' | 'gallery') => {
    setActiveBackgroundTab(option);
    if (option === 'colors') {
      updateProfileData({ background_preference: 'color' });
    } else if (option === 'upload') {
      updateProfileData({ background_preference: 'image' });
    }
  };

  const imagePreviewUrl = React.useMemo(() => {
    if (typeof window !== 'undefined' && profileData.background_image instanceof File) {
      return URL.createObjectURL(profileData.background_image);
    }
    return profileData.background_image;
  }, [profileData.background_image]);

  return (
    <section id="design-section" className="space-y-8">
      <h2 className="text-2xl font-semibold">Diseño de tu Página</h2>

      {/* Background Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Fondo</h3>
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-200 rounded-lg mb-4">
          {[
            { id: 'upload', label: 'Subir' },
            { id: 'gallery', label: 'Galería' },
            { id: 'colors', label: 'Colores' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => handleBackgroundTabChange(tab.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeBackgroundTab === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'bg-transparent text-gray-600 hover:bg-white/50'
              }`}
              disabled={tab.id === 'gallery'} // Disable gallery for now
            >
              {tab.id === 'gallery' ? 'Galería (próx.)' : tab.label}
            </button>
          ))}
        </div>

        {activeBackgroundTab === 'colors' && (
          <div className="space-y-6">
            {/* Predefined Themes */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Temas Prediseñados</h4>
              <div className="flex flex-wrap gap-4">
                {predefinedThemes.map(themeOption => (
                  <div
                    key={themeOption.id}
                    onClick={() =>
                      updateProfileData({
                        theme: themeOption.id,
                        custom_gradient_start: themeOption.start,
                        custom_gradient_end: themeOption.end,
                        background_preference: 'color',
                      })
                    }
                    className="cursor-pointer flex-shrink-0 w-28"
                  >
                    <div
                      className={`w-full h-24 rounded-lg flex items-center justify-center font-semibold text-sm text-center p-2 transition-all duration-200 ${
                        profileData.theme === themeOption.id
                          ? 'ring-2 ring-offset-2 ring-indigo-500'
                          : 'ring-1 ring-gray-300 hover:ring-indigo-400'
                      } ${themeOption.textColor}`}
                      style={{ background: `linear-gradient(to right, ${themeOption.start}, ${themeOption.end})` }}
                    >
                      {themeOption.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Gradient */}
            <div>
              <h4 className="text-lg font-semibold mb-3">Degradado Personalizado</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-900 w-24">Inicio</label>
                  <input
                    type="color"
                    value={profileData.custom_gradient_start || '#FFFFFF'}
                    onChange={e => updateProfileData({ custom_gradient_start: e.target.value, theme: 'custom', background_preference: 'color' })}
                    className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={profileData.custom_gradient_start || ''}
                    onChange={e => updateProfileData({ custom_gradient_start: e.target.value, theme: 'custom', background_preference: 'color' })}
                    className="w-32 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900"
                    placeholder="#RRGGBB"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="block text-sm font-medium text-gray-900 w-24">Fin</label>
                  <input
                    type="color"
                    value={profileData.custom_gradient_end || '#000000'}
                    onChange={e => updateProfileData({ custom_gradient_end: e.target.value, theme: 'custom', background_preference: 'color' })}
                    className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={profileData.custom_gradient_end || ''}
                    onChange={e => updateProfileData({ custom_gradient_end: e.target.value, theme: 'custom', background_preference: 'color' })}
                    className="w-32 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900"
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeBackgroundTab === 'upload' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Subir Imagen de Fondo</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
            {imagePreviewUrl && typeof imagePreviewUrl === 'string' && (
              <div className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center space-x-4">
                  <Image src={imagePreviewUrl} alt="Background Preview" width={100} height={100} className="rounded-md object-cover" />
                  <button
                    type="button"
                    onClick={handleClearBackgroundImage}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium"
                  >
                    Eliminar Imagen
                  </button>
                </div>
                {/* Image Overlay Section */}
                <div>
                  <h5 className="text-md font-semibold mb-2">Superposición de color</h5>
                  <div className="flex space-x-2">
                    {[
                      { id: 'none', label: 'Ninguno' },
                      { id: 'dark', label: 'Oscuro' },
                      { id: 'light', label: 'Claro' },
                    ].map(overlay => (
                      <button
                        key={overlay.id}
                        onClick={() => updateProfileData({ image_overlay: overlay.id as any })}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          profileData.image_overlay === overlay.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {overlay.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeBackgroundTab === 'gallery' && (
          <div>
            <h4 className="text-lg font-semibold">Galería de Imágenes</h4>
            <p className="text-gray-600 text-sm">Esta sección estará disponible pronto.</p>
          </div>
        )}
      </div>

      {/* Estilo de Botones */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Estilo de Botones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-lg font-medium">Colores y Apariencia</h4>
            <div className="space-y-2 border-b pb-4">
              <h5 className="text-base font-medium text-gray-800">Fondo</h5>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_color" className="text-sm font-medium text-gray-900 w-20">Color</label>
                <input
                  type="color"
                  id="button_color"
                  value={profileData.button_color || '#000000'}
                  onChange={e => updateProfileData({ button_color: e.target.value })}
                  className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={profileData.button_color || ''}
                  onChange={e => updateProfileData({ button_color: e.target.value })}
                  className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900"
                  placeholder="#000000"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_background_opacity" className="text-sm font-medium text-gray-600 w-20">Opacidad</label>
                <input
                  type="range"
                  id="button_background_opacity"
                  min="0" max="100" step="1"
                  value={(profileData.button_background_opacity ?? 1) * 100}
                  onChange={e => updateProfileData({ button_background_opacity: parseFloat(e.target.value) / 100 })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12 text-right">{((profileData.button_background_opacity ?? 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="space-y-2 border-b pb-4">
              <h5 className="text-base font-medium text-gray-800">Texto</h5>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_text_color" className="text-sm font-medium text-gray-900 w-20">Color</label>
                <input
                  type="color"
                  id="button_text_color"
                  value={profileData.button_text_color || '#FFFFFF'}
                  onChange={e => updateProfileData({ button_text_color: e.target.value })}
                  className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={profileData.button_text_color || ''}
                  onChange={e => updateProfileData({ button_text_color: e.target.value })}
                  className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900"
                  placeholder="#FFFFFF"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_text_opacity" className="text-sm font-medium text-gray-600 w-20">Opacidad</label>
                <input
                  type="range"
                  id="button_text_opacity"
                  min="0" max="100" step="1"
                  value={(profileData.button_text_opacity ?? 1) * 100}
                  onChange={e => updateProfileData({ button_text_opacity: parseFloat(e.target.value) / 100 })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12 text-right">{((profileData.button_text_opacity ?? 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="space-y-2 border-b pb-4">
              <h5 className="text-base font-medium text-gray-800">Borde</h5>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_border_color" className="text-sm font-medium text-gray-900 w-20">Color</label>
                <input
                  type="color"
                  id="button_border_color"
                  value={profileData.button_border_color || '#000000'}
                  onChange={e => updateProfileData({ button_border_color: e.target.value })}
                  className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={profileData.button_border_color || ''}
                  onChange={e => updateProfileData({ button_border_color: e.target.value })}
                  className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900"
                  placeholder="#000000"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_border_opacity" className="text-sm font-medium text-gray-600 w-20">Opacidad</label>
                <input
                  type="range"
                  id="button_border_opacity"
                  min="0" max="100" step="1"
                  value={(profileData.button_border_opacity ?? 1) * 100}
                  onChange={e => updateProfileData({ button_border_opacity: parseFloat(e.target.value) / 100 })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12 text-right">{((profileData.button_border_opacity ?? 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-base font-medium text-gray-800">Sombra</h5>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_shadow_color" className="text-sm font-medium text-gray-900 w-20">Color</label>
                <input
                  type="color"
                  id="button_shadow_color"
                  value={profileData.button_shadow_color || '#000000'}
                  onChange={e => updateProfileData({ button_shadow_color: e.target.value })}
                  className="w-10 h-10 p-0 border-none rounded-md cursor-pointer bg-white"
                />
                <input
                  type="text"
                  value={profileData.button_shadow_color || ''}
                  onChange={e => updateProfileData({ button_shadow_color: e.target.value })}
                  className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900"
                  placeholder="#000000"
                />
              </div>
              <div className="flex items-center space-x-3">
                <label htmlFor="button_shadow_opacity" className="text-sm font-medium text-gray-600 w-20">Opacidad</label>
                <input
                  type="range"
                  id="button_shadow_opacity"
                  min="0" max="100" step="1"
                  value={(profileData.button_shadow_opacity ?? 1) * 100}
                  onChange={e => updateProfileData({ button_shadow_opacity: parseFloat(e.target.value) / 100 })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12 text-right">{((profileData.button_shadow_opacity ?? 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-lg font-medium">Forma y Estilo</h4>
            <div className="flex flex-col space-y-3">
              {buttonStylesOptions.map(bs => (
                <div
                  key={bs.id}
                  onClick={() => updateProfileData({ button_style: bs.id })}
                  className={`p-3 border rounded-md cursor-pointer text-center transition-all ${
                    profileData.button_style === bs.id 
                      ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {bs.name}
                </div>
              ))}
            </div>
            <div className="mt-6 p-6 bg-gray-100 rounded-lg flex justify-center items-center h-48">
              <button
                className={`px-10 py-3 text-lg font-semibold transition-all transform hover:scale-105 ${
                  buttonStylesOptions.find(bs => bs.id === profileData.button_style)?.class || 'rounded-full'
                }`}
                style={{
                  backgroundColor: `rgba(${parseInt((profileData.button_color || '#000000').slice(1, 3), 16)}, ${parseInt((profileData.button_color || '#000000').slice(3, 5), 16)}, ${parseInt((profileData.button_color || '#000000').slice(5, 7), 16)}, ${profileData.button_background_opacity ?? 1})`,
                  color: `rgba(${parseInt((profileData.button_text_color || '#FFFFFF').slice(1, 3), 16)}, ${parseInt((profileData.button_text_color || '#FFFFFF').slice(3, 5), 16)}, ${parseInt((profileData.button_text_color || '#FFFFFF').slice(5, 7), 16)}, ${profileData.button_text_opacity ?? 1})`,
                  border: `2px solid rgba(${parseInt((profileData.button_border_color || '#000000').slice(1, 3), 16)}, ${parseInt((profileData.button_border_color || '#000000').slice(3, 5), 16)}, ${parseInt((profileData.button_border_color || '#000000').slice(5, 7), 16)}, ${profileData.button_border_opacity ?? 1})`,
                  boxShadow: `0 4px 14px 0 rgba(${parseInt((profileData.button_shadow_color || '#000000').slice(1, 3), 16)}, ${parseInt((profileData.button_shadow_color || '#000000').slice(3, 5), 16)}, ${parseInt((profileData.button_shadow_color || '#000000').slice(5, 7), 16)}, ${profileData.button_shadow_opacity ?? 1})`,
                }}
              >
                Botón de Ejemplo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Fuentes */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Fuente</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {fontOptions.map(font => (
            <div
              key={font.id}
              onClick={() => updateProfileData({ font_family: font.class })}
              className={`p-4 border rounded-md cursor-pointer text-center transition-all ${
                profileData.font_family === font.class
                  ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className={`${font.class} text-lg`}>{font.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignCustomizer;