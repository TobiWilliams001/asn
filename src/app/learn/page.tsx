import Link from 'next/link';
import Image from 'next/image';

const MODULES = [
  { id: 1, title: 'Career Mapping & Personal Branding', weekRange: 'Weeks 1-2', description: 'Define your career trajectory and build a compelling personal brand that positions you for global opportunities.', icon: '01' },
  { id: 2, title: 'Corporate Awareness & Professional Etiquette', weekRange: 'Weeks 3-4', description: 'Master corporate culture, business communication, and professional behaviors expected in global workplaces.', icon: '02' },
  { id: 3, title: 'Design Thinking & Problem Solving', weekRange: 'Weeks 5-7', description: 'Learn human-centered design approaches to solve complex problems with creativity and empathy.', icon: '03' },
  { id: 4, title: 'Leadership & Influence', weekRange: 'Weeks 8-10', description: 'Develop authentic leadership skills, emotional intelligence, and the ability to drive change in any organization.', icon: '04' },
  { id: 5, title: 'Action Planning & Execution', weekRange: 'Weeks 11-12', description: 'Create actionable career plans, set measurable goals, and build accountability systems for long-term success.', icon: '05' },
];

const PROGRAM_HIGHLIGHTS = [
  { stat: '12', label: 'Weeks of Intensive Training' },
  { stat: '5', label: 'Core Modules' },
  { stat: '20+', label: 'Expert-Led Sessions' },
  { stat: '100%', label: 'Free to Enroll' },
];

export default function LearnLandingPage() {
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

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32 text-center">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-6">
            12-Week Program
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto">
            Accelerate Your Success with{' '}
            <span className="bg-gradient-to-r from-[#CC2630] to-[#ea2a33] bg-clip-text text-transparent">ASAP</span>
          </h1>
          <p className="text-lg md:text-xl text-[#b89d9f] mb-10 max-w-3xl mx-auto leading-relaxed">
            Embark on a transformative 12-week journey designed to bridge the gap between
            academic excellence and professional mastery in the African corporate landscape.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/learn/asap/enroll" className="bg-gradient-to-r from-[#CC2630] to-[#ea2a33] hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all">
              Enroll Now
            </Link>
            <Link href="/learn/asap" className="bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {PROGRAM_HIGHLIGHTS.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-[#ea2a33] mb-1">{item.stat}</p>
                <p className="text-[#b89d9f] text-xs md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Summary */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Program Summary</h2>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-8" />
        <div className="space-y-4 text-base md:text-lg text-[#b89d9f] leading-relaxed max-w-4xl">
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
      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Core Modules</h2>
        <p className="text-[#b89d9f] text-sm mb-2">Each module spans 2-3 weeks with comprehensive lessons and deliverables</p>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod) => (
            <div key={mod.id} className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 hover:border-[#ea2a33]/20 hover:bg-white/[0.06] transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 bg-[#ea2a33]/10 text-[#ea2a33] rounded-full text-xs font-bold uppercase">
                  {mod.weekRange}
                </span>
                <span className="text-2xl font-black text-white/[0.06] group-hover:text-white/[0.1] transition-colors">
                  {mod.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-[#ea2a33] transition-colors leading-snug">{mod.title}</h3>
              <p className="text-[#b89d9f] text-sm leading-relaxed">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-10 md:p-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your 12-week journey?</h3>
          <p className="text-[#b89d9f] mb-8 max-w-xl mx-auto">Join the next cohort and transform your career trajectory</p>
          <Link href="/learn/asap/enroll" className="inline-block bg-gradient-to-r from-[#CC2630] to-[#ea2a33] hover:opacity-90 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all">
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}