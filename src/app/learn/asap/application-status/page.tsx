'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle,
  Clock,
  Shield,
  ArrowRight,
  Sparkles,
  FileText,
  AlertCircle,
  ChevronRight,
  User,
  ExternalLink,
  Mail,
  BookOpen,
  Calendar
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/context/AuthContext';
import { learnDb } from '@/firebase/learnConfig';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

export default function ApplicationStatusPage() {
  return (
    <ProtectedRoute>
      <StatusContent />
    </ProtectedRoute>
  );
}

function StatusContent() {
  const { user, userProfile } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    async function fetchStatus() {
      if (!user) return;
      try {
        const q = query(
          collection(learnDb, 'applications'),
          where('userId', '==', user.uid),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setApplicationData(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error('Error fetching application status:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#261c1c] to-[#181111] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#ea2a33] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#b89d9f] font-medium">Verifying application status...</p>
        </div>
      </div>
    );
  }

  if (!applicationData && userProfile?.asapStatus !== 'applicant') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#261c1c] to-[#181111] py-20 px-6">
        <div className="max-w-xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-[#ea2a33]/10 rounded-full flex items-center justify-center mx-auto ring-1 ring-[#ea2a33]/20">
            <AlertCircle size={40} className="text-[#ea2a33]" />
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-black text-white">No Application Found</h1>
            <p className="text-[#b89d9f] leading-relaxed">
              It seems you haven&apos;t started your application for the African Student Accelerator Program yet.
            </p>
          </div>
          <Link
            href="/learn/asap/enroll"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:opacity-90 transition-all group"
          >
            Start Application Now
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    );
  }

  const status = applicationData?.status || 'pending';

  const steps = [
    {
      id: 'submitted',
      title: 'Application Submitted',
      desc: 'Your application has been received and is awaiting initial screening.',
      date: applicationData?.submittedAt?.toDate?.()?.toLocaleDateString() || 'Recently',
      isComplete: true
    },
    {
      id: 'review',
      title: 'Initial Impact Review',
      desc: 'Our admissions board is evaluating your Statement of Intent and background.',
      isCurrent: status === 'pending',
      isComplete: status !== 'pending' && status !== 'rejected'
    },
    {
      id: 'interview',
      title: 'Selection Interview',
      desc: 'Shortlisted candidates undergo a virtual leadership assessment.',
      isCurrent: status === 'interviewing',
      isComplete: status === 'accepted'
    },
    {
      id: 'final',
      title: 'Final Decision',
      desc: 'Official invitations for the 12-week ASAP cohort.',
      isComplete: status === 'accepted'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#261c1c] to-[#181111]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Page Header */}
        <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Link href="/learn/dashboard" className="text-[#ea2a33] text-sm font-bold flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <ChevronRight size={14} className="rotate-180" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[#ea2a33] font-black uppercase tracking-[0.2em] text-xs">ASAP Program</span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">Application Status</h1>
              <p className="text-[#b89d9f] max-w-xl">Track your progress through the selection process for Cohort 2026.</p>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 bg-white/[0.04] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
              <User size={18} className="text-[#ea2a33]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#EEB7BA] uppercase tracking-wider">Candidate</span>
                <span className="text-sm font-semibold text-white">{userProfile?.fullName || 'African Leader'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">

          {/* Timeline Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/10 flex items-center justify-center">
                    <Sparkles size={20} className="text-[#ea2a33]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Selection Journey</h2>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase text-emerald-500 tracking-widest">
                  Live
                </div>
              </div>

              <div className="p-6 md:p-10">
                <div className="space-y-0">
                  {steps.map((step, idx) => (
                    <div key={step.id} className={`relative pl-10 sm:pl-12 ${idx === steps.length - 1 ? '' : 'pb-10'} ${idx === steps.length - 1 ? '' : step.isComplete ? 'border-l-2 border-white/20' : 'border-l-2 border-white/[0.06]'}`}>
                      {/* Node */}
                      <div className={`absolute left-[-11px] top-1 w-5 h-5 rounded-full z-10 
                        ${step.isComplete ? 'bg-white/20 shadow-lg ring-4 ring-white/10' :
                          step.isCurrent ? 'bg-[#ea2a33] shadow-lg shadow-[#ea2a33]/50 ring-4 ring-[#ea2a33]/20 animate-pulse' :
                            'bg-white/[0.04] border-2 border-white/[0.06]'}`}
                      >
                        {step.isComplete && <CheckCircle size={12} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                      </div>

                      <div className={step.isComplete || step.isCurrent ? 'opacity-100' : 'opacity-40'}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="font-bold text-white text-base sm:text-lg">{step.title}</h4>
                          {step.date && <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-widest">{step.date}</span>}
                        </div>
                        <p className="text-sm text-[#b89d9f] leading-relaxed max-w-lg">
                          {step.desc}
                        </p>
                        {step.isCurrent && (
                          <div className="mt-4 p-4 rounded-xl bg-[#ea2a33]/5 border border-[#ea2a33]/20 flex items-start gap-3">
                            <Clock size={16} className="text-[#ea2a33] mt-0.5 flex-shrink-0" />
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-white uppercase tracking-wider">Estimated Timeline</p>
                              <p className="text-xs text-[#ea2a33]">Reviews typically complete within 7-10 business days.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Application Data Preview */}
            <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/10 flex items-center justify-center">
                  <FileText size={20} className="text-[#ea2a33]" />
                </div>
                <h2 className="text-xl font-bold text-white">Application Summary</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-[0.2em]">Selected Track</span>
                    <span className="text-white font-bold text-lg capitalize">{applicationData?.track || 'Not Specified'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-[0.2em]">Institution</span>
                    <span className="text-white font-medium">{applicationData?.academicInfo?.university || 'ASN Partner'}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-[0.2em]">Location</span>
                    <span className="text-white font-medium">{applicationData?.personalInfo?.city}, {applicationData?.personalInfo?.country}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#b89d9f] uppercase tracking-[0.2em]">Degree</span>
                    <span className="text-white font-medium">{applicationData?.academicInfo?.degreeProgram} ({applicationData?.academicInfo?.graduationYear})</span>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-white/[0.06]">
                <p className="text-xs text-[#b89d9f] leading-relaxed">
                  <strong className="text-white">Note:</strong> Submitted applications cannot be edited. If you need to correct a major error, please contact admissions immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <a href="mailto:info@asnafrica.org" className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-[#ea2a33]/30 hover:bg-white/[0.06] transition-all group">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[#ea2a33]" />
                    <span className="text-sm font-medium text-white">Email Admissions</span>
                  </div>
                  <ExternalLink size={14} className="text-[#b89d9f] group-hover:text-[#ea2a33] transition-colors" />
                </a>
                <Link href="/learn/asap" className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-[#ea2a33]/30 hover:bg-white/[0.06] transition-all group">
                  <div className="flex items-center gap-3">
                    <BookOpen size={16} className="text-[#ea2a33]" />
                    <span className="text-sm font-medium text-white">Program Details</span>
                  </div>
                  <ChevronRight size={14} className="text-[#b89d9f] group-hover:text-[#ea2a33] transition-colors" />
                </Link>
                <Link href="/learn/dashboard" className="flex items-center justify-between p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-[#ea2a33]/30 hover:bg-white/[0.06] transition-all group">
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-[#ea2a33]" />
                    <span className="text-sm font-medium text-white">Dashboard</span>
                  </div>
                  <ChevronRight size={14} className="text-[#b89d9f] group-hover:text-[#ea2a33] transition-colors" />
                </Link>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm p-6 md:p-8 rounded-2xl">
              <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/10 flex items-center justify-center mb-6">
                <Shield size={20} className="text-[#ea2a33]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Selection Process</h3>
              <p className="text-sm text-[#b89d9f] leading-relaxed mb-6">
                Our rigorous selection identifies candidates who demonstrate high potential for leadership and social impact across Africa.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <CheckCircle size={14} className="text-[#ea2a33] flex-shrink-0" />
                  <span>Verified Academic Data</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <CheckCircle size={14} className="text-[#ea2a33] flex-shrink-0" />
                  <span>Impact Assessment</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/60">
                  <CheckCircle size={14} className="text-[#ea2a33] flex-shrink-0" />
                  <span>Leadership Evaluation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/[0.06] text-center">
          <p className="text-[#b89d9f]/60 text-[10px] uppercase tracking-widest">
            © 2026 African Students&apos; Network — Empowering the next generation of African leaders
          </p>
        </div>

      </div>
    </div>
  );
}