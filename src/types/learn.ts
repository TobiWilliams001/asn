// src/types/learn.ts

/**
 * Learning Platform Type Definitions
 * 
 * These interfaces define the shape of our data throughout the app.
 * - Type safety
 * - Documentation
 * - Refactoring
 */

// ============================================================================
// USER & AUTHENTICATION
// ============================================================================

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  createdAt: Date;
  role: 'student' | 'admin' | 'instructor';
}

// ============================================================================
// ENROLLMENT
// ============================================================================

export interface Enrollment {
  id: string;
  userId: string;
  programId: 'asap'; // Only ASAP for v1
  enrolledAt: Date;
  status: 'active' | 'completed' | 'dropped';
  currentModuleId: string;
  overallProgress: number; // 0-100
}

// ============================================================================
// LEARNING CONTENT
// ============================================================================

export interface Resource {
  title: string;
  description?: string;
  fileUrl: string;
  type: 'pdf' | 'docx' | 'link' | 'video';
  pages?: number; // For PDFs
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in minutes
  order: number;
  content: string; // HTML content
  resources: Resource[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  weekRange: string; // e.g., "Weeks 1-2"
  order: number; // 1-5
  lessons: Lesson[];
}

// Module with calculated progress (used in UI)
export interface ModuleWithProgress extends Module {
  completionRate: number; // 0-100
  isUnlocked: boolean;
  completedLessons: number;
  totalLessons: number;
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

export interface Progress {
  id?: string; // Optional for creation
  userId: string;
  moduleId: string;
  lessonId: string;
  completed: boolean;
  completedAt: Date | null;
  lastAccessedAt: Date;
}

// ============================================================================
// RESOURCE LAB
// ============================================================================

export interface ResourceLabItem {
  id: string;
  title: string;
  description: string;
  category: 'internship' | 'toolkit' | 'video' | 'guide';
  fileUrl?: string; // For downloadable resources
  externalUrl?: string; // For job listings, etc.
  uploadedAt: Date;
  tags: string[];
}

// ============================================================================
// DASHBOARD STATS
// ============================================================================

export interface DashboardStats {
  modulesCompleted: number;
  totalModules: number;
  lessonsCompleted: number;
  totalLessons: number;
  overallProgress: number;
  currentStreak: number; // days
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  type: 'lesson_completed' | 'module_completed' | 'resource_downloaded';
  title: string;
  timestamp: Date;
  moduleId?: string;
  lessonId?: string;
}