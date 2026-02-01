"use client"
import Image from 'next/image'
import React, { useState } from 'react';
import Link from "next/link";
import DonateButton from '../Button/DonateButton'

const NavBar = () => {
    const navTabs = [ "Home", "About", "Learn", "Resources", "Blog" ]
    const [ openNav, setOpenNav ] = useState(false)
//
    return (
        <nav className='relative'>
            <div className='flex justify-between items-center w-full'>
                <Link href={`/`}>
                    <Image 
                        src={`./../Group.svg`} 
                        alt="Bgimage" 
                        width={172} 
                        height={84} 
                        priority 
                        className='phone:max-w-[60px] phone:max-h-[36.177px]' 
                    />
                </Link>
                <div className="flex items-center">
                    <ul className='xl:flex md:gap-x-10 hidden mr-16'>
                        {navTabs?.map((tab)=> {
                            if(tab === "Blog" || tab === "Learn"){
                                return (
                                    <Link key={tab} href={`/${tab?.toLowerCase()}`}>
                                        <li className='font-semibold text-[16px] md:text-[20px] lg:text-[27px] text-[#EEB7BA]'>{tab}</li>
                                    </Link>
                                )
                            } else if(tab === "Resources"){
                                return (
                                    <Link key={tab} href={`/learn/resources`}>
                                        <li className='font-semibold text-[16px] md:text-[20px] lg:text-[27px] text-[#EEB7BA]'>{tab}</li>
                                    </Link>
                                )
                            } else {
                                return (
                                    <a href={`/#${tab?.toLowerCase()}`} key={tab}>
                                        <li className='font-semibold text-[16px] md:text-[20px] lg:text-[27px] text-[#EEB7BA]'>{tab}</li>
                                    </a>
                                )
                            }
                        })}
                    </ul>
                    <DonateButton />
                </div>
                <div className='xl:hidden block'>
                    <Image 
                        onClick={() => setOpenNav(!openNav)} 
                        src={`./../quill_hamburger.svg`} 
                        alt="Bgimage" 
                        width={24} 
                        height={24} 
                        priority 
                        className='cursor-pointer' 
                    />
                </div>
            </div>

            
            <div 
                className={`xl:hidden fixed right-4 top-20 w-48 bg-white shadow-md rounded-xl transform transition-all duration-300 ease-in-out z-[55] ${
                    openNav ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
            >
                <div className='flex justify-end p-4 border-b border-gray-100'>
                    <Image 
                        onClick={() => setOpenNav(false)} 
                        src={`./../Cancel.svg`} 
                        alt="Close menu" 
                        width={20} 
                        height={20} 
                        priority 
                        className='cursor-pointer hover:opacity-70 transition-opacity' 
                    />
                </div>
                <ul className='flex flex-col py-2'>
                    {navTabs?.map((tab) => {
                        if(tab === "Blog" || tab === "Learn"){
                            return (
                                <Link 
                                    onClick={() => setOpenNav(false)} 
                                    key={tab} 
                                    href={`/${tab?.toLowerCase()}`}
                                >
                                    <li className='font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'>{tab}</li>
                                </Link>
                            )
                        } else if(tab === "Resources"){
                            return (
                                <Link 
                                    onClick={() => setOpenNav(false)} 
                                    key={tab} 
                                    href={`/learn/resources`}
                                >
                                    <li className='font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'>{tab}</li>
                                </Link>
                            )
                        } else {
                            return (
                                <a 
                                    onClick={() => setOpenNav(false)} 
                                    href={`/#${tab?.toLowerCase()}`} 
                                    key={tab}
                                >
                                    <li className='font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'>{tab}</li>
                                </a>
                            )
                        }
                    })}
                    <div className="px-6 py-4">
                        <DonateButton />
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar