'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
const LEARN_NAV_LINKS = [
  { label: 'Program', href: '/learn' },
  { label: 'ASAP', href: '/learn/asap' },
  { label: 'Resources', href: '/learn/resources' },
];
const AUTH_NAV_LINKS = [
  { label: 'Dashboard', href: '/learn/dashboard' },
  { label: 'Profile', href: '/learn/profile' },
];
export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, loading } = useAuthContext();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isActive = (href: string) => {
    if (href === '/learn') return pathname === '/learn';
    return pathname.startsWith(href);
  };
  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
  };
  return (
    <div className="min-h-screen bg-[#181111] text-white">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 bg-[#181111]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/learn" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <span className="font-bold text-lg tracking-tight">
                ASN <span className="text-[#ea2a33]">Learn</span>
              </span>
            </Link>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {LEARN_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-white/[0.08] text-white'
                      : 'text-[#b89d9f] hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#ea2a33]/30 border-t-[#ea2a33] rounded-full animate-spin" />
              ) : user ? (
                <>
                  {AUTH_NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? 'bg-white/[0.08] text-white'
                          : 'text-[#b89d9f] hover:text-white hover:bg-white/[0.04]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#b89d9f] hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/learn/auth/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-[#b89d9f] hover:text-white hover:bg-white/[0.04] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/learn/auth/signup"
                    className="px-5 py-2 rounded-lg text-sm font-bold bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white hover:opacity-90 transition-opacity"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#181111]/95 backdrop-blur-xl">
            <div className="px-6 py-4 space-y-1">
              {LEARN_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-white/[0.08] text-white'
                      : 'text-[#b89d9f] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] my-2 pt-2">
                {user ? (
                  <>
                    {AUTH_NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? 'bg-white/[0.08] text-white'
                            : 'text-[#b89d9f] hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-[#b89d9f] hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/learn/auth/login"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-[#b89d9f] hover:text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/learn/auth/signup"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-bold text-[#ea2a33] hover:text-white transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
