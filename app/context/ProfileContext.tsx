'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Profile = {
  displayName: string;
};

type ProfileContextValue = {
  profile: Profile | null;
  hasProfile: boolean;
  isLoaded: boolean;
  setProfile: (profile: Profile | null) => void;
};

const PROFILE_STORAGE_KEY = 'seed-project-profile';

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function getStoredProfile() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedProfile = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    return storedProfile ? (JSON.parse(storedProfile) as Profile) : null;
  } catch {
    return null;
  }
}

export function getDisplayName(profile: Profile | null | undefined, fallback = 'Seed User') {
  const trimmedName = profile?.displayName?.trim();
  return trimmedName || fallback;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedProfile = getStoredProfile();
      setProfileState(storedProfile);
    } catch {
      setProfileState(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setProfile = (nextProfile: Profile | null) => {
    setProfileState(nextProfile);

    if (typeof window === 'undefined') {
      return;
    }

    if (nextProfile) {
      window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(nextProfile));
      return;
    }

    window.localStorage.removeItem(PROFILE_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      profile,
      hasProfile: Boolean(profile?.displayName?.trim()),
      isLoaded,
      setProfile,
    }),
    [isLoaded, profile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }

  return context;
}
