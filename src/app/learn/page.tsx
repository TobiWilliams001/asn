// src/app/learn/page.tsx

import Link from 'next/link';
import { MOCK_MODULES } from '@/lib/mockData/modules';

export default function LearnLandingPage() {
  return (
    <div className="min-h-screen bg-[#181111] text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#261c1c] to-[#181111] border-b border-[#382929]">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            Accelerate Your Success with <span className="text-[#ea2a33]">ASAP</span>
          </h1>
          <p className="text-xl text-[#b89d9f] mb-8 max-w-3xl mx-auto leading-relaxed">
            Embark on a transformative 12-week journey designed to bridge the gap between 
            academic excellence and professional mastery in the African corporate landscape.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/learn/enroll"
              className="inline-block px-8 py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-lg font-bold rounded-lg transition-colors"
            >
              Enroll Now
            </Link>
            <Link 
              href="/learn/asap"
              className="inline-block px-8 py-4 bg-[#382929] hover:bg-[#4a3636] text-white text-lg font-bold rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Program Summary */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 border-b border-[#382929] pb-4">
          Program Summary
        </h2>
        <div className="space-y-4 text-lg text-[#b89d9f] leading-relaxed">
          <p>
            The African Student Accelerator Program (ASAP) is an elite 12-week intensive 
            designed to empower high-potential African students with the strategic toolkit 
            required for global career success.
          </p>
          <p>
            Through a rigorous curriculum of five core modules, participants undergo a 
            high-barrier developmental process that emphasizes professional clarity, 
            corporate fluency, and actionable leadership.
          </p>
        </div>
      </div>

      {/* Core Modules */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-2 border-b border-[#382929] pb-4">
          Core Modules
        </h2>
        <p className="text-[#b89d9f] text-sm mb-8">
          Each module spans 2 weeks with comprehensive lessons and deliverables
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MODULES.map((module) => (
            <div 
              key={module.id}
              className="bg-[#261c1c] border border-[#533c3d] rounded-xl p-6 hover:border-[#ea2a33] transition-all"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-[#ea2a33]/10 text-[#ea2a33] rounded-full text-xs font-bold uppercase">
                  {module.weekRange}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{module.title}</h3>
              <p className="text-[#b89d9f] text-sm">{module.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Ready to start your 12-week journey?
          </h3>
          <p className="text-[#b89d9f] mb-8">
            Join the next cohort and transform your career trajectory
          </p>
          <Link 
            href="/learn/enroll"
            className="inline-block px-10 py-4 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-lg font-bold rounded-lg transition-colors"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}