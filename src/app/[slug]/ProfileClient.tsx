'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ProfileData, getButtonClasses, getButtonStyles, getBackgroundAndOverlayStyles } from '@/app/utils/styleUtils';

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

  const { backgroundStyle, overlayClass, nameColorClass, bioColorClass, textShadowClass, fontClass } = getBackgroundAndOverlayStyles(profile);

  const buttonStyles = getButtonStyles(profile);

  return (
    <div 
      className={`relative min-h-screen flex flex-col items-center justify-center p-4 ${fontClass}`}
      style={backgroundStyle}
    >
      {profile.background_preference === 'image' && profile.background_image && overlayClass && (
        <div className={`absolute inset-0 w-full h-full ${overlayClass} z-[1]`}></div>
      )}
      {/* Mobile-like container */}
      <div className="relative z-10 w-[320px] h-[600px] rounded-2xl shadow-lg flex flex-col items-center p-6 bg-white bg-opacity-90">
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

        <div className="space-y-4 w-full">
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