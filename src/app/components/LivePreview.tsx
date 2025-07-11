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
  background_image?: string | null; // Can be string (URL) or null
  image_overlay?: 'none' | 'dark' | 'light';
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
  image_overlay = 'none',
}) => {

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
      if (h.length !== 6) return `rgba(0,0,0,${opacity})`; // Return default if hex is invalid
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
    backgroundStyle = {
      backgroundImage: `url(${background_image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } else if (custom_gradient_start && custom_gradient_end) {
    backgroundStyle = {
      background: `linear-gradient(to bottom right, ${custom_gradient_start}, ${custom_gradient_end})`,
    };
  } else {
    backgroundStyle = { backgroundColor: '#F3F4F6' }; // Default gray
  }

  const fontClass = font_family || 'font-inter';

  // Determine text color and shadow based on background type and overlay
  let nameColorClass = 'text-gray-800';
  let bioColorClass = 'text-gray-600';
  let textShadowClass = '';

  if (background_image) {
    textShadowClass = 'drop-shadow-md'; // Add shadow for readability on images
    switch (image_overlay) {
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
        // Default to white text with shadow on images for better contrast
        nameColorClass = 'text-white';
        bioColorClass = 'text-gray-200';
        break;
    }
  }

  const overlayStyle: React.CSSProperties = {};
  if (image_overlay === 'dark') {
    overlayStyle.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // 50% black
  } else if (image_overlay === 'light') {
    overlayStyle.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // 50% white
  } else {
    overlayStyle.backgroundColor = 'rgba(0, 0, 0, 0.0)'; // Fully transparent for 'none'
  }

  return (
    <div 
      className={`relative w-[320px] h-[600px] border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center p-6 ${fontClass}`}
      style={backgroundStyle}
    >
      {background_image && (
        <div className={`absolute inset-0 w-full h-full rounded-2xl z-[1]`} style={overlayStyle}></div>
      )}
      <div className="relative z-10 flex flex-col items-center w-full">
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
        <h2 className={`text-2xl font-bold mb-2 text-center ${nameColorClass} ${textShadowClass}`}>{name}</h2>
        <p className={`text-center px-4 mb-6 ${bioColorClass} ${textShadowClass}`}>{bio}</p>

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
    </div>
  );
};

export default LivePreview;