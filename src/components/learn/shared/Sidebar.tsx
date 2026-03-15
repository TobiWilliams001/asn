'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Rocket, 
  BookOpen, 
  Users, 
  GraduationCap,
  ChevronRight 
} from 'lucide-react';

const SIDEBAR_LINKS = [
  {
    label: 'ASAP Program',
    href: '/learn',
    icon: Rocket,
    description: 'Accelerator Program',
  },
  {
    label: 'Resource Hub',
    href: '/learn/coming-soon',
    icon: BookOpen,
    description: 'Learning Materials',
    badge: 'Coming Soon'
  },
  {
    label: 'Community',
    href: '/learn/coming-soon',
    icon: Users,
    description: 'Connect & Network',
    badge: 'Coming Soon'
  },
  {
    label: 'Mentorship',
    href: '/learn/coming-soon',
    icon: GraduationCap,
    description: 'Get Guidance',
    badge: 'Coming Soon'
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/learn/coming-soon') return false;
    if (href === '/learn') return pathname === '/learn';
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:block w-64 bg-[#181111] border-r border-[#3d2c2c] min-h-screen sticky top-16">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
            Navigation
          </h2>
          <p className="text-xs text-gray-600">Explore ASN Learn</p>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group block px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#ea2a33]/10 to-[#b91c1c]/10 border border-[#ea2a33]/20'
                    : 'hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      active 
                        ? 'bg-[#ea2a33]/20 text-[#ea2a33]' 
                        : 'bg-white/5 text-gray-400 group-hover:text-white'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${
                        active ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {link.label}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  
                  {link.badge && (
                    <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-[#ea2a33]/10 text-[#ea2a33] rounded-full whitespace-nowrap flex-shrink-0">
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Info */}
        <div className="mt-8 p-4 bg-gradient-to-br from-[#ea2a33]/5 to-[#b91c1c]/5 border border-[#ea2a33]/10 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ea2a33]/20 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-4 h-4 text-[#ea2a33]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white mb-1">
                New Features Coming
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                We&apos;re launching new tools regularly. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}