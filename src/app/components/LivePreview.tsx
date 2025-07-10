'use client';

import React from 'react';
import Image from 'next/image';

interface LinkData {
  id: number;
  title: string;
  url: string;
  type?: string;
}

interface LivePreviewProps {
  profileSlug: string;
  name: string;
  bio: string;
  avatar: string | null;
  links: LinkData[];
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
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: string | File | null;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  profileSlug,
  name,
  bio,
  avatar,
  links,
  button_style,
  button_color,
  button_text_color,
  button_text_opacity,
  button_background_opacity,
  button_border_color,
  button_border_opacity,
  button_shadow_color,
  button_shadow_opacity,
  font_family,
  theme,
  custom_gradient_start,
  custom_gradient_end,
  background_image,
}) => {

  React.useEffect(() => {
    console.log('Font family changed:', font_family);
  }, [font_family]);

  const getButtonClasses = (style?: string) => {
    let classes = "block w-full text-center py-3 px-4 transition-all duration-300 shadow-md no-underline";
    if (style === 'rounded-full') return classes + " rounded-full";
    if (style === 'rounded-md') return classes + " rounded-md";
    if (style === 'rounded-none') return classes + " rounded-none";
    return classes + " rounded-full"; // Default
  };

  const getButtonStyles = () => {
    const toRgba = (hex: string, opacity: number = 1) => {
      const h = hex.replace('#', '');
      const r = parseInt(h.substring(0, 2), 16);
      const g = parseInt(h.substring(2, 4), 16);
      const b = parseInt(h.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    return {
      backgroundColor: toRgba(button_color || '#000000', button_background_opacity),
      color: toRgba(button_text_color || '#FFFFFF', button_text_opacity),
      border: `2px solid ${toRgba(button_border_color || '#000000', button_border_opacity)}`,
      boxShadow: `0 4px 14px 0 ${toRgba(button_shadow_color || '#000000', button_shadow_opacity)}`,
    };
  };

  let backgroundStyle: React.CSSProperties = {};
  if (background_image) {
    const imageUrl = typeof background_image === 'string' ? background_image : URL.createObjectURL(background_image);
    backgroundStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } else if (custom_gradient_start && custom_gradient_end) {
    backgroundStyle = {
      background: `linear-gradient(to bottom right, ${custom_gradient_start}, ${custom_gradient_end})`,
    };
  } else {
    backgroundStyle = { backgroundColor: '#F3F4F6' }; // Gris por defecto
  }

  const fontClass = font_family || 'font-inter'; // Fuente por defecto

  return (
    <div 
      className={`w-[320px] h-[600px] border border-gray-300 rounded-2xl overflow-y-auto shadow-lg flex flex-col items-center p-6 ${fontClass}`}
      style={backgroundStyle}
    >
      <div className="relative mb-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{name}</h2>
      <p className="text-gray-600 text-center px-4 mb-6">{bio}</p>

      <div className="w-full max-w-xs mx-auto space-y-4">
        {links.filter(link => link.title && link.title.trim() !== '').map(link => (
          <a 
            key={link.id} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={getButtonClasses(button_style)}
            style={getButtonStyles()}
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LivePreview;