import ProfileClient from './ProfileClient';

interface ProfileForStaticParams {
  slug: string;
}

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    // Ensure you have a specific endpoint for fetching all slugs for generation
    const response = await fetch(`${API_URL}/api/linkinbio/profiles/slugs/`); 
    if (!response.ok) {
      console.error(`Failed to fetch slugs for static params: ${response.status}`);
      return [];
    }
    const slugs: string[] = await response.json();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error fetching slugs for static params:", error);
    return [];
  }
}

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  return <ProfileClient params={resolvedParams} />;
}
