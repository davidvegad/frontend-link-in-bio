'use client';

import { useState, useEffect } from 'react';
import { 
  Palette, 
  Type, 
  Layout, 
  Image as ImageIcon, 
  Settings,
  Save,
  RotateCcw,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Wand2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonalizationSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
  typography: {
    fontFamily: string;
    fontSize: 'small' | 'medium' | 'large';
    fontWeight: 'light' | 'normal' | 'bold';
    lineHeight: 'tight' | 'normal' | 'relaxed';
  };
  layout: {
    style: 'minimal' | 'modern' | 'creative' | 'professional';
    spacing: 'compact' | 'comfortable' | 'spacious';
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full';
    shadows: 'none' | 'subtle' | 'medium' | 'strong';
  };
  components: {
    headerStyle: 'simple' | 'gradient' | 'image' | 'video';
    buttonStyle: 'flat' | 'rounded' | 'pill' | 'gradient';
    cardStyle: 'flat' | 'elevated' | 'outlined' | 'minimal';
    navigationStyle: 'top' | 'side' | 'bottom' | 'floating';
  };
  animations: {
    enabled: boolean;
    speed: 'slow' | 'normal' | 'fast';
    effects: string[];
  };
}

const defaultSettings: PersonalizationSettings = {
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#F59E0B'
  },
  typography: {
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    lineHeight: 'normal'
  },
  layout: {
    style: 'modern',
    spacing: 'comfortable',
    borderRadius: 'medium',
    shadows: 'medium'
  },
  components: {
    headerStyle: 'gradient',
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
    navigationStyle: 'top'
  },
  animations: {
    enabled: true,
    speed: 'normal',
    effects: ['fadeIn', 'slideUp']
  }
};

interface AdvancedPersonalizationProps {
  onSettingsChange?: (settings: PersonalizationSettings) => void;
  className?: string;
}

