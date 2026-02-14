export const NAV_LINKS = [
  { label: 'Home', href: '/#home', type: 'anchor' },
  { label: 'About', href: '/#about', type: 'anchor' },
  { label: 'Learn', href: '/learn', type: 'route' },
  { label: 'Resources', href: '/learn/resources', type: 'route' },
  { label: 'Blog', href: '/blog', type: 'route' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/asn-africa', icon: 'in' },
  { label: 'Instagram', href: 'https://instagram.com/asn_africa', icon: 'IG' },
  { label: 'Twitter', href: 'https://twitter.com/asn_africa', icon: 'X' },
  { label: 'YouTube', href: 'https://youtube.com/@ASNAfrica', icon: 'YT' },
];
export const FOOTER_LINKS = [
  {
    heading: 'Programs',
    links: [
      { label: 'ASAP Overview', href: '/learn/asap' },
      { label: 'Enroll Now', href: '/learn/enroll' },
      { label: 'Resources', href: '/learn/resources' },
      { label: 'Dashboard', href: '/learn/dashboard' },
    ],
  },
  {
    heading: 'Organization',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Our Mission', href: '/#mission' },
      { label: 'Contact', href: 'mailto:info@asnnetwork.org' },
      { label: 'WhatsApp Community', href: 'https://chat.whatsapp.com/HYCmYQr45EB4QM080Rrr6t' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/asn-africa' },
      { label: 'Instagram', href: 'https://instagram.com/asn_africa' },
      { label: 'YouTube', href: 'https://youtube.com/@ASNAfrica' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];
