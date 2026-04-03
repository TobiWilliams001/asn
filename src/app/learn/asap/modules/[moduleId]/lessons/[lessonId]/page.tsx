'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, ChevronRight, ChevronLeft, Loader2, Menu, X } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { getUserProgress, markLessonComplete } from '@/services/progressService';
import { getModule } from '@/services/moduleService';
import ContentViewer from '@/components/modules/ContentViewer';
import type { Module, Lesson } from '@/services/moduleService';
import type { UserProgress } from '@/services/progressService';

export default function LessonViewerPage({ params }: { params: Promise<{ moduleId: string; lessonId: string }> }) {
  const router = useRouter();
  const { moduleId, lessonId } = use(params);
  const { user } = useAuthContext();

  const [module, setModule] = useState<Module | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user, moduleId, lessonId]);

  async function fetchData() {
    try {
      const [moduleData, progressData] = await Promise.all([
        getModule(moduleId),
        getUserProgress(user!.uid)
      ]);
      
      if (!moduleData) {
        router.push('/learn/asap/modules');
        return;
      }

      const currentLesson = moduleData.lessons.find(l => l.id === lessonId);
      if (!currentLesson) {
        router.push(`/learn/asap/modules/${moduleId}`);
        return;
      }

      setModule(moduleData);
      setLesson(currentLesson);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleMarkComplete = async () => {
    if (!user?.uid || !module || !lesson) return;

    setCompleting(true);
    try {
      await markLessonComplete(user.uid, moduleId, lessonId, module.lessons.length);
      
      // Find next lesson
      const currentIndex = module.lessons.findIndex(l => l.id === lessonId);
      const nextLesson = module.lessons[currentIndex + 1];

      if (nextLesson) {
        // Go to next lesson
        router.push(`/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`);
      } else {
        // Module complete, go back to module detail
        router.push(`/learn/asap/modules/${moduleId}`);
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      alert('Failed to mark lesson complete');
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!module || !lesson) {
    return null;
  }

  const currentIndex = module.lessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? module.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < module.lessons.length - 1 ? module.lessons[currentIndex + 1] : null;
  
  const completedLessons = progress?.modules[moduleId]?.completedLessons || [];
  const isCompleted = completedLessons.includes(lessonId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-[#261c1c] border border-[#382929] text-white"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex">
        {/* Lesson Sidebar - Coursera Style */}
        <aside className={`
          fixed lg:sticky top-0 left-0 h-screen w-80 bg-[#181111] border-r border-[#382929] overflow-y-auto
          transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Module Header */}
          <div className="p-6 border-b border-[#382929]">
            <Link
              href={`/learn/asap/modules/${moduleId}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-3"
            >
              <ArrowLeft size={16} />
              Back to Module
            </Link>
            <h2 className="text-lg font-bold text-white line-clamp-2">{module.title}</h2>
            <p className="text-xs text-[#b89d9f] mt-1">{completedLessons.length}/{module.lessons.length} lessons complete</p>
          </div>

          {/* Lessons List */}
          <div className="p-4">
            {module.lessons.map((l, index) => {
              const isLessonCompleted = completedLessons.includes(l.id);
              const isLessonUnlocked = index === 0 || completedLessons.includes(module.lessons[index - 1].id);
              const isCurrent = l.id === lessonId;

              return (
                <Link
                  key={l.id}
                  href={isLessonUnlocked ? `/learn/asap/modules/${moduleId}/lessons/${l.id}` : '#'}
                  className={`
                    block p-4 rounded-xl mb-2 transition-all
                    ${isCurrent ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white' : ''}
                    ${!isCurrent && isLessonUnlocked ? 'hover:bg-[#261c1c] text-white' : ''}
                    ${!isLessonUnlocked ? 'opacity-50 cursor-not-allowed text-[#b89d9f]' : ''}
                  `}
                  onClick={(e) => {
                    if (!isLessonUnlocked) e.preventDefault();
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold">Lesson {index + 1}</span>
                    {isLessonCompleted && (
                      <CheckCircle size={16} className={isCurrent ? 'text-white' : 'text-emerald-400'} />
                    )}
                  </div>
                  <p className="text-sm font-semibold line-clamp-2">{l.title}</p>
                  <p className="text-xs opacity-75 mt-1 capitalize">{l.contentType} • {l.duration} min</p>
                </Link>
              );
            })}
          </div>

          {/* Progress */}
          <div className="p-6 border-t border-[#382929]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#b89d9f]">Module Progress</span>
              <span className="text-xs font-bold text-white">
                {Math.round((completedLessons.length / module.lessons.length) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#1a1314] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(completedLessons.length / module.lessons.length) * 100}%` }}
              />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Header */}
          <div className="border-b border-[#382929] bg-gradient-to-r from-[#181111] to-[#0f0909] sticky top-0 z-30">
            <div className="max-w-5xl mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1a1314] text-[#b89d9f] capitalize">
                      {lesson.contentType}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1a1314] text-[#b89d9f]">
                      {lesson.duration} min
                    </span>
                    {isCompleted && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        Completed
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black text-white">{lesson.title}</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-5xl mx-auto px-6 py-8">
            {/* Content Viewer */}
            <ContentViewer lesson={lesson} />

            {/* Lesson Content (HTML) */}
            {lesson.content && (
              <div className="mt-8 bg-[#261c1c] border border-[#382929] rounded-2xl p-8">
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </div>
            )}

            {/* Resources */}
            {lesson.resources && lesson.resources.length > 0 && (
              <div className="mt-8 bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Additional Resources</h3>
                <div className="space-y-3">
                  {lesson.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl bg-[#1a1314] border border-[#382929] hover:bg-[#2d2222] hover:border-[#533c3d] transition-all"
                    >
                      <p className="font-semibold text-white mb-1">{resource.title}</p>
                      <p className="text-sm text-[#b89d9f]">{resource.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/learn/asap/modules/${moduleId}/lessons/${prevLesson.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#261c1c] border border-[#382929] text-white font-bold hover:bg-[#2d2222] transition-all"
                >
                  <ChevronLeft size={20} />
                  Previous
                </Link>
              ) : (
                <div />
              )}

              {!isCompleted && (
                <button
                  onClick={handleMarkComplete}
                  disabled={completing}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {completing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Completing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Mark Complete
                    </>
                  )}
                </button>
              )}

              {nextLesson && (
                <Link
                  href={`/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
                >
                  {isCompleted ? 'Next Lesson' : 'Skip to Next'}
                  <ChevronRight size={20} />
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}