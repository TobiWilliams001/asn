"use client"
import Image from 'next/image'
import React, { useState } from 'react';
import Link from "next/link";
import DonateButton from '../Button/DonateButton'
import { useAuthContext } from '@/context/AuthContext';

const NavBar = () => {
    const navTabs = [ "Home", "About", "Learn", "Resources", "Blog" ]
    const [ openNav, setOpenNav ] = useState(false)
    const { user, userProfile, logout, loading } = useAuthContext();

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
                    <ul className='xl:flex md:gap-x-10 hidden mr-8'>
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

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden xl:flex items-center gap-4 mr-6">
                        {loading ? (
                            <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/learn/dashboard" className="text-[#EEB7BA] hover:text-white transition-colors font-semibold">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-[#EEB7BA] hover:text-white transition-colors font-semibold"
                                >
                                    Logout
                                </button>
                                <div className="w-10 h-10 bg-[#CC2630] rounded-full flex items-center justify-center text-white font-bold">
                                    {userProfile?.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link 
                                    href="/learn/auth/login" 
                                    className="text-[#EEB7BA] hover:text-white transition-colors font-semibold"
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    href="/learn/auth/signup" 
                                    className="bg-[#CC2630] hover:bg-[#a81f27] text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

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

            {/* Mobile Menu */}
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
                    
                    {/* Auth in Mobile Menu */}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                        {user ? (
                            <>
                                <Link 
                                    onClick={() => setOpenNav(false)} 
                                    href="/learn/dashboard"
                                >
                                    <li className='font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'>Dashboard</li>
                                </Link>
                                <button 
                                    onClick={() => { logout(); setOpenNav(false); }}
                                    className='w-full text-left font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    onClick={() => setOpenNav(false)} 
                                    href="/learn/auth/login"
                                >
                                    <li className='font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'>Sign In</li>
                                </Link>
                                <Link 
                                    onClick={() => setOpenNav(false)} 
                                    href="/learn/auth/signup"
                                >
                                    <li className='font-semibold text-[20px] text-[#CC2630] px-6 py-4 hover:bg-[#FDF5F5] transition-colors duration-200'>Sign Up</li>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="px-6 py-4">
                        <DonateButton />
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar