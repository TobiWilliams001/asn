import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Users, Target, Lightbulb, Award, TrendingUp, Clock, BookOpen, ArrowRight, CheckCircle, Zap } from 'lucide-react';

const CURRICULUM = [
  {
    module: 1,
    title: 'Career Mapping & Personal Branding',
    weeks: 'Weeks 1-2',
    description: 'Build clarity around your professional identity and craft a brand that opens doors.',
    topics: ['Self-assessment & strengths analysis', 'Career trajectory planning', 'Personal brand development', 'LinkedIn & portfolio optimization'],
    icon: Target,
  },
  {
    module: 2,
    title: 'Corporate Awareness & Professional Etiquette',
    weeks: 'Weeks 3-4',
    description: 'Master the unwritten rules of corporate environments and professional communication.',
    topics: ['Corporate culture navigation', 'Business communication mastery', 'Professional networking strategies', 'Email & meeting etiquette'],
    icon: Users,
  },
  {
    module: 3,
    title: 'Design Thinking & Problem Solving',
    weeks: 'Weeks 5-7',
    description: 'Apply human-centered design methodologies to create innovative solutions.',
    topics: ['Human-centered design principles', 'Empathy mapping & user research', 'Ideation & prototyping', 'Testing & iteration frameworks'],
    icon: Lightbulb,
  },
  {
    module: 4,
    title: 'Leadership & Influence',
    weeks: 'Weeks 8-10',
    description: 'Develop the mindset, skills, and emotional intelligence to lead with impact.',
    topics: ['Authentic leadership development', 'Emotional intelligence', 'Team building & delegation', 'Conflict resolution & negotiation'],
    icon: Award,
  },
  {
    module: 5,
    title: 'Action Planning & Execution',
    weeks: 'Weeks 11-12',
    description: 'Turn vision into reality with structured planning and accountability systems.',
    topics: ['Goal setting with OKRs', 'Action plan development', 'Accountability systems', 'Presentation & pitch delivery'],
    icon: Zap,
  },
];

const PROGRAM_PILLARS = [
  { title: 'Mentorship', description: 'Paired with industry professionals who guide your development throughout the program.', icon: Users },
  { title: 'Community', description: 'Join a network of ambitious peers who challenge, support, and inspire each other.', icon: Rocket },
  { title: 'Practical Application', description: 'Every module includes deliverables that build your professional portfolio.', icon: TrendingUp },
];

export default function ASAPOverviewPage() {
  return (
    <div className="min-h-screen text-white">
      
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#261c1c] to-[#181111] border-b border-white/[0.06] overflow-hidden min-h-[60vh] flex items-center">
        {/* Hero Background Image */}
        <Image 
          src="/asn_bg.svg" 
          fill 
          style={{ objectFit: "cover", mixBlendMode: "multiply" }} 
          alt="" 
          className="z-0 opacity-60" 
          priority 
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#ea2a33]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#CC2630]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            ASAP
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">African Student Accelerator Program</h1>
          <p className="text-[#b89d9f] text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            A comprehensive 12-week intensive designed to transform ambitious African students
            into globally competitive professionals and leaders.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/learn/asap/enroll" 
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#CC2630] to-[#ea2a33] hover:opacity-90 text-white px-8 py-4 rounded-xl text-base font-bold transition-all group"
            >
              Apply Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#curriculum" 
              className="inline-flex items-center justify-center gap-2 bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-white px-8 py-4 rounded-xl text-base font-bold transition-all"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </div>

      {/* Program Pillars */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">What Makes ASAP Different</h2>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAM_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.title} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#ea2a33]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-[#ea2a33]" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#EEB7BA]">{pillar.title}</h3>
                <p className="text-[#b89d9f] text-sm leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Journey Timeline */}
      <div id="curriculum" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Your 12-Week Journey</h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mx-auto mb-4" />
          <p className="text-[#b89d9f] text-base max-w-2xl mx-auto">
            A structured learning path that builds progressively — from self-awareness to execution
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector - desktop only */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ea2a33] via-[#c41e3a] to-white/10"></div>

          <div className="space-y-6">
            {CURRICULUM.map((item, index) => {
              const Icon = item.icon;
              
              return (
                <div key={item.module} className="relative group">
                  {/* Timeline dot - desktop only */}
                  <div className="hidden md:block absolute left-[30px] top-8 w-3 h-3 rounded-full bg-[#ea2a33] border-4 border-[#181111] z-10"></div>

                  <div className="md:ml-20 bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 sm:p-8 hover:border-[#ea2a33]/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      
                      {/* Icon box */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center text-white shadow-lg">
                          <Icon size={28} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#b89d9f]/60 uppercase tracking-widest">
                              Module {item.module}
                            </span>
                            <div className="w-px h-4 bg-white/10"></div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#ea2a33] bg-[#ea2a33]/10 px-3 py-1 rounded-full">
                              {item.weeks}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">{item.title}</h3>
                        <p className="text-[#b89d9f] text-sm sm:text-base mb-5 leading-relaxed">{item.description}</p>

                        {/* Topics grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {item.topics.map((topic) => (
                            <div key={topic} className="flex items-start gap-2 text-[#b89d9f] text-sm">
                              <CheckCircle size={16} className="flex-shrink-0 mt-0.5 text-[#ea2a33]" />
                              <span>{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-[#ea2a33] mb-1">12</p>
            <p className="text-[#b89d9f] text-sm">Weeks Duration</p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-[#ea2a33] mb-1">5</p>
            <p className="text-[#b89d9f] text-sm">Core Modules</p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-[#ea2a33] mb-1">20+</p>
            <p className="text-[#b89d9f] text-sm">Topics Covered</p>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-[#ea2a33] mb-1">1:1</p>
            <p className="text-[#b89d9f] text-sm">Mentorship</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-[#CC2630] to-[#ea2a33] rounded-2xl p-10 md:p-16 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Future?</h3>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">Take the first step toward becoming a globally competitive professional.</p>
            <Link href="/learn/asap/enroll" className="inline-block bg-white text-[#CC2630] px-10 py-4 rounded-xl text-lg font-bold hover:bg-white/90 transition-all">
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}