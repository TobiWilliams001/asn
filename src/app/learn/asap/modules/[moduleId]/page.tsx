'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

const MODULE_CONTENT: Record<
  number,
  {
    title: string;
    weekRange: string;
    description: string;
    lessons: { id: number; title: string; duration: string; type: string; completed: boolean }[];
  }
> = {
  1: {
    title: 'Career Mapping & Personal Branding',
    weekRange: 'Weeks 1-2',
    description:
      'Build clarity around your professional identity and craft a personal brand that opens doors globally.',
    lessons: [
      { id: 1, title: 'Understanding Your Strengths', duration: '25 min', type: 'video', completed: true },
      { id: 2, title: 'Career Trajectory Planning', duration: '30 min', type: 'reading', completed: true },
      { id: 3, title: 'Building Your Personal Brand', duration: '20 min', type: 'video', completed: true },
      { id: 4, title: 'LinkedIn Optimization Workshop', duration: '35 min', type: 'interactive', completed: true },
      { id: 5, title: 'Portfolio Development Guide', duration: '40 min', type: 'reading', completed: true },
    ],
  },
  2: {
    title: 'Corporate Awareness & Professional Etiquette',
    weekRange: 'Weeks 3-4',
    description:
      'Master the unwritten rules of corporate environments and professional communication.',
    lessons: [
      { id: 1, title: 'Corporate Culture 101', duration: '20 min', type: 'video', completed: true },
      { id: 2, title: 'Business Communication Mastery', duration: '30 min', type: 'reading', completed: true },
      { id: 3, title: 'Professional Networking Strategies', duration: '25 min', type: 'video', completed: true },
      { id: 4, title: 'Email & Meeting Etiquette', duration: '15 min', type: 'interactive', completed: false },
    ],
  },
  3: {
    title: 'Design Thinking & Problem Solving',
    weekRange: 'Weeks 5-7',
    description:
      'Apply human-centered design methodologies to create innovative solutions for real problems.',
    lessons: [
      { id: 1, title: 'Introduction to Design Thinking', duration: '30 min', type: 'video', completed: false },
      { id: 2, title: 'Empathy Mapping Workshop', duration: '35 min', type: 'interactive', completed: false },
      { id: 3, title: 'Ideation Techniques', duration: '25 min', type: 'reading', completed: false },
      { id: 4, title: 'Prototyping & Testing', duration: '40 min', type: 'video', completed: false },
    ],
  },
  4: {
    title: 'Leadership & Influence',
    weekRange: 'Weeks 8-10',
    description:
      'Develop the mindset, skills, and emotional intelligence to lead with authenticity and impact.',
    lessons: [
      { id: 1, title: 'Authentic Leadership', duration: '25 min', type: 'video', completed: false },
      { id: 2, title: 'Emotional Intelligence Essentials', duration: '30 min', type: 'reading', completed: false },
      { id: 3, title: 'Team Building & Delegation', duration: '20 min', type: 'interactive', completed: false },
      { id: 4, title: 'Conflict Resolution & Negotiation', duration: '25 min', type: 'video', completed: false },
    ],
  },
  5: {
    title: 'Action Planning & Execution',
    weekRange: 'Weeks 11-12',
    description:
      'Turn your vision into reality with structured planning, accountability, and execution strategies.',
    lessons: [
      { id: 1, title: 'Setting OKRs', duration: '20 min', type: 'video', completed: false },
      { id: 2, title: 'Building Your Action Plan', duration: '35 min', type: 'interactive', completed: false },
      { id: 3, title: 'Accountability Systems', duration: '15 min', type: 'reading', completed: false },
      { id: 4, title: 'Final Pitch Preparation & Delivery', duration: '40 min', type: 'interactive', completed: false },
    ],
  },
};

const TYPE_CONFIG: Record<string, { icon: string; color: string }> = {
  video: { icon: '▶', color: 'text-blue-400 bg-blue-500/15' },
  reading: { icon: '☰', color: 'text-amber-400 bg-amber-500/15' },
  interactive: { icon: '⚡', color: 'text-purple-400 bg-purple-500/15' },
};

