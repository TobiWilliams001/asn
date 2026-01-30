// src/app/learn/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { MOCK_USER, MOCK_ENROLLMENT, MOCK_PROGRESS } from '@/lib/mockData/user';
import { MOCK_MODULES } from '@/lib/mockData/modules';
import { User, Enrollment, Progress, Module } from '@/types/learn';

export default function DashboardPage() {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(MOCK_ENROLLMENT);
  const [progress, setProgress] = useState<Progress[]>(MOCK_PROGRESS);
  const [modules, setModules] = useState<Module[]>(MOCK_MODULES);

  // Calculate stats
  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const modulesCompleted = modules.filter(m => {
    const moduleProgress = progress.filter(p => p.moduleId === m.id && p.completed);
    return moduleProgress.length === m.lessons.length && m.lessons.length > 0;
  }).length;

  return (
    <div className="min-h-screen bg-[#181111] text-white">
      <header className="border-b border-[#382929] px-10 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">ASN Learning Platform</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#b89d9f]">{user.displayName}</span>
            <div 
              className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-[#382929]"
              style={{ backgroundImage: `url(${user.photoURL})` }}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user.displayName.split(' ')[0]}!</h2>
          <p className="text-[#b89d9f]">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6">
            <p className="text-xs text-[#b89d9f] uppercase font-bold mb-2">Modules Completed</p>
            <p className="text-4xl font-black">{modulesCompleted}/{modules.length}</p>
          </div>
          
          <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6">
            <p className="text-xs text-[#b89d9f] uppercase font-bold mb-2">Lessons Completed</p>
            <p className="text-4xl font-black">{completedLessons}/{totalLessons}</p>
          </div>

          <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6">
            <p className="text-xs text-[#b89d9f] uppercase font-bold mb-2">Overall Progress</p>
            <p className="text-4xl font-black">{enrollment?.overallProgress || 0}%</p>
          </div>
        </div>

        {enrollment ? (
          <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">ASAP Program</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-bold">
                 Enrolled
              </span>
              <span className="text-[#b89d9f] text-sm">
                Since {enrollment.enrolledAt.toLocaleDateString()}
              </span>
            </div>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span className="font-bold">{enrollment.overallProgress}%</span>
              </div>
              <div className="w-full bg-[#382929] h-2 rounded-full">
                <div 
                  className="bg-[#ea2a33] h-full rounded-full transition-all duration-500"
                  style={{ width: `${enrollment.overallProgress}%` }}
                />
              </div>
            </div>
            <a 
              href="/learn/asap/modules"
              className="inline-block px-6 py-3 bg-[#ea2a33] hover:bg-[#c41f27] text-white font-bold rounded-lg transition-colors"
            >
              Continue Learning
            </a>
          </div>
        ) : (
          <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-8 mb-6">
            <h3 className="text-2xl font-bold mb-4">ASAP Program</h3>
            <p className="text-[#b89d9f] mb-6">You are not enrolled in any program yet.</p>
            <a 
              href="/learn/asap"
              className="inline-block px-6 py-3 bg-[#ea2a33] hover:bg-[#c41f27] text-white font-bold rounded-lg transition-colors"
            >
              Explore ASAP Program
            </a>
          </div>
        )}

        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-8">
          <h3 className="text-xl font-bold mb-6">Your Modules</h3>
          <div className="space-y-4">
            {modules.map(module => {
              const moduleProgress = progress.filter(p => p.moduleId === module.id && p.completed);
              const completionRate = module.lessons.length > 0 
                ? Math.round((moduleProgress.length / module.lessons.length) * 100)
                : 0;
              
              return (
                <div key={module.id} className="border border-[#382929] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{module.title}</h4>
                      <p className="text-sm text-[#b89d9f]">{module.weekRange}</p>
                    </div>
                    <span className="text-sm font-bold">{completionRate}%</span>
                  </div>
                  <div className="w-full bg-[#382929] h-1.5 rounded-full">
                    <div 
                      className="bg-[#ea2a33] h-full rounded-full"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
