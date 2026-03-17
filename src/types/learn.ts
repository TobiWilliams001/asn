export interface Resource {
  title: string;
  description: string;
  fileUrl: string;
  type: 'pdf' | 'link' | 'video' | 'doc';
  pages?: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  contentType: 'video' | 'article' | 'pdf'; // NEW: Type of content
  videoUrl?: string; // For video lessons
  articleUrl?: string; // For article lessons
  duration: number; // in minutes
  order: number;
  content: string; // HTML content
  resources: Resource[];
  completed?: boolean; // Runtime flag
}

export interface Module {
  id: string;
  title: string;
  description: string;
  weekRange: string;
  order: number;
  lessons: Lesson[];
  locked?: boolean; // Runtime flag
  progress?: number; // 0-100, runtime flag
  completedLessons?: number; // Runtime flag
}

export interface UserProgress {
  userId: string;
  moduleId: string;
  lessonId: string;
  completedLessons: string[];
  lastAccessedAt: Date;
  progress: number;
}