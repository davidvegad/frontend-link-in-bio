import React from 'react';
import Image from 'next/image';
import { ProfileData, getButtonClasses, getButtonStyles, getBackgroundAndOverlayStyles } from '@/app/utils/styleUtils';

interface LinkData {
  id: number;
  title: string;
  url: string;
  type?: string;
}

interface LivePreviewProps extends Partial<ProfileData> {
  profileSlug: string;
  name: string;
  bio: string;
  avatar: string | null;
  links: LinkData[];
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

  const profileDataForStyles: ProfileData = {
    name,
    bio,
    avatar: avatar || '',
    slug: profileSlug,
    links: links,
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
    background_image: background_image || '',
    background_preference: background_image ? 'image' : 'color', // Infer from prop
    image_overlay,
  };

  const { backgroundStyle, overlayClass, nameColorClass, bioColorClass, textShadowClass, fontClass } = getBackgroundAndOverlayStyles(profileDataForStyles);

  const buttonStyles = getButtonStyles(profileDataForStyles);

  return (
    <div 
      className={`relative w-[320px] h-[600px] border border-gray-300 rounded-2xl shadow-lg flex flex-col items-center p-6 overflow-y-scroll scrollbar-hide ${fontClass}`}
      style={backgroundStyle}
    >
      {profileDataForStyles.background_preference === 'image' && profileDataForStyles.background_image && overlayClass && (
        <div className={`absolute inset-0 w-full h-full ${overlayClass} rounded-2xl z-[1]`}></div>
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
              className={getButtonClasses(profileDataForStyles.button_style)}
              style={buttonStyles}
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