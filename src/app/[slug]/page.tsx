import ProfileClient from './ProfileClient';

export async function generateStaticParams() {
  return [];
}

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProfileClient params={resolvedParams} />;
}
