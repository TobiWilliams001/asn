// components/Button/DonateButton.tsx
"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

const DonateButton = () => {
  const router = useRouter();
  const handleClick = () => {
    // Scroll smoothly to the Donation section
    // const donationSection = document.getElementById("donation");
    // if (donationSection) {
    //   donationSection.scrollIntoView({ behavior: "smooth" });
    // }
    router.push('/donate');
  };

  return (
    <div>
      <button 
        onClick={handleClick} 
        className="md:text-[20px] w-[177px] rounded-[1000px] bg-[#CC2630] h-[56px] text-white hidden xl:flex items-center justify-center"
      >
        Donate
      </button>
    </div>
  );
};

export default DonateButton;
