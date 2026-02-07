'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  MapPin,
  BookOpen,
  Award,
  Clock,
  Edit2,
  ChevronRight,
  GraduationCap,
  Target,
  Calendar
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';

const mockStats = {
  modulesCompleted: 1,
  totalModules: 5,
  lessonsCompleted: 12,
  totalLessons: 45,
  hoursLearned: 8,
  certificatesEarned: 0,
  streak: 5,
};

const mockAchievements = [
  { id: 1, title: "First Step", description: "Completed your first lesson", earned: true, date: "2024-01-16" },
  { id: 2, title: "Module Master", description: "Completed Module 1", earned: true, date: "2024-01-28" },
  { id: 3, title: "Week Warrior", description: "7-day learning streak", earned: false, date: null },
  { id: 4, title: "Halfway Hero", description: "Complete 50% of ASAP", earned: false, date: null },
  { id: 5, title: "ASAP Graduate", description: "Complete the entire program", earned: false, date: null },
];

const mockCurrentModule = {
  id: "module-2",
  title: "Corporate Awareness",
  progress: 25,
};

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const { user, userProfile } = useAuthContext();

  const fullName = userProfile?.fullName || user?.displayName || 'User';
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
  const email = userProfile?.email || user?.email || '';
  const country = userProfile?.country || '';
  const currentStatus = userProfile?.currentStatus?.replace('_', ' ') || '';
  const institution = userProfile?.institution || '';
  const role = userProfile?.role || 'free';
  const bio = userProfile?.bio || 'Aspiring professional passionate about growth and learning through the ASAP program.';

  const progressPercentage = Math.round((mockStats.modulesCompleted / mockStats.totalModules) * 100);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#181111] to-[#261c1c] border-b border-[#3d2c2c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Avatar */}
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ea2a33] to-[#b91c1c] flex items-center justify-center text-white text-xl sm:text-3xl font-bold shadow-lg flex-shrink-0">
              {initials}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">
                  {fullName}
                </h1>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-shrink-0" data-testid="button-edit-profile">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {/* About / Bio */}
              <p className="text-gray-400 mb-3 text-sm sm:text-base leading-relaxed">
                {bio}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                {institution && (
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" />
                    {institution}
                  </span>
                )}
                {country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {country}
                  </span>
                )}
                {currentStatus && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="capitalize">{currentStatus}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#ea2a33]">{mockStats.streak}</div>
                <div className="text-xs text-gray-400">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{progressPercentage}%</div>
                <div className="text-xs text-gray-400">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Left Column - Profile Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info Card */}
            <div className="bg-[#181111] rounded-xl p-5 sm:p-6 border border-[#3d2c2c]">
              <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <span className="text-sm break-all">{email}</span>
                </div>
                {country && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm">{country}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Your Info Card */}
            <div className="bg-[#181111] rounded-xl p-5 sm:p-6 border border-[#3d2c2c]">
              <h2 className="text-lg font-semibold text-white mb-4">Your Info</h2>
              <div className="space-y-4">
                {currentStatus && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</div>
                    <div className="text-gray-300 capitalize">{currentStatus}</div>
                  </div>
                )}
                {institution && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Institution/Organization</div>
                    <div className="text-gray-300">{institution}</div>
                  </div>
                )}
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Type</div>
                  <div className="text-gray-300 capitalize">{role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Stats */}
            <div className="bg-[#181111] rounded-xl p-5 sm:p-6 border border-[#3d2c2c]">
              <h2 className="text-lg font-semibold text-white mb-6">Learning Progress</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-[#261c1c] rounded-lg p-3 sm:p-4 text-center">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea2a33] mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">{mockStats.modulesCompleted}/{mockStats.totalModules}</div>
                  <div className="text-xs text-gray-400">Modules</div>
                </div>
                <div className="bg-[#261c1c] rounded-lg p-3 sm:p-4 text-center">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea2a33] mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">{mockStats.lessonsCompleted}/{mockStats.totalLessons}</div>
                  <div className="text-xs text-gray-400">Lessons</div>
                </div>
                <div className="bg-[#261c1c] rounded-lg p-3 sm:p-4 text-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea2a33] mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">{mockStats.hoursLearned}</div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="bg-[#261c1c] rounded-lg p-3 sm:p-4 text-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea2a33] mx-auto mb-2" />
                  <div className="text-lg sm:text-2xl font-bold text-white">{mockStats.certificatesEarned}</div>
                  <div className="text-xs text-gray-400">Certificates</div>
                </div>
              </div>

              {/* Overall Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Overall ASAP Progress</span>
                  <span className="text-white font-medium">{progressPercentage}%</span>
                </div>
                <div className="h-3 bg-[#261c1c] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ea2a33] to-[#f87171] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Current Module */}
            <div className="bg-[#181111] rounded-xl p-5 sm:p-6 border border-[#3d2c2c]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
                <Link
                  href="/learn/asap/modules"
                  className="text-[#ea2a33] text-sm hover:underline"
                  data-testid="link-view-all-modules"
                >
                  View All Modules
                </Link>
              </div>
              <Link
                href={`/learn/asap/modules/${mockCurrentModule.id}`}
                className="block bg-[#261c1c] rounded-lg p-4 hover:bg-[#3d2c2c] transition-colors group"
                data-testid="link-current-module"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium mb-1">{mockCurrentModule.title}</div>
                    <div className="text-sm text-gray-400">Module 2 of 5</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[#ea2a33] font-medium">{mockCurrentModule.progress}%</div>
                      <div className="text-xs text-gray-400">Complete</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="mt-3 h-2 bg-[#181111] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ea2a33] rounded-full"
                    style={{ width: `${mockCurrentModule.progress}%` }}
                  />
                </div>
              </Link>
            </div>

            {/* Achievements */}
            <div className="bg-[#181111] rounded-xl p-5 sm:p-6 border border-[#3d2c2c]">
              <h2 className="text-lg font-semibold text-white mb-6">Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border ${
                      achievement.earned
                        ? 'bg-[#261c1c] border-[#ea2a33]/30'
                        : 'bg-[#1a1a1a] border-[#2a2a2a] opacity-50'
                    }`}
                    data-testid={`achievement-${achievement.id}`}
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-[#ea2a33] to-[#b91c1c]'
                        : 'bg-[#2a2a2a]'
                    }`}>
                      <Award className={`w-5 h-5 sm:w-6 sm:h-6 ${achievement.earned ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm sm:text-base ${achievement.earned ? 'text-white' : 'text-gray-500'}`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                      {achievement.earned && achievement.date && (
                        <div className="text-xs text-[#ea2a33] mt-1">
                          Earned {new Date(achievement.date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}