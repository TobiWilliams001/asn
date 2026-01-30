// src/app/learn/asap/page.tsx

import Link from 'next/link';
import { MOCK_MODULES } from '@/lib/mockData/modules';

export default function ASAPOverviewPage() {
  return (
    <div className="min-h-screen bg-[#181111] text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#261c1c] to-[#181111] border-b border-[#382929]">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              African Student Accelerator Program
            </h1>
            <p className="text-xl text-[#b89d9f] mb-8 leading-relaxed">
              A transformative 12-week journey designed to bridge the gap between academic 
              excellence and professional mastery in the African corporate landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/learn/enroll"
                className="inline-block px-8 py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-lg font-bold rounded-lg transition-colors"
              >
                Enroll Now
              </Link>
              <Link 
                href="/learn/asap/modules"
                className="inline-block px-8 py-4 bg-[#382929] hover:bg-[#4a3636] text-white text-lg font-bold rounded-lg transition-colors"
              >
                View Curriculum
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Program Summary */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 border-b border-[#382929] pb-4">
          Program Overview
        </h2>
        <div className="space-y-4 text-lg text-[#b89d9f] leading-relaxed">
          <p>
            The African Student Accelerator Program (ASAP) is an elite 12-week intensive 
            designed to empower high-potential African students with the strategic toolkit 
            required for global career success. Through a rigorous curriculum of five core 
            modules, participants undergo a high-barrier developmental process that emphasizes 
            professional clarity, corporate fluency, and actionable leadership.
          </p>
          <p>
            By the end of the 12 weeks, fellows emerge with a portfolio of professional assets 
            and a localized understanding of international business standards, fully prepared 
            to lead and innovate within their chosen industries.
          </p>
        </div>
      </div>

      {/* Core Modules */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2 border-b border-[#382929] pb-4">
          Core Modules
        </h2>
        <p className="text-[#b89d9f] text-sm mb-8">
          Each module spans a duration of 2 weeks
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MODULES.map((module, index) => {
            const icons = ['&#128506;', '&#127970;', '&#128161;', '&#128101;', '&#128203;'];
            return (
              <div 
                key={module.id}
                className="flex flex-col gap-3 rounded-xl border border-[#533c3d] bg-[#261c1c] p-6 transition-all hover:bg-[#2d2222]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl" dangerouslySetInnerHTML={{ __html: icons[index] }}></span>
                  <h3 className="text-white text-lg font-bold">{module.title}</h3>
                </div>
                <p className="text-[#b89d9f] text-sm">{module.description}</p>
                <div className="mt-2 pt-2 border-t border-[#382929]">
                  <p className="text-xs text-[#b89d9f] uppercase font-bold">{module.weekRange}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Program Deliverables */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2 border-b border-[#382929] pb-4">
          Program Deliverables
        </h2>
        <p className="text-[#b89d9f] text-sm mb-8">
          What you will build and own by graduation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-4 rounded-xl border border-[#533c3d] bg-[#261c1c] p-5 items-center">
            <div className="p-3 bg-[#181111] rounded-lg text-[#ea2a33]">
              <span className="text-2xl">&#128196;</span>
            </div>
            <h3 className="text-white text-base font-bold leading-tight">Professional Resume</h3>
          </div>
          
          <div className="flex gap-4 rounded-xl border border-[#533c3d] bg-[#261c1c] p-5 items-center">
            <div className="p-3 bg-[#181111] rounded-lg text-[#ea2a33]">
              <span className="text-2xl">&#129517;</span>
            </div>
            <h3 className="text-white text-base font-bold leading-tight">Personalized Career Map</h3>
          </div>
          
          <div className="flex gap-4 rounded-xl border border-[#533c3d] bg-[#261c1c] p-5 items-center">
            <div className="p-3 bg-[#181111] rounded-lg text-[#ea2a33]">
              <span className="text-2xl">&#128300;</span>
            </div>
            <h3 className="text-white text-base font-bold leading-tight">Industry Research Paper</h3>
          </div>
          
          <div className="flex gap-4 rounded-xl border border-[#533c3d] bg-[#261c1c] p-5 items-center">
            <div className="p-3 bg-[#181111] rounded-lg text-[#ea2a33]">
              <span className="text-2xl">&#128202;</span>
            </div>
            <h3 className="text-white text-base font-bold leading-tight">Corporate Awareness Exercise</h3>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 mb-10">
        <div className="bg-[#261c1c] rounded-2xl border border-[#382929] p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to start your 12-week journey?
          </h3>
          <p className="text-[#b89d9f] mb-8">
            Applications are reviewed on a rolling basis. Join the next cohort.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/learn/enroll"
              className="px-10 py-4 bg-[#ea2a33] text-white font-bold rounded-lg hover:brightness-110 transition-all"
            >
              Enroll Now
            </Link>
            <Link 
              href="/learn/asap/modules"
              className="px-10 py-4 bg-[#382929] text-white font-bold border border-white/10 hover:bg-[#4a3636] transition-all rounded-lg"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}