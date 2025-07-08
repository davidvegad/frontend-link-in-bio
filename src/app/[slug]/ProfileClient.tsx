'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface LinkData {
  id?: number;
  title: string;
  url: string;
  type?: string;
}

interface ProfileData {
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
  button_style?: string;
  button_color?: string;
  button_text_color?: string;
  social_links?: Record<string, string>;
  custom_links?: { id: number; title: string; url: string }[];
}

interface ProfileClientProps {
  params: { slug: string };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const predefinedThemes = [
  { id: 'sky', name: 'Cielo', gradient: 'bg-gradient-to-r from-sky-400 to-blue-500' },
  { id: 'midnight', name: 'Medianoche', gradient: 'bg-gradient-to-r from-gray-800 to-black' },
  { id: 'aurora', name: 'Aurora', gradient: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { id: 'sunset', name: 'Atardecer', gradient: 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500' },
];

export default function ProfileClient({ params }: ProfileClientProps) {
  const { slug } = params;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/api/linkinbio/profiles/${slug}/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }
        const data: ProfileData = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando perfil...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Perfil no encontrado.</div>;
  }

  // Dynamic styles based on profile data
  const pageStyle: React.CSSProperties = {};
  if (profile.background_image) {
    pageStyle.backgroundImage = `url(${profile.background_image})`;
    pageStyle.backgroundSize = 'cover';
    pageStyle.backgroundPosition = 'center';
  } else if (profile.theme === 'custom' && profile.custom_gradient_start && profile.custom_gradient_end) {
    pageStyle.background = `linear-gradient(to bottom right, ${profile.custom_gradient_start}, ${profile.custom_gradient_end})`;
  } else if (profile.theme) {
    // Apply predefined theme styles (you'd map theme IDs to actual CSS classes or styles)
    // For now, a simple placeholder
    const selectedTheme = predefinedThemes.find(t => t.id === profile.theme);
    if (selectedTheme) {
      pageStyle.background = selectedTheme.gradient; // Assuming gradient is a CSS background value
    }
  }

  const buttonBaseClasses = `block w-full text-center py-3 px-4 mb-4 rounded-lg transition-all duration-200`;
  const buttonDynamicStyle: React.CSSProperties = {
    backgroundColor: profile.button_color || '#000000',
    color: profile.button_text_color || '#FFFFFF',
  };
  let buttonShapeClass = '';
  if (profile.button_style === 'rounded-full') {
    buttonShapeClass = 'rounded-full';
  } else if (profile.button_style === 'rounded-md') {
    buttonShapeClass = 'rounded-md';
  } else if (profile.button_style === 'rounded-none') {
    buttonShapeClass = 'rounded-none';
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={pageStyle}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        {profile.avatar && (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-500 shadow-md"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{profile.name}</h1>
        <p className="text-gray-600 mb-6">{profile.bio}</p>

        <div className="space-y-4">
          {/* Social Links */}
          {profile.social_links && Object.entries(profile.social_links).map(([platform, url]) => (
            url && (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonBaseClasses} ${buttonShapeClass}`}
                style={buttonDynamicStyle}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)} {/* Basic capitalization */}
              </a>
            )
          ))}

          {/* Custom Links */}
          {profile.custom_links && profile.custom_links.map(link => (
            link.url && (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonBaseClasses} ${buttonShapeClass}`}
                style={buttonDynamicStyle}
              >
                {link.title}
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
}