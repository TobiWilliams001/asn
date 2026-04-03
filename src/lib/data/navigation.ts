export const NAV_LINKS = [
  { label: 'Home', href: '/#home', type: 'anchor' },
  { label: 'About', href: '/#about', type: 'anchor' },
  { label: 'Accelerator', href: '/accelerator', type: 'route' }, 
  { label: 'Resource Hub', href: '/learn/resources', type: 'route' }, 
  { label: 'Blog', href: '/blog', type: 'route' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/african-students-network/posts/?feedView=all', icon: 'Linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/asnafricahq/', icon: 'Instagram' },
  { label: 'Twitter', href: 'https://twitter.com/asn_africa', icon: 'Twitter' },
  { label: 'YouTube', href: 'https://www.youtube.com/@africanstudentsnetwork', icon: 'Youtube' },
];

export const FOOTER_LINKS = [
  {
    heading: 'Programs',
    links: [
      { label: 'Accelerator Overview', href: '/accelerator' }, 
      { label: 'Enroll Now', href: '/learn/asap/enroll' },
      { label: 'Resource Hub', href: '/learn/resources' }, 
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
      { label: 'Contact', href: 'mailto:programs@asnafrica.org' },
      { label: 'WhatsApp Community', href: 'https://chat.whatsapp.com/HYCmYQr45EB4QM080Rrr6t' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];