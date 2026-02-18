import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div 
      className={`
        bg-white/80 backdrop-blur-sm 
        rounded-2xl p-6 md:p-8
        border border-gray-100
        shadow-lg hover:shadow-xl
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}