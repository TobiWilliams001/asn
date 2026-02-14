'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { NAV_LINKS } from '@/lib/data/navigation';

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userProfile, logout, loading } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/">
            <Image
              src="/Group.svg"
              alt="ASN Logo"
              width={120}
              height={58}
              priority
              className="w-[60px] md:w-[90px] xl:w-[120px]"
            />
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              link.type === 'route' ? (
                <Link key={link.label} href={link.href} className="text-base font-semibold text-dark-text-accent hover:text-white transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className="text-base font-semibold text-dark-text-accent hover:text-white transition-colors">
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            {loading ? (
              <div className="w-20 h-9 bg-white/10 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link href="/learn/dashboard" className="text-sm font-semibold text-dark-text-accent hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button onClick={logout} className="text-sm font-semibold text-dark-text-accent hover:text-white transition-colors">
                  Logout
                </button>
                <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {userProfile?.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/learn/auth/login" className="text-sm font-semibold text-dark-text-accent hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/learn/auth/signup" className="gradient-bg hover:opacity-90 text-white px-5 py-2.5 rounded-lg transition-all text-sm font-semibold">
                  Sign Up
                </Link>
              </div>
            )}

            <a
              href="#donation"
              className="ml-2 gradient-bg hover:opacity-90 text-white px-6 py-2.5 rounded-full transition-all text-sm font-semibold"
            >
              Donate
            </a>
          </div>

          <button
            onClick={() => setOpenNav(!openNav)}
            className="xl:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {openNav ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`xl:hidden transition-all duration-300 overflow-hidden ${
        openNav ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="nav-blur border-t border-white/10 px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            link.type === 'route' ? (
              <Link key={link.label} href={link.href} onClick={() => setOpenNav(false)} className="block py-3 text-lg font-semibold text-dark-text-accent hover:text-white transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} onClick={() => setOpenNav(false)} className="block py-3 text-lg font-semibold text-dark-text-accent hover:text-white transition-colors">
                {link.label}
              </a>
            )
          ))}

          <div className="border-t border-white/10 pt-3 mt-3 space-y-1">
            {!loading && user ? (
              <>
                <Link href="/learn/dashboard" onClick={() => setOpenNav(false)} className="block py-3 text-lg font-semibold text-dark-text-accent hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button onClick={() => { logout(); setOpenNav(false); }} className="block w-full text-left py-3 text-lg font-semibold text-dark-text-accent hover:text-white transition-colors">
                  Logout
                </button>
              </>
            ) : !loading ? (
              <>
                <Link href="/learn/auth/login" onClick={() => setOpenNav(false)} className="block py-3 text-lg font-semibold text-dark-text-accent hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/learn/auth/signup" onClick={() => setOpenNav(false)} className="block py-3 text-lg font-semibold gradient-bg text-white text-center rounded-lg">
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>

          <div className="pt-3">
            <a href="#donation" onClick={() => setOpenNav(false)} className="block py-3 text-lg font-semibold gradient-bg text-white text-center rounded-full">
              Donate
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}