import Link from 'next/link';

const CURRICULUM = [
  {
    module: 1,
    title: 'Career Mapping & Personal Branding',
    weeks: 'Weeks 1-2',
    description: 'Build clarity around your professional identity and craft a brand that opens doors.',
    topics: ['Self-assessment & strengths analysis', 'Career trajectory planning', 'Personal brand development', 'LinkedIn & portfolio optimization'],
  },
  {
    module: 2,
    title: 'Corporate Awareness & Professional Etiquette',
    weeks: 'Weeks 3-4',
    description: 'Master the unwritten rules of corporate environments and professional communication.',
    topics: ['Corporate culture navigation', 'Business communication mastery', 'Professional networking strategies', 'Email & meeting etiquette'],
  },
  {
    module: 3,
    title: 'Design Thinking & Problem Solving',
    weeks: 'Weeks 5-7',
    description: 'Apply human-centered design methodologies to create innovative solutions.',
    topics: ['Human-centered design principles', 'Empathy mapping & user research', 'Ideation & prototyping', 'Testing & iteration frameworks'],
  },
  {
    module: 4,
    title: 'Leadership & Influence',
    weeks: 'Weeks 8-10',
    description: 'Develop the mindset, skills, and emotional intelligence to lead with impact.',
    topics: ['Authentic leadership development', 'Emotional intelligence', 'Team building & delegation', 'Conflict resolution & negotiation'],
  },
  {
    module: 5,
    title: 'Action Planning & Execution',
    weeks: 'Weeks 11-12',
    description: 'Turn vision into reality with structured planning and accountability systems.',
    topics: ['Goal setting with OKRs', 'Action plan development', 'Accountability systems', 'Presentation & pitch delivery'],
  },
];

const PROGRAM_PILLARS = [
  { title: 'Mentorship', description: 'Paired with industry professionals who guide your development throughout the program.' },
  { title: 'Community', description: 'Join a network of ambitious peers who challenge, support, and inspire each other.' },
  { title: 'Practical Application', description: 'Every module includes deliverables that build your professional portfolio.' },
];

export default function ASAPOverviewPage() {
  return (
    <div className="min-h-screen text-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#261c1c] to-[#181111] border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4">
            ASAP
          </span>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">African Student Accelerator Program</h1>
          <p className="text-[#b89d9f] text-lg md:text-xl max-w-3xl leading-relaxed">
            A comprehensive 12-week intensive designed to transform ambitious African students
            into globally competitive professionals and leaders.
          </p>
        </div>
      </div>

      {/* Program Pillars */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">What Makes ASAP Different</h2>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROGRAM_PILLARS.map((pillar) => (
            <div key={pillar.title} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-2 text-[#EEB7BA]">{pillar.title}</h3>
              <p className="text-[#b89d9f] text-sm leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Full Curriculum */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Full Curriculum</h2>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] mb-10" />

        <div className="space-y-6">
          {CURRICULUM.map((item) => (
            <div key={item.module} className="bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:border-white/[0.1] transition-all">
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center text-white font-bold text-lg">
                    {item.module}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#ea2a33] bg-[#ea2a33]/10 px-3 py-1 rounded-full w-fit">
                      {item.weeks}
                    </span>
                  </div>
                  <p className="text-[#b89d9f] text-sm mb-4">{item.description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.topics.map((topic) => (
                      <li key={topic} className="text-[#b89d9f] text-sm flex items-start gap-2">
                        <span className="text-[#ea2a33] mt-0.5 flex-shrink-0 text-xs">&#9679;</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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