'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, MessageSquare, FileCheck, Mail, Globe, Shield, Award } from 'lucide-react';

export default function EnrollmentSuccessPage() {
  const [applicationId, setApplicationId] = useState<string>('');

  useEffect(() => {
    // Generate mock application ID (in production, pass via URL params or fetch from Firestore)
    const id = `ASAP-2025-${Math.floor(Math.random() * 9000) + 1000}-X`;
    setApplicationId(id);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Header */}
      <header className="border-b border-[#382929] px-6 lg:px-10 py-4 bg-[#181111]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 text-white">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">ASN</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ea2a33] flex items-center justify-center text-xs font-bold">
              {applicationId.split('-')[2]?.[0] || 'U'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center py-16 px-6">
        <div className="w-full max-w-3xl flex flex-col gap-8">
          {/* Success Header */}
          <div className="flex flex-col items-center text-center gap-6 mb-4">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2">
              <CheckCircle size={40} className="text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight text-white">Application Received</h1>
              <p className="text-[#b89d9f] text-lg max-w-xl mx-auto leading-relaxed">
                Your commitment to the African Student Accelerator Program marks the beginning of a transformative leadership journey.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-black/30 border border-[#382929] rounded-full">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Application ID</span>
              <span className="text-sm font-mono font-bold tracking-wider text-white">{applicationId}</span>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-[#261c1c] rounded-2xl border border-[#382929] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-[#382929] bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock size={24} className="text-[#ea2a33]" />
                  <h3 className="text-xl font-bold">The Path to Selection</h3>
                </div>
                <span className="px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-tighter">
                  Phase 1 Complete
                </span>
              </div>
            </div>

            <div className="p-8">
              <div className="ml-4 space-y-0">
                {/* Step 1: Application Submitted */}
                <div className="relative pl-8 pb-10 border-l border-emerald-500/30">
                  <div className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  <h4 className="text-base font-bold text-white leading-none">Application Submitted</h4>
                  <p className="text-sm opacity-60 mt-2 italic">
                    Submitted on {new Date().toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })} • {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false
                    })} GMT
                  </p>
                </div>

                {/* Step 2: Initial Review */}
                <div className="relative pl-8 pb-10 border-l border-[#382929]">
                  <div className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full bg-[#ea2a33] shadow-[0_0_8px_rgba(234,42,51,0.8)]" />
                  <h4 className="text-base font-bold text-white leading-none">Initial Impact Review</h4>
                  <p className="text-sm opacity-60 mt-2">
                    Our admissions board is currently evaluating your Statement of Intent and academic background.
                  </p>
                  <p className="text-xs text-[#ea2a33] font-medium mt-2">
                    Expected completion: Within 7 business days
                  </p>
                </div>

                {/* Step 3: Selection Interview */}
                <div className="relative pl-8 pb-10 border-l border-[#382929]">
                  <div className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full bg-[#382929]" />
                  <h4 className="text-base font-bold opacity-40 leading-none">Selection Interview</h4>
                  <p className="text-sm opacity-30 mt-2">
                    Shortlisted candidates will be invited for a virtual leadership assessment with program alumni.
                  </p>
                </div>

                {/* Step 4: Final Decision */}
                <div className="relative pl-8">
                  <div className="absolute left-[-5px] top-1 w-[11px] h-[11px] rounded-full bg-[#382929]" />
                  <h4 className="text-base font-bold opacity-40 leading-none">Final Decision</h4>
                  <p className="text-sm opacity-30 mt-2">
                    Official invitations for the 12-week ASAP cohort will be dispatched via the dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-black/20 flex flex-col sm:flex-row gap-6 items-center justify-between border-t border-[#382929]">
              <div className="flex items-center gap-3">
                <Shield size={20} className="opacity-40" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold opacity-60 uppercase tracking-wide leading-none">Current Status</span>
                  <span className="text-sm font-medium">Read-Only Mode</span>
                </div>
              </div>
              <Link
                href="/learn/dashboard"
                className="w-full sm:w-auto px-10 py-4 rounded-lg bg-[#ea2a33] text-white text-sm font-bold tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-red-900/40 text-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Next Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-[#382929] hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/20 flex items-center justify-center mb-4">
                <Mail size={20} className="text-[#ea2a33]" />
              </div>
              <h5 className="font-bold text-white mb-2">Check your inbox</h5>
              <p className="text-sm opacity-60 leading-relaxed">
                We&apos;ve sent a detailed confirmation email with your application receipt and next steps guidelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-[#382929] hover:bg-white/10 transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/20 flex items-center justify-center mb-4">
                <FileCheck size={20} className="text-[#ea2a33]" />
              </div>
              <h5 className="font-bold text-white mb-2">Prepare for impact</h5>
              <p className="text-sm opacity-60 leading-relaxed">
                While you wait, explore our ASN Impact Library to learn about previous successful alumni projects.
              </p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 mt-6 grayscale">
            <div className="flex items-center gap-2">
              <Shield size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">ASN Global Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">ASAP Accreditation</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center border-t border-[#382929] bg-black/20">
        <p className="text-[#b89d9f] opacity-40 text-[10px] uppercase tracking-[0.2em] mb-4">
          © 2025 African Students&apos; Network — Empowering the next generation of African leaders
        </p>
        <div className="flex justify-center gap-6 text-[10px] uppercase tracking-widest opacity-30">
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Support Center</a>
          <a href="mailto:info@asnafrica.org" className="hover:opacity-100 transition-opacity">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}