import Image from 'next/image'
import React from 'react'
import NavBar from '../NavBar/NavBar'
import DonateHerobody from '../Herobody/DonateHeroBody'

const DonateHero = () => {
  return (
    <div className="relative bg-[#402527] w-full min-h-screen" id="home">
        {/* Background Image */}
        <Image 
            src="/asn_bg.svg" 
            fill 
            style={{ objectFit: "cover", mixBlendMode: "multiply" }} 
            alt="Bgimage" 
            className="z-0 pointer-events-none" 
            priority
        />
        
        {/* Content Wrapper */}
        <div className="relative w-full min-h-screen flex flex-col">
            <div className="max-w-[1440px] mx-auto lg:px-20 lg:py-8 md:p-10 p-6 w-full flex-grow flex flex-col">
                <NavBar />
                
                {/* This will now expand to fill the rest of the screen */}
                <div className="flex-grow flex items-center">
                    <DonateHerobody />
                </div>
            </div>
        </div>
    </div>
  )
}

export default DonateHero