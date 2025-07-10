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
  button_text_opacity?: number; // Nuevo campo
  button_background_opacity?: number; // Nuevo
  button_border_color?: string; // Nuevo
  button_border_opacity?: number; // Nuevo
  button_shadow_color?: string; // Nuevo
  button_shadow_opacity?: number; // Nuevo
}



const themeMap: { [key: string]: string } = {
  'sky': 'bg-gradient-to-r from-sky-400 to-blue-500',
  'midnight': 'bg-gradient-to-r from-gray-800 to-black',
  'aurora': 'bg-gradient-to-r from-purple-500 to-pink-500',
  'sunset': 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500',
};

const LivePreview: React.FC<LivePreviewProps> = ({
  profileSlug,
  name,
  bio,
  avatar,
  links,
  button_style,
  button_color,
  button_text_color,
  button_text_opacity, // Recibir el nuevo prop
  button_background_opacity, // Nuevo
  button_border_color, // Nuevo
  button_border_opacity, // Nuevo
  button_shadow_color, // Nuevo
  button_shadow_opacity, // Nuevo
  theme,
  custom_gradient_start,
  custom_gradient_end,
  background_image,
}) => {

  console.log("LivePreview received button_style:", button_style); // DEBUG
  console.log("LivePreview received theme:", theme); // DEBUG
  console.log("LivePreview received custom_gradient_start:", custom_gradient_start); // DEBUG
  console.log("LivePreview received custom_gradient_end:", custom_gradient_end); // DEBUG

  const getButtonClasses = (style?: string, bgColor?: string, textColor?: string) => {
    let classes = "block text-center px-3 transition-colors duration-300 shadow-md no-underline"; // Eliminamos py-X de aquí
    let inlineStyle: React.CSSProperties = {};

    // Apply button style
    if (style === 'rounded-full') {
      classes += " rounded-full";
    } else if (style === 'squared') {
      classes += " rounded-none";
    } else { // No default rounded-lg here. If no specific style, no border-radius class is added.
    }

    // Apply background color
    if (bgColor) {
      // Convertir el color a RGBA si se proporciona opacidad
      if (button_background_opacity !== undefined && button_background_opacity < 1) {
        const hex = bgColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        inlineStyle.backgroundColor = `rgba(${r}, ${g}, ${b}, ${button_background_opacity})`;
      } else {
        inlineStyle.backgroundColor = bgColor;
      }
    } else {
      inlineStyle.backgroundColor = `rgba(37, 99, 235, ${button_background_opacity ?? 1})`; // Default blue-600 with opacity
    }

    // Apply text color
    if (textColor) {
      // Convertir el color a RGBA si se proporciona opacidad
      if (button_text_opacity !== undefined && button_text_opacity < 1) {
        const hex = textColor.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        inlineStyle.color = `rgba(${r}, ${g}, ${b}, ${button_text_opacity})`;
      } else {
        inlineStyle.color = textColor;
      }
    } else {
      // Si no hay color de texto, usar blanco con opacidad
      inlineStyle.color = `rgba(255, 255, 255, ${button_text_opacity ?? 1})`;
    }

    // Apply border color and opacity
    if (button_border_color) {
      if (button_border_opacity !== undefined && button_border_opacity < 1) {
        const hex = button_border_color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        inlineStyle.borderColor = `rgba(${r}, ${g}, ${b}, ${button_border_opacity})`;
      } else {
        inlineStyle.borderColor = button_border_color;
      }
      classes += " border"; // Asegurarse de que el borde esté presente
    } else {
      classes += " border border-transparent"; // Default transparent border
    }

    // Apply shadow color and opacity
    if (button_shadow_color) {
      if (button_shadow_opacity !== undefined && button_shadow_opacity < 1) {
        const hex = button_shadow_color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        inlineStyle.boxShadow = `0 4px 6px -1px rgba(${r}, ${g}, ${b}, ${button_shadow_opacity}), 0 2px 4px -2px rgba(${r}, ${g}, ${b}, ${button_shadow_opacity})`; // Tailwind shadow-md
      } else {
        inlineStyle.boxShadow = `0 4px 6px -1px ${button_shadow_color}, 0 2px 4px -2px ${button_shadow_color}`; // Tailwind shadow-md
      }
    }

    // Añadir margin-top directamente al inlineStyle
    inlineStyle.marginTop = '16px'; // Puedes ajustar este valor para el espaciado

    return { classes, inlineStyle };
  };

  let backgroundClasses = "";
  let backgroundInlineStyle: React.CSSProperties = {};
  let finalBackgroundImageUrl: string | undefined;

  if (background_image) {
    if (typeof background_image === 'string') {
      finalBackgroundImageUrl = background_image;
    } else if (background_image instanceof File) {
      finalBackgroundImageUrl = URL.createObjectURL(background_image);
    }
    backgroundInlineStyle.backgroundImage = `url(${finalBackgroundImageUrl})`;
    backgroundInlineStyle.backgroundSize = 'cover';
    backgroundInlineStyle.backgroundPosition = 'center';
    backgroundInlineStyle.backgroundRepeat = 'no-repeat';
  } else if (custom_gradient_start && custom_gradient_start.trim() !== '' && custom_gradient_end && custom_gradient_end.trim() !== '') {
    backgroundInlineStyle.background = `linear-gradient(to bottom right, ${custom_gradient_start}, ${custom_gradient_end})`;
  } else { // Si no hay imagen de fondo ni degradado personalizado, usar el fondo por defecto
    backgroundClasses = "bg-gray-100"; // Default background if no image or gradient
  }

  console.log("Final backgroundClasses:", backgroundClasses); // DEBUG
  console.log("Final backgroundInlineStyle:", backgroundInlineStyle); // DEBUG

  return (
    <div className={`w-[320px] h-[600px] border border-gray-300 rounded-2xl overflow-hidden shadow-md flex flex-col items-center p-6 ${backgroundClasses}`} style={backgroundInlineStyle}>
      <div className="relative mb-4">
        {avatar ? (
          <Image
            src={avatar}
            alt={name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-4xl font-bold">
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{name}</h2>
      <p className="text-gray-600 text-center px-4 mb-6">{bio}</p>

      {/* Links Section */}
      <div className="w-full max-w-xs mx-auto space-y-4">
        {links.filter(link => link.title && link.title.trim() !== '').map(link => {
          const { classes, inlineStyle } = getButtonClasses(button_style, button_color, button_text_color);
          return (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${classes} max-w-[200px] mx-auto`}
              style={inlineStyle}
            >
              {link.title}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LivePreview;