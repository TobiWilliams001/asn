import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';
import { initializeUserProgress } from './progressService';

export interface Application {
  id: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    bio: string;
    statementOfIntent: string;
  };
  academicInfo: {
    university: string;
    degreeProgram: string;
    gpa: string;
    graduationYear: number;
  };
  track: 'technology' | 'entrepreneurship' | 'policy';
  trackJustification: string;
  submittedAt: Timestamp;
  adminNotes?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'free' | 'applicant' | 'enrolled' | 'admin';
  asapStatus?: 'applicant' | 'enrolled' | 'rejected';
  asapApplicationId?: string;
  country?: string;
  institution?: string;
  createdAt: Timestamp;
}

/**
 * Get all applications with optional filtering
 */
export async function getAllApplications(status?: 'pending' | 'accepted' | 'rejected'): Promise<Application[]> {
  const applicationsRef = collection(learnDb, 'applications');

  let q;
  if (status) {
    q = query(applicationsRef, where('status', '==', status), orderBy('submittedAt', 'desc'));
  } else {
    q = query(applicationsRef, orderBy('submittedAt', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Application));
}

/**
 * Get single application by ID
 */
export async function getApplication(applicationId: string): Promise<Application | null> {
  const appRef = doc(learnDb, 'applications', applicationId);
  const appSnap = await getDoc(appRef);

  if (!appSnap.exists()) return null;

  return {
    id: appSnap.id,
    ...appSnap.data()
  } as Application;
}

/**
 * Approve application and enroll user
 */
export async function approveApplication(applicationId: string, userId: string, adminNotes?: string): Promise<void> {
  const appRef = doc(learnDb, 'applications', applicationId);
  const userRef = doc(learnDb, 'users', userId);
  
  // 1. Update application status
  await updateDoc(appRef, {
    status: 'accepted',
    adminNotes: adminNotes || '',
    reviewedAt: serverTimestamp(),
  });
  
  // 2. Update user role and status
  await updateDoc(userRef, {
    role: 'enrolled',
    asapStatus: 'enrolled',
    enrolledAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  // 3. Initialize progress
  await initializeUserProgress(userId);
}

/**
 * Reject application
 */
export async function rejectApplication(applicationId: string, userId: string, adminNotes?: string): Promise<void> {
  const appRef = doc(learnDb, 'applications', applicationId);
  const userRef = doc(learnDb, 'users', userId);

  // Update application status
  await updateDoc(appRef, {
    status: 'rejected',
    adminNotes: adminNotes || '',
    reviewedAt: serverTimestamp(),
  });

  // Update user status
  await updateDoc(userRef, {
    asapStatus: 'rejected',
    updatedAt: serverTimestamp(),
  });
}

/**
 * Get all users with optional role filtering
 */
export async function getAllUsers(role?: string): Promise<UserProfile[]> {
  const usersRef = collection(learnDb, 'users');

  let q;
  if (role) {
    q = query(usersRef, where('role', '==', role), orderBy('createdAt', 'desc'));
  } else {
    q = query(usersRef, orderBy('createdAt', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as UserProfile));
}

/**
 * Get single user by ID
 */
export async function getUserById(userId: string): Promise<UserProfile | null> {
  const userRef = doc(learnDb, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) return null;

  return {
    id: userSnap.id,
    ...userSnap.data()
  } as UserProfile;
}

/**
 * Update user role
 */
export async function updateUserRole(userId: string, role: 'free' | 'applicant' | 'enrolled' | 'admin'): Promise<void> {
  const userRef = doc(learnDb, 'users', userId);

  await updateDoc(userRef, {
    role,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete user (hard delete - use with caution)
 */
export async function deleteUser(userId: string): Promise<void> {
  const userRef = doc(learnDb, 'users', userId);
  const progressRef = doc(learnDb, 'progress', userId);

  // Delete user document
  await deleteDoc(userRef);

  // Delete progress if exists
  try {
    await deleteDoc(progressRef);
  } catch (error) {
    // Progress might not exist, that's okay
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  const [allApplications, allUsers] = await Promise.all([
    getAllApplications(),
    getAllUsers()
  ]);

  const pendingApplications = allApplications.filter(app => app.status === 'pending');
  const enrolledUsers = allUsers.filter(user => user.role === 'enrolled');

  // Calculate average completion (would need progress data)
  // Placeholder for now
  const averageCompletion = 45;

  return {
    totalApplications: allApplications.length,
    pendingApplications: pendingApplications.length,
    totalEnrolled: enrolledUsers.length,
    averageCompletion,
  };
}
