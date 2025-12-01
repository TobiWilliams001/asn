import React from 'react'
import "./index.css"
import { manual } from '../../styles/font'
import Image from 'next/image'

const YouTubeSectionHome = () => {
  return (
    <div className='bg-[#FFF6F6] relative overflow-hidden flex flex-col py-12 px-7 sm:p-16 md:p-24 xl:py-[150px] xl:px-[120px]'>
      {/* Background pattern */}
      <Image
        src="./../OBJECTS (2).svg"
        priority={true}
        width={1041}
        height={1120}
        alt="Background decoration"
        className="absolute z-0 max-w-[50%] right-0 top-0"
      />
      
      {/* Main content container with gradient background */}
      <div className='youtube_home_cont relative z-10 rounded-[32px] py-12 px-8 sm:p-12 md:px-16 md:py-16 xl:py-24 xl:px-28'>
        <div className='flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12 xl:gap-16'>
          {/* Text content */}
          <div className='flex flex-col gap-4 md:gap-6 xl:gap-8 md:max-w-[55%]'>
            <div className='space-y-3 md:space-y-4'>
            <h2 className={`font-medium text-white text-2xl sm:text-3xl md:text-[42px] xl:text-[56px] leading-snug sm:leading-normal md:leading-[48px] xl:leading-[64px] tracking-[-0.02em] ${manual.className}`}>
  Catch up on our latest Webinar and events.
</h2>

              <p className={`text-white/90 text-sm sm:text-base md:text-lg xl:text-xl leading-[1.6] max-w-[95%]`}>
                Check out our Youtube channel, learn more about the organisation and bine watch our previous online events.
              </p>
            </div>
            <button className='bg-white text-[#CC2630] rounded-full py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 xl:py-6 xl:px-12 text-base sm:text-lg md:text-xl xl:text-2xl font-medium transition-colors hover:bg-[#CC2630] hover:text-white w-full md:w-auto'>
              Get Involved
            </button>
          </div>

          {/* YouTube container */}
          <div className='bg-[#0A0000] flex items-center justify-center w-full md:w-[40%] aspect-[4/3] rounded-2xl overflow-hidden shadow-lg'>
            <a href="https://www.youtube.com/@africanstudentsnetwork" 
               target='_blank' 
               rel="noopener noreferrer" 
               className="flex items-center justify-center w-full h-full hover:scale-105 transition-transform">
              <Image 
                priority={true} 
                src="./../yaotube 1.svg" 
                height={176} 
                width={176} 
                alt="YouTube channel link" 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-28 xl:h-28"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YouTubeSectionHome