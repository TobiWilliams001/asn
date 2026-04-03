'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Target, FileText, Loader2 } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { getUserProgress } from '@/services/progressService';
import { getModule } from '@/services/moduleService';
import ProgressBar from '@/components/modules/ProgressBar';
import LessonCard from '@/components/modules/LessonCard';
import type { Module } from '@/services/moduleService';
import type { UserProgress } from '@/services/progressService';

export default function ModuleDetailPage({ params }: { params: Promise<{ moduleId: string }> }) {
  const router = useRouter();
  const { moduleId } = use(params);
  const { user } = useAuthContext();

  const [module, setModule] = useState<Module | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      fetchData();
    }
  }, [user, moduleId]);

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

      setModule(moduleData);
      setProgress(progressData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
        <div className="text-center">
          <BookOpen size={48} className="text-[#382929] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Module not found</h2>
          <Link
            href="/learn/asap/modules"
            className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold"
          >
            Back to Modules
          </Link>
        </div>
      </div>
    );
  }

  const moduleProgress = progress?.modules[moduleId];
  const completedLessons = moduleProgress?.completedLessons || [];
  const progressPercent = moduleProgress?.progress || 0;
  const totalLessons = module.lessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Header */}
      <div className="border-b border-[#382929] bg-gradient-to-r from-[#181111] to-[#0f0909]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/learn/asap/modules"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to All Modules
          </Link>

          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#CC2630] to-[#ea2a33] flex items-center justify-center flex-shrink-0">
              <BookOpen size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1a1314] text-[#b89d9f]">
                  {module.weekRange}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                {module.title}
              </h1>
              <p className="text-[#b89d9f] text-lg">
                {module.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <div className="bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Your Progress</h2>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{progressPercent}%</p>
                  <p className="text-xs text-[#b89d9f]">{completedLessons.length}/{totalLessons} Lessons</p>
                </div>
              </div>
              <ProgressBar progress={progressPercent} />
            </div>

            {/* Lessons */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Module Content</h2>
              <div className="space-y-4">
                {module.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isUnlocked = index === 0 || completedLessons.includes(module.lessons[index - 1].id);

                  return (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      moduleId={moduleId}
                      isCompleted={isCompleted}
                      isUnlocked={isUnlocked}
                      lessonNumber={index + 1}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Learning Objectives */}
            <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/10 flex items-center justify-center">
                  <Target size={20} className="text-[#ea2a33]" />
                </div>
                <h3 className="text-lg font-bold text-white">Learning Objectives</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#b89d9f]">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Build foundational skills for professional success</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Apply concepts through hands-on practice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>Develop industry-relevant competencies</span>
                </li>
              </ul>
            </div>

            {/* Module Info */}
            <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock size={20} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Module Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#b89d9f]">Duration</span>
                  <span className="text-white font-semibold">{module.weekRange}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#b89d9f]">Lessons</span>
                  <span className="text-white font-semibold">{totalLessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#b89d9f]">Format</span>
                  <span className="text-white font-semibold">Self-paced</span>
                </div>
              </div>
            </div>

            {/* Deliverable (if exists) */}
            <div className="bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <FileText size={20} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Module Deliverable</h3>
              </div>
              <p className="text-sm text-[#b89d9f] mb-4">
                Complete all lessons and submit your deliverable to unlock the next module.
              </p>
              {progressPercent === 100 && (
                <button className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all">
                  Submit Deliverable
                </button>
              )}
              {progressPercent < 100 && (
                <div className="px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-center">
                  <p className="text-xs text-[#b89d9f]">Complete all lessons first</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}