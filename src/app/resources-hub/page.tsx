'use client';

import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';
import { FileText, Download, BookOpen, Briefcase, Award, ArrowRight, CheckCircle2, Users, Target, TrendingUp, FileSearch, Sparkles } from 'lucide-react';

const RESOURCE_CATEGORIES = [
  {
    icon: FileText,
    title: 'Resume Templates',
    description: 'ATS-optimized templates tailored for African markets and global companies.',
    color: 'from-blue-500 to-cyan-500',
    count: '15+',
  },
  {
    icon: Briefcase,
    title: 'Interview Prep',
    description: 'Comprehensive guides, frameworks, and practice questions for all interview types.',
    color: 'from-purple-500 to-pink-500',
    count: '20+',
  },
  {
    icon: BookOpen,
    title: 'Career Guides',
    description: 'Industry research templates, career mapping tools, and professional development resources.',
    color: 'from-orange-500 to-red-500',
    count: '30+',
  },
  {
    icon: Award,
    title: 'Skill Building',
    description: 'Design thinking canvases, leadership assessments, and action planning templates.',
    color: 'from-green-500 to-emerald-500',
    count: '25+',
  },
];

const FEATURED_RESOURCES = [
  { title: 'Investment Banking Resume Template', category: 'Resume', badge: 'Most Popular' },
  { title: 'Behavioral Interview Framework', category: 'Interview Prep', badge: 'New' },
  { title: 'Tech Career Roadmap 2026', category: 'Career Guide', badge: 'Trending' },
  { title: 'Design Thinking Canvas', category: 'Skill Building', badge: null },
];

const BENEFITS = [
  { icon: Sparkles, text: 'Regular updates with new templates and guides' },
  { icon: Users, text: 'Community feedback and peer reviews' },
  { icon: Target, text: 'Curated specifically for African students' },
  { icon: CheckCircle2, text: 'Used by alumni at top global companies' },
  { icon: TrendingUp, text: 'Proven to increase interview success rates' },
];

export default function ResourcesHubPage() {
  return (
    <div className="min-h-screen">
      <NavBar />

      {/* ── HERO ── same warm bg + svg as main site */}
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
              <Download size={14} className="text-[#E59297]" />
              <span className="text-sm font-bold text-[#E59297]">Career Resources Library</span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.05] tracking-tight text-[#FFFDF6]">
              Your Career{' '}
              <span className="text-[#E59297]">Resource Library</span>
            </h1>

            <p className="text-lg md:text-xl text-[#dbb8ba] mb-10 leading-relaxed max-w-3xl mx-auto font-light">
              Access curated templates, guides, and frameworks to accelerate your professional development.
              From <span className="text-white font-semibold">resume building</span> to{' '}
              <span className="text-white font-semibold">interview mastery</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/learn/auth/signup"
                className="group inline-flex items-center justify-center gap-2 bg-[#CC2630] hover:bg-[#b01e28] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-black/30 active:scale-95 w-full sm:w-auto"
              >
                Access Library
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto"
              >
                Browse Resources
              </button>
            </div>
          </div>
        </div>

        {/* Fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#261a1b] to-transparent" />
      </section>

      {/* ── CATEGORIES ── transition from warm to dark */}
      <section
        id="categories"
        className="py-24 md:py-32"
        style={{ background: 'linear-gradient(180deg, #261a1b 0%, #1a1111 60%, #181111 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#ea2a33]/10 border border-[#ea2a33]/20 rounded-full px-4 py-2 mb-6">
              <BookOpen size={14} className="text-[#ea2a33]" />
              <span className="text-xs font-bold text-[#ea2a33] uppercase tracking-wider">Categories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">What's Inside</h2>
            <p className="text-lg text-[#b89d9f] max-w-2xl mx-auto">
              Everything you need to build a successful career, organized and ready to use
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {RESOURCE_CATEGORIES.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="group relative bg-[#1f1515]/80 backdrop-blur-xl border border-white/[0.07] rounded-2xl p-8 hover:border-[#ea2a33]/20 transition-all overflow-hidden"
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-bold text-[#ea2a33] bg-[#ea2a33]/10 px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {category.count} Resources
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2.5">{category.title}</h3>
                    <p className="text-[#9a7e80] leading-relaxed text-sm">{category.description}</p>
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

      {/* ── FEATURED RESOURCES ── */}
      <section className="py-24 md:py-32 bg-[#181111]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#ea2a33]/10 border border-[#ea2a33]/20 rounded-full px-4 py-2 mb-6">
              <Sparkles size={14} className="text-[#ea2a33]" />
              <span className="text-xs font-bold text-[#ea2a33] uppercase tracking-wider">Featured</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Most Popular Resources</h2>
            <p className="text-[#b89d9f] text-lg">Our most downloaded and highest-rated materials</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURED_RESOURCES.map((resource) => (
              <div key={resource.title} className="group bg-[#1f1515] border border-white/[0.07] rounded-2xl p-6 hover:border-[#ea2a33]/20 transition-all">
                {resource.badge && (
                  <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold mb-4 ${
                    resource.badge === 'Most Popular' ? 'bg-[#ea2a33]/15 text-[#ea2a33]' :
                    resource.badge === 'New' ? 'bg-green-500/15 text-green-400' :
                    'bg-blue-500/15 text-blue-400'
                  }`}>
                    {resource.badge === 'Trending' && <TrendingUp size={10} />}
                    {resource.badge}
                  </div>
                )}
                <div className="w-10 h-10 bg-[#ea2a33]/10 rounded-xl flex items-center justify-center mb-4">
                  <FileSearch className="w-5 h-5 text-[#ea2a33]" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-[#ea2a33] transition-colors leading-snug">
                  {resource.title}
                </h3>
                <p className="text-xs text-[#7a5f61]">{resource.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 bg-[#181111]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="bg-[#1f1515] border border-white/[0.07] rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/[0.07]">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-2">Why Our Library?</h2>
                <p className="text-[#8a6e70] mb-10">Built by Africans, for Africans breaking into global markets</p>
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
                <h3 className="text-3xl font-bold text-white mb-3">Ready to Access?</h3>
                <p className="text-[#8a6e70] mb-8 leading-relaxed">Sign up to unlock access to our complete resource library.</p>
                <div className="space-y-3 mb-8">
                  {['Free updates and new materials', 'Community support and feedback'].map((item) => (
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
                  Get Started
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