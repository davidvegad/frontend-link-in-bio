'use client';

import React from 'react';
import Image from 'next/image';
import { UserCircle } from 'lucide-react';
import { ProfileData, getButtonClasses, getButtonStyles, getBackgroundAndOverlayStyles } from '@/app/utils/styleUtils';

interface LinkData {
  id?: number;
  title: string;
  url: string;
  type?: string;
}

const LivePreview: React.FC<{ profileData: ProfileData }> = ({ profileData }) => {
  const getImageUrl = (image: any) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    if (typeof image === 'string') {
      return image;
    }
    return null;
  };

  const avatarSrc = getImageUrl(profileData.avatar);
  const backgroundSrc = getImageUrl(profileData.background_image);

  const { backgroundStyle, overlayClass, nameColorClass, bioColorClass, textShadowClass, fontClass } = getBackgroundAndOverlayStyles({
    ...profileData,
    background_image: backgroundSrc, // Pass the resolved image URL/blob
  });

  const buttonStyles = getButtonStyles(profileData);

  // Combine social and custom links for rendering
  const allLinks: LinkData[] = [];
  if (profileData.social_links) {
    for (const platformId in profileData.social_links) {
      if (profileData.social_links.hasOwnProperty(platformId) && profileData.social_links[platformId]) {
        allLinks.push({ id: platformId.hashCode(), title: platformId, url: profileData.social_links[platformId], type: platformId });
      }
    }
  }
  if (profileData.custom_links) {
    allLinks.push(...profileData.custom_links);
  }

  return (
    <div className={`w-[300px] h-[600px] rounded-[40px] shadow-lg overflow-hidden border-8 border-gray-800 bg-white flex flex-col ${fontClass}`}>
      <div style={backgroundStyle} className="relative flex-grow flex flex-col items-center justify-center p-6 text-center">
        {profileData.background_preference === 'image' && profileData.background_image && overlayClass && (
          <div className={`absolute inset-0 w-full h-full ${overlayClass} rounded-2xl z-[1]`}></div>
        )}
        <div className="relative z-10 flex flex-col items-center w-full h-full overflow-y-auto hide-scrollbar">
          <div className="relative mb-4">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={profileData.name || 'Avatar'}
                width={96}
                height={96}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            ) : (
              <UserCircle className="w-24 h-24 text-white/80" />
            )}
          </div>
          <h2 className={`text-2xl font-bold mb-2 ${nameColorClass} ${textShadowClass}`}>{profileData.name || 'Tu Nombre'}</h2>
          <p className={`text-sm ${bioColorClass} ${textShadowClass}`}>{profileData.bio || 'Tu biografía increíble aquí.'}</p>
          <div className="w-full max-w-xs mx-auto space-y-3 mt-6">
            {allLinks.length > 0 ? (
              allLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getButtonClasses(profileData.button_style)}
                  style={buttonStyles}
                >
                  {link.title}
                </a>
              ))
            ) : (
              <>
                {['LINK 1', 'LINK 2', 'LINK 3', 'LINK 4'].map(link => (
                  <div key={link} className={getButtonClasses(profileData.button_style)} style={buttonStyles}>
                    {link}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
