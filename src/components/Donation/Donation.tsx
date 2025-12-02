// components/Donation/Donation.tsx
"use client";

import React from 'react';
import { manual } from '../../styles/font';
import { useRouter } from 'next/navigation';

const Donation = () => {
  const router = useRouter();
  const handleDonate = () => {
    router.push('/donate');
  };

  return (
    <div id="donation" className="donation-container p-6 bg-white rounded-lg ">
      <h1 className={`text-[#CC2630] text-center font-medium xl:leading-[57px] xl:text-[56px] md:text-[42px] md:leading-[42px] text-[16px] leading-[12.37px] ${manual.className} pb-4 md:pb-6 xl:pb-8`}>
        Support Our Cause
      </h1>
      <p className="text-[#161616] text-center xl:text-[28px] xl:leading-[64px] md:text-[24px] text-[12px] md:leading-[43.691px] font-normal pb-4 md:pb-6 xl:pb-8">
        Your contribution helps us reach and impact more lives. We appreciate your support!
      </p>
      <div className="flex justify-center pb-4 md:pb-6 xl:pb-8">
        <button 
          onClick={handleDonate} 
          className="px-8 py-3  bg-[#CC2630] text-white rounded-full text-lg font-medium hover:bg-[#a92028] transition"
        >
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default Donation;
