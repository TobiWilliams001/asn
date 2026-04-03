'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle, Clock, AlertCircle, Loader2, Rocket,
  BookOpen, Users, Award, Calendar, ArrowRight,
  ChevronRight, Mail,
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { learnDb } from '@/firebase/learnConfig';

interface Application {
  id: string;
  status: 'pending' | 'accepted' | 'rejected';
  submittedAt: any;
  reviewedAt?: any;
  track: string;
  personalInfo: { fullName: string; email: string };
}

/* ─── Shared loading / error states ─── */
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#181111] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#CC2630]/20 border-t-[#ea2a33] animate-spin mx-auto" />
        <p className="text-[#b89d9f] text-[11px] font-bold uppercase tracking-widest">
          Loading your application…
        </p>
      </div>
    </div>
  );
}

function NotFoundScreen() {
  return (
    <div className="min-h-screen bg-[#181111] flex items-center justify-center p-6">
      <div className="max-w-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#261c1c] border border-[#382929] flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={28} className="text-[#ea2a33] opacity-50" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Application not found</h2>
        <p className="text-[#b89d9f] text-sm mb-8">We couldn't locate your application. Please try submitting again.</p>
        <Link
          href="/learn/asap/enroll"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-bold hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98] transition-all inline-block"
        >
          Submit Application
        </Link>
      </div>
    </div>
  );
}

