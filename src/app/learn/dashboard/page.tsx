'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { getUserProgress } from '@/services/progressService';
import { getAllModules } from '@/services/moduleService';
import type { UserProgress } from '@/services/progressService';
import type { Module } from '@/services/moduleService';
import { getAnnouncements } from '@/services/announcementService';
import type { Announcement } from '@/services/announcementService';
import {
  BookOpen,
  FolderOpen,
  Users,
  Lightbulb,
  ArrowRight,
  User,
  ChevronRight,
  Megaphone,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeatureCard {
  label: string;
  description: string;
  icon: React.ElementType;
  href: string;
  comingSoon: boolean;
  accent: string;
}

// Types moved to announcementService.ts

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES: FeatureCard[] = [
  {
    label: 'ASAP Program',
    description: '12-week intensive career accelerator for ambitious African students.',
    icon: BookOpen,
    href: '/learn',
    comingSoon: false,
    accent: '#ea2a33',
  },
  {
    label: 'Resource Hub',
    description: 'Curated templates, guides, and toolkits to power your career.',
    icon: FolderOpen,
    href: '/learn/resources',
    comingSoon: false,
    accent: '#ea2a33',
  },
  {
    label: 'Community',
    description: 'Connect with 1,200+ peers across 50+ African universities.',
    icon: Users,
    href: '/learn/coming-soon?feature=community',
    comingSoon: true,
    accent: '#ea2a33',
  },
  {
    label: 'Mentorship',
    description: '1-on-1 guidance from professionals at top global companies.',
    icon: Lightbulb,
    href: '/learn/coming-soon?feature=mentorship',
    comingSoon: true,
    accent: '#ea2a33',
  },
];

// Fetched from Firestore now

// ─── Profile Completion Helper ─────────────────────────────────────────────────
function getProfileCompletion(userProfile: any, user: any): { percent: number; missing: string[] } {
  const missing: string[] = [];
  if (!userProfile?.fullName && !user?.displayName) missing.push('Full name');
  if (!userProfile?.bio) missing.push('Bio');
  if (!userProfile?.country) missing.push('Country');
  if (!userProfile?.currentStatus) missing.push('Current status');
  if (!userProfile?.institution) missing.push('Institution');
  const filled = 5 - missing.length;
  return { percent: Math.round((filled / 5) * 100), missing };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ApplicationStatusCard({ status, applicationId }: { status?: string, applicationId?: string }) {
  if (!applicationId || !status) return null;

  const statusConfig: Record<string, any> = {
    pending: {
      icon: Clock,
      label: 'Application Under Review',
      sub: 'Our team is reviewing your application.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    applicant: {
      icon: Clock,
      label: 'Application Under Review',
      sub: 'Our team is reviewing your application.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    },
    accepted: {
      icon: CheckCircle,
      label: 'Accepted — Welcome to ASAP!',
      sub: 'You have full access to the program modules.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    enrolled: {
      icon: CheckCircle,
      label: 'Enrolled — Welcome to ASAP!',
      sub: 'You have full access to the program modules.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    rejected: {
      icon: AlertCircle,
      label: 'Not Selected — Reapply Next Cohort',
      sub: 'You can apply again when the next cohort opens.',
      color: 'text-[#b89d9f]',
      bg: 'bg-white/5'
    }
  };

  const config = statusConfig[status as string] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <div className="mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.bg}`}>
          <Icon className={config.color} size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white">{config.label}</h3>
          <p className="text-sm text-[#b89d9f]">{config.sub}</p>
        </div>
        <Link
          href="/learn/asap/application-status"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-white/10"
        >
          Check Status
        </Link>
      </div>
    </div>
  );
}

function WelcomeBanner({ firstName, status }: { firstName: string, status?: string }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const isEnrolled = status === 'enrolled' || status === 'accepted';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#1f1212] via-[#261818] to-[#1a1010] px-8 py-8 md:py-10">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ea2a33]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-8 left-1/3 h-32 w-32 rounded-full bg-[#ea2a33]/5 blur-2xl" />

      <div className="relative flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-[#b89d9f]">{greeting} ✦</p>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            {firstName}
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-[#b89d9f]">
            {isEnrolled 
              ? "Welcome back! Ready to continue your journey? Dive back into your modules and accelerate your growth."
              : "We're building something powerful for you. Programs, resources, mentors, and community — all coming together in one place."
            }
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          {isEnrolled && (
            <Link
              href="/learn/asap/modules"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] px-5 py-2.5 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[#ea2a33]/20"
            >
              Go to Modules
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileNudge({
  percent,
  missing,
}: {
  percent: number;
  missing: string[];
}) {
  if (percent === 100) return null;

  return (
    <Link
      href="/learn/profile"
      className="group flex items-center gap-4 rounded-2xl border border-[#382929] bg-[#261c1c] px-6 py-4 transition-all hover:border-[#533c3d] hover:bg-[#2d2222]"
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06]">
        <User size={18} className="text-[#b89d9f]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-white">
            Finish setting up your profile{' '}
            <span className="text-[#b89d9f] font-normal">— {percent}% complete</span>
          </p>
          <ChevronRight
            size={16}
            className="flex-shrink-0 text-[#b89d9f] transition-transform group-hover:translate-x-0.5 group-hover:text-white"
          />
        </div>
        {/* Progress bar — red only here, subtle */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
        {missing.length > 0 && (
          <p className="mt-1.5 text-xs text-[#b89d9f]/70">
            Add: {missing.join(' · ')}
          </p>
        )}
      </div>
    </Link>
  );
}

function FeatureGrid({ status }: { status?: string }) {
  const features = FEATURES.map(f => {
    if (f.label === 'ASAP Program' && status === 'enrolled') {
      return { ...f, href: '/learn/asap/modules', description: 'Access your learning modules and track your program progress.' };
    }
    return f;
  });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Explore ASN Learn</h2>
          <p className="text-sm text-[#b89d9f]">Everything you need to grow your career</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.label}
              href={feature.href}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
            >
              {/* Hover accent glow */}
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: feature.accent }}
              />

              <div className="relative">
                {/* Icon + badge row */}
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${feature.accent}20` }}
                  >
                    <Icon size={20} style={{ color: feature.accent }} />
                  </div>

                  {feature.comingSoon && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#b89d9f]">
                      Soon
                    </span>
                  )}
                </div>

                {/* Text */}
                <h3 className="mb-1.5 font-bold text-white transition-colors group-hover:text-white">
                  {feature.label}
                </h3>
                <p className="text-sm leading-relaxed text-[#b89d9f]">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#b89d9f] transition-all group-hover:gap-2 group-hover:text-white">
                  Learn more
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function AnnouncementsPanel() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Megaphone size={16} className="text-[#ea2a33]" />
        <h2 className="text-lg font-bold text-white">Announcements</h2>
      </div>

      <div className="space-y-3">
        {loading ? (
          [1, 2].map(i => (
            <div key={i} className="h-24 bg-white/[0.03] border border-white/[0.06] rounded-2xl animate-pulse" />
          ))
        ) : announcements.length > 0 ? (
          announcements.map((ann) => (
            <div
              key={ann.id}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all hover:border-white/[0.1]"
            >
              <div className="mb-2.5 flex items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${ann.tagColor}`}>
                  {ann.tag}
                </span>
                <span className="text-xs text-[#b89d9f]/60">{ann.date}</span>
              </div>
              <h4 className="mb-1 text-sm font-bold text-white">{ann.title}</h4>
              <p className="text-xs leading-relaxed text-[#b89d9f]">{ann.body}</p>
            </div>
          ))
        ) : (
          <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-dashed border-white/[0.06]">
            <p className="text-xs text-[#b89d9f]/40 uppercase font-black tracking-widest">No Updates</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Program Progress Card (for enrolled students) ─────────────────────────────
function ProgramProgressCard({ userId }: { userId: string }) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const [progressData, modulesData] = await Promise.all([
          getUserProgress(userId),
          getAllModules()
        ]);
        setProgress(progressData);
        setModules(modulesData.filter(m => m.published));
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProgress();
  }, [userId]);

  if (loading || !progress) return null;

  const overallProgress = progress.overallProgress || 0;
  const completedCount = modules.filter(m => progress.modules[m.id]?.status === 'completed').length;
  const activeModule = modules.find(m => progress.modules[m.id]?.status === 'in-progress');

  return (
    <div className="mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ea2a33]/10">
          <TrendingUp className="text-[#ea2a33]" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm">Program Progress</h3>
          <p className="text-xs text-[#b89d9f]">{completedCount}/{modules.length} Modules Completed</p>
        </div>
        <span className="text-2xl font-black text-white">{overallProgress}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06] mb-4">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] transition-all duration-700"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Active module + CTA */}
      {activeModule && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#b89d9f]">
            Currently on: <span className="text-white font-semibold">{activeModule.title}</span>
          </p>
          <Link
            href="/learn/asap/modules"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-white transition-all hover:bg-white/10"
          >
            Continue Learning
            <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────
function DashboardContent() {
  const { user, userProfile } = useAuthContext();

  const fullName = userProfile?.fullName || user?.displayName || '';
  const firstName = fullName
    ? fullName.split(' ')[0]
    : user?.email?.split('@')[0] || 'there';

  const { percent, missing } = getProfileCompletion(userProfile, user);
  const isEnrolled = userProfile?.asapStatus === 'enrolled';

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">

        {/* Welcome Banner */}
        <div className="mb-6">
          <WelcomeBanner firstName={firstName} status={userProfile?.asapStatus} />
        </div>

        {/* Application Status Card */}
        <ApplicationStatusCard
          status={userProfile?.asapStatus}
          applicationId={userProfile?.asapApplicationId}
        />

        {/* Program Progress (for enrolled students) */}
        {isEnrolled && user?.uid && (
          <ProgramProgressCard userId={user.uid} />
        )}

        {/* Profile nudge (hidden when 100%) */}
        <div className="mb-6">
          <ProfileNudge percent={percent} missing={missing} />
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Feature cards (2/3 width) */}
          <div className="lg:col-span-2">
            <FeatureGrid status={userProfile?.asapStatus} />
          </div>

          {/* Right: Announcements (1/3 width) */}
          <div className="lg:col-span-1">
            <AnnouncementsPanel />
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