// src/app/learn/layout.tsx

import Link from 'next/link';
import { User } from 'lucide-react';

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#181111]">
      {/* Top Navigation */}
      <header className="border-b border-[#382929] bg-[#181111] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/learn" className="flex items-center gap-3">
              <div className="w-8 h-8 text-[#ea2a33]">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">ASN Learning</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="/learn/dashboard" 
                className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/learn/asap" 
                className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors"
              >
                ASAP Program
              </Link>
              <Link 
                href="/learn/resources" 
                className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors"
              >
                Resources
              </Link>
              <Link 
                href="/learn/profile" 
                className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/learn/enroll"
              className="text-sm font-medium px-4 py-2 bg-[#ea2a33] hover:bg-[#c41f27] text-white rounded-lg transition-colors"
            >
              Enroll
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-[#b89d9f] hover:text-white transition-colors"
            >
              Back to ASN
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {children}
    </div>
  );
}