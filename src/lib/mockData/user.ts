// src/lib/mockData/user.ts

import { LearnUser, Enrollment, Progress } from '@/types/learn';

export const MOCK_USER: LearnUser = {
  uid: 'mock-user-kwame-123',
  email: 'kwame.mensah@example.com',
  displayName: 'Kwame Mensah',
  photoURL: 'https://i.pravatar.cc/150?img=12', // Random avatar
  createdAt: new Date('2025-01-15'),
  role: 'student'
};

export const MOCK_ENROLLMENT: Enrollment = {
  id: 'enrollment-mock-001',
  userId: 'mock-user-kwame-123',
  programId: 'asap',
  enrolledAt: new Date('2025-01-20'),
  status: 'active',
  currentModuleId: 'career-mapping',
  overallProgress: 35 // 35% complete
};

export const MOCK_PROGRESS: Progress[] = [
  // Career Mapping - 3 out of 5 lessons completed (60%)
  {
    id: 'progress-1',
    userId: 'mock-user-kwame-123',
    moduleId: 'career-mapping',
    lessonId: 'lesson-1',
    completed: true,
    completedAt: new Date('2025-01-21'),
    lastAccessedAt: new Date('2025-01-21')
  },
  {
    id: 'progress-2',
    userId: 'mock-user-kwame-123',
    moduleId: 'career-mapping',
    lessonId: 'lesson-2',
    completed: true,
    completedAt: new Date('2025-01-23'),
    lastAccessedAt: new Date('2025-01-23')
  },
  {
    id: 'progress-3',
    userId: 'mock-user-kwame-123',
    moduleId: 'career-mapping',
    lessonId: 'lesson-3',
    completed: true,
    completedAt: new Date('2025-01-25'),
    lastAccessedAt: new Date('2025-01-25')
  },
  // Corporate Awareness - 2 out of 5 lessons completed (40%)
  {
    id: 'progress-4',
    userId: 'mock-user-kwame-123',
    moduleId: 'corporate-awareness',
    lessonId: 'lesson-1',
    completed: true,
    completedAt: new Date('2025-01-27'),
    lastAccessedAt: new Date('2025-01-27')
  },
  {
    id: 'progress-5',
    userId: 'mock-user-kwame-123',
    moduleId: 'corporate-awareness',
    lessonId: 'lesson-2',
    completed: true,
    completedAt: new Date('2025-01-29'),
    lastAccessedAt: new Date('2025-01-29')
  }
];