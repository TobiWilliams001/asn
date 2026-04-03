import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';

export interface Announcement {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  body: string;
  date: string;
  createdAt: Timestamp;
}

/**
 * Get all active announcements from Firestore
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const announcementsRef = collection(learnDb, 'announcements');
    const q = query(announcementsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Announcement));
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }
}

/**
 * Create a new announcement
 */
export async function createAnnouncement(data: Omit<Announcement, 'id' | 'createdAt'>): Promise<string> {
  const announcementsRef = collection(learnDb, 'announcements');
  const docRef = await addDoc(announcementsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Delete an announcement
 */
export async function deleteAnnouncement(id: string): Promise<void> {
  const docRef = doc(learnDb, 'announcements', id);
  await deleteDoc(docRef);
}
