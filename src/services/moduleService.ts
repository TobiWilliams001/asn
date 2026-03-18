import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'article' | 'pdf';
  videoUrl?: string;
  articleUrl?: string;
  duration: number;
  order: number;
  content: string;
  resources: Array<{
    title: string;
    description: string;
    fileUrl: string;
    type: 'pdf' | 'link' | 'video' | 'doc';
    pages?: number;
  }>;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  weekRange: string;
  order: number;
  published: boolean;
  lessons: Lesson[];
}

/**
 * Get all modules with their lessons
 */
export async function getAllModules(): Promise<Module[]> {
  const modulesRef = collection(learnDb, 'modules');
  const q = query(modulesRef, orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  
  const modules = await Promise.all(
    snapshot.docs.map(async (moduleDoc) => {
      const lessonsRef = collection(learnDb, 'modules', moduleDoc.id, 'lessons');
      const lessonsQuery = query(lessonsRef, orderBy('order', 'asc'));
      const lessonsSnapshot = await getDocs(lessonsQuery);
      
      const lessons = lessonsSnapshot.docs.map(lessonDoc => ({
        id: lessonDoc.id,
        ...lessonDoc.data()
      } as Lesson));
      
      return {
        id: moduleDoc.id,
        ...moduleDoc.data(),
        lessons
      } as Module;
    })
  );
  
  return modules;
}

/**
 * Get single module with lessons
 */
export async function getModule(moduleId: string): Promise<Module | null> {
  const moduleRef = doc(learnDb, 'modules', moduleId);
  const moduleSnap = await getDoc(moduleRef);
  
  if (!moduleSnap.exists()) return null;
  
  const lessonsRef = collection(learnDb, 'modules', moduleId, 'lessons');
  const lessonsQuery = query(lessonsRef, orderBy('order', 'asc'));
  const lessonsSnapshot = await getDocs(lessonsQuery);
  
  const lessons = lessonsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Lesson));
  
  return {
    id: moduleSnap.id,
    ...moduleSnap.data(),
    lessons
  } as Module;
}

/**
 * Create new module
 */
export async function createModule(data: Omit<Module, 'id' | 'lessons'>): Promise<string> {
  const modulesRef = collection(learnDb, 'modules');
  
  const docRef = await addDoc(modulesRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  return docRef.id;
}

/**
 * Update module
 */
export async function updateModule(moduleId: string, data: Partial<Omit<Module, 'id' | 'lessons'>>): Promise<void> {
  const moduleRef = doc(learnDb, 'modules', moduleId);
  
  await updateDoc(moduleRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete module and all its lessons
 */
export async function deleteModule(moduleId: string): Promise<void> {
  const batch = writeBatch(learnDb);
  
  // Delete all lessons
  const lessonsRef = collection(learnDb, 'modules', moduleId, 'lessons');
  const lessonsSnapshot = await getDocs(lessonsRef);
  
  lessonsSnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  
  // Delete module
  const moduleRef = doc(learnDb, 'modules', moduleId);
  batch.delete(moduleRef);
  
  await batch.commit();
}

/**
 * Reorder modules
 */
export async function reorderModules(moduleIds: string[]): Promise<void> {
  const batch = writeBatch(learnDb);
  
  moduleIds.forEach((moduleId, index) => {
    const moduleRef = doc(learnDb, 'modules', moduleId);
    batch.update(moduleRef, { order: index + 1 });
  });
  
  await batch.commit();
}

/**
 * Create lesson in module
 */
export async function createLesson(moduleId: string, data: Omit<Lesson, 'id'>): Promise<string> {
  const lessonsRef = collection(learnDb, 'modules', moduleId, 'lessons');
  
  const docRef = await addDoc(lessonsRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  
  // Update module's updatedAt
  const moduleRef = doc(learnDb, 'modules', moduleId);
  await updateDoc(moduleRef, { updatedAt: serverTimestamp() });
  
  return docRef.id;
}

/**
 * Update lesson
 */
export async function updateLesson(moduleId: string, lessonId: string, data: Partial<Omit<Lesson, 'id'>>): Promise<void> {
  const lessonRef = doc(learnDb, 'modules', moduleId, 'lessons', lessonId);
  
  await updateDoc(lessonRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
  
  // Update module's updatedAt
  const moduleRef = doc(learnDb, 'modules', moduleId);
  await updateDoc(moduleRef, { updatedAt: serverTimestamp() });
}

/**
 * Delete lesson
 */
export async function deleteLesson(moduleId: string, lessonId: string): Promise<void> {
  const lessonRef = doc(learnDb, 'modules', moduleId, 'lessons', lessonId);
  await deleteDoc(lessonRef);
  
  // Update module's updatedAt
  const moduleRef = doc(learnDb, 'modules', moduleId);
  await updateDoc(moduleRef, { updatedAt: serverTimestamp() });
}

/**
 * Reorder lessons within a module
 */
export async function reorderLessons(moduleId: string, lessonIds: string[]): Promise<void> {
  const batch = writeBatch(learnDb);
  
  lessonIds.forEach((lessonId, index) => {
    const lessonRef = doc(learnDb, 'modules', moduleId, 'lessons', lessonId);
    batch.update(lessonRef, { order: index + 1 });
  });
  
  await batch.commit();
}
