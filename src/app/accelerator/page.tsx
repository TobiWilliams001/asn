'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import { GraduationCap, Target, Users, Trophy, ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Clock, Award, BookOpen } from 'lucide-react';
import { useState } from 'react';

const KEY_MODULES = [
  {
    icon: Target,
    title: 'Career Mapping',
    description: 'Define your professional trajectory and build a compelling personal brand that stands out.',
    weeks: 'Weeks 1-2',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Corporate Awareness',
    description: 'Master professional etiquette and navigate high-stakes business environments with confidence.',
    weeks: 'Weeks 3-4',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: GraduationCap,
    title: 'Design Thinking',
    description: 'Learn human-centric problem-solving frameworks for real-world impact and innovation.',
    weeks: 'Weeks 5-6',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Trophy,
    title: 'Leadership & Action',
    description: 'Develop authentic leadership skills and execute strategic career plans that accelerate growth.',
    weeks: 'Weeks 7-12',
    color: 'from-green-500 to-emerald-500',
  },
];

const TESTIMONIALS = [
  {
    name: 'Adebayo O.',
    role: 'Summer Analyst',
    company: 'Goldman Sachs',
    quote: 'ASAP transformed how I approach my career. The corporate awareness module prepared me perfectly for interviews at top investment banks.',
    university: 'University of Lagos',
  },
  {
    name: 'Amara N.',
    role: 'SWE Intern',
    company: 'Meta',
    quote: 'The design thinking module helped me stand out in technical interviews. I learned to solve problems creatively and communicate solutions effectively.',
    university: 'Kwame Nkrumah University',
  },
  {
    name: 'Kofi M.',
    role: 'Analyst',
    company: 'Bank of America',
    quote: 'ASAP gave me the professional toolkit I needed. Every module was directly applicable to my job search and helped me secure multiple offers.',
    university: 'University of Ghana',
  },
];

const BENEFITS = [
  { icon: BookOpen, text: 'Expert-led sessions from industry professionals at top firms' },
  { icon: Award, text: 'Practical deliverables: Resume, career map, and research paper' },
  { icon: CheckCircle2, text: 'Certificate of completion from ASN' },
];

const COMPANIES = ['Goldman Sachs', 'Meta', 'Microsoft', 'Bank of America', 'Google', 'McKinsey'];

export default function AcceleratorPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen">
      <NavBar />

      {/* ── HERO ── warm brand bg with svg texture */}
      <section className="relative bg-[#402527] overflow-hidden">
        <Image
          src="/asn_bg.svg"
          fill
          style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
          alt=""
          className="z-0"
          priority
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 xl:px-20 py-28 md:py-44">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8">
              <Clock size={14} className="text-[#E59297]" />
              <span className="text-sm font-bold text-[#E59297]">12-Week Intensive Program</span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-[#FFFDF6]">
              African Students{' '}
              <span className="text-[#E59297]">Accelerator Program</span>
            </h1>

            <p className="text-lg md:text-xl text-[#dbb8ba] mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              Bridge the gap between academic excellence and professional mastery. Join ambitious African students securing roles at{' '}
              <span className="text-white font-semibold">Goldman Sachs, Meta, Microsoft</span>, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/learn/auth/signup"
                className="group inline-flex items-center justify-center gap-2 bg-[#CC2630] hover:bg-[#b01e28] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-black/30 active:scale-95 w-full sm:w-auto"
              >
                Sign Up to Enrol
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto"
              >
                View Curriculum
              </button>
            </div>
          </div>
        </div>

        {/* Fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#261a1b] to-transparent" />
      </section>

      {/* ── COMPANIES ── bridge between hero and dark */}
      <section className="bg-[#261a1b] py-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <p className="text-center text-[#8a6e70] text-xs font-bold uppercase tracking-widest mb-7">
            Where Our Alumni Work
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {COMPANIES.map((company) => (
              <span key={company} className="text-[#7a5f61] font-bold text-sm hover:text-[#b89d9f] transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES ── transition to full dark */}
      <section
        id="modules"
        className="py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #261a1b 0%, #1a1111 60%, #181111 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#ea2a33]/10 border border-[#ea2a33]/20 rounded-full px-4 py-2 mb-6">
              <GraduationCap size={14} className="text-[#ea2a33]" />
              <span className="text-xs font-bold text-[#ea2a33] uppercase tracking-wider">Curriculum</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What You'll Master</h2>
            <p className="text-lg text-[#b89d9f] max-w-2xl mx-auto">
              Four modules designed to transform you from student to professional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {KEY_MODULES.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={module.title}
                  className="group relative bg-[#1f1515]/80 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-8 hover:border-[#ea2a33]/20 transition-all overflow-hidden"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-13 h-13 w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold text-[#ea2a33] bg-[#ea2a33]/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {module.weeks}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2.5">{module.title}</h3>
                    <p className="text-[#9a7e80] leading-relaxed text-sm">{module.description}</p>
                    <div className="absolute bottom-6 right-8 text-8xl font-black text-white/[0.03] select-none">
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 md:py-32 bg-[#181111]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#ea2a33]/10 border border-[#ea2a33]/20 rounded-full px-4 py-2 mb-6">
              <Trophy size={14} className="text-[#ea2a33]" />
              <span className="text-xs font-bold text-[#ea2a33] uppercase tracking-wider">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Where Our Members Work</h2>
            <p className="text-[#b89d9f] text-lg">Alumni at Goldman Sachs, Meta, Microsoft, and Bank of America</p>
          </div>

          <div className="bg-[#1f1515] border border-white/[0.07] rounded-2xl p-10 md:p-12">
            <div className="text-7xl text-[#ea2a33]/15 font-serif leading-none mb-4">"</div>
            <p className="text-2xl md:text-3xl text-white leading-relaxed font-light mb-10">
              {TESTIMONIALS[currentTestimonial].quote}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-[#CC2630] to-[#a81f27] rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {TESTIMONIALS[currentTestimonial].name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white">{TESTIMONIALS[currentTestimonial].name}</div>
                <div className="text-[#ea2a33] text-sm font-semibold">
                  {TESTIMONIALS[currentTestimonial].role} at {TESTIMONIALS[currentTestimonial].company}
                </div>
                <div className="text-xs text-[#8a6e70]">{TESTIMONIALS[currentTestimonial].university}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/[0.07]">
              <button onClick={prevTestimonial} className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all active:scale-95">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => setCurrentTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all ${i === currentTestimonial ? 'bg-[#ea2a33] w-7' : 'bg-white/20 w-1.5 hover:bg-white/30'}`}
                  />
                ))}
              </div>
              <button onClick={nextTestimonial} className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-all active:scale-95">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 bg-[#181111]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="bg-[#1f1515] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/[0.07]">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">Everything You Get</h2>
                <p className="text-[#8a6e70] mb-10">Complete toolkit for career acceleration</p>
                <div className="space-y-5">
                  {BENEFITS.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={benefit.text} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-[#ea2a33]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#ea2a33]" />
                        </div>
                        <span className="text-[#b89d9f] text-sm leading-relaxed pt-2.5">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-3">Ready to Start?</h3>
                <p className="text-[#8a6e70] mb-8 leading-relaxed">Join the next cohort and transform your career trajectory.</p>
                <div className="space-y-3 mb-8">
                  {['12 weeks of intensive training', 'Certificate upon completion'].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-[#b89d9f]">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/learn/auth/signup"
                  className="group inline-flex items-center justify-center gap-2 w-full bg-[#CC2630] hover:bg-[#b01e28] text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg shadow-black/30 active:scale-95"
                >
                  Sign Up to Enrol
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}