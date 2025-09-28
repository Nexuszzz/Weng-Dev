import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Types for user profile & settings
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  headline?: string;
  role: 'candidate' | 'company' | 'admin';
  avatarColor?: string; // used for simple colored circle avatar
  bio?: string;
  location?: string;
  website?: string;
  skills?: string[];
  social?: {
    linkedin?: string;
    github?: string;
    dribbble?: string;
  };
}

export interface UserSettings {
  darkMode: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: 'id' | 'en';
  profileVisibility: 'public' | 'private' | 'connections';
  dataSharing: boolean;
}

interface UserContextValue {
  user: UserProfile | null;
  settings: UserSettings;
  updateProfile: (data: Partial<UserProfile>) => void;
  updateSettings: (data: Partial<UserSettings>) => void;
  logout: () => void;
  mockLogin: () => void; // for demo purpose only
}

const defaultSettings: UserSettings = {
  darkMode: false,
  emailNotifications: true,
  pushNotifications: false,
  language: 'id',
  profileVisibility: 'public',
  dataSharing: true,
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Start with a mock logged-in user; could be null to simulate logged out.
  const [user, setUser] = useState<UserProfile | null>({
    id: 'u123',
    name: 'Alexandria Putri',
    email: 'alexandria@example.com',
    headline: 'Product Designer & UX Researcher',
    role: 'candidate',
    avatarColor: 'bg-orange-400',
    bio: 'Bersemangat menciptakan pengalaman digital yang inklusif dan berdampak.',
    location: 'Bandung, Indonesia',
    website: 'https://alexandria.dev',
    skills: ['UI/UX', 'Figma', 'Prototyping', 'Research'],
    social: { linkedin: 'alexandria-putri', github: 'alexdev', dribbble: 'alexdesign' }
  });
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  // Sync dark mode to <html> class for Tailwind
  useEffect(()=>{
    const root = document.documentElement;
    if(settings.darkMode) root.classList.add('dark'); else root.classList.remove('dark');
  }, [settings.darkMode]);

  const updateProfile = useCallback((data: Partial<UserProfile>) => {
    setUser((prev: UserProfile | null) => (prev ? { ...prev, ...data } : prev));
  }, []);

  const updateSettings = useCallback((data: Partial<UserSettings>) => {
    setSettings((prev: UserSettings) => ({ ...prev, ...data }));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const mockLogin = useCallback(() => {
    setUser({
      id: 'u123',
      name: 'Alexandria Putri',
      email: 'alexandria@example.com',
      headline: 'Product Designer & UX Researcher',
      role: 'candidate',
      avatarColor: 'bg-orange-400',
      bio: 'Bersemangat menciptakan pengalaman digital yang inklusif dan berdampak.',
      location: 'Bandung, Indonesia',
      website: 'https://alexandria.dev',
      skills: ['UI/UX', 'Figma', 'Prototyping', 'Research'],
      social: { linkedin: 'alexandria-putri', github: 'alexdev', dribbble: 'alexdesign' }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, settings, updateProfile, updateSettings, logout, mockLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
