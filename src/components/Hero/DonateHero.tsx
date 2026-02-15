import Image from 'next/image'
import React from 'react'
import NavBar from '../NavBar/NavBar'
import DonateHerobody from '../Herobody/DonateHeroBody'
import DonateForm from '../Herobody/DonateForm'

const DonateHero = () => {
  return (
    <div className="relative bg-[#402527] w-full" id="home">
        {/* ✅ Fixed Image Path & Ensured Full Coverage */}
        <Image 
            src="/asn_bg.svg" 
            fill 
            style={{ objectFit: "cover", mixBlendMode: "multiply" }} 
            alt="Bgimage" 
            className="z-0" 
            priority
        />
        
        <div className="relative w-full">
            <div className="max-w-screen-xl mx-auto lg:px-20 lg:py-12 md:p-10 p-6 w-full">
                <NavBar />
                <DonateHerobody />
                {/* <DonateForm /> */}
            </div>
        </div>
    </div>
  )
}

export default DonateHero