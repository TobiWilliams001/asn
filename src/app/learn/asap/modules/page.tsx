// src/app/learn/asap/modules/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_MODULES } from '@/lib/mockData/modules';
import { MOCK_PROGRESS, MOCK_ENROLLMENT } from '@/lib/mockData/user';
import { Module, Progress } from '@/types/learn';

export default function ModulesRoadmapPage() {
  const [modules] = useState<Module[]>(MOCK_MODULES);
  const [progress] = useState<Progress[]>(MOCK_PROGRESS);

  // Calculate module completion
  const getModuleCompletion = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module || module.lessons.length === 0) return 0;
    
    const completedLessons = progress.filter(
      p => p.moduleId === moduleId && p.completed
    ).length;
    
    return Math.round((completedLessons / module.lessons.length) * 100);
  };

  // Check if module is unlocked
  const isModuleUnlocked = (order: number) => {
    if (order === 1) return true; // First module always unlocked
    
    const previousModule = modules.find(m => m.order === order - 1);
    if (!previousModule) return false;
    
    return getModuleCompletion(previousModule.id) === 100;
  };

  return (
    <div className="min-h-screen bg-[#181111] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <Link 
            href="/learn/dashboard"
            className="inline-flex items-center text-[#b89d9f] hover:text-white mb-4 text-sm"
          >
             Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black mb-2">ASAP Program Curriculum</h1>
          <p className="text-[#b89d9f]">12-week journey through 5 core modules</p>
        </div>

        {/* Progress Overview */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b89d9f]">
              Program Completion
            </span>
            <span className="text-xs font-bold text-[#ea2a33]">
              {MOCK_ENROLLMENT.overallProgress}%
            </span>
          </div>
          <div className="w-full bg-[#382929] h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#ea2a33] h-full transition-all duration-500"
              style={{ width: `${MOCK_ENROLLMENT.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Module Roadmap */}
        <div className="space-y-1">
          {modules.map((module, index) => {
            const completion = getModuleCompletion(module.id);
            const isUnlocked = isModuleUnlocked(module.order);
            const isCompleted = completion === 100;
            const isCurrent = MOCK_ENROLLMENT.currentModuleId === module.id;

            return (
              <div key={module.id} className="flex flex-col gap-1 pb-4">
                <div className="flex items-start gap-3">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center">
                    <div className={`size-6 rounded-full flex items-center justify-center ${
                      isCompleted 
                        ? 'bg-[#ea2a33]' 
                        : isCurrent 
                        ? 'border-2 border-[#ea2a33]' 
                        : isUnlocked
                        ? 'border-2 border-[#382929]'
                        : 'border-2 border-[#382929] opacity-40'
                    }`}>
                      {isCompleted ? (
                        <span className="text-white text-xs"></span>
                      ) : isCurrent ? (
                        <div className="size-2 rounded-full bg-[#ea2a33]"></div>
                      ) : !isUnlocked ? (
                        <span className="text-white text-xs"></span>
                      ) : null}
                    </div>
                    {index < modules.length - 1 && (
                      <div className={`w-0.5 h-10 ${
                        isCompleted ? 'bg-[#ea2a33]/30' : 'bg-[#382929]'
                      }`}></div>
                    )}
                  </div>

                  {/* Module Content */}
                  <div className={`flex-1 ${!isUnlocked ? 'opacity-40' : ''}`}>
                    <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6 hover:border-[#533c3d] transition-all">
                      <div className="mb-3">
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                          isCurrent ? 'text-[#ea2a33]' : 'text-[#b89d9f]'
                        }`}>
                          {module.weekRange}
                        </p>
                        <h3 className={`text-xl font-bold mb-2 ${
                          isCurrent ? 'text-white' : 'text-white'
                        }`}>
                          {module.title}
                        </h3>
                        <p className="text-sm text-[#b89d9f]">{module.description}</p>
                      </div>

                      {isUnlocked && module.lessons.length > 0 && (
                        <>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-[#b89d9f]">Progress</span>
                            <span className="font-bold">{completion}%</span>
                          </div>
                          <div className="w-full bg-[#382929] h-1.5 rounded-full mb-4">
                            <div 
                              className="bg-[#ea2a33] h-full rounded-full transition-all"
                              style={{ width: `${completion}%` }}
                            />
                          </div>
                          <Link
                            href={`/learn/asap/modules/${module.id}`}
                            className="inline-block px-5 py-2 bg-[#382929] hover:bg-[#4a3636] text-white text-sm font-bold rounded-lg transition-colors"
                          >
                            {completion > 0 ? 'Continue Module' : 'Start Module'}
                          </Link>
                        </>
                      )}

                      {!isUnlocked && (
                        <div className="mt-4 text-sm text-[#b89d9f] italic">
                          Complete previous module to unlock
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
