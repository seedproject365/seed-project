'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useProfile } from '../context/ProfileContext';

export default function ProfileGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { hasProfile, isLoaded } = useProfile();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!hasProfile && pathname !== '/profile') {
      router.replace('/profile');
    }
  }, [hasProfile, isLoaded, pathname, router]);

  if (!isLoaded) {
    return null;
  }

  if (!hasProfile && pathname !== '/profile') {
    return null;
  }

  return <>{children}</>;
}
