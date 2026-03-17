'use client';

import Link from 'next/link';
import { Lock, CheckCircle, PlayCircle, Clock, ArrowRight, Sparkles } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { Module } from '@/types/learn';

interface ModuleCardProps {
  module: Module;
  index?: number; // for stagger delay
}

export default function ModuleCard({ module, index = 0 }: ModuleCardProps) {
  const isLocked = module.locked || false;
  const progress = module.progress || 0;
  const isComplete = progress === 100;
  const isInProgress = progress > 0 && progress < 100;
  const isNotStarted = progress === 0 && !isLocked;
  const totalLessons = module.lessons.length;
  const completedLessons = module.completedLessons || 0;

  return (
    <div
      className="fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        className={`
          group relative flex flex-col rounded-2xl overflow-hidden
          border transition-all duration-300
          ${isLocked
            ? 'bg-[#1e1515] border-[#2d2222] opacity-50 cursor-not-allowed'
            : isComplete
              ? 'bg-[#261c1c] border-emerald-800/40 hover:border-emerald-600/50 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5'
              : isInProgress
                ? 'bg-[#261c1c] border-[#CC2630]/30 hover:border-[#ea2a33]/50 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5'
                : 'bg-[#261c1c] border-[#382929] hover:border-[#533c3d] hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5'
          }
        `}
      >
        {/* ── Top accent bar — thicker and more visible ── */}
        <div className={`
          h-[3px] w-full flex-shrink-0
          ${isComplete
            ? 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500/30'
            : isInProgress
              ? 'bg-gradient-to-r from-[#CC2630] via-[#ea2a33] to-[#ea2a33]/30'
              : 'bg-[#382929]'
          }
        `} />

        {/* ── Lock overlay ── */}
        {isLocked && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#181111]/60 backdrop-blur-[1px]">
            <div className="text-center px-6">
              <div className="w-10 h-10 rounded-xl bg-[#2d2222] border border-[#382929] flex items-center justify-center mx-auto mb-3">
                <Lock size={16} className="text-[#b89d9f]" />
              </div>
              <p className="text-[10px] font-black text-[#b89d9f] uppercase tracking-widest mb-1">Locked</p>
              <p className="text-xs text-[#b89d9f]/50">Complete previous module first</p>
            </div>
          </div>
        )}

        {/* ── Hover glow (in-progress only) ── */}
        {isInProgress && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#CC2630]/5 to-transparent rounded-2xl" />
        )}

        <div className="flex flex-col flex-1 p-5 md:p-6">

          {/* ── Header row ── */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <span className={`
              inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
              ${isComplete
                ? 'bg-emerald-900/40 border-emerald-700/40 text-emerald-400'
                : isInProgress
                  ? 'bg-[#CC2630]/15 border-[#CC2630]/30 text-[#ea2a33]'
                  : 'bg-[#2d2222] border-[#382929] text-[#b89d9f]'
              }
            `}>
              {isInProgress && <Sparkles size={9} className="shrink-0" />}
              {module.weekRange}
            </span>

            {/* Status icon */}
            {isComplete && (
              <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle size={14} className="text-emerald-400" />
              </div>
            )}
            {isInProgress && (
              <div className="flex items-center gap-1 px-2 py-1 bg-[#CC2630]/10 border border-[#CC2630]/20 rounded-full shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ea2a33] animate-pulse" />
                <span className="text-[9px] font-black text-[#ea2a33] uppercase tracking-widest">Active</span>
              </div>
            )}
          </div>

          {/* ── Title ── */}
          <h3 className={`
            text-base md:text-lg font-black leading-snug mb-2 transition-colors duration-200
            ${isComplete
              ? 'text-white group-hover:text-emerald-300'
              : isInProgress
                ? 'text-white group-hover:text-[#EEB7BA]'
                : 'text-white group-hover:text-[#EEB7BA]'
            }
          `}>
            {module.title}
          </h3>

          {/* ── Description ── */}
          <p className="text-sm text-[#b89d9f] leading-relaxed line-clamp-2 mb-5 flex-1">
            {module.description}
          </p>

          {/* ── Progress + CTA ── */}
          {!isLocked && (
            <div className="mt-auto space-y-3.5">
              {/* Progress row */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#b89d9f]">
                    <Clock size={11} className={isComplete ? 'text-emerald-400' : 'text-[#ea2a33]'} />
                    <span>{completedLessons}/{totalLessons} lessons</span>
                  </div>
                  <span className={`text-[11px] font-black ${isComplete ? 'text-emerald-400' : 'text-white'}`}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <ProgressBar progress={progress} height="sm" variant={isComplete ? 'success' : 'default'} />
              </div>

              {/* CTA button */}
              <Link
                href={`/learn/asap/modules/${module.id}`}
                className={`
                  flex items-center gap-2 w-full px-5 py-3 rounded-xl
                  text-[11px] font-black uppercase tracking-widest
                  transition-all duration-200 active:scale-[0.98]
                  ${isInProgress
                    ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white hover:shadow-lg hover:shadow-[#CC2630]/30'
                    : isComplete
                      ? 'bg-emerald-900/30 border border-emerald-700/40 text-emerald-400 hover:bg-emerald-900/50'
                      : 'bg-[#2d2222] border border-[#382929] text-white hover:border-[#ea2a33]/40 hover:bg-[#CC2630]/8 hover:text-[#EEB7BA]'
                  }
                `}
              >
                {isInProgress ? (
                  <>
                    <PlayCircle size={15} />
                    Continue
                    <ArrowRight size={13} className="ml-auto opacity-70 group-hover:translate-x-0.5 transition-transform" />
                  </>
                ) : isComplete ? (
                  <>
                    <CheckCircle size={15} />
                    Review Module
                  </>
                ) : (
                  <>
                    <PlayCircle size={15} />
                    Start Module
                    <ArrowRight size={13} className="ml-auto opacity-50" />
                  </>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}