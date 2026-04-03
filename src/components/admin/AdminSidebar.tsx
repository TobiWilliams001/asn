'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, BookOpen, FolderOpen, BarChart3, LogOut, Megaphone } from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/learn/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Applications',
    href: '/learn/admin/applications',
    icon: FileText,
  },
  {
    label: 'Users',
    href: '/learn/admin/users',
    icon: Users,
  },
  {
    label: 'Modules',
    href: '/learn/admin/modules',
    icon: BookOpen,
  },
  {
    label: 'Resources',
    href: '/learn/admin/resources',
    icon: FolderOpen,
  },
  {
    label: 'Analytics',
    href: '/learn/admin/analytics',
    icon: BarChart3,
  },
  {
    label: 'Announcements',
    href: '/learn/admin/announcements',
    icon: Megaphone,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#181111] border-r border-[#382929] min-h-screen sticky top-0">
      <div className="p-6 border-b border-[#382929]">
        <h2 className="text-lg font-black text-white uppercase tracking-wider">Admin Portal</h2>
        <p className="text-xs text-[#b89d9f] mt-1">ASAP Management</p>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white shadow-lg'
                      : 'text-[#b89d9f] hover:bg-[#261c1c] hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#382929]">
        <Link
          href="/learn/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#b89d9f] hover:bg-[#261c1c] hover:text-white transition-all"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Exit Admin</span>
        </Link>
      </div>
    </aside>
  );
}
