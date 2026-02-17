'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import NavBar from '@/components/NavBar/NavBar';
import {
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
  BookOpen,
  FolderOpen,
  Users,
  Lightbulb,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const { user, userProfile, logout, loading } = useAuthContext();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fullName = userProfile?.fullName || user?.displayName || '';
  const firstName = fullName ? fullName.split(' ')[0] : (user?.email?.split('@')[0] || 'User');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/learn/dashboard') return pathname === '/learn/dashboard';
    if (href === '/learn') return pathname === '/learn';
    if (href.includes('?feature=')) {
      const feature = href.split('?feature=')[1];
      return pathname === '/learn/coming-soon' && searchParams.get('feature') === feature;
    }
    return pathname.startsWith(href) && href !== '/learn';
  };

  const sidebarLinks = [
    { label: 'ASAP Program', href: '/learn/coming-soon?feature=asap', icon: BookOpen, description: 'Career accelerator' },
    { label: 'Resource Hub', href: '/learn/coming-soon?feature=resources', icon: FolderOpen, description: 'Templates & guides' },
    { label: 'Community', href: '/learn/coming-soon?feature=community', icon: Users, description: 'Connect with peers' },
    { label: 'Mentorship', href: '/learn/coming-soon?feature=mentorship', icon: Lightbulb, description: '1-on-1 guidance' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1414] to-[#1f1616]">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ea2a33]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ea2a33]/5 rounded-full blur-3xl" />
      </div>

      
      {!user && <NavBar />}

      {user && (
        <nav className="fixed top-0 right-0 z-50 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-all text-gray-400 hover:text-white backdrop-blur-xl bg-[#181111]/80 border border-white/10"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Profile pill */}
            {loading ? (
              <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse border border-white/5" />
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none bg-[#181111]/80 hover:bg-[#181111]/90 backdrop-blur-xl pl-1 pr-2.5 sm:pr-3 py-1 rounded-full border border-white/10 transition-all hover:border-white/20"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#ea2a33] overflow-hidden transition-transform group-hover:scale-105 flex-shrink-0">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#ea2a33] to-[#b91c1c] flex items-center justify-center text-white font-bold text-xs">
                        {firstName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-bold text-white truncate max-w-[100px]">
                    {firstName}
                  </span>
                  <ChevronDown size={14} className={`hidden sm:block text-gray-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-[#1e1616]/98 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl py-2 sm:py-3 shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="px-4 sm:px-5 py-2 sm:py-3 border-b border-white/5 mb-1 sm:mb-2">
                      <p className="text-sm font-bold text-white truncate">{fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link href="/learn/dashboard" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <LayoutDashboard size={18} className="text-gray-400 flex-shrink-0" />
                      <span>Dashboard</span>
                    </Link>

                    <Link href="/learn/profile" onClick={() => setShowDropdown(false)} className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                      <Settings size={18} className="text-gray-400 flex-shrink-0" />
                      <span>Settings</span>
                    </Link>

                    <div className="my-1 sm:my-2 border-t border-white/5" />

                    <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-semibold">
                      <LogOut size={18} className="flex-shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {user && (
          <aside
            className={`hidden lg:block fixed left-0 top-0 bottom-0 border-r border-white/[0.06] overflow-y-auto transition-all duration-300 z-40 ${
              sidebarOpen ? 'w-64 xl:w-72' : 'w-16 xl:w-18'
            }`}
            style={{ background: 'rgba(24, 17, 17, 0.6)', backdropFilter: 'blur(24px)' }}
          >
            <div className="relative h-full">
              <div className="p-3 xl:p-4 border-b border-white/[0.04] flex items-center justify-between">
                <Link href="/learn" className={`flex items-center transition-all duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'} overflow-hidden`}>
                  <Image src="/Group.svg" alt="ASN" width={100} height={40} className="h-7 w-auto" />
                </Link>
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className={`${sidebarOpen ? 'ml-auto' : 'mx-auto'} w-6 h-6 bg-[#1a1414] hover:bg-[#ea2a33] border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg flex-shrink-0`}
                  title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                  {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                </button>
              </div>

              <div className="p-2 xl:p-3 space-y-1">
                <Link
                  href="/learn/dashboard"
                  className={`flex items-center gap-3 px-3 py-2.5 xl:py-3 rounded-lg text-sm font-medium transition-all group ${
                    isActive('/learn/dashboard')
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={!sidebarOpen ? 'Dashboard' : ''}
                >
                  <LayoutDashboard size={18} className="flex-shrink-0" />
                  <span className={`${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300 whitespace-nowrap overflow-hidden`}>
                    Dashboard
                  </span>
                </Link>

                <div className={`${sidebarOpen ? 'my-3 xl:my-4' : 'my-2 xl:my-3'} border-t border-white/[0.06]`} />

                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`flex items-start gap-3 px-3 py-2.5 xl:py-3 rounded-lg text-sm font-medium transition-all group ${
                        isActive(link.href)
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={!sidebarOpen ? link.label : ''}
                    >
                      <Icon size={18} className="mt-0.5 flex-shrink-0" />
                      <div className={`flex-1 min-w-0 ${sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'} transition-all duration-300 overflow-hidden`}>
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="truncate">{link.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">{link.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar */}
        {user && sidebarOpen && (
          <>
            <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-in fade-in duration-200" onClick={() => setSidebarOpen(false)} />
            <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 sm:w-80 border-r border-white/[0.06] z-50 overflow-y-auto animate-in slide-in-from-left duration-300" style={{ background: 'rgba(24, 17, 17, 0.98)', backdropFilter: 'blur(24px)' }}>
              <div className="p-4 border-b border-white/[0.04]">
                <Link href="/learn" onClick={() => setSidebarOpen(false)}>
                  <Image src="/Group.svg" alt="ASN" width={100} height={40} className="h-7 w-auto" />
                </Link>
              </div>

              <div className="p-4 space-y-2">
                <Link href="/learn/dashboard" onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive('/learn/dashboard') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>

                <div className="my-4 border-t border-white/[0.06]" />

                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.label} href={link.href} onClick={() => setSidebarOpen(false)}
                      className={`flex items-start gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        isActive(link.href) ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon size={20} className="mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{link.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{link.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </aside>
          </>
        )}

        {/* Main content — offset for NavBar height when not logged in */}
        <main className={`flex-1 transition-all duration-300 relative min-h-screen ${
          user
            ? sidebarOpen ? 'lg:ml-64 xl:ml-72' : 'lg:ml-16 xl:ml-18'
            : 'pt-20 md:pt-24'
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
}