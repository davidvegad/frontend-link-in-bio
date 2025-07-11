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

const toRgba = (hex: string, opacity: number = 1) => {
  const h = hex.replace('#', '');
  if (h.length !== 6) return `rgba(0,0,0,${opacity})`; // Return default if hex is invalid
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

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

    const trackProfileView = async () => {
      try {
        await fetch(`${API_URL}/api/linkinbio/profile-views/${slug}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        console.error("Error tracking profile view:", err);
      }
    };

    fetchProfile();
    trackProfileView();
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

  const getButtonClasses = (style?: string) => {
    let classes = "block w-full text-center py-3 px-4 mb-4 transition-all duration-300 shadow-md no-underline";
    if (style === 'rounded-full') return classes + " rounded-full";
    if (style === 'rounded-md') return classes + " rounded-md";
    if (style === 'rounded-none') return classes + " rounded-none";
    return classes + " rounded-full"; // Default
  };

  const getButtonStyles = () => {
    return {
      backgroundColor: toRgba(profile.button_color || '#000000', profile.button_background_opacity),
      color: toRgba(profile.button_text_color || '#FFFFFF', profile.button_text_opacity),
      border: `2px solid ${toRgba(profile.button_border_color || '#000000', profile.button_border_opacity)}`,
      boxShadow: `0 4px 14px 0 ${toRgba(profile.button_shadow_color || '#000000', profile.button_shadow_opacity)}`,
    };
  };

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
      backgroundStyle = { background: selectedTheme.gradient };
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

  return (
    <div 
      className={`relative min-h-screen flex flex-col items-center justify-center p-4 ${fontClass}`}
      style={backgroundStyle}
    >
      {profile.background_preference === 'image' && profile.background_image && overlayClass && (
        <div className={`absolute inset-0 w-full h-full ${overlayClass} z-[1]`}></div>
      )}
      <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        {profile.avatar && (
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-indigo-500 shadow-md"
          />
        )}
        <h1 className={`text-3xl font-bold mb-2 ${nameColorClass} ${textShadowClass}`}>{profile.name}</h1>
        <p className={`mb-6 ${bioColorClass} ${textShadowClass}`}>{profile.bio}</p>

        <div className="space-y-4">
          {profile.links.map(link => (
            link.url && (
              <a
                key={link.id}
                href={`${API_URL}/api/linkinbio/link-clicks/${link.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={getButtonClasses(profile.button_style)}
                style={getButtonStyles()}
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