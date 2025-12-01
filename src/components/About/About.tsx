"use client"

import Image from 'next/image'
import React from 'react'
import { manual } from '../../styles/font'
import Footer from '../Footer/Footer'
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

// import GetInvolved from '../GetInvolved/GetInvolved'
// import Impact from '../Impact/Impact'
import BlogSectionHome from '../BlogSectionHome/BlogSectionHome'
import YouTubeSectionHome from '../YouTubeSectionHome/YouTubeSectionHome'
import Donation from '../Donation/Donation';


import Button from '../Button/Button'


const About = () => {
  const valuePropositions = [{ text: "We offer access to cutting edge career exposition and transition opportunities. These includes Career Exposition, Career Transition, Mentorship, Learning Platform.", header: "Career Development", imageDir: "./../Frame 60.svg" }, { text: "We offer access to platform and network that help budding startups grow and build. These includes; Entrepreneurial Mindset , Startup Network, Funding, Incubators x Hackathons.", header: "Entrepreneurship", imageDir: "./../Frame 60 (1).svg" }, { text: "We offer you the opportunity to enhance and harness the power of true leadership. These include; Leadership, Leadership Expo, Mentorship, Training, Social Impact.", header: "Leadership", imageDir: "./../Frame 60 (2).svg" }]

 //made the our reach dynamic
    const [startCount, setStartCount] = useState(false);
    const reachRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setStartCount(true);
                    } else {
                        setStartCount(false); 
                    }
                });
            },
            { threshold: 0.3 } 
        );

        if (reachRef.current) {
            observer.observe(reachRef.current);
        }

        let myRef = reachRef?.current

        return () => {
            if (myRef) {
                observer.unobserve(myRef);
            }
        };
    }, []);


  return (
    <div id="about" >
        <div className=' relative flex flex-row-reverse bg-who-we-are phone:min-h-[250px]' >
            <div className="absolute w-1/2 h-full overflow-hidden">
                <Image
                    src="./../OBJECTS.svg"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    objectPosition="center"
                    alt="Your alt text"
                    className="absolute"
                />
            </div>
            <div className='w-full h-full relative z-10 xl:px-[120px] md:px-20 xl:py-[138px] md:py-24 py-9 px-7' >
                <h1 className={`text-[#CC2630] font-medium xl:leading-[57px] xl:text-[56px] md:text-[42px] md:leading-[42px] text-[16px] leading-[12.37px] ${manual.className} xl:pb-11 md:pb-7 pb-2`} >Who we are</h1>
                <p className='text-[#161616] xl:text-[28px] xl:leading-[64px] md:text-[24px] text-[12px] md:leading-[43.691px] font-normal leading-[28px]' >We are equipping African students for global relevance central to <span className='font-bold' >career development</span>, <span className='font-bold' >entrepreneurship</span> and <span className='font-bold' >leadership</span> by building a viable network of change makers across diverse universities in Africa.</p>
            </div>

            
        </div>
        <div id="mission">
    <div className="relative flex bg-white phone:min-h-[250px]"> 
        <div className="w-full h-full relative z-10 xl:px-[120px] md:px-20 xl:py-[138px] md:py-24 py-9 px-7">
            <h1 className={`text-[#CC2630] font-medium xl:leading-[57px] xl:text-[56px] md:text-[42px] md:leading-[42px] text-[16px] leading-[12.37px] ${manual.className} xl:pb-11 md:pb-7 pb-2`}>
                Our Mission
            </h1>
            <p className="text-[#161616] xl:text-[28px] xl:leading-[64px] md:text-[24px] text-[12px] md:leading-[43.691px] font-normal leading-[28px]">
                Our mission is to <span className="font-bold">empower</span> African students with the skills, knowledge, and network they need to thrive in the global marketplace. Through <span className="font-bold">mentorship</span>, <span className="font-bold">resources</span>, and <span className="font-bold">opportunities</span>, we&apos;re building the next generation of African leaders and innovators.
            </p>

            <h1 className={`mt-10 text-[#CC2630] font-medium xl:leading-[57px] xl:text-[56px] md:text-[42px] md:leading-[42px] text-[16px] leading-[12.37px] ${manual.className} xl:pb-11 md:pb-7 pb-2`}>
                Our Vision
            </h1>
            <p className="text-[#161616] xl:text-[28px] xl:leading-[64px] md:text-[24px] text-[12px] md:leading-[43.691px] font-normal leading-[28px]">
                Our vision is to create a future where <span className="font-bold">every African student</span> has the opportunity to succeed globally, bringing innovation, leadership, and positive change to their communities and the world.
            </p>
        </div>
    </div>
</div>





    

<div className="bg-[#FFFFFF] xl:pt-[150px] md:pt-[60px] pt-9 md:pb-[120px] pb-[60px]">
      <h1
        className={`text-[#CC2630] font-medium xl:text-[56px] md:text-[42px] text-[16px] ${manual.className} md:px-[80px] px-7 xl:px-[120px] md:pb-[48px] xl:pb-10 pb-6`}
      >
        Our Value Proposition
      </h1>
      <div className="relative w-full">
        {/* Adjusted the image size and positioning for better responsiveness */}
        <Image
          src="./../OBJECTS (1).svg"
          priority={true}
          width={1041}
          height={772}
          alt="Background decoration"
          className="absolute z-[0] overflow-hidden max-w-[40%] right-[5%] top-[10%] phone:hidden phoneTab:hidden xl:block"
        />
        {/* Added max-width and centered the content for better layout on larger screens */}
        <div className="relative flex xl:flex-row flex-col items-center xl:px-[120px] xl:gap-x-[63px] xl:justify-center max-w-[1600px] mx-auto">
          {/* Adjusted the circular background size for better proportions on larger screens */}
          <div className="md:h-[550px] md:w-[550px] xl:h-[600px] xl:w-[600px] h-[200px] w-[200px] rounded-full bg-[#CC263012] relative flex-shrink-0">
            <Image
              src="./../Frame 120.svg"
              alt="Central icon"
              priority={true}
              width={350}
              height={350}
              className="md:w-[350px] md:h-[350px] h-[120px] w-[120px] absolute left-[20.833333%] top-[20.833333%]"
            />
            {/* Adjusted positioning of floating elements for better layout on larger screens */}
            <div className="absolute top-[55%] md:top-[-5%] left-[50%] bg-white w-[150px] md:w-[250px] h-[24px] md:h-[52px] rounded-[90px] z-[5] content-shadow py-2 px-6 flex items-center gap-x-2">
              <Image
                src="./../career-path 1.svg"
                alt="Career Development icon"
                priority={true}
                width={36}
                height={36}
                className="md:w-[36px] md:h-[36px] w-[16px] h-[16px]"
              />
              <p className="md:text-[16px] md:leading-[32px] text-[8px] leading-[12px]">Career Development</p>
            </div>
            <div className="absolute top-0 md:top-[40%] left-[25%] md:left-[-15%] bg-white w-[150px] md:w-[250px] h-[24px] md:h-[52px] rounded-[90px] z-[5] content-shadow py-2 px-6 flex items-center gap-x-4">
              <Image
                src="./../entrepreneur 1.svg"
                alt="Entrepreneurship icon"
                priority={true}
                width={36}
                height={36}
                className="md:w-[36px] md:h-[36px] w-[16px] h-[16px]"
              />
              <p className="md:text-[16px] md:leading-[32px] text-[8px] leading-[12px]">Entrepreneurship</p>
            </div>
            <div className="absolute bottom-0 md:bottom-[10%] md:left-[-8%] left-[-20%] bg-white w-[150px] md:w-[250px] h-[24px] md:h-[52px] rounded-[90px] z-[5] content-shadow py-2 px-6 flex items-center gap-x-4">
              <Image
                src="./../leadership 1.svg"
                alt="Leadership icon"
                priority={true}
                width={36}
                height={36}
                className="md:w-[36px] md:h-[36px] w-[16px] h-[16px]"
              />
              <p className="md:text-[16px] md:leading-[32px] text-[8px] leading-[12px]">Leadership</p>
            </div>
          </div>
          {/* Adjusted the text content area for better readability and layout on larger screens */}
          <div className="xl:w-[570px] xl:max-w-[50%] hidden phone:flex xl:flex flex-col gap-y-6 xl:gap-y-9 phone:pt-[72px] phone:px-7 xl:pt-[24px]">
            <div>


            
              <div className="flex items-center gap-x-4">
                <Image
                  src="./../career-path 1.svg"
                  alt="Career Development icon"
                  priority={true}
                  width={56}
                  height={56}
                  className="md:w-[56px] md:h-[56px] w-[24px] h-[24px]"
                />
                <h2 className="font-bold text-[12px] phone:leading-[24px] md:text-2xl pb-2">Career Development</h2>
              </div>
              <p className="font-normal md:leading-[40px] md:text-[20px] text-[10px] leading-[24px] text-[#777777]">
                We offer access to cutting edge career exposition and transition opportunities. These includes Career
                Exposition, Career Transition, Mentorship, Learning Platform.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-x-4">
                <Image
                  src="./../leadership 1.svg"
                  alt="Leadership icon"
                  priority={true}
                  width={56}
                  height={56}
                  className="md:w-[56px] md:h-[56px] w-[24px] h-[24px]"
                />
                <h2 className="font-bold text-[12px] phone:leading-[24px] md:text-2xl pb-2">Leadership</h2>
              </div>
              <p className="font-normal md:leading-[40px] md:text-[20px] text-[10px] leading-[24px] text-[#777777]">
                We offer you the opportunity to enhance and harness the power of true leadership. These include;
                Leadership, Leadership Expo, Mentorship, Training, Social Impact.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-x-4">
                <Image
                  src="./../entrepreneur 1.svg"
                  alt="Entrepreneurship icon"
                  priority={true}
                  width={56}
                  height={56}
                  className="md:w-[56px] md:h-[56px] w-[24px] h-[24px]"
                />
                <h2 className="font-bold text-[12px] phone:leading-[24px] md:text-2xl pb-2">Entrepreneurship</h2>
              </div>
              <p className="font-normal md:leading-[40px] md:text-[20px] text-[10px] leading-[24px] text-[#777777]">
                We offer access to platform and network that help budding startups grow and build. These includes;
                Entrepreneurial Mindset , Startup Network, Funding, Incubators x Hackathons.
              </p>
            </div>
            <div className="phone:flex justify-center">
              <Button />
            </div>
          </div>



                    <div className='hidden md:block xl:hidden px-20 pt-[60px]' >
                        <div className='flex gap-x-10' >
                            <div>
                                <div className='flex items-center gap-x-4' >
                                    <Image
                                        src="./../career-path 1.svg"
                                        alt="Your alt text"
                                        priority={true}
                                        width={56}
                                        height={56}
                                        className='w-[56px] h-[56px]'
                                    />
                                    <h2 className='font-bold text-2xl pb-2' >Career Development</h2>
                                </div>
                                <p className='font-normal leading-[40px] text-[20px] text-[#777777]' >We offer access to cutting edge career exposition and transition opportunities. These includes Career Exposition, Career Transition, Mentorship, Learning Platform.</p>
                            </div>
                            <div>
                                <div className='flex items-center gap-x-4' >
                                    <Image
                                        src="./../leadership 1.svg"
                                        alt="Your alt text"
                                        priority={true}
                                        width={56}
                                        height={56}
                                        className='w-[56px] h-[56px]'
                                    />
                                    <h2 className='font-bold text-2xl pb-2' >Leadership</h2>
                                </div>
                                <p className='font-normal leading-[40px] text-[20px] text-[#777777]' >We offer you the opportunity to enhance and harness the power of true leadership. These include; Leadership, Leadership Expo, Mentorship, Training, Social Impact.</p>
                            </div>
                        </div>
                        <div className='pt-[60px] flex justify-center' > 
                            <div className='max-w-[402px]' >
                                <div className='flex items-center gap-x-4' >
                                    <Image
                                        src="./../entrepreneur 1.svg"
                                        alt="Your alt text"
                                        priority={true}
                                        width={56}
                                        height={56}
                                        className='w-[56px] h-[56px]'
                                    />
                                    <h2 className='font-bold text-2xl pb-2' >Enterpreneurship</h2>
                                </div>
                                <p className='font-normal leading-[40px] text-[20px] text-[#777777]' >We offer access to platform and network that help budding startups grow and build. These includes; Entrepreneurial Mindset , Startup Network, Funding, Incubators x Hackathons.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='md:flex flex-col relative hidden' >
                    {valuePropositions?.map((valueProposition, index)=> {
                        return (
                            <div key={index} className='flex flex-row w-full items-center' >
                                <div className={`md:w-1/2 ${index === 1 ? "order-last xl:pr-[120px] xl:pl-[48px] md:pr-[80px] md:pl-[45px]": "xl:pl-[120px] xl:pr-[100px] md:pl-[80px] md:pr-[45px]"} `} >
                                    <h1 className='xl:text-[48px] font-semibold xl:leading-[60px] xl:tracking-[-0.96px] text-[10px] leading-[13.141px] md:text-[24px] md:leading-[35.556px] md:tracking-[-0.48px] ' >{valueProposition?.header}</h1>
                                    <p className={`xl:text-[24px] xl:leading-[48px] md:text-[16px] md:leading-[32px] text-[7px] leading-[9.462px] xl:pt-4 md:pt-2.5`} >{valueProposition?.text}</p>
                                </div>
                                <div className='md:w-1/2' >
                                    <Image src={valueProposition?.imageDir} alt="Desc" className='xl:block hidden w-full' height={588} width={100} priority />
                                    <Image src={valueProposition?.imageDir} alt="Desc" className='phoneTab:block hidden w-full' height={348} width={100} priority />
                                    <Image src={valueProposition?.imageDir} alt="Desc" className='block md:hidden' height={112} width={139} priority />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='px-7 md:hidden' >
                    <div className='pb-9' >
                        <Image width={200} height={136} src={"./../Frame 60.svg"} alt='desc' className=' max-w-[200px] w-full' />
                        <div className='w-[187px] h-[150px] bg-white left-[25%] relative mt-[-12px] flex flex-col justify-center px-5' >
                            <h1 className='text-[12px] font-semibold leading-[13.021px] tracking-[-0.24px] text-black pb-2' >Career Development</h1>
                            <p className='text-[9px] leading-[16px]' >We offer access to cutting edge career exposition and transition opportunities. These includes Career Exposition, Career Transition, Mentorship, Learning Platform.</p>
                        </div>
                    </div>
                    <div className='pb-9 relative flex flex-col' >
                        <div className='w-[187px] h-[150px] bg-white flex flex-col justify-center px-5 mb-[-12px] z-[1]' >
                            <h1 className='text-[12px] font-semibold leading-[13.021px] tracking-[-0.24px] text-black pb-2' >Entrepreneurship</h1>
                            <p className='text-[9px] leading-[16px]' >We offer access to a platform and network that help budding startups grow and build. These include Entrepreneurial Mindset, Startup Network, Funding, Incubators x Hackathons.</p>
                        </div>
                        <Image width={200} height={136} src={"./../Frame 60 (1).svg"} alt='desc' className='max-w-[200px] w-full left-[25%] relative z-[0]' />
                    </div>
                    <div className='pb-9' >
                        <Image width={200} height={136} src={"./../Frame 60 (2).svg"} alt='desc' className=' max-w-[200px] w-full' />
                        <div className='w-[187px] h-[150px] bg-white left-[25%] relative mt-[-12px] flex flex-col justify-center px-5' >
                            <h1 className='text-[12px] font-semibold leading-[13.021px] tracking-[-0.24px] text-black pb-2' >Leadership</h1>
                            <p className='text-[9px] leading-[16px]' >We offer you the opportunity to enhance and harness the power of true leadership. These include; Leadership, Leadership Expo, Mentorship, Training, Social Impact.</p>
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
        <div className=' relative' >
            <div className="absolute w-full h-full phone:hidden">
                <Image
                    src="./../Rectangle.svg"
                    fill={true}
                    style={{ objectFit: "cover" }}
                    objectPosition="center"
                    alt="Your alt text"
                    className="absolute"
                />
            </div>
            <div className="absolute w-full h-full md:hidden">
                <Image
                    src="./../Rectangle.svg"
                    fill={true}
                    style={{ objectFit: "contain" }}
                    objectPosition="center"
                    alt="Your alt text"
                    className="absolute"
                />
            </div>




            <div className='w-full min-h-screen relative z-10 xl:px-[120px] md:px-20 xl:py-[138px] md:py-24 py-9 px-7'>
  <h1 className={`text-[#CC2630] font-medium text-2xl sm:text-3xl md:text-[42px] xl:text-[56px] leading-tight sm:leading-normal md:leading-[42px] xl:leading-[57px] ${manual.className} pb-4 sm:pb-6 md:pb-7 xl:pb-11`}>
    Our Programs
  </h1>
  <div className='py-6'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 xl:gap-[60px]'>
      <div className='w-full'>
        <Image
          src="./../up-arrow 1.svg"
          alt="African Students' Accelerator Program icon"
          priority={true}
          width={36}
          height={36}
          className='w-6 h-6 md:w-9 md:h-9'
        />
        <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight my-2 md:my-4'>African Students' Accelerator Program</h1>
        <p className='text-[#777777] text-sm sm:text-base md:text-lg leading-relaxed'>African Students' Accelerator Program is designed to equip African students for global relevance and impact central to career development, entrepreneurship and leadership in any frontier of the continent and the world at large. The program seeks to build a viable network of change makers among African students across diverse universities, who are hungry for growth and development to aid their trajectory into their respective sphere of influence and for sustainable local and global impact.</p>
      </div>

      <div className='w-full'>
        <Image
          src="./../impact 1.svg"
          alt="African Social Impact Program icon"
          priority={true}
          width={36}
          height={36}
          className='w-6 h-6 md:w-9 md:h-9'
        />
        <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight my-2 md:my-4'>African Social Impact Program</h1>
        <p className='text-[#777777] text-sm sm:text-base md:text-lg leading-relaxed'>The African Social Impact Program (ASIP) is a transformative initiative designed to empower individuals with the knowledge, skills, and experiences needed to drive positive change in communities across Africa. Grounded in the belief that sustainable impact is achieved through collaborative, innovative solutions, ASIP brings together a diverse group of passionate individuals eager to make a difference.</p>
      </div>

      <div className='w-full'>
        <Image
          src="./../start-up 1.svg"
          alt="African Startup Foundry icon"
          priority={true}
          width={36}
          height={36}
          className='w-6 h-6 md:w-9 md:h-9'
        />
        <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight my-2 md:my-4'>African Startup Foundry</h1>
        <p className='text-[#777777] text-sm sm:text-base md:text-lg leading-relaxed'>The African Startup Foundry is a program that supports and nurtures startups in Africa, providing resources, mentorship, funding, and a supportive ecosystem to help new businesses thrive. The goal is to assist startups in their early stages.</p>
      </div>

      <div className='w-full'>
        <Image
          src="./../insights 1.svg"
          alt="Monthly Industry Insight Series icon"
          priority={true}
          width={36}
          height={36}
          className='w-6 h-6 md:w-9 md:h-9'
        />
        <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight my-2 md:my-4'>Monthly Industry Insight Series</h1>
        <p className='text-[#777777] text-sm sm:text-base md:text-lg leading-relaxed'>The Monthly Industry Insight Series is a monthly webinar to better equip African students with career and leadership skills, ensuring their readiness for the job market, cutting across different industries from technology to finance to health, and many more.</p>
      </div>

      <div className='w-full'>
        <Image
          src="./../speech-bubbles 1.svg"
          alt="Monthly Webinar - Speaker Series icon"
          priority={true}
          width={36}
          height={36}
          className='w-6 h-6 md:w-9 md:h-9'
        />
        <h1 className='font-bold text-base sm:text-lg md:text-xl lg:text-2xl leading-tight my-2 md:my-4'>Monthly Webinar - Speaker Series</h1>
        <p className='text-[#777777] text-sm sm:text-base md:text-lg leading-relaxed'>The Monthly Webinar Series is held once a month, where we have well seasoned speakers to cover a variety of subjects and provide valuable information, updates, or insights to African students.</p>
      </div>

      <div className='flex justify-center items-center h-full'>
        <Button />
      </div>
    </div>
  </div>
</div>
</div>




        
<div ref={reachRef} className='our-reach relative w-full px-4 sm:px-6 md:px-20 xl:px-[120px] py-9 md:py-24 xl:py-[138px]'>
  <h1 className={`text-[#CC2630] font-medium text-2xl sm:text-3xl md:text-[42px] xl:text-[56px] leading-tight sm:leading-normal md:leading-[42px] xl:leading-[57px] ${manual.className} pb-4 sm:pb-6 md:pb-7 xl:pb-11`}>
    Our Reach so Far
  </h1>
  
  <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 xl:gap-[70px] py-6'>
    <div className='flex flex-col items-center gap-y-2 md:gap-y-4'>
      <div className='bg-[#CC263015] h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center'>
        <Image
          src="./../student-hat 1.svg"
          alt="Students reached icon"
          priority={true}
          width={80}
          height={80}
          className='w-16 h-16 md:w-20 md:h-20'
        />
      </div>
      <p className='text-center font-bold text-xl md:text-3xl xl:text-5xl'>
        {startCount ? <CountUp start={0} end={1500} duration={2.5} suffix="+" /> : '1500+'}
      </p>
      <p className='text-center text-sm md:text-base xl:text-2xl'>Students reached</p>
    </div>

    <div className='flex flex-col items-center gap-y-2 md:gap-y-4'>
      <div className='bg-[#CC263015] h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center'>
        <Image
          src="./../africa 1.svg"
          alt="African countries icon"
          priority={true}
          width={80}
          height={80}
          className='w-16 h-16 md:w-20 md:h-20'
        />
      </div>
      <p className='text-center font-bold text-xl md:text-3xl xl:text-5xl'>
        {startCount ? <CountUp start={0} end={10} duration={2.7} suffix="+" /> : '10+'}
      </p>
      <p className='text-center text-sm md:text-base xl:text-2xl'>African countries</p>
    </div>

    <div className='flex flex-col items-center gap-y-2 md:gap-y-4'>
      <div className='bg-[#CC263015] h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center'>
        <Image
          src="./../localization 1.svg"
          alt="Global Speakers icon"
          priority={true}
          width={80}
          height={80}
          className='w-16 h-16 md:w-20 md:h-20'
        />
      </div>
      <p className='text-center font-bold text-xl md:text-3xl xl:text-5xl'>
        {startCount ? <CountUp start={0} end={8} duration={2.7} suffix="+" /> : '8+'}
      </p>
      <p className='text-center text-sm md:text-base xl:text-2xl'>Global Speakers</p>
    </div>

    
    <div className='flex flex-col items-center gap-y-2 md:gap-y-4'>
      <div className='bg-[#CC263015] h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center'>
        <Image
          src="./../university-building 1.svg"
          alt="Universities icon"
          priority={true}
          width={80}
          height={80}
          className='w-16 h-16 md:w-20 md:h-20'
        />
      </div>
      <p className='text-center font-bold text-xl md:text-3xl xl:text-5xl'>
        {startCount ? <CountUp start={0} end={20} duration={2.7} suffix="+" /> : '20+'}
      </p>
      <p className='text-center text-sm md:text-base xl:text-2xl'>Universities</p>
    </div>
  </div>
</div>
        {/* <Impact /> */}
        <Donation />
        <BlogSectionHome />
        <YouTubeSectionHome />
        
        {/* <GetInvolved /> */}
        
        <Footer />
    </div>
  )
}

export default About