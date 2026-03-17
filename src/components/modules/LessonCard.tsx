import Link from 'next/link';
import { PlayCircle, CheckCircle, Clock, Lock } from 'lucide-react';
import { Lesson } from '@/types/learn';

interface LessonCardProps {
  lesson: Lesson;
  moduleId: string;
  isLocked?: boolean;
  index: number;
  isNext?: boolean; // highlights the next lesson to complete
}

export default function LessonCard({
  lesson,
  moduleId,
  isLocked = false,
  index,
  isNext = false,
}: LessonCardProps) {
  const isCompleted = lesson.completed || false;

  const content = (
    <div
      className={`
        group flex items-center gap-4 px-4 py-3.5 rounded-xl border
        transition-all duration-200 relative overflow-hidden
        ${isLocked
          ? 'bg-[#1e1515] border-[#2d2222] opacity-35 cursor-not-allowed'
          : isCompleted
            ? 'bg-[#1e2b1e] border-emerald-900/50 hover:border-emerald-700/50'
            : isNext
              ? 'bg-[#2d1e1e] border-[#CC2630]/30 hover:border-[#ea2a33]/50 hover:bg-[#311f1f]'
              : 'bg-[#261c1c] border-[#382929] hover:border-[#533c3d] hover:bg-[#2d2222]'
        }
      `}
    >
      {/* "Next" left-border glow */}
      {isNext && !isCompleted && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#CC2630] to-[#ea2a33] rounded-l-xl" />
      )}

      {/* Completed: subtle left stripe */}
      {isCompleted && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500/60 rounded-l-xl" />
      )}

      {/* Step icon */}
      <div className={`
        shrink-0 w-9 h-9 rounded-xl flex items-center justify-center
        transition-all duration-200
        ${isLocked
          ? 'bg-[#2d2222] text-[#b89d9f]/30'
          : isCompleted
            ? 'bg-emerald-900/40 text-emerald-400 group-hover:scale-105'
            : isNext
              ? 'bg-[#CC2630]/20 text-[#ea2a33] group-hover:bg-[#CC2630]/30 group-hover:scale-105'
              : 'bg-[#2d2222] text-[#b89d9f] group-hover:bg-[#CC2630]/15 group-hover:text-[#ea2a33] group-hover:scale-105'
        }
      `}>
        {isLocked
          ? <Lock size={14} />
          : isCompleted
            ? <CheckCircle size={17} />
            : <span className="text-[12px] font-black">{String(index + 1).padStart(2, '0')}</span>
        }
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <h4 className={`
          font-bold text-sm leading-snug transition-colors duration-150
          ${isCompleted
            ? 'text-emerald-300/80'
            : isNext
              ? 'text-white'
              : 'text-white group-hover:text-[#EEB7BA]'
          }
        `}>
          {lesson.title}
        </h4>
        <p className="text-[11px] text-[#b89d9f]/60 truncate mt-0.5">
          {lesson.description}
        </p>
      </div>

      {/* Right: duration + play button */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="flex items-center gap-1 text-[11px] text-[#b89d9f]/40 font-medium">
          <Clock size={10} />
          <span>{lesson.duration}m</span>
        </div>

        {!isLocked && (
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200
            ${isCompleted
              ? 'bg-emerald-900/50 text-emerald-400/70'
              : isNext
                ? 'bg-[#CC2630] text-white shadow-md shadow-[#CC2630]/30 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#CC2630]/40'
                : 'bg-[#2d2222] border border-[#382929] text-[#b89d9f]/50 group-hover:bg-[#CC2630] group-hover:border-[#CC2630] group-hover:text-white group-hover:scale-110'
            }
          `}>
            {isCompleted
              ? <CheckCircle size={14} />
              : <PlayCircle size={14} className="ml-0.5" />
            }
          </div>
        )}
      </div>
    </div>
  );

  if (isLocked) return <div>{content}</div>;

  return (
    <Link
      href={`/learn/asap/modules/${moduleId}/lessons/${lesson.id}`}
      className="block"
    >
      {content}
    </Link>
  );
}