'use client';

import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';
import { AuthContextProvider } from '@/context/AuthContext';
import { useState } from 'react';

function LearnNav() {
  const { user, userProfile, logout, loading } = useAuthContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#261c1c] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/learn" className="text-white font-bold text-lg sm:text-xl">
            ASN <span className="text-[#ea2a33]">Learn</span>
          </Link>

          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link href="/" className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              Main Site
            </Link>
            <Link href="/learn/dashboard" className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/learn/asap" className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              ASAP Program
            </Link>
            <Link href="/learn/resources" className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              Resources
            </Link>
            {user && (
              <Link href="/learn/profile" className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
                Profile
              </Link>
            )}
            {!loading && user && userProfile?.role !== 'enrolled' && (
              <Link href="/learn/enroll" className="text-sm font-medium px-4 py-2 bg-[#ea2a33] hover:bg-[#c41f27] text-white rounded-lg transition-colors">
                Enroll in ASAP
              </Link>
            )}
            {!loading && !user && (
              <>
                <Link href="/learn/auth/login" className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/learn/auth/signup" className="text-sm font-medium px-4 py-2 bg-[#ea2a33] hover:bg-[#c41f27] text-white rounded-lg transition-colors">
                  Sign Up
                </Link>
              </>
            )}
            {!loading && user && (
              <button onClick={logout} className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
                Logout
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
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

      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-[#261c1c]">
          <div className="px-4 py-3 space-y-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              Main Site
            </Link>
            <Link href="/learn/dashboard" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/learn/asap" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              ASAP Program
            </Link>
            <Link href="/learn/resources" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
              Resources
            </Link>
            {user && (
              <Link href="/learn/profile" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
                Profile
              </Link>
            )}
            {!loading && user && userProfile?.role !== 'enrolled' && (
              <Link href="/learn/enroll" onClick={() => setMenuOpen(false)} className="block text-sm font-medium px-4 py-2 bg-[#ea2a33] hover:bg-[#c41f27] text-white rounded-lg transition-colors text-center">
                Enroll in ASAP
              </Link>
            )}
            {!loading && !user && (
              <>
                <Link href="/learn/auth/login" onClick={() => setMenuOpen(false)} className="block text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/learn/auth/signup" onClick={() => setMenuOpen(false)} className="block text-sm font-medium px-4 py-2 bg-[#ea2a33] hover:bg-[#c41f27] text-white rounded-lg transition-colors text-center">
                  Sign Up
                </Link>
              </>
            )}
            {!loading && user && (
              <button onClick={() => { logout(); setMenuOpen(false); }} className="block w-full text-left text-sm font-medium text-[#b89d9f] hover:text-white transition-colors">
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <div className="min-h-screen bg-[#181111]">
        <LearnNav />
        {children}
      </div>
    </AuthContextProvider>
  );
}