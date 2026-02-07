'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthContext } from '@/context/AuthContext';

export default function LearnNav() {
  const { user, userProfile, logout, loading } = useAuthContext();

  return (
    <nav className="bg-[#261c1c] border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/learn" className="text-xl font-bold text-white">
          ASN <span className="text-[#CC2630]">Learn</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/learn/programs" className="text-gray-300 hover:text-white transition-colors">
            Programs
          </Link>
          <Link href="/learn/resources" className="text-gray-300 hover:text-white transition-colors">
            Resources
          </Link>

          {loading ? (
            <div className="w-20 h-8 bg-gray-700 rounded animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link href="/learn/dashboard" className="text-gray-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Logout
              </button>
              <div className="w-8 h-8 bg-[#CC2630] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {userProfile?.fullName?.charAt(0) || user.email?.charAt(0) || 'U'}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/learn/auth/login" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link 
                href="/learn/auth/signup" 
                className="bg-[#CC2630] hover:bg-[#a81f27] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}