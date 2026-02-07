'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { learnAuth } from '../firebase/learnConfig';
import {
  UserProfile,
  SignupData,
  signupUser,
  loginUser,
  logoutUser,
  getUserProfile
} from '../services/authService';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (data: SignupData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(learnAuth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile);
        } catch (err) {
          console.warn('Could not fetch user profile:', err);
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (data: SignupData) => {
    const { user, profile } = await signupUser(data);
    setUser(user);
    setUserProfile(profile);
  };

  const login = async (email: string, password: string) => {
    const firebaseUser = await loginUser(email, password);
    setUser(firebaseUser);
    try {
      const profile = await getUserProfile(firebaseUser.uid);
      setUserProfile(profile);
    } catch (err) {
      console.warn('Could not fetch profile after login:', err);
      setUserProfile(null);
    }
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setUserProfile(null);
    router.push('/learn');
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};