'use client';

import learn_app, { learnAuth, learnDb } from '../firebase/learnConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
  createdAt: Date;
  updatedAt: Date;
}

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
  country: string;
  currentStatus: CurrentStatus;
  institution?: string;
  referralSource?: string;
}

export async function signupUser(data: SignupData): Promise<{ user: User; profile: UserProfile }> {
  const userCredential = await createUserWithEmailAndPassword(learnAuth, data.email, data.password);
  const user = userCredential.user;

  await updateProfile(user, { displayName: data.fullName });

  const now = new Date();
  const profile: UserProfile = {
    id: user.uid,
    email: data.email,
    fullName: data.fullName,
    country: data.country,
    currentStatus: data.currentStatus,
    institution: data.institution || null,
    referralSource: data.referralSource || null,
    role: 'free',
    createdAt: now,
    updatedAt: now,
  };

  try {
    await setDoc(doc(learnDb, 'users', user.uid), profile);
  } catch (err) {
    console.warn('Could not save profile to Firestore:', err);
  }

  return { user, profile };
}

export async function loginUser(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(learnAuth, email, password);
  return userCredential.user;
}

export async function logoutUser(): Promise<void> {
  await signOut(learnAuth);
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const userDoc = await getDoc(doc(learnDb, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch profile from Firestore:', err);
    return null;
  }
}

export { learnAuth, learnDb };