export default function AdvancedPersonalization({
  onSettingsChange,
  className
}: AdvancedPersonalizationProps) {
  const [settings, setSettings] = useState<PersonalizationSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'theme' | 'typography' | 'layout' | 'components' | 'animations'>('theme');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const updateSettings = (section: keyof PersonalizationSettings, updates: Partial<any>) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  const generateAIRecommendations = () => {
    // Simulate AI-generated theme recommendations
    const aiThemes = [
      {
        name: 'Sunset Vibes',
        theme: {
          primaryColor: '#F97316',
          secondaryColor: '#EF4444',
          backgroundColor: '#FFF7ED',
          textColor: '#1F2937',
          accentColor: '#FBBF24'
        }
      },
      {
        name: 'Ocean Breeze',
        theme: {
          primaryColor: '#0EA5E9',
          secondaryColor: '#06B6D4',
          backgroundColor: '#F0F9FF',
          textColor: '#1E293B',
          accentColor: '#10B981'
        }
      },
      {
        name: 'Forest Green',
        theme: {
          primaryColor: '#059669',
          secondaryColor: '#10B981',
          backgroundColor: '#F0FDF4',
          textColor: '#1F2937',
          accentColor: '#F59E0B'
        }
      }
    ];

    const randomTheme = aiThemes[Math.floor(Math.random() * aiThemes.length)];
    updateSettings('theme', randomTheme.theme);
  };

  const tabs = [
    { id: 'theme', label: 'Colores', icon: Palette },
    { id: 'typography', label: 'Tipografía', icon: Type },
    { id: 'layout', label: 'Diseño', icon: Layout },
    { id: 'components', label: 'Componentes', icon: Settings },
    { id: 'animations', label: 'Animaciones', icon: Wand2 }
  ];

  return (
    <div className={cn('bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Palette className="w-6 h-6 mr-3" />
            <div>
              <h3 className="text-xl font-bold">Personalización Avanzada</h3>
              <p className="text-sm text-white/80">Diseña tu página perfecta</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={generateAIRecommendations}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              IA
            </button>
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              Vista Previa
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-50 border-r border-gray-200">
          <div className="p-4 space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors',
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm border border-blue-200'
                      : 'text-gray-600 hover:bg-white hover:text-gray-900'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Device Preview Toggle */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">Vista previa</p>
            <div className="flex space-x-2">
              {[
                { id: 'mobile', icon: Smartphone },
                { id: 'tablet', icon: Tablet },
                { id: 'desktop', icon: Monitor }
              ].map(device => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.id}
                    onClick={() => setPreviewDevice(device.id as any)}
                    className={cn(
                      'flex-1 p-2 rounded-lg transition-colors',
                      previewDevice === device.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    )}
                  >
                    <Icon className="w-5 h-5 mx-auto" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-2">
            <button
              onClick={resetToDefaults}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restablecer
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          {activeTab === 'theme' && (
            <ThemeSettings 
              settings={settings.theme} 
              onChange={(updates) => updateSettings('theme', updates)} 
            />
          )}
          
          {activeTab === 'typography' && (
            <TypographySettings 
              settings={settings.typography} 
              onChange={(updates) => updateSettings('typography', updates)} 
            />
          )}
          
          {activeTab === 'layout' && (
            <LayoutSettings 
              settings={settings.layout} 
              onChange={(updates) => updateSettings('layout', updates)} 
            />
          )}
          
          {activeTab === 'components' && (
            <ComponentSettings 
              settings={settings.components} 
              onChange={(updates) => updateSettings('components', updates)} 
            />
          )}
          
          {activeTab === 'animations' && (
            <AnimationSettings 
              settings={settings.animations} 
              onChange={(updates) => updateSettings('animations', updates)} 
            />
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewMode && (
        <PersonalizationPreview 
          settings={settings}
          device={previewDevice}
          onClose={() => setIsPreviewMode(false)}
        />
      )}
    </div>
  );
}

// Individual Settings Components
function ThemeSettings({ settings, onChange }: { settings: any, onChange: (updates: any) => void }) {
  const colors = [
    { name: 'Azul', value: '#3B82F6' },
    { name: 'Púrpura', value: '#8B5CF6' },
    { name: 'Verde', value: '#10B981' },
    { name: 'Naranja', value: '#F97316' },
    { name: 'Rosa', value: '#EC4899' },
    { name: 'Rojo', value: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Esquema de Colores</h4>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Primario</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
            <div className="flex-1 grid grid-cols-3 gap-2">
              {colors.map(color => (
                <button
                  key={color.value}
                  onClick={() => onChange({ primaryColor: color.value })}
                  className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color Secundario</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => onChange({ secondaryColor: e.target.value })}
              className="w-12 h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
            <div className="flex-1 grid grid-cols-3 gap-2">
              {colors.map(color => (
                <button
                  key={color.value}
                  onClick={() => onChange({ secondaryColor: color.value })}
                  className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Themes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Temas Predefinidos</label>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: 'Moderno', colors: ['#3B82F6', '#8B5CF6', '#F3F4F6'] },
            { name: 'Natural', colors: ['#10B981', '#059669', '#F0FDF4'] },
            { name: 'Cálido', colors: ['#F97316', '#EF4444', '#FFF7ED'] }
          ].map(theme => (
            <button
              key={theme.name}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
              onClick={() => onChange({
                primaryColor: theme.colors[0],
                secondaryColor: theme.colors[1],
                backgroundColor: theme.colors[2]
              })}
            >
              <div className="flex space-x-2 mb-2">
                {theme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-900">{theme.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypographySettings({ settings, onChange }: { settings: any, onChange: (updates: any) => void }) {
  const fonts = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins',
    'Playfair Display', 'Merriweather', 'Source Sans Pro'
  ];

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Tipografía</h4>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuente</label>
          <select
            value={settings.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fonts.map(font => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño</label>
          <div className="grid grid-cols-3 gap-2">
            {['small', 'medium', 'large'].map(size => (
              <button
                key={size}
                onClick={() => onChange({ fontSize: size })}
                className={cn(
                  'p-3 border rounded-lg text-sm font-medium transition-colors',
                  settings.fontSize === size
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                )}
              >
                {size === 'small' ? 'Pequeño' : size === 'medium' ? 'Mediano' : 'Grande'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Font Preview */}
      <div className="p-6 border border-gray-200 rounded-lg">
        <h5 className="text-sm font-medium text-gray-700 mb-3">Vista Previa</h5>
        <div 
          style={{ 
            fontFamily: settings.fontFamily,
            fontSize: settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px',
            fontWeight: settings.fontWeight === 'light' ? '300' : settings.fontWeight === 'bold' ? '700' : '400',
            lineHeight: settings.lineHeight === 'tight' ? '1.25' : settings.lineHeight === 'relaxed' ? '1.75' : '1.5'
          }}
        >
          <h3 className="text-2xl font-bold mb-2">Título Principal</h3>
          <p className="text-gray-600 mb-4">
            Este es un ejemplo de cómo se verá el texto en tu página con la configuración actual de tipografía.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Botón de Ejemplo
          </button>
        </div>
      </div>
    </div>
  );
}

function LayoutSettings({ settings, onChange }: { settings: any, onChange: (updates: any) => void }) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Diseño y Espaciado</h4>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Estilo de Diseño</label>
          <div className="space-y-2">
            {[
              { id: 'minimal', label: 'Minimalista', desc: 'Limpio y simple' },
              { id: 'modern', label: 'Moderno', desc: 'Contemporáneo' },
              { id: 'creative', label: 'Creativo', desc: 'Artístico y único' },
              { id: 'professional', label: 'Profesional', desc: 'Formal y elegante' }
            ].map(style => (
              <button
                key={style.id}
                onClick={() => onChange({ style: style.id })}
                className={cn(
                  'w-full p-3 border rounded-lg text-left transition-colors',
                  settings.style === style.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                )}
              >
                <div className="font-medium text-gray-900">{style.label}</div>
                <div className="text-sm text-gray-600">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Espaciado</label>
          <div className="space-y-2">
            {[
              { id: 'compact', label: 'Compacto', desc: 'Máximo contenido' },
              { id: 'comfortable', label: 'Cómodo', desc: 'Equilibrado' },
              { id: 'spacious', label: 'Espacioso', desc: 'Respiro visual' }
            ].map(spacing => (
              <button
                key={spacing.id}
                onClick={() => onChange({ spacing: spacing.id })}
                className={cn(
                  'w-full p-3 border rounded-lg text-left transition-colors',
                  settings.spacing === spacing.id
                    ? 'bg-blue-50 border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                )}
              >
                <div className="font-medium text-gray-900">{spacing.label}</div>
                <div className="text-sm text-gray-600">{spacing.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComponentSettings({ settings, onChange }: { settings: any, onChange: (updates: any) => void }) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Estilos de Componentes</h4>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Estilo de Botones</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'flat', label: 'Plano' },
              { id: 'rounded', label: 'Redondeado' },
              { id: 'pill', label: 'Píldora' },
              { id: 'gradient', label: 'Degradado' }
            ].map(style => (
              <button
                key={style.id}
                onClick={() => onChange({ buttonStyle: style.id })}
                className={cn(
                  'p-3 border rounded-lg transition-colors',
                  settings.buttonStyle === style.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                )}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Estilo de Tarjetas</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'flat', label: 'Plano' },
              { id: 'elevated', label: 'Elevado' },
              { id: 'outlined', label: 'Delineado' },
              { id: 'minimal', label: 'Mínimo' }
            ].map(style => (
              <button
                key={style.id}
                onClick={() => onChange({ cardStyle: style.id })}
                className={cn(
                  'p-3 border rounded-lg transition-colors',
                  settings.cardStyle === style.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                )}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimationSettings({ settings, onChange }: { settings: any, onChange: (updates: any) => void }) {
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900">Animaciones</h4>
      
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h5 className="font-medium text-gray-900">Habilitar Animaciones</h5>
          <p className="text-sm text-gray-600">Efectos visuales suaves</p>
        </div>
        <button
          onClick={() => onChange({ enabled: !settings.enabled })}
          className={cn(
            'relative w-12 h-6 rounded-full transition-colors',
            settings.enabled ? 'bg-blue-600' : 'bg-gray-300'
          )}
        >
          <div className={cn(
            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform',
            settings.enabled ? 'left-7' : 'left-1'
          )} />
        </button>
      </div>

      {settings.enabled && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Velocidad</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'slow', label: 'Lenta' },
              { id: 'normal', label: 'Normal' },
              { id: 'fast', label: 'Rápida' }
            ].map(speed => (
              <button
                key={speed.id}
                onClick={() => onChange({ speed: speed.id })}
                className={cn(
                  'p-3 border rounded-lg transition-colors',
                  settings.speed === speed.id
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                )}
              >
                {speed.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PersonalizationPreview({ settings, device, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Vista Previa - {device}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 bg-gray-100">
          <div 
            className={cn(
              'mx-auto bg-white rounded-lg shadow-lg overflow-hidden',
              {
                'w-full max-w-sm': device === 'mobile',
                'w-full max-w-2xl': device === 'tablet',
                'w-full': device === 'desktop'
              }
            )}
            style={{
              fontFamily: settings.typography.fontFamily,
              backgroundColor: settings.theme.backgroundColor,
              color: settings.theme.textColor
            }}
          >
            {/* Mock preview content */}
            <div 
              className="h-32 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${settings.theme.primaryColor}, ${settings.theme.secondaryColor})`
              }}
            >
              <div className="text-white text-center">
                <h2 className="text-2xl font-bold mb-2">Tu Página</h2>
                <p className="text-white/80">Vista previa personalizada</p>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Contenido de Ejemplo</h3>
              <p className="text-gray-600 mb-6">
                Así se verá tu página con la configuración actual de personalización.
              </p>
              
              <button 
                className="px-6 py-3 rounded-lg font-medium transition-colors"
                style={{
                  backgroundColor: settings.theme.primaryColor,
                  color: 'white'
                }}
              >
                Botón de Ejemplo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}