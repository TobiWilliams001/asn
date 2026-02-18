'use client';

import SectionWrapper from '../shared/SectionWrapper';
import FadeInUp from '../shared/FadeInUp';

export default function GetInvolved() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#181111] via-[#261c1c] to-[#181111] py-20 md:py-28">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ea2a33]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#CC2630]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeInUp>
          <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/10 text-[#EEB7BA] text-xs font-bold uppercase tracking-wider rounded-full mb-6">
            Join the Movement
          </span>
        </FadeInUp>

        <FadeInUp delay={100}>
          <h2 className="text-3xl md:text-5xl xl:text-6xl font-black text-white mb-6 leading-tight">
            Be Part of Africa&apos;s{' '}
            <span className="bg-gradient-to-r from-[#CC2630] to-[#ea2a33] bg-clip-text text-transparent">
              Next Generation
            </span>{' '}
            of Leaders
          </h2>
        </FadeInUp>

        <FadeInUp delay={200}>
          <p className="text-[#b89d9f] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with thousands of ambitious African students building their futures together.
            Share resources, find mentors, and unlock opportunities.
          </p>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://chat.whatsapp.com/HYCmYQr45EB4QM080Rrr6t"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#CC2630] to-[#ea2a33] hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.556-.764-6.336-2.071l-.442-.332-3.266 1.095 1.095-3.266-.332-.442A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Join Our WhatsApp Community
            </a>
            <a
              href="/learn"
              className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 hover:bg-white/[0.1] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all"
            >
              Explore Programs
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}