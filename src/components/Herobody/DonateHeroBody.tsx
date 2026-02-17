"use client";
import React from 'react'
import { manual, lato_font } from '../../styles/font'
import DonateForm from './DonateForm'
import FadeInUp from '../shared/FadeInUp' // Ensure you have this shared component

const DonateHeroBody = () => {
  const impactPoints = [
    { title: "Scholarships", desc: "Tuition for high-potential students." },
    { title: "Resources", desc: "Laptops, data, and learning materials." },
    { title: "Mentorship", desc: "Guidance from industry leaders." },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center pt-20 pb-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: The Story & Write-up */}
        <FadeInUp>
          <div className="text-left space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#CC2630]/20 border border-[#CC2630]/40 text-[#ff8f96] text-xs font-bold uppercase tracking-wider rounded-full mb-6">
                Make an Impact
              </span>
              
              <h1 className={`${manual.className} text-5xl md:text-6xl xl:text-7xl text-white leading-tight mb-6`}>
                Fuel the <span className="text-[#CC2630]">Dream</span>
              </h1>
              
              <p className={`${lato_font.className} text-[#E59297] text-lg md:text-xl leading-relaxed max-w-xl`}>
                Your contribution directly funds scholarships and educational resources for 
                African students who have the potential to change the world.
              </p>
            </div>

            {/* Impact Points List */}
            <div className="space-y-4">
              <p className="text-white/60 text-sm uppercase tracking-widest font-bold">
                Where your money goes:
              </p>
              <div className="grid gap-4">
                {impactPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-[#CC2630]" />
                    <div>
                      <h3 className="text-white font-bold">{point.title}</h3>
                      <p className="text-white/50 text-sm">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* RIGHT COLUMN: The Form */}
        <FadeInUp delay={200}>
          <div className="relative z-10">
             {/* Glow Effect behind form */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#CC2630]/20 blur-[100px] -z-10 rounded-full" />
             <DonateForm />
          </div>
        </FadeInUp>

      </div>
    </div>
  )
}

export default DonateHeroBody