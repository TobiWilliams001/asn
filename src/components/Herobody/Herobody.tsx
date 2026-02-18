"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const Herobody = () => {
  const router = useRouter();

  const handleWhatsApp = () => {
    window.open('https://chat.whatsapp.com/HYCmYQr45EB4QM080Rrr6t', '_blank');
  };

  const handleDonate = () => {
    router.push('/donate');
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen px-4">
      <div className="text-center w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.1] tracking-tight text-[#FFFDF6]">
          Empowering African Students
        </h1>

        <p className="text-lg md:text-xl xl:text-2xl text-[#dbb8ba] mb-10 leading-relaxed font-light">
          Unlock Your Potential • Embrace Opportunities • Lead the Way
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleWhatsApp}
            className="group inline-flex items-center justify-center gap-2 bg-[#CC2630] hover:bg-[#b01e28] text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-black/30 active:scale-95 w-full sm:w-auto"
          >
            Get Involved
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleDonate}
            className="inline-flex items-center justify-center gap-2 border-2 border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all w-full sm:w-auto"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  )
}

export default Herobody