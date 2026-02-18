'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import { ChevronDown, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function LearnNav() {
  const { user, userProfile, logout, loading } = useAuthContext();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = userProfile?.fullName || user?.displayName || '';
  const firstName = fullName ? fullName.split(' ')[0] : (user?.email?.split('@')[0] || 'User');

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1314]/90 backdrop-blur-xl border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/learn" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image src="/Group.svg" alt="ASN" width={90} height={36} className="h-7 w-auto" />
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Programs', href: '/learn/programs' },
              { label: 'Resources', href: '/learn/resources' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-[#b89d9f] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-lg bg-white/10 animate-pulse" />
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ea2a33]/20 transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg border-2 border-[#ea2a33] overflow-hidden flex-shrink-0">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt="" width={28} height={28} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#CC2630] to-[#a81f27] flex items-center justify-center text-white font-bold text-xs">
                        {firstName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-semibold text-white max-w-[100px] truncate">
                    {firstName}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`hidden sm:block text-[#b89d9f] transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-[#1f1515]/98 backdrop-blur-xl border border-white/10 rounded-2xl py-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/[0.07] mb-1">
                      <p className="text-sm font-bold text-white truncate">{fullName || firstName}</p>
                      <p className="text-xs text-[#7a5f61] truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/learn/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#b89d9f] hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <LayoutDashboard size={16} className="flex-shrink-0" />
                      Dashboard
                    </Link>

                    <Link
                      href="/learn/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#b89d9f] hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Settings size={16} className="flex-shrink-0" />
                      Settings
                    </Link>

                    <div className="my-1.5 border-t border-white/[0.07]" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold"
                    >
                      <LogOut size={16} className="flex-shrink-0" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/learn/auth/login"
                  className="px-4 py-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  Sign In
                </Link>
                <Link
                  href="/learn/auth/signup"
                  className="px-4 py-2 text-sm font-bold text-white bg-[#CC2630] hover:bg-[#b01e28] rounded-lg transition-all shadow-lg shadow-[#CC2630]/20 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}