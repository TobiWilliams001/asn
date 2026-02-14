'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Import functionality from original
import FadeInUp from '../shared/FadeInUp';

export default function Donation() {
  const router = useRouter();

  // Restoring the original navigation logic
  const handleDonate = () => {
    router.push('/donate');
  };

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ea2a33]/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <FadeInUp>
          <div className="bg-gradient-to-br from-[#181111] via-[#261c1c] to-[#1a0f0f] rounded-3xl p-10 md:p-16 text-center overflow-hidden relative">
            {/* Inner gradient orb */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea2a33]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <span className="inline-block px-4 py-1.5 bg-white/[0.06] border border-white/10 text-[#EEB7BA] text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Support the Mission
              </span>

              <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-white mb-4 leading-tight">
                Invest in Africa&apos;s Future
              </h2>

              <p className="text-[#b89d9f] text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                Your donation directly funds scholarships, learning materials, and mentorship
                programs that empower the next generation of African leaders. Every contribution
                creates ripple effects across communities.
              </p>

              {/* Amount Buttons - Now also trigger navigation */}
              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-10">
                {[5000, 15000, 30000].map((amount) => (
                  <button
                    key={amount}
                    onClick={handleDonate}
                    className="bg-white/[0.06] border border-white/10 hover:border-[#ea2a33]/30 hover:bg-[#ea2a33]/10 rounded-xl py-4 text-white font-bold text-lg transition-all"
                  >
                    ₦{amount.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Main CTA Button - Restored router.push functionality */}
              <button
                onClick={handleDonate}
                className="inline-block bg-gradient-to-r from-[#CC2630] to-[#ea2a33] hover:opacity-90 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all"
              >
                Donate Now
              </button>

              <p className="text-[#b89d9f]/60 text-xs mt-6">
                ASN is a registered non-profit organization.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}