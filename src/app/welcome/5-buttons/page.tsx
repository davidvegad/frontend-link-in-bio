'use client';

import { useRouter } from 'next/navigation';
import { useProfile } from '@/context/ProfileContext';
import LivePreview from '@/app/components/LivePreview'; // Importa el componente LivePreview centralizado
import { getButtonClasses, getButtonStyles, interpolateColor, predefinedThemes } from '@/app/utils/styleUtils';
import { useState, useEffect } from 'react';

const buttonStylesOptions = [
  { id: 'rounded-full', name: 'Redondeado' },
  { id: 'rounded-md', name: 'Semi-redondeado' },
  { id: 'rounded-none', name: 'Cuadrado' },
];

export default function ButtonsPage() {
  const { profileData, updateProfileData } = useProfile();
  const router = useRouter();
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  useEffect(() => {
    if (!profileData.button_style) {
      updateProfileData({ button_style: 'rounded-full' });
    }
    if (!profileData.button_color) {
      updateProfileData({ button_color: '#000000' });
    }
    if (!profileData.button_text_color) {
      updateProfileData({ button_text_color: '#FFFFFF' });
    }
  }, [profileData.button_style, profileData.button_color, profileData.button_text_color, updateProfileData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called');
    console.log('isButtonDisabled:', isButtonDisabled);
    router.push('/welcome/6-links');
  };

  const isButtonDisabled = !profileData.button_style || !profileData.button_color || !profileData.button_text_color;

  const exampleButtonStyles = getButtonStyles(profileData);

  // Paleta de blanco a negro
  const grayscalePalette = [
    '#FFFFFF', '#CCCCCC', '#999999', '#666666', '#333333', '#000000'
  ];

  // Paleta de colores del degradado
  const getGradientPalette = () => {
    let startColor = '#FFFFFF';
    let endColor = '#000000';

    if (profileData.theme === 'custom' && profileData.custom_gradient_start && profileData.custom_gradient_end) {
      startColor = profileData.custom_gradient_start;
      endColor = profileData.custom_gradient_end;
    } else if (profileData.theme) {
      const selectedTheme = predefinedThemes.find(t => t.id === profileData.theme);
      if (selectedTheme) {
        startColor = selectedTheme.start;
        endColor = selectedTheme.end;
      }
    }

    const palette = [];
    for (let i = 0; i <= 4; i++) { // 5 colores intermedios
      palette.push(interpolateColor(startColor, endColor, i / 4));
    }
    return palette;
  };

  const gradientPalette = getGradientPalette();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-6xl mx-auto transform transition-all duration-500 hover:shadow-2xl flex flex-col lg:flex-row gap-12">
        
        {/* Columna de Vista Previa */}
        <div className="lg:w-1/3 flex justify-center items-start">
          <LivePreview profileData={profileData} />
        </div>

        {/* Columna de Controles */}
        <div className="lg:w-2/3">
          {/* Títulos principales ocultos en móvil, visibles en desktop */}
          <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 hidden md:block">Personaliza tus Botones</h1>
          <p className="text-gray-600 mb-8 text-center hidden md:block">Así se verán los enlaces en tu página.</p>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sección de paleta sugerida para móvil */}
            <div className="md:hidden space-y-6">
              <h4 className="text-lg font-medium text-gray-900">Paleta Sugerida</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {grayscalePalette.map(color => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => updateProfileData({ button_color: color })}
                  ></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {gradientPalette.map(color => (
                  <div
                    key={color}
                    className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => updateProfileData({ button_color: color })}
                  ></div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                {showAdvancedOptions ? 'Ocultar Opciones Avanzadas' : 'Personalizar'}
              </button>
            </div>

            {/* Opciones avanzadas (visibles en desktop, condicionalmente en móvil) */}
            <div className={`${showAdvancedOptions ? 'block' : 'hidden'} md:grid grid-cols-1 md:grid-cols-2 gap-8`}>
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-gray-900">Colores y Apariencia</h4>
                <div className="space-y-2 border-b pb-4">
                  <h5 className="text-base font-medium text-gray-800">Fondo</h5>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="button_color" className="text-sm font-medium text-gray-600 w-20">Color</label>
                    <input
                      type="color"
                      id="button_color"
                      value={profileData.button_color || '#000000'}
                      onChange={e => updateProfileData({ button_color: e.target.value })}
                      className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={profileData.button_color || ''}
                      onChange={e => updateProfileData({ button_color: e.target.value })}
                      className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
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
                    <label htmlFor="button_text_color" className="text-sm font-medium text-gray-600 w-20">Color</label>
                    <input
                      type="color"
                      id="button_text_color"
                      value={profileData.button_text_color || '#FFFFFF'}
                      onChange={e => updateProfileData({ button_text_color: e.target.value })}
                      className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={profileData.button_text_color || ''}
                      onChange={e => updateProfileData({ button_text_color: e.target.value })}
                      className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
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
                    <label htmlFor="button_border_color" className="text-sm font-medium text-gray-600 w-20">Color</label>
                    <input
                      type="color"
                      id="button_border_color"
                      value={profileData.button_border_color || '#000000'}
                      onChange={e => updateProfileData({ button_border_color: e.target.value })}
                      className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={profileData.button_border_color || ''}
                      onChange={e => updateProfileData({ button_border_color: e.target.value })}
                      className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
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
                    <label htmlFor="button_shadow_color" className="text-sm font-medium text-gray-600 w-20">Color</label>
                    <input
                      type="color"
                      id="button_shadow_color"
                      value={profileData.button_shadow_color || '#000000'}
                      onChange={e => updateProfileData({ button_shadow_color: e.target.value })}
                      className="w-10 h-10 p-0 border-none rounded-md cursor-pointer"
                    />
                    <input
                      type="text"
                      value={profileData.button_shadow_color || ''}
                      onChange={e => updateProfileData({ button_shadow_color: e.target.value })}
                      className="w-28 px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm"
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
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Forma y estilo</h2>
                <div className="flex flex-col space-y-3">
                  {buttonStylesOptions.map(bs => (
                    <div
                      key={bs.id}
                      onClick={() => updateProfileData({ button_style: bs.id })}
                      className={`p-3 border cursor-pointer text-center transition-all ${bs.id} text-gray-900 ${
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
                    className={getButtonClasses(profileData.button_style)}
                    style={exampleButtonStyles}
                  >
                    Botón de Ejemplo
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="w-full max-w-xs bg-[#b013a3] text-white py-3 px-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md border-2 border-transparent hover:bg-white hover:text-[#b013a3] hover:border-[#b013a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b013a3] cursor-pointer"
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
