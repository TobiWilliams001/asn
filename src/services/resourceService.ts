import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';

export type ResourceType = 'job' | 'toolkit' | 'video' | 'article';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type FileType = 'pdf' | 'doc' | 'template' | 'zip';
export type VideoPlatform = 'youtube' | 'vimeo' | 'other';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  category: string;
  url: string;
  imageUrl?: string;
  published: boolean;
  order: number;
  
  // Job-specific
  company?: string;
  location?: string;
  jobType?: JobType;
  salary?: string;
  deadline?: string;
  
  // Toolkit-specific
  fileType?: FileType;
  
  // Video-specific
  duration?: number;
  platform?: VideoPlatform;
  
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Get all resources with optional type filtering
 */
export async function getAllResources(type?: ResourceType): Promise<Resource[]> {
  const resourcesRef = collection(learnDb, 'resources');
  
  let q;
  if (type) {
    q = query(resourcesRef, where('type', '==', type), orderBy('order', 'asc'));
  } else {
    q = query(resourcesRef, orderBy('order', 'asc'));
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Resource));
}

/**
 * Get published resources (for students)
 */
export async function getPublishedResources(type?: ResourceType): Promise<Resource[]> {
  const resourcesRef = collection(learnDb, 'resources');
  
  let q;
  if (type) {
    q = query(
      resourcesRef, 
      where('type', '==', type),
      where('published', '==', true),
      orderBy('order', 'asc')
    );
  } else {
    q = query(
      resourcesRef,
      where('published', '==', true),
      orderBy('order', 'asc')
    );
  }
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Resource));
}

/**
 * Get single resource by ID
 */
export async function getResource(resourceId: string): Promise<Resource | null> {
  const resourceRef = doc(learnDb, 'resources', resourceId);
  const resourceSnap = await getDoc(resourceRef);
  
  if (!resourceSnap.exists()) return null;
  
  return {
    id: resourceSnap.id,
    ...resourceSnap.data()
  } as Resource;
}

/**
 * Create new resource
 */
export async function createResource(data: Omit<Resource, 'id'>): Promise<string> {
  const resourcesRef = collection(learnDb, 'resources');
  
  const docRef = await addDoc(resourcesRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  return docRef.id;
}

/**
 * Update resource
 */
export async function updateResource(resourceId: string, data: Partial<Omit<Resource, 'id'>>): Promise<void> {
  const resourceRef = doc(learnDb, 'resources', resourceId);
  
  await updateDoc(resourceRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete resource
 */
export async function deleteResource(resourceId: string): Promise<void> {
  const resourceRef = doc(learnDb, 'resources', resourceId);
  await deleteDoc(resourceRef);
}

/**
 * Reorder resources
 */
export async function reorderResources(resourceIds: string[]): Promise<void> {
  const batch = writeBatch(learnDb);
  
  resourceIds.forEach((resourceId, index) => {
    const resourceRef = doc(learnDb, 'resources', resourceId);
    batch.update(resourceRef, { order: index + 1 });
  });
  
  await batch.commit();
}

/**
 * Get resource count by type (for admin dashboard)
 */
export async function getResourceStats() {
  const resources = await getAllResources();
  
  return {
    total: resources.length,
    jobs: resources.filter(r => r.type === 'job').length,
    toolkits: resources.filter(r => r.type === 'toolkit').length,
    videos: resources.filter(r => r.type === 'video').length,
    articles: resources.filter(r => r.type === 'article').length,
    published: resources.filter(r => r.published).length,
  };
}