/* ─── Shared info grid ─── */
function ApplicationMeta({ application }: { application: Application }) {
  const fmt = (ts: any) =>
    ts?.toDate?.()?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) ?? '—';

  return (
    <div className="bg-[#261c1c] border border-[#382929] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#382929]">
        <h3 className="text-xs font-black text-white uppercase tracking-widest">Application Details</h3>
      </div>
      <div className="grid grid-cols-2 divide-x divide-[#382929]">
        {[
          { label: 'Application ID', value: application.id.slice(0, 12) + '…' },
          { label: 'Track', value: application.track },
          { label: 'Submitted', value: fmt(application.submittedAt) },
          { label: 'Email', value: application.personalInfo.email },
        ].map((item) => (
          <div key={item.label} className="px-5 py-4 even:border-t even:md:border-t-0 border-[#382929]">
            <p className="text-[10px] font-black text-[#b89d9f] uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-sm font-bold text-white truncate">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Support footer ─── */
function SupportCard({ message }: { message: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#261c1c] border border-[#382929] rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center shrink-0">
          <Mail size={15} className="text-[#ea2a33]" />
        </div>
        <p className="text-sm text-[#b89d9f]">{message}</p>
      </div>
      <a
        href="mailto:programs@asnafrica.org"
        className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2d2222] border border-[#382929] text-sm font-bold text-white hover:border-[#533c3d] transition-all"
      >
        Contact Support <ArrowRight size={13} />
      </a>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ACCEPTED
═══════════════════════════════════════════ */
function AcceptedView({ application }: { application: Application }) {
  const firstName = application.personalInfo.fullName.split(' ')[0];
  const isNew = application.reviewedAt?.toDate?.() > new Date(Date.now() - 48 * 60 * 60 * 1000);

  const nextSteps = [
    {
      icon: BookOpen,
      title: 'Start Module 1',
      desc: 'Begin with Career Mapping & Personal Branding.',
      href: '/learn/asap/modules',
      cta: 'Go to Modules',
      color: 'text-emerald-400',
      bg: 'bg-emerald-900/30 border-emerald-800/40',
    },
    {
      icon: Users,
      title: 'Join the Community',
      desc: 'Connect with fellow ASAP participants.',
      href: null,
      cta: 'Coming Soon',
      color: 'text-blue-400',
      bg: 'bg-blue-900/20 border-blue-800/30',
    },
    {
      icon: Award,
      title: 'Track Your Progress',
      desc: 'Complete all modules to earn your certificate.',
      href: '/learn/asap/modules',
      cta: 'View Progress',
      color: 'text-[#ea2a33]',
      bg: 'bg-[#CC2630]/10 border-[#CC2630]/20',
    },
    {
      icon: Rocket,
      title: 'Explore Resources',
      desc: 'Access toolkits, job boards, and learning materials.',
      href: '/learn/resources',
      cta: 'Browse Resources',
      color: 'text-amber-400',
      bg: 'bg-amber-900/20 border-amber-800/30',
    },
  ];

  return (
    <div className="min-h-screen bg-[#181111] text-white">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1e2b1e] to-[#181111] border-b border-[#2a3a2a]">
        {/* Warm glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          {/* Icon */}
          <div className="relative w-20 h-20 mx-auto mb-7">
            <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-900/40">
              <CheckCircle size={36} className="text-white" />
            </div>
          </div>

          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/30 border border-emerald-700/40 rounded-full mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
              Application Accepted
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Congratulations, {firstName}!
          </h1>
          <p className="text-emerald-400 font-bold text-lg mb-2">
            You've been accepted to ASAP
          </p>
          <p className="text-[#b89d9f] text-base mb-10 max-w-md mx-auto leading-relaxed">
            Welcome to the African Student Accelerator Program. Your journey starts now.
          </p>

          {/* Primary CTA */}
          <Link
            href="/learn/asap/modules"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-black text-sm uppercase tracking-wider hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98] transition-all"
          >
            {isNew ? <Rocket size={18} /> : <BookOpen size={18} />}
            {isNew ? 'Begin Your Journey' : 'Continue Learning'}
            <ChevronRight size={16} className="opacity-70" />
          </Link>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 md:py-14 space-y-6">

        {/* Getting started grid */}
        {isNew && (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-0.5 h-7 bg-gradient-to-b from-[#ea2a33] to-transparent rounded-full" />
              <h2 className="text-lg font-black text-white tracking-tight">Getting Started</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nextSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex flex-col p-5 rounded-xl border bg-[#261c1c] border-[#382929] hover:border-[#533c3d] transition-all`}
                >
                  <div className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-4 shrink-0 ${step.bg}`}>
                    <step.icon size={16} className={step.color} />
                  </div>
                  <p className="text-sm font-black text-white mb-1">{step.title}</p>
                  <p className="text-xs text-[#b89d9f] leading-relaxed mb-4 flex-1">{step.desc}</p>
                  {step.href ? (
                    <Link
                      href={step.href}
                      className={`flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest ${step.color} hover:opacity-80 transition-opacity`}
                    >
                      {step.cta} <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#b89d9f]/50">
                      {step.cta}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <ApplicationMeta application={application} />
        <SupportCard message="Questions about the program? Our team is here for you." />
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   PENDING
═══════════════════════════════════════════ */
function PendingView({ application }: { application: Application }) {
  const steps = [
    { label: 'Application Submitted', sub: 'Received and logged successfully', status: 'complete' },
    { label: 'Initial Review', sub: 'Our team is reviewing your application', status: 'active' },
    { label: 'Interview (if required)', sub: 'Selected applicants may be contacted', status: 'upcoming' },
    { label: 'Final Decision', sub: "You'll be notified by email", status: 'upcoming' },
  ];

  return (
    <div className="min-h-screen bg-[#181111] text-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#2b2510] to-[#181111] border-b border-[#3a3020]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          <div className="relative w-20 h-20 mx-auto mb-7">
            <div className="absolute inset-0 rounded-full bg-amber-500/15 animate-pulse" />
            <div className="relative w-full h-full rounded-full bg-[#2d2510] border-2 border-amber-500/40 flex items-center justify-center">
              <Clock size={34} className="text-amber-400" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-900/25 border border-amber-700/35 rounded-full mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Under Review</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Application Under Review
          </h1>
          <p className="text-[#b89d9f] text-base max-w-md mx-auto leading-relaxed">
            Thanks for applying! Our team is carefully reviewing your application and will be in touch within 3–5 business days.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 md:py-14 space-y-6">

        {/* Timeline */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#382929]">
            <h2 className="text-xs font-black text-white uppercase tracking-widest">Application Timeline</h2>
          </div>
          <div className="p-5 space-y-1">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                {/* Left: dot + connector */}
                <div className="flex flex-col items-center">
                  <div className={`
                    w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10
                    ${step.status === 'complete'
                      ? 'bg-emerald-900/40 border-emerald-600 text-emerald-400'
                      : step.status === 'active'
                        ? 'bg-amber-900/30 border-amber-500 text-amber-400'
                        : 'bg-[#2d2222] border-[#382929] text-[#b89d9f]/30'
                    }
                  `}>
                    {step.status === 'complete'
                      ? <CheckCircle size={15} />
                      : step.status === 'active'
                        ? <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        : <div className="w-2 h-2 rounded-full bg-[#382929]" />
                    }
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-px flex-1 my-1 ${step.status === 'complete' ? 'bg-emerald-700/40' : 'bg-[#382929]'
                      }`} />
                  )}
                </div>

                {/* Right: text */}
                <div className="pb-5 min-w-0">
                  <p className={`text-sm font-black mb-0.5 ${step.status === 'complete' ? 'text-emerald-400'
                    : step.status === 'active' ? 'text-amber-400'
                      : 'text-[#b89d9f]/50'
                    }`}>
                    {step.label}
                  </p>
                  <p className={`text-xs leading-relaxed ${step.status === 'upcoming' ? 'text-[#b89d9f]/30' : 'text-[#b89d9f]'
                    }`}>
                    {step.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-5">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-4">What Happens Next</h3>
          <div className="space-y-3">
            {[
              'We review all applications within 3–5 business days',
              "You'll receive an email notification when a decision is made",
              'Check this page anytime for real-time status updates',
              "If accepted, you'll get immediate access to all program modules",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1 h-1 rounded-full bg-[#ea2a33] shrink-0 mt-2" />
                <p className="text-sm text-[#b89d9f] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <ApplicationMeta application={application} />
        <SupportCard message="Have questions while you wait? We're happy to help." />
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   REJECTED
═══════════════════════════════════════════ */
function RejectedView({ application }: { application: Application }) {
  const firstName = application.personalInfo.fullName.split(' ')[0];

  const actions = [
    {
      icon: BookOpen,
      title: 'Build Your Skills',
      desc: 'Explore free resources in our Resource Hub to strengthen your profile.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-900/25 border-emerald-800/35',
    },
    {
      icon: Users,
      title: 'Stay Connected',
      desc: 'Follow ASN for updates on events, workshops, and future cohorts.',
      color: 'text-blue-400',
      bg: 'bg-blue-900/20 border-blue-800/30',
    },
    {
      icon: Award,
      title: 'Strengthen Your Statement',
      desc: 'Reflect on your goals and refine your statement of intent for next time.',
      color: 'text-[#ea2a33]',
      bg: 'bg-[#CC2630]/10 border-[#CC2630]/20',
    },
    {
      icon: Calendar,
      title: 'Mark Your Calendar',
      desc: 'Next cohort applications typically open 4–6 weeks after the current one.',
      color: 'text-amber-400',
      bg: 'bg-amber-900/20 border-amber-800/30',
    },
  ];

  return (
    <div className="min-h-screen bg-[#181111] text-white">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#261c1c] to-[#181111] border-b border-[#382929]">
        <div className="relative max-w-3xl mx-auto px-5 sm:px-8 py-16 md:py-20 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2d2222] border border-[#382929] flex items-center justify-center mb-7">
            <AlertCircle size={28} className="text-[#b89d9f]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2d2222] border border-[#382929] rounded-full mb-5">
            <span className="text-[10px] font-black text-[#b89d9f] uppercase tracking-widest">
              This Cohort
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Not Selected, {firstName}
          </h1>
          <p className="text-[#b89d9f] text-base max-w-lg mx-auto leading-relaxed">
            Thank you for the time and effort you put into your application. This was an incredibly competitive cycle — this decision reflects our limited spots, not your potential.
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 md:py-14 space-y-6">

        {/* Message card */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-xl p-6">
          <p className="text-[#b89d9f] leading-relaxed text-sm mb-4">
            After careful review, we're unable to offer you a place in this cohort of the African Student Accelerator Program. We received many exceptional applications this round, and competition was fierce.
          </p>
          <p className="text-[#b89d9f]/70 leading-relaxed text-sm">
            We strongly encourage you to apply again for the next cohort — many of our most successful participants were accepted on their second application.
          </p>
        </div>

        {/* Reapply CTA */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#2d1e1e] to-[#261c1c] border border-[#CC2630]/25 rounded-xl p-7 text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#CC2630]/6 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#CC2630]/10 border border-[#CC2630]/20 flex items-center justify-center mx-auto mb-4">
              <Rocket size={20} className="text-[#ea2a33]" />
            </div>
            <h2 className="text-xl font-black text-white mb-2 tracking-tight">Ready to Try Again?</h2>
            <p className="text-[#b89d9f] text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              Applications for the next cohort open soon. Use this time to strengthen your profile.
            </p>
            <Link
              href="/learn/asap/enroll"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-black uppercase tracking-wider hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98] transition-all"
            >
              <Rocket size={16} />
              Apply for Next Cohort
              <ChevronRight size={14} className="opacity-70" />
            </Link>
          </div>
        </div>

        {/* In the meantime */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#ea2a33] to-transparent rounded-full" />
            <h2 className="text-sm font-black text-white uppercase tracking-widest">In the Meantime</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {actions.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[#261c1c] border border-[#382929] rounded-xl hover:border-[#533c3d] transition-colors">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${item.bg}`}>
                  <item.icon size={14} className={item.color} />
                </div>
                <div>
                  <p className="text-sm font-black text-white mb-1">{item.title}</p>
                  <p className="text-xs text-[#b89d9f] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ApplicationMeta application={application} />
        <SupportCard message="Want feedback on your application or have questions about reapplying?" />
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════
   ROOT EXPORT
═══════════════════════════════════════════ */
export default function ApplicationStatusPage() {
  const router = useRouter();
  const { userProfile } = useAuthContext();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userProfile?.asapApplicationId) {
      router.push('/learn/asap/enroll');
      return;
    }
    fetchApplication();
  }, [userProfile]);

  async function fetchApplication() {
    if (!userProfile?.asapApplicationId) return;
    try {
      const snap = await getDoc(doc(learnDb, 'applications', userProfile.asapApplicationId));
      if (snap.exists()) setApplication({ id: snap.id, ...snap.data() } as Application);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingScreen />;
  if (!application) return <NotFoundScreen />;
  if (application.status === 'accepted') return <AcceptedView application={application} />;
  if (application.status === 'pending') return <PendingView application={application} />;
  return <RejectedView application={application} />;
}