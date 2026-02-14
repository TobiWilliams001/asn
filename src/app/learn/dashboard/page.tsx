'use client';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
const MOCK_PROGRESS = [
  { moduleId: 1, title: 'Career Mapping & Personal Branding', progress: 100, status: 'completed', lessonsCompleted: 5, totalLessons: 5 },
  { moduleId: 2, title: 'Corporate Awareness & Professional Etiquette', progress: 65, status: 'in-progress', lessonsCompleted: 3, totalLessons: 4 },
  { moduleId: 3, title: 'Design Thinking & Problem Solving', progress: 0, status: 'locked', lessonsCompleted: 0, totalLessons: 4 },
  { moduleId: 4, title: 'Leadership & Influence', progress: 0, status: 'locked', lessonsCompleted: 0, totalLessons: 4 },
  { moduleId: 5, title: 'Action Planning & Execution', progress: 0, status: 'locked', lessonsCompleted: 0, totalLessons: 4 },
];
const ACHIEVEMENTS = [
  { id: 1, title: 'First Login', description: 'Started your learning journey', earned: true, icon: '&#9733;' },
  { id: 2, title: 'Module Master', description: 'Completed your first module', earned: true, icon: '&#9878;' },
  { id: 3, title: 'Quick Learner', description: 'Complete 3 lessons in one day', earned: false, icon: '&#9889;' },
  { id: 4, title: 'Halfway There', description: 'Reach 50% overall progress', earned: false, icon: '&#9776;' },
  { id: 5, title: 'Graduate', description: 'Complete all 5 modules', earned: false, icon: '&#127891;' },
];
const RECENT_ACTIVITY = [
  { id: 1, action: 'Completed lesson', detail: 'Professional Networking Strategies', module: 'Module 2', time: '2 hours ago' },
  { id: 2, action: 'Started lesson', detail: 'Email & Meeting Etiquette', module: 'Module 2', time: '3 hours ago' },
  { id: 3, action: 'Completed module', detail: 'Career Mapping & Personal Branding', module: 'Module 1', time: '2 days ago' },
  { id: 4, action: 'Completed lesson', detail: 'Portfolio Development Guide', module: 'Module 1', time: '3 days ago' },
  { id: 5, action: 'Completed lesson', detail: 'LinkedIn Optimization Workshop', module: 'Module 1', time: '4 days ago' },
];
const ANNOUNCEMENTS = [
  { id: 1, title: 'Live Q&A Session This Friday', description: 'Join our panel of industry mentors for a live discussion on career mapping strategies. 6PM WAT.', type: 'event', date: 'Feb 14, 2026' },
  { id: 2, title: 'New Resource Added', description: 'Check out the updated Resume Template Pack in the Resources section.', type: 'update', date: 'Feb 12, 2026' },
  { id: 3, title: 'Cohort 3 Applications Open', description: 'Know someone who would benefit from ASAP? Refer them to our enrollment page.', type: 'announcement', date: 'Feb 10, 2026' },
];
function DashboardContent() {
  const { userProfile } = useAuthContext();
  const overallProgress = Math.round(MOCK_PROGRESS.reduce((acc, m) => acc + m.progress, 0) / MOCK_PROGRESS.length);
  const completedModules = MOCK_PROGRESS.filter(m => m.status === 'completed').length;
  const currentModule = MOCK_PROGRESS.find(m => m.status === 'in-progress');
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {userProfile?.fullName?.split(' ')[0] || 'Student'}
          </h1>
          <p className="text-[#b89d9f]">Track your progress through the ASAP program</p>
        </div>
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[#b89d9f] text-xs font-medium uppercase tracking-wider mb-2">Overall Progress</p>
            <p className="text-3xl font-black text-[#ea2a33]">{overallProgress}%</p>
            <div className="mt-3 h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] rounded-full transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[#b89d9f] text-xs font-medium uppercase tracking-wider mb-2">Modules Completed</p>
            <p className="text-3xl font-black">
              {completedModules}
              <span className="text-lg text-[#b89d9f] font-normal">/{MOCK_PROGRESS.length}</span>
            </p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[#b89d9f] text-xs font-medium uppercase tracking-wider mb-2">Current Module</p>
            <p className="text-base font-bold leading-snug">{currentModule?.title || 'None'}</p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[#b89d9f] text-xs font-medium uppercase tracking-wider mb-2">Learning Streak</p>
            <p className="text-3xl font-black">
              5 <span className="text-lg text-[#b89d9f] font-normal">days</span>
            </p>
          </div>
        </div>
        {/* Main Grid: Left = Modules + Activity, Right = Achievements + Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Module Progress */}
            <div>
              <h2 className="text-xl font-bold mb-2">Your Modules</h2>
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-5" />
              <div className="space-y-3">
                {MOCK_PROGRESS.map((mod) => (
                  <div
                    key={mod.moduleId}
                    className={`bg-white/[0.04] border border-white/[0.06] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-all ${
                      mod.status === 'locked' ? 'opacity-40' : 'hover:border-white/[0.1]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        mod.status === 'completed'
                          ? 'bg-green-500/15 text-green-400'
                          : mod.status === 'in-progress'
                          ? 'bg-[#ea2a33]/15 text-[#ea2a33]'
                          : 'bg-white/[0.06] text-[#b89d9f]'
                      }`}
                    >
                      {mod.status === 'completed' ? '✓' : mod.moduleId}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-sm truncate">{mod.title}</h3>
                        {mod.status === 'in-progress' && (
                          <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-[#ea2a33] bg-[#ea2a33]/10 px-2 py-0.5 rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] rounded-full transition-all"
                            style={{ width: `${mod.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-[#b89d9f] flex-shrink-0 w-16 text-right">
                          {mod.lessonsCompleted}/{mod.totalLessons} lessons
                        </span>
                      </div>
                    </div>
                    {mod.status !== 'locked' && (
                      <Link
                        href={`/learn/modules/${mod.moduleId}`}
                        className="text-sm font-semibold text-[#ea2a33] hover:text-white transition-colors flex-shrink-0"
                      >
                        {mod.status === 'completed' ? 'Review' : 'Continue'}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-5" />
              <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl divide-y divide-white/[0.04]">
                {RECENT_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="px-5 py-4 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#ea2a33] mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="text-[#EEB7BA] font-medium">{activity.action}:</span>{' '}
                        <span className="text-white">{activity.detail}</span>
                      </p>
                      <p className="text-xs text-[#b89d9f] mt-0.5">
                        {activity.module} &middot; {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="space-y-8">
            {/* Achievements */}
            <div>
              <h2 className="text-xl font-bold mb-2">Achievements</h2>
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-5" />
              <div className="space-y-3">
                {ACHIEVEMENTS.map((ach) => (
                  <div
                    key={ach.id}
                    className={`bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 flex items-center gap-3 ${
                      !ach.earned ? 'opacity-40' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${
                        ach.earned ? 'bg-[#ea2a33]/15' : 'bg-white/[0.04]'
                      }`}
                    >
                      <span dangerouslySetInnerHTML={{ __html: ach.icon }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm">{ach.title}</p>
                      <p className="text-[#b89d9f] text-xs">{ach.description}</p>
                    </div>
                    {ach.earned && (
                      <span className="text-green-400 text-xs flex-shrink-0 font-medium">Earned</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Announcements */}
            <div>
              <h2 className="text-xl font-bold mb-2">Announcements</h2>
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-5" />
              <div className="space-y-3">
                {ANNOUNCEMENTS.map((ann) => (
                  <div key={ann.id} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          ann.type === 'event'
                            ? 'bg-blue-500/15 text-blue-400'
                            : ann.type === 'update'
                            ? 'bg-green-500/15 text-green-400'
                            : 'bg-[#ea2a33]/15 text-[#ea2a33]'
                        }`}
                      >
                        {ann.type}
                      </span>
                      <span className="text-[#b89d9f] text-xs">{ann.date}</span>
                    </div>
                    <h4 className="font-bold text-sm mb-1">{ann.title}</h4>
                    <p className="text-[#b89d9f] text-xs leading-relaxed">{ann.description}</p>
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
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}