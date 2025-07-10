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
  theme?: string;
  custom_gradient_start?: string;
  custom_gradient_end?: string;
  background_image?: string | File | null;
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
      inlineStyle.backgroundColor = bgColor;
    } else {
      classes += " bg-blue-600"; // More prominent default background
    }

    // Apply text color
    if (textColor) {
      inlineStyle.color = textColor;
    } else {
      classes += " text-white"; // Default text color
    }

    // Add default border
    classes += " border border-transparent"; // Add a transparent border by default

    // Añadir padding-top y padding-bottom directamente al inlineStyle
    inlineStyle.paddingTop = '10px'; // Puedes ajustar este valor
    inlineStyle.paddingBottom = '10px'; // Puedes ajustar este valor

    // Añadir margin-top directamente al inlineStyle para el espaciado
    inlineStyle.marginTop = '10px'; // Puedes ajustar este valor para el espaciado

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