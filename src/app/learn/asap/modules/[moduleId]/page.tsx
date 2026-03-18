'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Clock, BookOpen, Target, Award,
  Loader2, CheckCircle, PlayCircle, ChevronRight,
  FileText, Users,
} from 'lucide-react';
import LessonCard from '@/components/modules/LessonCard';
import ProgressBar from '@/components/modules/ProgressBar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';
import {
  getUserProgress,
  UserProgress,
  isLessonUnlocked,
  isLessonCompleted,
} from '@/services/progressService';
import { getModule, Module } from '@/services/moduleService';

export default function ModuleDetailPage({ params }: { params: { moduleId: string } }) {
  return (
    <ProtectedRoute>
      <ModuleDetailContent params={params} />
    </ProtectedRoute>
  );
}

function ModuleDetailContent({ params }: { params: { moduleId: string } }) {
  const router = useRouter();
  const { user } = useAuthContext();
  const { moduleId } = params;
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error('Error fetching module or progress:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user, moduleId]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#181111] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#CC2630]/20 border-t-[#ea2a33] animate-spin mx-auto" />
          <p className="text-[#b89d9f] text-[11px] font-bold uppercase tracking-widest">
            Loading module…
          </p>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!module) {
    return (
      <div className="min-h-screen bg-[#181111] flex items-center justify-center p-6">
        <div className="max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#261c1c] border border-[#382929] flex items-center justify-center mx-auto mb-6">
            <BookOpen size={28} className="text-[#ea2a33] opacity-40" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Module not found</h2>
          <p className="text-[#b89d9f] text-sm mb-8 leading-relaxed">
            This module doesn't exist or is restricted.
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

  const moduleProgress = progress?.modules[module.id];
  const completedCount = moduleProgress?.completedLessons.length || 0;
  const totalLessons = module.lessons.length;
  const progressPercent = moduleProgress?.progress || 0;
  const totalDuration = module.lessons.reduce((acc, l) => acc + l.duration, 0);
  const isModuleComplete = progressPercent === 100;

  const lessonsWithStatus = module.lessons.map((lesson) => ({
    ...lesson,
    completed: isLessonCompleted(progress, module.id, lesson.id),
    locked: !isLessonUnlocked(
      progress,
      module.id,
      lesson.id,
      lesson.order,
      module.lessons
    ),
  }));

  // Find the next unlocked incomplete lesson to continue from
  const nextLesson = lessonsWithStatus.find((l) => !l.locked && !l.completed);

  return (
    <div className="min-h-screen bg-[#181111] text-white">

      {/* ══════════════════════════════
          STICKY HEADER
      ══════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-[#1e1515] border-b border-[#382929]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

          <button
            onClick={() => router.push('/learn/asap/modules')}
            className="group flex items-center gap-2.5 text-[#b89d9f] hover:text-white transition-colors shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[#261c1c] border border-[#382929] flex items-center justify-center group-hover:border-[#533c3d] transition-colors">
              <ArrowLeft size={15} />
            </div>
            <span className="text-xs font-bold hidden sm:block">All Modules</span>
          </button>

          {/* Right: progress */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#b89d9f] hidden sm:block">
              {completedCount}/{totalLessons} lessons
            </span>
            <div className="w-24 sm:w-32 h-1.5 bg-[#382929] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-black text-white w-9 text-right">
              {progressPercent}%
            </span>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════
          HERO BANNER
      ══════════════════════════════ */}
      <div className="bg-gradient-to-b from-[#261c1c] to-[#1d1414] border-b border-[#382929] relative overflow-hidden">
        {/* Warm glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#CC2630]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12">

            {/* Left: module info */}
            <div className="flex-1 min-w-0">

              {/* Week badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#CC2630]/10 border border-[#CC2630]/25 rounded-full mb-5">
                <Award size={11} className="text-[#ea2a33]" />
                <span className="text-[#ea2a33] text-[10px] font-black uppercase tracking-widest">
                  {module.weekRange}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-white mb-4">
                {module.title}
              </h1>
              <p className="text-[#b89d9f] text-base leading-relaxed max-w-xl mb-7">
                {module.description}
              </p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-2.5 mb-7">
                {[
                  { icon: Clock, label: `${totalDuration} mins` },
                  { icon: BookOpen, label: `${totalLessons} lessons` },
                  { icon: CheckCircle, label: `${completedCount} done` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2d2222] border border-[#382929] rounded-lg"
                  >
                    <item.icon size={12} className="text-[#ea2a33]" />
                    <span className="text-xs font-bold text-[#b89d9f]">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA: continue or review */}
              {nextLesson ? (
                <button
                  onClick={() =>
                    router.push(
                      `/learn/asap/modules/${moduleId}/lessons/${nextLesson.id}`
                    )
                  }
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-black uppercase tracking-wider hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98] transition-all"
                >
                  <PlayCircle size={16} />
                  {completedCount === 0 ? 'Start Module' : 'Continue'}
                  <ChevronRight size={14} className="opacity-70" />
                </button>
              ) : isModuleComplete ? (
                <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-900/30 border border-emerald-700/40 text-emerald-400 text-sm font-black uppercase tracking-wider">
                  <CheckCircle size={16} />
                  Module Complete
                </div>
              ) : null}
            </div>

            {/* Right: progress card */}
            <div className="w-full lg:w-60 xl:w-64 shrink-0">
              <div className="bg-[#2d2222] border border-[#382929] rounded-xl overflow-hidden">

                {/* Card header */}
                <div className="px-5 pt-5 pb-4 border-b border-[#382929]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-[#ea2a33] uppercase tracking-widest">
                      Progress
                    </span>
                    <span className="text-lg font-black text-white leading-none">
                      {progressPercent}%
                    </span>
                  </div>
                  <ProgressBar progress={progressPercent} height="md" />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 divide-x divide-[#382929]">
                  <div className="px-4 py-3 text-center">
                    <p className="text-xl font-black text-white leading-none mb-1">
                      {completedCount}
                      <span className="text-sm text-[#b89d9f] font-bold">/{totalLessons}</span>
                    </p>
                    <p className="text-[10px] text-[#b89d9f] uppercase tracking-widest">Lessons</p>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-xl font-black text-white leading-none mb-1">{totalDuration}</p>
                    <p className="text-[10px] text-[#b89d9f] uppercase tracking-widest">Minutes</p>
                  </div>
                </div>

                {/* Lesson dots */}
                <div className="px-5 py-4 border-t border-[#382929]">
                  <p className="text-[10px] font-bold text-[#b89d9f]/60 uppercase tracking-widest mb-3">
                    Lesson progress
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {lessonsWithStatus.map((l, i) => (
                      <div
                        key={l.id}
                        title={l.title}
                        className={`w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black transition-all ${l.completed
                          ? 'bg-emerald-500 text-white shadow-[0_0_6px_rgba(34,197,94,0.4)]'
                          : l.id === nextLesson?.id
                            ? 'bg-[#CC2630] text-white shadow-[0_0_6px_rgba(204,38,48,0.4)]'
                            : l.locked
                              ? 'bg-[#382929] text-[#b89d9f]/30'
                              : 'bg-[#382929] text-[#b89d9f]/60'
                          }`}
                      >
                        {l.completed ? '✓' : i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* ── LESSON LIST ── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-0.5 h-7 bg-gradient-to-b from-[#ea2a33] to-transparent rounded-full" />
                <div>
                  <p className="text-[10px] font-black text-[#ea2a33] uppercase tracking-widest mb-0.5">
                    {totalLessons} lessons
                  </p>
                  <h2 className="text-lg font-black text-white leading-none">Curriculum</h2>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#b89d9f]">
                <Clock size={12} className="text-[#ea2a33]" />
                {totalDuration} mins total
              </div>
            </div>

            <div className="space-y-2">
              {lessonsWithStatus.map((lesson, index) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  moduleId={module.id}
                  index={index}
                  isLocked={lesson.locked}
                />
              ))}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0">
            <div className="lg:sticky lg:top-20 space-y-4">

              {/* Objectives */}
              <div className="bg-[#261c1c] border border-[#382929] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#382929]">
                  <div className="w-7 h-7 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center shrink-0">
                    <Target size={13} className="text-[#ea2a33]" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">
                    Objectives
                  </h3>
                </div>
                <ul className="p-5 space-y-3.5">
                  {[
                    'Understand core concepts and frameworks',
                    'Apply learnings to real-world scenarios',
                    'Complete the module deliverable',
                    'Receive peer and mentor feedback',
                  ].map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#CC2630]/10 border border-[#CC2630]/25 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[8px] font-black text-[#ea2a33]">{i + 1}</span>
                      </div>
                      <span className="text-sm text-[#b89d9f] leading-relaxed">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverable */}
              <div className="bg-[#261c1c] border border-[#382929] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#382929]">
                  <div className="w-7 h-7 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center shrink-0">
                    <Award size={13} className="text-[#ea2a33]" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">
                    Deliverable
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[#b89d9f] leading-relaxed mb-4">
                    Complete the module project to earn your badge and unlock the next module.
                  </p>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-[#2d2222] border border-[#382929] hover:border-[#CC2630]/40 hover:bg-[#CC2630]/5 transition-all group">
                    <div className="flex items-center gap-2.5">
                      <FileText size={14} className="text-[#ea2a33] shrink-0" />
                      <span className="text-xs font-bold text-white group-hover:text-[#EEB7BA] transition-colors">
                        View Assignment Brief
                      </span>
                    </div>
                    <ChevronRight size={13} className="text-[#b89d9f]/40 group-hover:text-[#ea2a33] transition-colors" />
                  </button>
                </div>
              </div>

              {/* Resources */}
              <div className="bg-[#261c1c] border border-[#382929] rounded-xl overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#382929]">
                  <div className="w-7 h-7 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center shrink-0">
                    <BookOpen size={13} className="text-[#ea2a33]" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">
                    Resources
                  </h3>
                </div>
                <div className="p-3 space-y-1.5">
                  {[
                    { title: 'Module Reading List', meta: 'PDF · 8 pages', icon: FileText },
                    { title: 'Career Planning Template', meta: 'Google Doc', icon: FileText },
                    { title: 'Cohort Discussion Forum', meta: 'Community', icon: Users },
                  ].map((res, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg bg-[#2d2222] border border-[#382929] hover:border-[#533c3d] hover:bg-[#382929] transition-all group"
                    >
                      <res.icon size={13} className="text-[#ea2a33] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-[#EEB7BA] transition-colors truncate">
                          {res.title}
                        </p>
                        <p className="text-[10px] text-[#b89d9f]/50 mt-0.5">{res.meta}</p>
                      </div>
                      <ChevronRight size={12} className="text-[#b89d9f]/30 group-hover:text-[#ea2a33] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}