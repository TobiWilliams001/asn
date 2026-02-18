'use client';

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  BookOpen,
  FolderOpen,
  Users,
  Lightbulb,
  ArrowRight,
  User,
  ChevronRight,
  Megaphone,
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

interface Announcement {
  id: number;
  tag: string;
  tagColor: string;
  title: string;
  body: string;
  date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURES: FeatureCard[] = [
  {
    label: 'ASAP Program',
    description: '12-week intensive career accelerator for ambitious African students.',
    icon: BookOpen,
    href: '/learn/coming-soon?feature=asap',
    comingSoon: true,
    accent: '#ea2a33',
  },
  {
    label: 'Resource Hub',
    description: 'Curated templates, guides, and toolkits to power your career.',
    icon: FolderOpen,
    href: '/learn/coming-soon?feature=resources',
    comingSoon: true,
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

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 2,
    tag: 'Update',
    tagColor: 'bg-white/10 text-white',
    title: 'New Resources Dropping Soon',
    body: 'Resume templates, cover letter guides, and interview prep kits — coming to the Resource Hub.',
    date: 'Feb 12, 2026',
  },
  {
    id: 3,
    tag: 'Cohort',
    tagColor: 'bg-[#ea2a33]/15 text-[#ea2a33]',
    title: 'Cohort 3 Applications Open',
    body: 'Know someone ready to level up? Share the ASAP enrollment link with them.',
    date: 'Feb 10, 2026',
  },
];

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

function WelcomeBanner({ firstName }: { firstName: string }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

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
            We&apos;re building something powerful for you. Programs, resources, mentors, and community — all coming together in one place.
          </p>
        </div>

        <Link
          href="/learn/profile"
          className="mt-4 inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 md:mt-0 md:self-auto"
        >
          View Profile
          <ArrowRight size={15} />
        </Link>
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

function FeatureGrid() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Explore ASN Learn</h2>
          <p className="text-sm text-[#b89d9f]">Everything you need to grow your career — coming soon</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((feature) => {
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
  return (
    <div>
      <div className="mb-5 flex items-center gap-2">
        <Megaphone size={16} className="text-[#ea2a33]" />
        <h2 className="text-lg font-bold text-white">Announcements</h2>
      </div>

      <div className="space-y-3">
        {ANNOUNCEMENTS.map((ann) => (
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
        ))}
      </div>
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

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">

        {/* Welcome Banner */}
        <div className="mb-6">
          <WelcomeBanner firstName={firstName} />
        </div>

        {/* Profile nudge (hidden when 100%) */}
        <div className="mb-6">
          <ProfileNudge percent={percent} missing={missing} />
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Feature cards (2/3 width) */}
          <div className="lg:col-span-2">
            <FeatureGrid />
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