"use client"
import React from 'react'
import { lato_font } from '../../styles/font'

const Herobody = () => {
  const handleClick = () => {
    window.open('https://chat.whatsapp.com/HYCmYQr45EB4QM080Rrr6t', '_blank');
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen px-4">
      <div className="text-center w-full max-w-screen-lg">
        <p className={`mx-auto text-[#FFFDF6] xl:pt-52 pt-8 md:pt-14 ${lato_font.className} md:text-[60px] text-[28px] xl:text-[100px] text-center max-w-[90%] md:max-w-[513px] xl:max-w-[734px] font-bold xl:tracking-[-1px] md:tracking-[-0.6px] tracking-[-0.28px] xl:leading-[110px] md:leading-[72px] leading-[36px]`}>
          Empowering African Students
        </p>

        <p className="mx-auto text-[#E59297] font-semibold text-[14px] md:text-[18px] xl:text-[36px] xl:pt-4 pt-2 md:pt-5">
          Unlock Your Potential • Embrace Opportunities • Lead the Way
        </p>

        <div className="w-full flex justify-center pb-12 md:pb-24 xl:pb-28 xl:pt-11 pt-3">
          <button
            onClick={handleClick}
            className="md:text-[16px] w-[198px] xl:w-[440px] md:w-[260px] md:h-[40px] xl:h-[72px] rounded-full bg-[#CC2630] h-[48px] text-white flex items-center justify-center xl:text-[24px] text-[14px] leading-none"
          >
            Get Involved
          </button>
        </div>
      </div>
    </div>
  )
}

export default Herobody