function ModuleContent() {
  const params = useParams();
  const router = useRouter();
  const moduleId = Number(params.moduleId);
  const mod = MODULE_CONTENT[moduleId];
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  if (!mod) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
          <p className="text-[#b89d9f] mb-6">
            This module doesn&apos;t exist or hasn&apos;t been created yet.
          </p>
          <button
            onClick={() => router.push('/learn/dashboard')}
            className="text-[#ea2a33] font-semibold hover:text-white transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completedCount = mod.lessons.filter((l) => l.completed).length;
  const progress = Math.round((completedCount / mod.lessons.length) * 100);
  const selectedLesson = mod.lessons.find((l) => l.id === activeLesson);

  return (
    <div className="min-h-screen text-white">
      {/* Module Header */}
      <div className="bg-gradient-to-b from-[#261c1c] to-[#181111] border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
          <Link
            href="/learn/dashboard"
            className="inline-flex items-center gap-1 text-[#b89d9f] hover:text-white text-sm transition-colors mb-4"
          >
            <span>&#8592;</span> Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ea2a33] bg-[#ea2a33]/10 px-3 py-1 rounded-full">
                  Module {moduleId}
                </span>
                <span className="text-xs text-[#b89d9f]">{mod.weekRange}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{mod.title}</h1>
              <p className="text-[#b89d9f] text-sm max-w-xl">{mod.description}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <p className="text-sm font-bold">
                  {completedCount}/{mod.lessons.length} lessons
                </p>
                <p className="text-xs text-[#b89d9f]">{progress}% complete</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ea2a33"
                    strokeWidth="3"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lesson Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#EEB7BA] mb-4">
              Lessons
            </h3>
            <div className="space-y-2">
              {mod.lessons.map((lesson) => {
                const typeStyle = TYPE_CONFIG[lesson.type] || {
                  icon: '●',
                  color: 'text-white bg-white/10',
                };
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      activeLesson === lesson.id
                        ? 'bg-[#ea2a33]/10 border border-[#ea2a33]/20'
                        : 'bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                          lesson.completed ? 'bg-green-500/15 text-green-400' : typeStyle.color
                        }`}
                      >
                        {lesson.completed ? '✓' : typeStyle.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-semibold text-sm leading-snug ${
                            lesson.completed ? 'text-[#b89d9f]' : 'text-white'
                          }`}
                        >
                          {lesson.title}
                        </p>
                        <p className="text-xs text-[#b89d9f] mt-1">
                          {lesson.duration} &middot; {lesson.type}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Viewer */}
          <div className="lg:col-span-8 xl:col-span-9">
            {selectedLesson ? (
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl overflow-hidden">
                {/* Lesson Header */}
                <div className="p-6 md:p-8 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                        TYPE_CONFIG[selectedLesson.type]?.color || 'bg-white/10'
                      }`}
                    >
                      {TYPE_CONFIG[selectedLesson.type]?.icon || '●'}
                    </span>
                    <span className="text-xs text-[#b89d9f] uppercase tracking-wider font-medium">
                      {selectedLesson.type} &middot; {selectedLesson.duration}
                    </span>
                    {selectedLesson.completed && (
                      <span className="text-xs font-bold text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{selectedLesson.title}</h2>
                </div>

                {/* Content Placeholder */}
                <div className="p-8 md:p-12">
                  <div className="bg-white/[0.03] rounded-xl p-10 text-center border border-dashed border-white/[0.06]">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">
                        {TYPE_CONFIG[selectedLesson.type]?.icon || '●'}
                      </span>
                    </div>
                    <p className="text-[#b89d9f] mb-2">
                      Lesson content will appear here when the full curriculum is loaded.
                    </p>
                    <p className="text-[#b89d9f]/60 text-sm">
                      This is a placeholder for {selectedLesson.type} content.
                    </p>
                  </div>
                </div>

                {/* Lesson Navigation */}
                <div className="p-6 border-t border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={() => {
                      const prevId = selectedLesson.id - 1;
                      if (prevId >= 1) setActiveLesson(prevId);
                    }}
                    disabled={selectedLesson.id === 1}
                    className="text-sm text-[#b89d9f] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    &#8592; Previous Lesson
                  </button>
                  {!selectedLesson.completed && (
                    <button className="bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-all">
                      Mark Complete
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const nextId = selectedLesson.id + 1;
                      if (nextId <= mod.lessons.length) setActiveLesson(nextId);
                    }}
                    disabled={selectedLesson.id === mod.lessons.length}
                    className="text-sm text-[#b89d9f] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Next Lesson &#8594;
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-[#b89d9f]">&#9654;</span>
                </div>
                <p className="text-[#b89d9f] text-lg mb-1">Select a lesson to begin</p>
                <p className="text-[#b89d9f]/60 text-sm">
                  Choose from the lesson list on the left to start learning
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ModulePage() {
  return (
    <ProtectedRoute>
      <ModuleContent />
    </ProtectedRoute>
  );
}