'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Lock, CheckCircle, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { getUserProgress } from '@/services/progressService';
import { getAllModules } from '@/services/moduleService';
import ProgressBar from '@/components/modules/ProgressBar';
import ModuleCard from '@/components/modules/ModuleCard';
import type { Module } from '@/services/moduleService';
import type { UserProgress } from '@/services/progressService';

export default function ModulesPage() {
  const { user, userProfile } = useAuthContext();
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    try {
      const [modulesData, progressData] = await Promise.all([
        getAllModules(),
        getUserProgress(user!.uid)
      ]);
      
      setModules(modulesData.filter(m => m.published)); // Only show published modules
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading your modules...</p>
        </div>
      </div>
    );
  }

  const overallProgress = progress?.overallProgress || 0;
  const completedCount = modules.filter(m => progress?.modules[m.id]?.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Hero Section */}
      <div className="border-b border-[#382929] bg-gradient-to-r from-[#181111] to-[#0f0909]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fade-in">
              Your Learning Journey
            </h1>
            <p className="text-lg text-[#b89d9f] animate-fade-in" style={{ animationDelay: '100ms' }}>
              Master the skills needed to accelerate your career in Africa's top companies.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">Overall Progress</p>
                <p className="text-4xl font-black text-white">{overallProgress}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-2">Modules Completed</p>
                <p className="text-4xl font-black text-white">{completedCount}/{modules.length}</p>
              </div>
            </div>
            <ProgressBar progress={overallProgress} />
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-[#ea2a33]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Stay on Track</h3>
            <p className="text-sm text-[#b89d9f]">
              Complete modules sequentially to unlock new content and build on your skills.
            </p>
          </div>

          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Learn Together</h3>
            <p className="text-sm text-[#b89d9f]">
              Join discussions and collaborate with fellow ASAP participants.
            </p>
          </div>

          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
              <CheckCircle size={24} className="text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Earn Certificate</h3>
            <p className="text-sm text-[#b89d9f]">
              Complete all modules to receive your ASAP program certificate.
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-black text-white mb-6">Program Modules</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module, index) => {
              const moduleProgress = progress?.modules[module.id];
              const status = moduleProgress?.status || 'locked';
              const progressPercent = moduleProgress?.progress || 0;
              const completedLessons = moduleProgress?.completedLessons?.length || 0;

              return (
                <ModuleCard
                  key={module.id}
                  module={{
                    ...module,
                    locked: (moduleProgress?.status || 'locked') === 'locked',
                    progress: progressPercent,
                    completedLessons
                  }}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}