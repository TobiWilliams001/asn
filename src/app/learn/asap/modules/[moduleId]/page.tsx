'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_MODULES } from '@/lib/mockData/modules';
import { MOCK_PROGRESS } from '@/lib/mockData/user';
import { Module, Lesson, Progress } from '@/types/learn';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Menu, X } from 'lucide-react';

export default function ModuleViewerPage() {
  return (
    <ProtectedRoute>
      <ModuleViewerContent />
    </ProtectedRoute>
  );
}

function ModuleViewerContent() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState<Progress[]>(MOCK_PROGRESS);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const foundModule = MOCK_MODULES.find(m => m.id === moduleId);
    if (foundModule) {
      setModule(foundModule);
      if (foundModule.lessons.length > 0) {
        setActiveLesson(foundModule.lessons[0]);
      }
    }
  }, [moduleId]);

  if (!module) {
    return (
      <div className="min-h-screen bg-[#181111] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Link href="/learn/asap/modules" className="text-[#ea2a33] hover:underline">
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.some(p =>
      p.moduleId === moduleId &&
      p.lessonId === lessonId &&
      p.completed
    );
  };

  const moduleCompletion = module.lessons.length > 0
    ? Math.round((progress.filter(p => p.moduleId === moduleId && p.completed).length / module.lessons.length) * 100)
    : 0;

  const handleMarkComplete = () => {
    if (!activeLesson) return;
    const existingIndex = progress.findIndex(
      p => p.moduleId === moduleId && p.lessonId === activeLesson.id
    );
    if (existingIndex === -1) {
      setProgress([...progress, {
        userId: 'mock-user-kwame-123',
        moduleId,
        lessonId: activeLesson.id,
        completed: true,
        completedAt: new Date(),
        lastAccessedAt: new Date()
      }]);
      alert('Lesson marked as complete!');
    } else {
      alert('Lesson already completed!');
    }
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#181111] text-white flex flex-col lg:flex-row">
      {/* Mobile Header with Menu Toggle */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#382929]">
        <Link
          href="/learn/asap/modules"
          className="text-[#b89d9f] hover:text-white text-sm"
        >
          &larr; All Modules
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#b89d9f] hover:text-white"
          data-testid="button-toggle-lesson-sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 z-50 bg-[#181111] border-r border-[#382929] flex flex-col overflow-y-auto
        transform transition-transform duration-300 ease-in-out
        lg:static lg:transform-none lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 sm:p-6">
          {/* Close button on mobile */}
          <div className="flex items-center justify-between lg:hidden mb-4">
            <span className="text-sm font-bold text-white">Lessons</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1 text-[#b89d9f] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Link
            href="/learn/asap/modules"
            className="hidden lg:inline-flex items-center text-[#b89d9f] hover:text-white mb-6 text-sm"
          >
            &larr; All Modules
          </Link>

          <h3 className="text-xs font-bold uppercase tracking-widest text-[#b89d9f] mb-6">
            {module.weekRange}
          </h3>

          <div className="mb-6 pb-6 border-b border-[#382929]">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#b89d9f]">Module Progress</span>
              <span className="font-bold text-[#ea2a33]">{moduleCompletion}%</span>
            </div>
            <div className="w-full bg-[#382929] h-2 rounded-full">
              <div
                className="bg-[#ea2a33] h-full rounded-full transition-all"
                style={{ width: `${moduleCompletion}%` }}
              />
            </div>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-widest text-[#b89d9f] mb-4">
            Lessons
          </h4>
          <div className="space-y-2">
            {module.lessons.map((lesson, index) => {
              const isCompleted = isLessonCompleted(lesson.id);
              const isActive = activeLesson?.id === lesson.id;

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#382929] border-l-4 border-[#ea2a33]'
                      : 'hover:bg-[#261c1c]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-6 flex-shrink-0 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? 'bg-[#ea2a33]'
                        : 'border-2 border-[#382929]'
                    }`}>
                      {isCompleted ? (
                        <span className="text-white text-xs">&check;</span>
                      ) : (
                        <span className="text-[#b89d9f] text-xs">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        isActive ? 'text-white' : 'text-[#b89d9f]'
                      }`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-[#b89d9f]">{lesson.duration} min</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
          {activeLesson ? (
            <>
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 text-[#ea2a33] font-bold text-xs sm:text-sm mb-2">
                  <span>MODULE {module.order}: {module.weekRange.toUpperCase()}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-2 sm:mb-3">{module.title}</h1>
                <h2 className="text-lg sm:text-2xl text-[#b89d9f] mb-2">{activeLesson.title}</h2>
                <p className="text-sm sm:text-base text-[#b89d9f]">{activeLesson.description}</p>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#ea2a33]">&#9654;</span>
                  Video Lesson
                </h3>
                <div className="aspect-video rounded-xl overflow-hidden border border-[#382929] bg-black mb-3">
                  <iframe
                    src={activeLesson.videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-[#b89d9f]">
                  <span>Duration: {activeLesson.duration} minutes</span>
                  <span>Core Concept</span>
                </div>
              </div>

              {activeLesson.content && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">Lesson Overview</h3>
                  <div
                    className="prose prose-invert max-w-none text-[#b89d9f] text-sm sm:text-base"
                    dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                  />
                </div>
              )}

              {activeLesson.resources && activeLesson.resources.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">Reading Materials</h3>
                  <div className="space-y-3">
                    {activeLesson.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-[#382929] bg-[#261c1c] hover:bg-[#2d2222] transition-all"
                      >
                        <div className="p-2 bg-[#181111] rounded-lg text-[#ea2a33]">
                          <span className="text-xl sm:text-2xl">&#128196;</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold truncate">{resource.title}</h4>
                          <p className="text-[10px] text-[#b89d9f] uppercase font-bold tracking-wider">
                            {resource.type.toUpperCase()} {resource.pages ? `- ${resource.pages} Pages` : ''}
                          </p>
                        </div>
                        <span className="text-[#b89d9f] flex-shrink-0">&darr;</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-6 border-t border-[#382929]">
                <button
                  onClick={() => {
                    const currentIndex = module.lessons.findIndex(l => l.id === activeLesson.id);
                    if (currentIndex > 0) {
                      setActiveLesson(module.lessons[currentIndex - 1]);
                    }
                  }}
                  className="px-4 sm:px-6 py-3 bg-[#382929] hover:bg-[#4a3636] text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={module.lessons.findIndex(l => l.id === activeLesson.id) === 0}
                >
                  &larr; Previous
                </button>

                {isLessonCompleted(activeLesson.id) ? (
                  <div className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-green-900/30 text-green-400 text-sm font-bold rounded-lg">
                    <span>&check;</span>
                    <span>Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={handleMarkComplete}
                    className="px-4 sm:px-6 py-3 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-sm font-bold rounded-lg transition-colors"
                  >
                    &check; Mark Complete
                  </button>
                )}

                <button
                  onClick={() => {
                    const currentIndex = module.lessons.findIndex(l => l.id === activeLesson.id);
                    if (currentIndex < module.lessons.length - 1) {
                      setActiveLesson(module.lessons[currentIndex + 1]);
                    }
                  }}
                  className="px-4 sm:px-6 py-3 bg-[#382929] hover:bg-[#4a3636] text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={module.lessons.findIndex(l => l.id === activeLesson.id) === module.lessons.length - 1}
                >
                  Next &rarr;
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#b89d9f]">No lessons available in this module yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}