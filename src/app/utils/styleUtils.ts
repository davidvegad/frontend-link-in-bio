import React from 'react';

// Interfaces
export interface LinkData {
  id?: number;
  title: string;
  url: string;
  type?: string;
}

export interface ProfileData {
  id?: number;
  name: string;
  bio: string;
  avatar: string;
  slug: string;
  links: LinkData[];
  profile_type?: string;
  purpose?: string;
  template_style?: string;
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: string;
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

export const predefinedThemes = [
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

export const toRgba = (hex: string, opacity: number = 1) => {
  const h = hex.replace('#', '');
  if (h.length !== 6) return `rgba(0,0,0,${opacity})`; // Return default if hex is invalid
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getButtonClasses = (style?: string) => {
  let classes = "block w-[70%] mx-auto text-center transition-all duration-300 shadow-md no-underline";
  if (style === 'rounded-full') return classes + " rounded-full";
  if (style === 'rounded-md') return classes + " rounded-md";
  if (style === 'rounded-none') return classes + " rounded-none";
  return classes + " rounded-full"; // Default
};

export const getButtonStyles = (profile: ProfileData) => {
  return {
    backgroundColor: toRgba(profile.button_color || '#000000', profile.button_background_opacity),
    color: toRgba(profile.button_text_color || '#FFFFFF', profile.button_text_opacity),
    border: `2px solid ${toRgba(profile.button_border_color || '#000000', profile.button_border_opacity)}`,
    boxShadow: `0 4px 14px 0 ${toRgba(profile.button_shadow_color || '#000000', profile.button_shadow_opacity)}`,
    paddingTop: '0.5rem', // py-5 (20px)
    paddingBottom: '0.5rem', // py-5 (20px)
    marginBottom: '0.5rem', // mb-6 (24px)
  };
};

interface GetBackgroundAndOverlayStylesResult {
  backgroundStyle: React.CSSProperties;
  overlayClass: string;
  nameColorClass: string;
  bioColorClass: string;
  textShadowClass: string;
  fontClass: string;
}

export const getBackgroundAndOverlayStyles = (profile: ProfileData): GetBackgroundAndOverlayStylesResult => {
  let backgroundStyle: React.CSSProperties = {};
  if (profile.background_preference === 'image' && profile.background_image) {
    backgroundStyle = {
      backgroundImage: `url(${profile.background_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } else if (profile.theme === 'custom' && profile.custom_gradient_start && profile.custom_gradient_end) {
    backgroundStyle = {
      background: `linear-gradient(to bottom right, ${profile.custom_gradient_start}, ${profile.custom_gradient_end})`,
    };
  } else if (profile.theme) {
    const selectedTheme = predefinedThemes.find(t => t.id === profile.theme);
    if (selectedTheme) {
      backgroundStyle = { background: `linear-gradient(to bottom right, ${selectedTheme.start}, ${selectedTheme.end})` };
    }
  } else {
    backgroundStyle = { backgroundColor: '#F3F4F6' }; // Default gray
  }

  const fontClass = profile.font_family || 'font-inter';

  const overlayClass = {
    none: '',
    dark: 'bg-black bg-opacity-50',
    light: 'bg-white bg-opacity-50',
  }[profile.image_overlay || 'none'];

  let nameColorClass = 'text-gray-800';
  let bioColorClass = 'text-gray-600';
  let textShadowClass = '';

  if (profile.background_preference === 'image') {
    textShadowClass = 'drop-shadow-md';
    switch (profile.image_overlay) {
      case 'dark':
        nameColorClass = 'text-white';
        bioColorClass = 'text-gray-200';
        break;
      case 'light':
        nameColorClass = 'text-gray-900';
        bioColorClass = 'text-gray-800';
        break;
      case 'none':
      default:
        nameColorClass = 'text-white';
        bioColorClass = 'text-gray-200';
        break;
    }
  }

  return {
    backgroundStyle,
    overlayClass,
    nameColorClass,
    bioColorClass,
    textShadowClass,
    fontClass,
  };
};

// Helper function to convert hex to RGB
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return [r, g, b];
};

// Helper function to convert RGB to hex
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// Function to interpolate colors
export const interpolateColor = (color1: string, color2: string, factor: number) => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const r = Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0]));
  const g = Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1]));
  const b = Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2]));

  return rgbToHex(r, g, b);
};