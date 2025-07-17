import { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  try {
    // Fetch profile data from API
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${API_URL}/api/linkinbio/profiles/${slug}/`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Profile not found');
    }

    const profile = await response.json();
    
    // Use profile avatar or fallback to default Vali Design image
    const profileImage = profile.avatar || 'https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/Vali+design.png';
    
    return {
      title: 'Explora todos mis enlaces aquí',
      description: 'Link in bio by Vali Design',
      openGraph: {
        title: 'Explora todos mis enlaces aquí',
        description: 'Link in bio by Vali Design',
        images: [
          {
            url: profileImage,
            width: 1200,
            height: 630,
            alt: `${profile.name || 'Perfil'} - Link in Bio`,
          }
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Explora todos mis enlaces aquí',
        description: 'Link in bio by Vali Design',
        images: [profileImage],
      },
    };
  } catch (error) {
    // Fallback metadata if profile fetch fails
    return {
      title: 'Explora todos mis enlaces aquí',
      description: 'Link in bio by Vali Design',
      openGraph: {
        title: 'Explora todos mis enlaces aquí',
        description: 'Link in bio by Vali Design',
        images: [
          {
            url: 'https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/Vali+design.png',
            width: 1200,
            height: 630,
            alt: 'Link in Bio by Vali Design',
          }
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Explora todos mis enlaces aquí',
        description: 'Link in bio by Vali Design',
        images: ['https://tumbesfc-media.s3.us-east-2.amazonaws.com/meta/Vali+design.png'],
      },
    };
  }
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProfileClient params={resolvedParams} />;
}
