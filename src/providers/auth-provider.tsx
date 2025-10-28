"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { User } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('kika-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const handleAuthSuccess = (user: User) => {
    localStorage.setItem('kika-user', JSON.stringify(user));
    setUser(user);
    setLoading(false);
    router.push('/dashboard');
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const appUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };
      handleAuthSuccess(appUser);
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Could not log in with Google. Please try again.",
      });
      setLoading(false);
    }
  };

  const loginAsGuest = () => {
    setLoading(true);
    const guestId = `guest_${crypto.randomUUID()}`;
    const guestUser: User = {
      uid: guestId,
      displayName: `Leenux Guest`,
      email: null,
      photoURL: PlaceHolderImages.find(img => img.id === 'guest-avatar')?.imageUrl || null,
      isGuest: true,
    };
    handleAuthSuccess(guestUser);
    toast({
      title: "You're logged in as a temporary guest.",
    });
  };

  const logout = async () => {
    setLoading(true);
    // Also sign out from Firebase if logged in with Google
    if (user && !user.isGuest) {
      await firebaseSignOut(auth);
    }
    localStorage.removeItem('kika-user');
    setUser(null);
    setLoading(false);
    router.push('/login');
  };

  const value = { user, loading, loginWithGoogle, loginAsGuest, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
