import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';

export interface UserProgress {
  userId: string;
  modules: {
    [moduleId: string]: {
      status: 'locked' | 'in-progress' | 'completed';
      progress: number;
      completedLessons: string[];
      currentLesson: string | null;
      startedAt: Timestamp | null;
      completedAt: Timestamp | null;
    };
  };
  completedLessons: string[];
  overallProgress: number;
  lastAccessedAt: Timestamp;
}

/**
 * Initialize progress for a new user
 */
export async function initializeUserProgress(userId: string): Promise<void> {
  const progressRef = doc(learnDb, 'progress', userId);
  
  await setDoc(progressRef, {
    userId,
    modules: {
      'career-mapping': {
        status: 'in-progress',
        progress: 0,
        completedLessons: [],
        currentLesson: null,
        startedAt: serverTimestamp(),
        completedAt: null,
      },
      'corporate-awareness': { status: 'locked', progress: 0, completedLessons: [], currentLesson: null, startedAt: null, completedAt: null },
      'design-thinking': { status: 'locked', progress: 0, completedLessons: [], currentLesson: null, startedAt: null, completedAt: null },
      'leadership-teamwork': { status: 'locked', progress: 0, completedLessons: [], currentLesson: null, startedAt: null, completedAt: null },
      'action-planning': { status: 'locked', progress: 0, completedLessons: [], currentLesson: null, startedAt: null, completedAt: null },
    },
    completedLessons: [],
    overallProgress: 0,
    lastAccessedAt: serverTimestamp(),
  });
}

/**
 * Get user's progress
 */
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  const progressRef = doc(learnDb, 'progress', userId);
  const progressSnap = await getDoc(progressRef);
  
  if (!progressSnap.exists()) {
    // Initialize if doesn't exist
    await initializeUserProgress(userId);
    const newSnap = await getDoc(progressRef);
    return newSnap.data() as UserProgress;
  }
  
  return progressSnap.data() as UserProgress;
}

/**
 * Mark a lesson as complete
 */
export async function markLessonComplete(
  userId: string, 
  moduleId: string, 
  lessonId: string,
  totalLessonsInModule: number
): Promise<void> {
  const progressRef = doc(learnDb, 'progress', userId);
  const progress = await getUserProgress(userId);
  
  if (!progress) return;
  
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress) return;
  
  // Don't re-add if already completed
  if (moduleProgress.completedLessons.includes(lessonId)) return;
  
  // Add to completed lessons
  const newCompletedLessons = [...moduleProgress.completedLessons, lessonId];
  const newProgress = Math.round((newCompletedLessons.length / totalLessonsInModule) * 100);
  const isModuleComplete = newProgress === 100;
  
  // Update module progress
  await updateDoc(progressRef, {
    [`modules.${moduleId}.completedLessons`]: arrayUnion(lessonId),
    [`modules.${moduleId}.progress`]: newProgress,
    [`modules.${moduleId}.status`]: isModuleComplete ? 'completed' : 'in-progress',
    [`modules.${moduleId}.completedAt`]: isModuleComplete ? serverTimestamp() : null,
    completedLessons: arrayUnion(`${moduleId}:${lessonId}`),
    lastAccessedAt: serverTimestamp(),
  });
  
  // If module complete, unlock next module
  if (isModuleComplete) {
    await unlockNextModule(userId, moduleId);
  }
  
  // Update overall progress
  await updateOverallProgress(userId);
}

/**
 * Unlock the next module
 */
async function unlockNextModule(userId: string, completedModuleId: string): Promise<void> {
  const moduleOrder = ['career-mapping', 'corporate-awareness', 'design-thinking', 'leadership-teamwork', 'action-planning'];
  const currentIndex = moduleOrder.indexOf(completedModuleId);
  
  if (currentIndex === -1 || currentIndex === moduleOrder.length - 1) return;
  
  const nextModuleId = moduleOrder[currentIndex + 1];
  const progressRef = doc(learnDb, 'progress', userId);
  
  await updateDoc(progressRef, {
    [`modules.${nextModuleId}.status`]: 'in-progress',
    [`modules.${nextModuleId}.startedAt`]: serverTimestamp(),
  });
}

/**
 * Update overall progress across all modules
 */
async function updateOverallProgress(userId: string): Promise<void> {
  const progress = await getUserProgress(userId);
  if (!progress) return;
  
  const modules = Object.values(progress.modules);
  const totalProgress = modules.reduce((sum, mod) => sum + mod.progress, 0);
  const overallProgress = Math.round(totalProgress / modules.length);
  
  const progressRef = doc(learnDb, 'progress', userId);
  await updateDoc(progressRef, {
    overallProgress,
  });
}

/**
 * Check if a lesson is unlocked
 */
export function isLessonUnlocked(
  progress: UserProgress | null,
  moduleId: string,
  lessonId: string,
  lessonOrder: number,
  allLessonsInModule: any[]
): boolean {
  if (!progress) return false;
  
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress) return false;
  
  // Module must not be locked
  if (moduleProgress.status === 'locked') return false;
  
  // First lesson always unlocked
  if (lessonOrder === 1) return true;
  
  // Check if previous lesson is completed
  const previousLesson = allLessonsInModule.find(l => l.order === lessonOrder - 1);
  if (!previousLesson) return false;
  
  return moduleProgress.completedLessons.includes(previousLesson.id);
}

/**
 * Check if a lesson is completed
 */
export function isLessonCompleted(
  progress: UserProgress | null,
  moduleId: string,
  lessonId: string
): boolean {
  if (!progress) return false;
  
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress) return false;
  
  return moduleProgress.completedLessons.includes(lessonId);
}
