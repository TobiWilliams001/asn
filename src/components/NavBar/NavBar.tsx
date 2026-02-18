'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { NAV_LINKS } from '@/lib/data/navigation';
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, userProfile, logout, loading } = useAuthContext();

  const fullName = userProfile?.fullName || user?.displayName || '';
  const firstName = fullName ? fullName.split(' ')[0] : (user?.email?.split('@')[0] || 'User');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setOpenNav(false);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || openNav ? 'nav-blur shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link href="/" onClick={() => setOpenNav(false)}>
              <Image
                src="/Group.svg"
                alt="ASN Logo"
                width={120}
                height={58}
                priority
                className="w-[80px] md:w-[100px] xl:w-[120px]"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden xl:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base font-semibold text-dark-text-accent hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden xl:flex items-center gap-4">
              {loading ? (
                <div className="w-10 h-10 bg-white/10 rounded-full animate-pulse border border-white/5" />
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 group focus:outline-none bg-white/5 hover:bg-white/10 pl-1 pr-3 py-1 rounded-full border border-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-[#ea2a33] overflow-hidden transition-transform group-hover:scale-105">
                      {user.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#382929] flex items-center justify-center text-white font-bold text-xs">
                          {firstName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-white">Hi, {firstName}</span>
                    <ChevronDown size={14} className={`text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-3 w-64 bg-[#1e1616] border border-white/10 rounded-2xl py-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                      <div className="px-5 py-3 border-b border-white/5 mb-2">
                        <p className="text-sm font-bold text-white truncate">{fullName || firstName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link href="/learn/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <LayoutDashboard size={18} className="text-gray-500" /> Dashboard
                      </Link>
                      <Link href="/learn/profile" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <Settings size={18} className="text-gray-500" /> Account Settings
                      </Link>
                      <div className="my-2 border-t border-white/5" />
                      <button onClick={() => { logout(); setShowDropdown(false); }} className="w-full text-left flex items-center gap-3 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/learn/auth/login" className="text-sm font-semibold text-dark-text-accent hover:text-white transition-colors px-2">
                    Sign In
                  </Link>
                  <Link href="/learn/auth/signup" className="gradient-bg hover:opacity-90 text-white px-5 py-2.5 rounded-lg transition-all text-sm font-semibold shadow-lg shadow-red-600/10">
                    Sign Up
                  </Link>
                </div>
              )}

              <a href="#donation" className="ml-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full transition-all text-sm font-semibold">
                Donate
              </a>
            </div>

            {/* Mobile: Hamburger — visible below xl */}
            <button
              className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setOpenNav(!openNav)}
              aria-label="Toggle menu"
            >
              {openNav ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>
        </div>

        {/* Mobile Menu Panel */}
        {openNav && (
          <div className="xl:hidden border-t border-white/10 nav-blur">
            <div className="max-w-7xl mx-auto px-6 py-5 space-y-1">

              {/* Nav Links */}
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpenNav(false)}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-dark-text-accent hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-2 border-t border-white/10 mt-3 space-y-2">
                {user ? (
                  <>
                    {/* User info */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-9 h-9 rounded-full border-2 border-[#ea2a33] overflow-hidden flex-shrink-0">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#382929] flex items-center justify-center text-white font-bold text-sm">
                            {firstName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{fullName || firstName}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>

                    <Link href="/learn/dashboard" onClick={() => setOpenNav(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <LayoutDashboard size={18} className="text-gray-500" /> Dashboard
                    </Link>
                    <Link href="/learn/profile" onClick={() => setOpenNav(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <Settings size={18} className="text-gray-500" /> Account Settings
                    </Link>
                    <button onClick={() => { logout(); setOpenNav(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold">
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 pt-2">
                    <Link href="/learn/auth/login" onClick={() => setOpenNav(false)} className="block text-center px-4 py-3 rounded-xl text-base font-bold text-white hover:bg-white/5 transition-all">
                      Sign In
                    </Link>
                    <Link href="/learn/auth/signup" onClick={() => setOpenNav(false)} className="block gradient-bg hover:opacity-90 text-white px-4 py-3.5 rounded-xl text-base font-bold text-center transition-all shadow-lg">
                      Sign Up
                    </Link>
                    <a href="#donation" onClick={() => setOpenNav(false)} className="block bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl text-base font-semibold text-center transition-all">
                      Donate
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content jumping under fixed nav */}
      {openNav && <div className="h-screen" onClick={() => setOpenNav(false)} />}
    </>
  );
}