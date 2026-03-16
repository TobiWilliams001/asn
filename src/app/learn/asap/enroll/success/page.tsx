'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, Mail, FileCheck, Shield, Globe, Award, ArrowRight, Sparkles, Download, Calendar, Users } from 'lucide-react';

export default function EnrollmentSuccessPage() {
  const [applicationId, setApplicationId] = useState<string>('');

  useEffect(() => {
    const id = `ASAP-2026-${Math.floor(Math.random() * 9000) + 1000}-X`;
    setApplicationId(id);
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        <div className="flex flex-col items-center text-center gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-2 border-emerald-500/30 flex items-center justify-center animate-in zoom-in duration-500 delay-150">
              <CheckCircle size={44} className="sm:w-12 sm:h-12 text-emerald-500" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/10 blur-2xl -z-10 animate-pulse" />
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              Application Received
            </h1>
            <p className="text-[#b89d9f] text-base sm:text-lg md:text-xl leading-relaxed px-4">
              Your commitment to the African Student Accelerator Program marks the beginning of a transformative leadership journey.
            </p>
          </div>

          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 bg-[#261c1c] border border-[#382929] rounded-2xl backdrop-blur-sm">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b89d9f]">Application ID</span>
            <div className="hidden sm:block w-px h-4 bg-[#382929]" />
            <span className="text-sm font-mono font-bold tracking-wider text-white">{applicationId}</span>
          </div>
        </div>

        <div className="bg-[#261c1c] rounded-2xl sm:rounded-3xl border border-[#382929] overflow-hidden mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="p-5 sm:p-8 border-b border-[#382929] bg-gradient-to-r from-[#2d2222] to-[#261c1c]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Clock size={22} className="text-[#ea2a33] flex-shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Selection Timeline</h3>
              </div>
              <span className="px-3 sm:px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 w-fit">
                Phase 1 Complete
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-8 md:p-10">
            <div className="space-y-0">
              
              <div className="relative pl-8 sm:pl-10 pb-8 sm:pb-10 border-l-2 border-emerald-500/40">
                <div className="absolute left-[-9px] sm:left-[-10px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 ring-4 ring-emerald-500/20" />
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight mb-2">Application Submitted</h4>
                <p className="text-xs sm:text-sm text-[#b89d9f] italic">
                  Submitted on {formattedDate} • {formattedTime} GMT
                </p>
              </div>

              <div className="relative pl-8 sm:pl-10 pb-8 sm:pb-10 border-l-2 border-[#382929]">
                <div className="absolute left-[-9px] sm:left-[-10px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#ea2a33] shadow-lg shadow-[#ea2a33]/50 ring-4 ring-[#ea2a33]/20 animate-pulse" />
                <h4 className="text-sm sm:text-base font-bold text-white leading-tight mb-2">Initial Impact Review</h4>
                <p className="text-xs sm:text-sm text-[#b89d9f] mb-3 leading-relaxed">
                  Our admissions board is evaluating your Statement of Intent and academic background.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#ea2a33]/10 border border-[#ea2a33]/30 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ea2a33] animate-pulse" />
                  <span className="text-xs text-[#ea2a33] font-bold">Within 7 business days</span>
                </div>
              </div>

              <div className="relative pl-8 sm:pl-10 pb-8 sm:pb-10 border-l-2 border-[#382929]">
                <div className="absolute left-[-9px] sm:left-[-10px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#382929] border-2 border-[#533c3d]" />
                <h4 className="text-sm sm:text-base font-bold text-white/40 leading-tight mb-2">Selection Interview</h4>
                <p className="text-xs sm:text-sm text-[#b89d9f]/40 leading-relaxed">
                  Shortlisted candidates will be invited for a virtual leadership assessment with program alumni.
                </p>
              </div>

              <div className="relative pl-8 sm:pl-10">
                <div className="absolute left-[-9px] sm:left-[-10px] top-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#382929] border-2 border-[#533c3d]" />
                <h4 className="text-sm sm:text-base font-bold text-white/40 leading-tight mb-2">Final Decision</h4>
                <p className="text-xs sm:text-sm text-[#b89d9f]/40 leading-relaxed">
                  Official invitations for the 12-week ASAP cohort will be dispatched via your dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-8 py-5 sm:py-6 bg-[#0f0a0b] flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between border-t border-[#382929]">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-[#b89d9f] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#EEB7BA] uppercase tracking-wide">Current Status</span>
                <span className="text-sm font-semibold text-white">Under Review</span>
              </div>
            </div>
            <Link
              href="/learn/asap/application-status"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/10 text-white text-sm font-bold tracking-wide hover:bg-white/20 active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 group"
            >
              Check Application Status
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/learn/dashboard"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-[#ea2a33]/30 active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 group"
            >
              Go to Dashboard
              <Sparkles size={16} className="animate-pulse" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-[#261c1c] border border-[#382929] hover:border-[#533c3d] transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail size={22} className="text-[#ea2a33]" />
            </div>
            <h5 className="font-bold text-white mb-2 text-base sm:text-lg">Check your inbox</h5>
            <p className="text-sm text-[#b89d9f] leading-relaxed">
              We&apos;ve sent a detailed confirmation email with your application receipt and next steps.
            </p>
          </div>

          <div className="p-5 sm:p-6 md:p-8 rounded-2xl bg-[#261c1c] border border-[#382929] hover:border-[#533c3d] transition-all group">
            <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileCheck size={22} className="text-[#ea2a33]" />
            </div>
            <h5 className="font-bold text-white mb-2 text-base sm:text-lg">Prepare for impact</h5>
            <p className="text-sm text-[#b89d9f] leading-relaxed">
              Explore the ASN Impact Library to learn about previous successful alumni projects.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] mb-10 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          <div className="flex items-start gap-3 sm:gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#ea2a33]/10 flex items-center justify-center flex-shrink-0">
              <Sparkles size={20} className="text-[#ea2a33]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">What Happens Next?</h3>
              <p className="text-sm text-[#b89d9f] leading-relaxed">
                Our admissions team will carefully review your application. If shortlisted, we&apos;ll reach out within 7 business days to schedule your interview. Keep an eye on your email and check your dashboard regularly for updates.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#1a1314] border border-[#382929] rounded-full text-xs text-[#b89d9f]">
              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" />
              <span>Application Complete</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#1a1314] border border-[#382929] rounded-full text-xs text-[#b89d9f]">
              <Clock size={14} className="text-[#ea2a33] flex-shrink-0" />
              <span>Review in Progress</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-900">
          <a 
            href="/learn/resources" 
            className="p-5 sm:p-6 rounded-2xl bg-[#1a1314] border border-[#382929] hover:border-[#ea2a33]/30 transition-all group flex flex-col items-center text-center"
          >
            <Download size={20} className="text-[#ea2a33] mb-3 group-hover:scale-110 transition-transform" />
            <h6 className="text-sm font-bold text-white mb-1">Resource Hub</h6>
            <p className="text-xs text-[#b89d9f]">Download templates</p>
          </a>

          <a 
            href="/blog" 
            className="p-5 sm:p-6 rounded-2xl bg-[#1a1314] border border-[#382929] hover:border-[#ea2a33]/30 transition-all group flex flex-col items-center text-center"
          >
            <Calendar size={20} className="text-[#ea2a33] mb-3 group-hover:scale-110 transition-transform" />
            <h6 className="text-sm font-bold text-white mb-1">ASN Blog</h6>
            <p className="text-xs text-[#b89d9f]">Stay updated</p>
          </a>

          <a 
            href="https://chat.whatsapp.com/HYCmYQr45EB4QM080Rrr6t" 
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 sm:p-6 rounded-2xl bg-[#1a1314] border border-[#382929] hover:border-[#ea2a33]/30 transition-all group flex flex-col items-center text-center"
          >
            <Users size={20} className="text-[#ea2a33] mb-3 group-hover:scale-110 transition-transform" />
            <h6 className="text-sm font-bold text-white mb-1">Join Community</h6>
            <p className="text-xs text-[#b89d9f]">Connect with peers</p>
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 opacity-40 mb-10">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-white flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Encrypted Data</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-white flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">ASN Global Network</span>
          </div>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-white flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">ASAP Accredited</span>
          </div>
        </div>

        <div className="pt-8 border-t border-[#382929] text-center space-y-3">
          <p className="text-[#b89d9f] text-xs sm:text-sm">
            Questions about your application?{' '}
            <a href="mailto:info@asnafrica.org" className="text-[#ea2a33] hover:underline font-semibold">
              Contact ASN Support
            </a>
          </p>
          <p className="text-[#b89d9f]/60 text-[10px] uppercase tracking-widest">
            © 2026 African Students&apos; Network — Empowering the next generation of African leaders
          </p>
        </div>
      </div>
    </div>
  );
}