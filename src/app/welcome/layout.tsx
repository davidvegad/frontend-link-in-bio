'use client';

import { ProfileProvider } from '@/context/ProfileContext';

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
  return <ProfileProvider>{children}</ProfileProvider>;
}
