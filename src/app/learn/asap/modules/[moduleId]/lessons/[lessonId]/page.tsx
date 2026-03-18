'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, ChevronLeft, ChevronRight, CheckCircle,
  Link as LinkIcon, Download, MessageSquare, Loader2,
  PanelRightClose, PanelRightOpen, BookOpen, Clock, X,
  FileText, PlayCircle,
} from 'lucide-react';
import ContentViewer from '@/components/modules/ContentViewer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';
import {
  getUserProgress,
  markLessonComplete,
  UserProgress,
  isLessonCompleted,
} from '@/services/progressService';
import { getModule, Module, Lesson } from '@/services/moduleService';

export default function LessonViewerPage({
  params,
}: {
  params: { moduleId: string; lessonId: string };
}) {
  return (
    <ProtectedRoute>
      <LessonViewerContent params={params} />
    </ProtectedRoute>
  );
}

function LessonViewerContent({
  params,
}: {
  params: { moduleId: string; lessonId: string };
}) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { moduleId, lessonId } = params;
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'discussion'>('overview');
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        const [progressData, moduleData] = await Promise.all([
          getUserProgress(user.uid),
          getModule(moduleId)
        ]);
        setProgress(progressData);
        setModule(moduleData);
        
        if (moduleData) {
          const l = moduleData.lessons.find((l) => l.id === lessonId);
          setLesson(l || null);
        }
      } catch (err) {
        console.error('Error fetching lesson or progress:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user, moduleId, lessonId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181111] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#CC2630]/20 border-t-[#ea2a33] animate-spin mx-auto" />
          <p className="text-[#b89d9f] text-[11px] font-bold uppercase tracking-widest">
            Loading lesson…
          </p>
        </div>
      </div>
    );
  }

  if (!module || !lesson) {
    return (
      <div className="min-h-screen bg-[#181111] flex items-center justify-center p-6">
        <div className="max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#261c1c] border border-[#382929] flex items-center justify-center mx-auto mb-6">
            <BookOpen size={28} className="text-[#ea2a33] opacity-50" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Lesson not found</h2>
          <p className="text-[#b89d9f] text-sm mb-8 leading-relaxed">
            This lesson doesn't exist or you don't have access yet.
          </p>
          <button
            onClick={() => router.push('/learn/asap/modules')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98] transition-all"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = isLessonCompleted(progress, moduleId, lessonId);
  const currentIndex = module.lessons.findIndex((l) => l.id === lessonId);
  const previousLesson = currentIndex > 0 ? module.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < module.lessons.length - 1 ? module.lessons[currentIndex + 1] : null;
  const completedLessonCount = module.lessons.filter((l) =>
    isLessonCompleted(progress, moduleId, l.id)
  ).length;
  const moduleProgressPct = Math.round((completedLessonCount / module.lessons.length) * 100);

  const handleMarkComplete = async () => {
    if (!user || isCompleted) return;
    setMarking(true);
    try {
      await markLessonComplete(user.uid, moduleId, lessonId, module.lessons.length);
      const updated = await getUserProgress(user.uid);
      setProgress(updated);
      setTimeout(() => {
        if (nextLesson) {
          router.push(`/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`);
        } else {
          router.push(`/learn/asap/modules/${moduleId}`);
        }
      }, 1200);
    } catch {
      alert('Failed to save. Please try again.');
    } finally {
      setMarking(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#181111] text-white overflow-hidden">

      {/* ══════════════════════
          MAIN COLUMN
      ══════════════════════ */}
      <div className="flex flex-col flex-1 min-w-0 h-full">

        {/* TOP BAR */}
        <header className="shrink-0 h-14 bg-[#1e1515] border-b border-[#382929] flex items-center px-4 sm:px-5 gap-3 z-30">

          <button
            onClick={() => router.push(`/learn/asap/modules/${moduleId}`)}
            className="group flex items-center gap-2 text-[#b89d9f] hover:text-white transition-colors shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#261c1c] border border-[#382929] flex items-center justify-center group-hover:border-[#533c3d] transition-colors">
              <ArrowLeft size={15} />
            </div>
          </button>

          <div className="w-px h-5 bg-[#382929] shrink-0" />

          {/* Breadcrumb — sm+ */}
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-[10px] font-black text-[#ea2a33] uppercase tracking-widest leading-none mb-0.5 truncate">
              {module.title}
            </p>
            <p className="text-[13px] font-bold text-white truncate leading-none">
              {lesson.title}
            </p>
          </div>
          {/* Mobile: lesson title only */}
          <p className="flex-1 text-sm font-bold text-white truncate sm:hidden leading-none">
            {lesson.title}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            {/* Prev / Next */}
            <div className="hidden md:flex items-center gap-1">
              <button
                disabled={!previousLesson}
                onClick={() =>
                  previousLesson &&
                  router.push(`/learn/asap/modules/${moduleId}/lessons/${previousLesson.id}`)
                }
                className="w-8 h-8 rounded-lg bg-[#261c1c] border border-[#382929] flex items-center justify-center disabled:opacity-25 hover:enabled:border-[#533c3d] transition-colors"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                disabled={!nextLesson}
                onClick={() =>
                  nextLesson &&
                  router.push(`/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`)
                }
                className="w-8 h-8 rounded-lg bg-[#261c1c] border border-[#382929] flex items-center justify-center disabled:opacity-25 hover:enabled:border-[#533c3d] transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Sidebar toggle */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              title={sidebarOpen ? 'Hide curriculum' : 'Show curriculum'}
              className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${sidebarOpen
                ? 'bg-[#CC2630]/15 border-[#CC2630]/40 text-[#ea2a33]'
                : 'bg-[#261c1c] border-[#382929] text-[#b89d9f] hover:border-[#533c3d] hover:text-white'
                }`}
            >
              {sidebarOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
            </button>

            {/* Mark complete */}
            <button
              onClick={handleMarkComplete}
              disabled={isCompleted || marking}
              className={`
                flex items-center gap-1.5 px-4 sm:px-5 h-8 rounded-lg
                text-[11px] font-black uppercase tracking-wider
                transition-all active:scale-[0.97] disabled:opacity-60
                ${isCompleted
                  ? 'bg-emerald-900/30 border border-emerald-700/40 text-emerald-400'
                  : 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white hover:shadow-lg hover:shadow-[#CC2630]/25'
                }
              `}
            >
              {marking ? <Loader2 size={12} className="animate-spin" />
                : isCompleted ? <CheckCircle size={12} />
                  : null}
              <span className="hidden sm:inline">
                {marking ? 'Saving…' : isCompleted ? 'Completed' : 'Mark Complete'}
              </span>
              <span className="sm:hidden">
                {marking ? '…' : isCompleted ? '✓' : 'Done'}
              </span>
            </button>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <main className="flex-1 overflow-y-auto bg-[#181111]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">

            {/* Video */}
            <div className="aspect-video rounded-xl overflow-hidden bg-[#0f0b0b] border border-[#382929] mb-6 shadow-xl shadow-black/50">
              <ContentViewer
                contentType={lesson.contentType}
                title={lesson.title}
                videoUrl={lesson.videoUrl}
                articleUrl={lesson.articleUrl}
              />
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-[#CC2630]/10 border border-[#CC2630]/25 rounded-full text-[10px] font-black text-[#ea2a33] uppercase tracking-widest">
                <Clock size={11} />
                {lesson.duration} mins
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-[#261c1c] border border-[#382929] rounded-full text-[10px] font-bold text-[#b89d9f]">
                <BookOpen size={11} />
                Lesson {currentIndex + 1} of {module.lessons.length}
              </span>
              {lesson.contentType !== 'video' && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-[#261c1c] border border-[#382929] rounded-full text-[10px] font-bold text-[#b89d9f] capitalize">
                  <FileText size={11} />
                  {lesson.contentType}
                </span>
              )}
            </div>

            {/* Title + description */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
              {lesson.title}
            </h2>
            <p className="text-[#b89d9f] text-base leading-relaxed mb-8 max-w-2xl">
              {lesson.description}
            </p>

            {/* Mobile prev/next */}
            <div className="flex items-center justify-between py-4 border-t border-b border-[#382929] mb-7 md:hidden">
              {previousLesson ? (
                <button
                  onClick={() =>
                    router.push(`/learn/asap/modules/${moduleId}/lessons/${previousLesson.id}`)
                  }
                  className="flex items-center gap-1.5 text-xs font-bold text-[#b89d9f] hover:text-white transition-colors"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
              ) : <div />}
              {nextLesson ? (
                <button
                  onClick={() =>
                    router.push(`/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`)
                  }
                  className="flex items-center gap-1.5 text-xs font-bold text-[#ea2a33] hover:text-[#CC2630] transition-colors"
                >
                  Next <ChevronRight size={14} />
                </button>
              ) : <div />}
            </div>

            {/* Tabs — pill style */}
            <div className="flex gap-1 bg-[#261c1c] border border-[#382929] rounded-xl p-1 mb-7 w-fit">
              {(['overview', 'resources', 'discussion'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider
                    transition-all duration-200 capitalize
                    ${activeTab === tab
                      ? 'bg-[#382929] text-white'
                      : 'text-[#b89d9f] hover:text-white'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="min-h-48 pb-16">

              {activeTab === 'overview' && (
                <div
                  className="prose prose-invert max-w-none prose-p:text-[#b89d9f] prose-p:leading-relaxed prose-p:text-[15px] prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight prose-li:text-[#b89d9f] prose-strong:text-[#EEB7BA] prose-a:text-[#ea2a33] prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              )}

              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lesson.resources.length > 0 ? (
                    lesson.resources.map((res, i) => (
                      <a
                        key={i}
                        href={res.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-[#261c1c] border border-[#382929] rounded-xl hover:border-[#533c3d] hover:bg-[#2d2222] transition-all group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center text-[#ea2a33] group-hover:scale-105 transition-transform shrink-0">
                          {res.type === 'pdf' ? <Download size={17} /> : <LinkIcon size={17} />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate group-hover:text-[#EEB7BA] transition-colors">
                            {res.title}
                          </p>
                          <p className="text-[10px] text-[#b89d9f]/60 uppercase tracking-widest mt-0.5">
                            {res.type}{res.pages ? ` · ${res.pages}` : ''}
                          </p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="col-span-2 py-14 text-center rounded-xl border border-dashed border-[#382929] bg-[#1e1515]">
                      <p className="text-xs text-[#b89d9f]/40 font-bold uppercase tracking-widest">
                        No resources for this lesson
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="py-16 text-center bg-[#1e1515] rounded-xl border border-[#382929]">
                  <div className="w-12 h-12 rounded-xl bg-[#261c1c] border border-[#382929] flex items-center justify-center mx-auto mb-5">
                    <MessageSquare size={20} className="text-[#ea2a33] opacity-50" />
                  </div>
                  <h3 className="text-base font-black text-white mb-2">Community Feed</h3>
                  <p className="text-sm text-[#b89d9f]/60 max-w-xs mx-auto leading-relaxed">
                    Cohort discussions are coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ══════════════════════
          CURRICULUM SIDEBAR
          Desktop: in-flow (pushes main).
          Mobile: fixed overlay.
      ══════════════════════ */}

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          shrink-0 flex flex-col bg-[#1e1515] border-l border-[#382929]
          transition-all duration-300 ease-in-out
          fixed inset-y-0 right-0 z-50 w-72 sm:w-80
          lg:relative lg:inset-auto lg:z-auto
          ${sidebarOpen
            ? 'translate-x-0 lg:w-72 xl:w-80'
            : 'translate-x-full lg:translate-x-0 lg:w-0 lg:border-l-0 lg:overflow-hidden'
          }
        `}
      >
        {/* Sidebar header */}
        <div className="shrink-0 h-14 border-b border-[#382929] flex items-center justify-between px-4 gap-3 bg-[#1e1515]">
          <div className="min-w-0">
            <p className="text-[10px] font-black text-[#ea2a33] uppercase tracking-widest leading-none mb-0.5 truncate">
              {module.title}
            </p>
            <p className="text-[11px] font-bold text-[#b89d9f] leading-none">Curriculum</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-7 h-7 rounded-lg bg-[#261c1c] border border-[#382929] flex items-center justify-center text-[#b89d9f] hover:text-white transition-colors shrink-0"
          >
            <X size={14} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="shrink-0 px-4 py-3 border-b border-[#382929] bg-[#181111]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-widest">
              {completedLessonCount}/{module.lessons.length} complete
            </span>
            <span className="text-[11px] font-black text-white">{moduleProgressPct}%</span>
          </div>
          <div className="h-1.5 bg-[#382929] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] rounded-full transition-all duration-700"
              style={{ width: `${moduleProgressPct}%` }}
            />
          </div>
        </div>

        {/* Lesson list */}
        <div className="flex-1 overflow-y-auto">
          {module.lessons.map((l, i) => {
            const isCurrent = l.id === lessonId;
            const isDone = isLessonCompleted(progress, module.id, l.id);

            return (
              <button
                key={l.id}
                onClick={() =>
                  router.push(`/learn/asap/modules/${moduleId}/lessons/${l.id}`)
                }
                className={`
                  w-full text-left px-4 py-3.5 border-b border-[#261c1c]
                  flex items-start gap-3 transition-all duration-150
                  ${isCurrent
                    ? 'bg-[#2d1a1a] border-l-[3px] border-l-[#ea2a33] pl-[13px]'
                    : 'border-l-[3px] border-l-transparent hover:bg-[#261c1c]'
                  }
                `}
              >
                {/* Status dot */}
                <div className={`
                  shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5
                  ${isCurrent ? 'bg-[#CC2630] text-white'
                    : isDone ? 'bg-emerald-900/50 border border-emerald-700/50 text-emerald-400'
                      : 'bg-[#2d2222] border border-[#382929] text-[#b89d9f]/50'
                  }
                `}>
                  {isDone && !isCurrent ? <CheckCircle size={13} />
                    : isCurrent ? <PlayCircle size={13} />
                      : <span className="text-[9px] font-black">{i + 1}</span>
                  }
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className={`text-[12px] font-bold leading-snug mb-1 truncate ${isCurrent ? 'text-white'
                    : isDone ? 'text-[#b89d9f]'
                      : 'text-[#b89d9f] hover:text-white'
                    }`}>
                    {l.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#b89d9f]/50">
                    <Clock size={10} />
                    <span>{l.duration}m</span>
                    <span>·</span>
                    <span className="capitalize">{l.contentType}</span>
                  </div>
                </div>

                {/* Active glow dot */}
                {isCurrent && (
                  <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ea2a33] mt-2 shadow-[0_0_6px_rgba(234,42,51,0.6)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer: Up Next */}
        {nextLesson && (
          <div className="shrink-0 p-4 border-t border-[#382929] bg-[#181111]">
            <p className="text-[10px] font-black text-[#b89d9f]/60 uppercase tracking-widest mb-2">
              Up Next
            </p>
            <button
              onClick={() =>
                router.push(`/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`)
              }
              className="w-full flex items-center gap-3 p-3 bg-[#261c1c] border border-[#382929] rounded-xl hover:border-[#533c3d] hover:bg-[#2d2222] transition-all group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/25 flex items-center justify-center text-[#ea2a33] shrink-0 group-hover:bg-[#CC2630]/20 transition-colors">
                <PlayCircle size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-white truncate group-hover:text-[#EEB7BA] transition-colors">
                  {nextLesson.title}
                </p>
                <p className="text-[10px] text-[#b89d9f]/50">{nextLesson.duration}m</p>
              </div>
              <ChevronRight size={14} className="text-[#b89d9f]/30 shrink-0 group-hover:text-[#ea2a33] transition-colors" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}