'use client';

export const dynamic = 'force-dynamic';

import { ProfileProvider } from '@/context/ProfileContext';

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
