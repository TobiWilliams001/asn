import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/data/navigation';
import { Linkedin, Instagram, Twitter, Youtube } from 'lucide-react';

const SOCIAL_ICONS: Record<string, any> = {
  Linkedin: Linkedin,
  Instagram: Instagram,
  Twitter: Twitter,
  Youtube: Youtube,
};

export default function Footer() {
  return (
    <footer className="relative bg-[#181111] text-white overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ea2a33]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 xl:px-20">

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10 pt-16 md:pt-20 pb-14">

          {/* Brand — wider */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image src="/Group.svg" alt="ASN" width={110} height={44} className="h-9 w-auto" />
            </Link>

            <p className="text-[#b89d9f] text-sm leading-relaxed max-w-xs">
              Empowering African students with the skills, networks, and opportunities to become globally competitive professionals and leaders.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#b89d9f] hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {(() => {
                    const Icon = SOCIAL_ICONS[social.icon];
                    return Icon ? <Icon size={18} /> : null;
                  })()}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((column) => (
            <div key={column.heading} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#EEB7BA]">
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

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#b89d9f] text-xs">
            © {new Date().getFullYear()} African Students Network. All rights reserved.
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