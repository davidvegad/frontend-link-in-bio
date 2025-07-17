'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProfileData, getButtonClasses, getButtonStyles, getBackgroundAndOverlayStyles } from '../utils/styleUtils';

interface LinkData {
  id?: number;
  title: string;
  url: string;
  type?: string;
}

interface ProfileClientProps {
  params: { slug: string };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

  const { backgroundStyle, overlayClass, nameColorClass, bioColorClass, textShadowClass, fontClass, useOverlay } = getBackgroundAndOverlayStyles(profile);

  const buttonStyles = getButtonStyles(profile);

  return (
    <div 
      className={`relative min-h-screen w-full bg-white ${fontClass}`}
      style={backgroundStyle}
    >
      {useOverlay && profile.background_preference === 'image' && profile.background_image && overlayClass && (
        <div className={`absolute inset-0 w-full h-full ${overlayClass} z-[1]`}></div>
      )}
      
      {/* Cover Image - Full width on mobile, button width on desktop */}
      {profile.cover_image && (
        <div className="w-full md:max-w-[700px] md:mx-auto md:px-4">
          <div className="w-full h-48 overflow-hidden md:rounded-lg mb-4">
            <Image
              src={profile.cover_image}
              alt="Cover"
              width={700}
              height={192}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-[700px] mx-auto">
        {/* Avatar */}
        <div className={`${profile.cover_image ? '-mt-20 mb-4' : 'mt-8 mb-4'}`}>
          {profile.avatar && (
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
            />
          )}
        </div>
        
        <h1 className={`text-3xl font-bold mb-2 text-center ${nameColorClass} ${textShadowClass}`}>{profile.name}</h1>
        <p className={`mb-6 text-center ${bioColorClass} ${textShadowClass}`}>{profile.bio}</p>

        <div className="space-y-4 w-full pb-8">
          {profile.links.map(link => (
            link.url && (
              <a
                key={link.id}
                href={`${API_URL}/api/linkinbio/link-clicks/${link.id}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={getButtonClasses(profile.button_style)}
                style={getButtonStyles(profile)}
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