import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  bg?: 'white' | 'cream' | 'dark' | 'red';
  id?: string;
  className?: string;
}

export default function SectionWrapper({ children, bg = 'white', id, className = '' }: SectionWrapperProps) {
  const bgClasses = {
    white: 'bg-white',
    cream: 'bg-asn-cream',
    dark: 'bg-[#402527] text-white',
    red: 'bg-asn-red text-white',
  };

  return (
    <section id={id} className={`${bgClasses[bg]} ${className}`}>
      <div className="section-wrapper">
        {children}
      </div>
    </section>
  );
}