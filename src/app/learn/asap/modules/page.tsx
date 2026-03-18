'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Trophy, Target, Users, Sparkles, ArrowRight, BookOpen,
  CheckCircle, PlayCircle, Lock, Clock, ChevronRight,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';
import { getAllModules, Module } from '@/services/moduleService';
import { getUserProgress, UserProgress } from '@/services/progressService';

export default function ModulesPage() {
  return (
    <ProtectedRoute>
      <ModulesContent />
    </ProtectedRoute>
  );
}

function ModulesContent() {
  const { user } = useAuthContext();
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      try {
        const [modulesData, progressData] = await Promise.all([
          getAllModules(),
          getUserProgress(user.uid)
        ]);
        setModules(modulesData);
        setProgress(progressData);
      } catch (err) {
        console.error('Error fetching modules or progress:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#181111] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#CC2630]/20 border-t-[#ea2a33] animate-spin mx-auto" />
          <p className="text-[#b89d9f] text-xs font-bold uppercase tracking-widest">Loading modules…</p>
        </div>
      </div>
    );
  }

  const modulesWithProgress = modules.map((mod) => {
    const mp = progress?.modules[mod.id];
    return {
      ...mod,
      locked: mp?.status === 'locked',
      progress: mp?.progress || 0,
      completedLessons: mp?.completedLessons.length || 0,
    };
  });

  const overallProgress = progress?.overallProgress || 0;
  const completedCount = modulesWithProgress.filter(m => m.progress === 100).length;
  const inProgressCount = modulesWithProgress.filter(m => m.progress > 0 && m.progress < 100).length;

  return (
    <div className="min-h-screen bg-[#181111] text-white">

      {/* ── HERO ── */}
      <div className="relative overflow-hidden border-b border-[#382929] bg-gradient-to-b from-[#261c1c] to-[#181111]">
        <Image
          src="/asn_bg.svg"
          fill
          style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
          alt=""
          className="opacity-50 pointer-events-none"
          priority
        />
        {/* Warm glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#CC2630]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 xl:gap-16">

            {/* Left copy */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#CC2630]/15 border border-[#CC2630]/30 rounded-full mb-5">
                <Sparkles size={12} className="text-[#ea2a33]" />
                <span className="text-[#ea2a33] text-[10px] font-black uppercase tracking-widest">ASAP Curriculum</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-4">
                Your 12-Week<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CC2630] to-[#ea2a33]">
                  Transformation
                </span>
              </h1>

              <p className="text-[#b89d9f] text-base md:text-lg leading-relaxed max-w-lg mb-8">
                Five expert-designed modules to take you from academic excellence
                to professional mastery in the African corporate landscape.
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 pt-6 border-t border-[#382929]">
                {[
                  { val: `${completedCount}/5`, label: 'Complete' },
                  { val: `${inProgressCount}`, label: 'In Progress' },
                  { val: `${overallProgress}%`, label: 'Overall' },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-black text-white leading-none">{s.val}</p>
                    <p className="text-[11px] text-[#b89d9f] mt-1 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress card */}
            <div className="w-full lg:w-72 xl:w-80 shrink-0">
              <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-lg shadow-[#CC2630]/30 shrink-0">
                    <Trophy size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-[#ea2a33] uppercase tracking-widest mb-1">Overall Progress</p>
                    <p className="text-3xl font-black text-white leading-none">{overallProgress}%</p>
                  </div>
                </div>

                {/* Master bar */}
                <div className="mb-6">
                  <div className="h-2 bg-[#382929] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] rounded-full transition-all duration-1000"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-[#b89d9f]/60 font-medium">
                    <span>Start</span><span>Certificate</span>
                  </div>
                </div>

                {/* Per-module micro bars */}
                <div className="space-y-2.5">
                  {modulesWithProgress.map((m, i) => (
                    <div key={m.id} className="flex items-center gap-2.5">
                      <span className="text-[10px] font-black text-[#b89d9f]/50 w-4 shrink-0">{i + 1}</span>
                      <div className="flex-1 h-1 bg-[#382929] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${m.progress === 100 ? 'bg-emerald-500' : 'bg-[#ea2a33]'
                            }`}
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-black text-[#b89d9f]/60 w-7 text-right shrink-0">
                        {m.progress}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">

        {/* Info strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Target, title: 'Stay on Track', desc: 'One module every 2–3 weeks keeps you on pace for the full 12 weeks.' },
            { icon: Users, title: 'Learn Together', desc: 'Cohort discussions, peer feedback, and live sessions every week.' },
            { icon: Trophy, title: 'Get Certified', desc: 'Finish all 5 modules to earn your official ASAP certificate.' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-5 bg-[#261c1c] border border-[#382929] rounded-xl hover:border-[#533c3d] transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center shrink-0 mt-0.5">
                <item.icon size={16} className="text-[#ea2a33]" />
              </div>
              <div>
                <p className="text-sm font-black text-white mb-1">{item.title}</p>
                <p className="text-xs text-[#b89d9f] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CURRICULUM ── */}
        <div className="mb-12">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <p className="text-[10px] font-black text-[#ea2a33] uppercase tracking-widest mb-1.5">Your Learning Path</p>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
                5 Core Modules
              </h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#261c1c] border border-[#382929] rounded-full self-start sm:self-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ea2a33]" />
              <span className="text-xs font-bold text-[#b89d9f]">{completedCount} of 5 complete</span>
            </div>
          </div>

          {/* Journey list */}
          <div className="relative">
            {/* Vertical connector line — desktop only */}
            <div className="hidden md:block absolute left-[1.85rem] top-10 bottom-10 w-px bg-gradient-to-b from-[#382929] via-[#533c3d] to-[#382929]" />

            <div className="space-y-3">
              {modulesWithProgress.map((mod, i) => {
                const isComplete = mod.progress === 100;
                const isInProgress = mod.progress > 0 && mod.progress < 100;
                const isLocked = mod.locked;
                const isNext = !isLocked && !isComplete && !isInProgress && modulesWithProgress.slice(0, i).every(m => m.progress === 100);

                return (
                  <div key={mod.id} className="relative md:pl-16">
                    {/* Step indicator — desktop */}
                    <div className={`
                      hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
                      w-[3.7rem] items-center justify-end pr-3
                    `}>
                      <div className={`
                        w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10
                        transition-all duration-300
                        ${isComplete
                          ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                          : isInProgress
                            ? 'bg-[#CC2630] border-[#ea2a33] shadow-[0_0_12px_rgba(204,38,48,0.4)]'
                            : isNext
                              ? 'bg-[#261c1c] border-[#ea2a33]'
                              : 'bg-[#1f1818] border-[#382929]'
                        }
                      `}>
                        {isComplete
                          ? <CheckCircle size={14} className="text-white" />
                          : isInProgress
                            ? <PlayCircle size={14} className="text-white" />
                            : isLocked
                              ? <Lock size={12} className="text-[#b89d9f]/40" />
                              : <span className="text-[10px] font-black text-[#ea2a33]">{i + 1}</span>
                        }
                      </div>
                    </div>

                    {/* Card */}
                    <Link
                      href={isLocked ? '#' : `/learn/asap/modules/${mod.id}`}
                      className={`
                        group flex items-center gap-4 md:gap-5 p-4 md:p-5
                        bg-[#261c1c] border rounded-xl
                        transition-all duration-200
                        ${isLocked
                          ? 'border-[#382929] opacity-50 cursor-not-allowed pointer-events-none'
                          : isComplete
                            ? 'border-emerald-800/40 hover:border-emerald-600/50 hover:bg-[#1e2b1e] hover:-translate-y-px hover:shadow-lg hover:shadow-black/40'
                            : isInProgress
                              ? 'border-[#CC2630]/40 hover:border-[#ea2a33]/60 hover:bg-[#2d1f1f] hover:-translate-y-px hover:shadow-lg hover:shadow-black/40'
                              : 'border-[#382929] hover:border-[#533c3d] hover:bg-[#2d2222] hover:-translate-y-px hover:shadow-lg hover:shadow-black/40'
                        }
                      `}
                    >
                      {/* Mobile step dot */}
                      <div className={`
                        md:hidden shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center
                        ${isComplete ? 'bg-emerald-500 border-emerald-500'
                          : isInProgress ? 'bg-[#CC2630] border-[#ea2a33]'
                            : isLocked ? 'bg-[#1f1818] border-[#382929]'
                              : 'bg-[#261c1c] border-[#533c3d]'
                        }
                      `}>
                        {isComplete ? <CheckCircle size={14} className="text-white" />
                          : isInProgress ? <PlayCircle size={14} className="text-white" />
                            : isLocked ? <Lock size={12} className="text-[#b89d9f]/40" />
                              : <span className="text-[10px] font-black text-[#ea2a33]">{i + 1}</span>
                        }
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`
                            text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border
                            ${isComplete
                              ? 'text-emerald-400 bg-emerald-900/30 border-emerald-800/40'
                              : 'text-[#ea2a33] bg-[#CC2630]/10 border-[#CC2630]/25'
                            }
                          `}>
                            {mod.weekRange}
                          </span>
                          {isInProgress && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#CC2630] bg-[#CC2630]/10 border border-[#CC2630]/25 px-2 py-0.5 rounded-full">
                              In Progress
                            </span>
                          )}
                          {isNext && (
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 bg-amber-900/20 border border-amber-800/30 px-2 py-0.5 rounded-full">
                              Up Next
                            </span>
                          )}
                        </div>
                        <h3 className={`
                          font-black text-sm md:text-base leading-snug mb-1 transition-colors
                          ${isComplete ? 'text-white group-hover:text-emerald-300'
                            : 'text-white group-hover:text-[#EEB7BA]'
                          }
                        `}>
                          {mod.title}
                        </h3>
                        <p className="text-xs text-[#b89d9f] line-clamp-1 hidden sm:block">{mod.description}</p>
                      </div>

                      {/* Right: progress + meta */}
                      <div className="flex items-center gap-4 shrink-0">
                        {/* Progress bar — desktop */}
                        {!isLocked && (
                          <div className="hidden sm:block w-28 xl:w-36">
                            <div className="flex justify-between mb-1">
                              <span className="text-[9px] text-[#b89d9f]/60 font-bold">
                                {mod.completedLessons}/{mod.lessons.length} lessons
                              </span>
                              <span className="text-[9px] font-black text-white">{mod.progress}%</span>
                            </div>
                            <div className="h-1 bg-[#382929] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-700 ${isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33]'
                                  }`}
                                style={{ width: `${mod.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Duration */}
                        <div className="hidden lg:flex items-center gap-1 text-[11px] text-[#b89d9f]/50">
                          <Clock size={11} />
                          <span>{mod.lessons.reduce((a, l) => a + l.duration, 0)}m</span>
                        </div>

                        {/* Arrow / lock */}
                        {isLocked ? (
                          <div className="w-8 h-8 rounded-lg bg-[#1f1818] border border-[#382929] flex items-center justify-center">
                            <Lock size={13} className="text-[#b89d9f]/30" />
                          </div>
                        ) : (
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200
                            group-hover:translate-x-0.5
                            ${isComplete
                              ? 'bg-emerald-900/40 border border-emerald-700/40 text-emerald-400'
                              : isInProgress
                                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white shadow-md shadow-[#CC2630]/30'
                                : 'bg-[#2d2222] border border-[#382929] text-[#b89d9f] group-hover:border-[#533c3d]'
                            }
                          `}>
                            <ChevronRight size={14} />
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Help CTA */}
        <div className="relative overflow-hidden bg-[#261c1c] border border-[#382929] rounded-2xl p-8 md:p-12 text-center">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#CC2630]/8 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center mx-auto mb-5">
              <BookOpen size={20} className="text-[#ea2a33]" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white mb-3">Need Help?</h3>
            <p className="text-[#b89d9f] mb-7 max-w-md mx-auto text-sm leading-relaxed">
              Your mentor and the ASN community are here to support your journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2d2222] border border-[#382929] text-sm font-bold text-white hover:border-[#533c3d] active:scale-[0.98] transition-all">
                Contact Mentor
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-sm font-bold text-white hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98] transition-all">
                Join Community <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}