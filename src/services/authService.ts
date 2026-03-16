'use client';

import { learnAuth, learnDb } from '@/firebase/learnConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

export type CurrentStatus = 'student' | 'professional' | 'entrepreneur' | 'job_seeker' | 'other';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  country: string;
  currentStatus: CurrentStatus;
  institution: string | null;
  referralSource: string | null;
  role: 'free' | 'enrolled';
  bio?: string;
  asapStatus?: 'none' | 'applicant' | 'enrolled';
  onboardingComplete?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  country?: string;
  currentStatus?: CurrentStatus;
  institution?: string | null;
  referralSource?: string | null;
}

/**
 * Helper to extract First Name
 */
export const getFirstName = (name: string) => name?.split(' ')[0] || 'Member';

/**
 * Sync Google User to Firestore
 */
async function syncGoogleUser(user: User) {
  const userRef = doc(learnDb, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const now = new Date();
    const profile: UserProfile = {
      id: user.uid,
      email: user.email || '',
      fullName: user.displayName || 'User',
      country: '',
      currentStatus: 'other',
      institution: null,
      referralSource: 'Google',
      role: 'free',
      onboardingComplete: false,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(userRef, profile);
  }
}

/**
 * Sign up a new user with email and password
 */
export async function signupUser(data: SignupData) {
  const userCredential = await createUserWithEmailAndPassword(learnAuth, data.email, data.password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: data.fullName });
  await sendEmailVerification(user);

  const now = new Date();
  const profile: UserProfile = {
    id: user.uid,
    email: data.email,
    fullName: data.fullName,
    country: data.country || '',
    currentStatus: data.currentStatus || 'other',
    institution: data.institution || null,
    referralSource: data.referralSource || null,
    role: 'free',
    onboardingComplete: false,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(learnDb, 'users', user.uid), profile);
  return { user, profile };
}

/**
 * Login user with email and password
 */
export async function loginUser(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(learnAuth, email, password);

  if (!userCredential.user.emailVerified) {
    await signOut(learnAuth);
    throw new Error("Please verify your email before logging in. Check your inbox!");
  }

  return userCredential.user;
}

/**
 * Login with Google OAuth
 */
export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(learnAuth, googleProvider);
  await syncGoogleUser(result.user);
  return result.user;
}

/**
 * Logout current user
 */
export async function logoutUser(): Promise<void> {
  await signOut(learnAuth);
}

/**
 * Fetch a user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const userRef = doc(learnDb, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  const { sendPasswordResetEmail } = await import('firebase/auth');
  await sendPasswordResetEmail(learnAuth, email);
}

// Also export as named exports object for compatibility
export const authService = {
  signupUser,
  loginUser,
  loginWithGoogle,
  logoutUser,
  getUserProfile,
  resetPassword,
  getFirstName,
};

// Default export for compatibility
export default authService;