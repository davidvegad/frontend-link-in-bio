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
}) => {

  const getButtonClasses = (style?: string, bgColor?: string, textColor?: string) => {
    let classes = "block w-full text-center py-3 px-4 rounded-lg transition-colors duration-300 shadow-md";
    let inlineStyle: React.CSSProperties = {};

    // Apply button style
    if (style === 'rounded') {
      classes += " rounded-full";
    } else if (style === 'squared') {
      classes += " rounded-none";
    } else { // Default to rounded-lg if not specified or unknown
      classes += " rounded-lg";
    }

    // Apply background color
    if (bgColor) {
      inlineStyle.backgroundColor = bgColor;
    } else {
      classes += " bg-indigo-600"; // Default background
    }

    // Apply text color
    if (textColor) {
      inlineStyle.color = textColor;
    } else {
      classes += " text-white"; // Default text color
    }

    return { classes, inlineStyle };
  };

  return (
    <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white flex flex-col items-center p-6">
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
      <div className="w-full max-w-xs mx-auto space-y-3">
        {links.map(link => {
          const { classes, inlineStyle } = getButtonClasses(button_style, button_color, button_text_color);
          return (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={classes}
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