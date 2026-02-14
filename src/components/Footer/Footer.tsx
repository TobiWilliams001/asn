import Link from 'next/link';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/data/navigation';

export default function Footer() {
  return (
    <footer className="bg-[#181111] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#CC2630] to-[#ea2a33] flex items-center justify-center text-white font-black text-sm">
                A
              </div>
              <span className="font-bold text-xl tracking-tight">ASN</span>
            </div>
            <p className="text-[#b89d9f] text-sm leading-relaxed mb-6">
              Empowering African students with the skills, networks, and opportunities
              to become globally competitive professionals and leaders.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-[#b89d9f] hover:text-white hover:bg-white/[0.1] transition-all"
                  aria-label={social.label}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <h4 className="font-bold text-sm uppercase tracking-wider text-[#EEB7BA] mb-4">
                {column.heading}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#b89d9f] hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[#b89d9f] hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#b89d9f] text-xs">
            &copy; {new Date().getFullYear()} African Students Network. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-[#b89d9f] hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[#b89d9f] hover:text-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}