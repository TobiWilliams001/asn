// src/app/learn/asap/modules/[moduleId]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_MODULES } from '@/lib/mockData/modules';
import { MOCK_PROGRESS } from '@/lib/mockData/user';
import { Module, Lesson, Progress } from '@/types/learn';

export default function ModuleViewerPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  
  const [module, setModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState<Progress[]>(MOCK_PROGRESS);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

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
        <div className="text-center">
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

  return (
    <div className="min-h-screen bg-[#181111] text-white flex">
      <aside className="w-80 border-r border-[#382929] bg-[#181111] flex flex-col overflow-y-auto">
        <div className="p-6">
          <Link
            href="/learn/asap/modules"
            className="inline-flex items-center text-[#b89d9f] hover:text-white mb-6 text-sm"
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
                  onClick={() => setActiveLesson(lesson)}
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

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-10">
          {activeLesson ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-[#ea2a33] font-bold text-sm mb-2">
                  <span>MODULE {module.order}: {module.weekRange.toUpperCase()}</span>
                </div>
                <h1 className="text-4xl font-black mb-3">{module.title}</h1>
                <h2 className="text-2xl text-[#b89d9f] mb-2">{activeLesson.title}</h2>
                <p className="text-[#b89d9f]">{activeLesson.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
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
                <div className="flex justify-between text-sm text-[#b89d9f]">
                  <span>Duration: {activeLesson.duration} minutes</span>
                  <span>Core Concept</span>
                </div>
              </div>

              {activeLesson.content && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Lesson Overview</h3>
                  <div 
                    className="prose prose-invert max-w-none text-[#b89d9f]"
                    dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                  />
                </div>
              )}

              {activeLesson.resources && activeLesson.resources.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Reading Materials</h3>
                  <div className="space-y-3">
                    {activeLesson.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl border border-[#382929] bg-[#261c1c] hover:bg-[#2d2222] transition-all"
                      >
                        <div className="p-2 bg-[#181111] rounded-lg text-[#ea2a33]">
                          <span className="text-2xl">&#128196;</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold">{resource.title}</h4>
                          <p className="text-[10px] text-[#b89d9f] uppercase font-bold tracking-wider">
                            {resource.type.toUpperCase()} {resource.pages ? `• ${resource.pages} Pages` : ''}
                          </p>
                        </div>
                        <span className="text-[#b89d9f]">&darr;</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-6 border-t border-[#382929]">
                <button
                  onClick={() => {
                    const currentIndex = module.lessons.findIndex(l => l.id === activeLesson.id);
                    if (currentIndex > 0) {
                      setActiveLesson(module.lessons[currentIndex - 1]);
                    }
                  }}
                  className="px-6 py-3 bg-[#382929] hover:bg-[#4a3636] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={module.lessons.findIndex(l => l.id === activeLesson.id) === 0}
                >
                  &larr; Previous Lesson
                </button>

                {isLessonCompleted(activeLesson.id) ? (
                  <div className="flex items-center gap-2 px-6 py-3 bg-green-900/30 text-green-400 font-bold rounded-lg">
                    <span>&check;</span>
                    <span>Completed</span>
                  </div>
                ) : (
                  <button
                    onClick={handleMarkComplete}
                    className="px-6 py-3 bg-[#ea2a33] hover:bg-[#c41f27] text-white font-bold rounded-lg transition-colors"
                  >
                    &check; Mark as Complete
                  </button>
                )}

                <button
                  onClick={() => {
                    const currentIndex = module.lessons.findIndex(l => l.id === activeLesson.id);
                    if (currentIndex < module.lessons.length - 1) {
                      setActiveLesson(module.lessons[currentIndex + 1]);
                    }
                  }}
                  className="px-6 py-3 bg-[#382929] hover:bg-[#4a3636] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={module.lessons.findIndex(l => l.id === activeLesson.id) === module.lessons.length - 1}
                >
                  Next Lesson &rarr;
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