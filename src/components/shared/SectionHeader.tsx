import { manual } from '@/styles/font';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center' : ''}`}>
      <h2 className={`${manual.className} font-medium text-2xl md:text-4xl xl:text-5xl ${light ? 'text-white' : 'text-asn-red'} mb-3`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm md:text-lg xl:text-xl leading-relaxed max-w-3xl ${centered ? 'mx-auto' : ''} ${light ? 'text-dark-text-accent' : 'text-asn-gray'}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-16 rounded-full bg-asn-red ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
}