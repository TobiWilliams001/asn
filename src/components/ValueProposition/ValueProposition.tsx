'use client'
import Image from 'next/image';
import SectionWrapper from '../shared/SectionWrapper';
import SectionHeader from '../shared/SectionHeader';
import FadeInUp from '../shared/FadeInUp';
import GlassCard from '../shared/GlassCard';
import { VALUE_PROPOSITIONS } from '@/lib/data/homepage';

export default function ValueProposition() {
  return (
    <SectionWrapper bg="white">
      <SectionHeader 
        title="Our Value Proposition" 
        subtitle="Comprehensive programs designed to empower African students across key areas" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 xl:gap-8">
        {VALUE_PROPOSITIONS.map((prop, index) => (
          <FadeInUp key={prop.header} delay={index * 150}>
            <GlassCard className="h-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-asn-red/10 flex items-center justify-center flex-shrink-0">
                  <Image 
                    src={prop.icon} 
                    alt={prop.header} 
                    width={36} 
                    height={36} 
                    className="w-8 h-8 lg:w-9 lg:h-9" 
                  />
                </div>
                <h3 className="font-bold text-xl sm:text-lg md:text-xl lg:text-2xl text-asn-black">
                  {prop.header}
                </h3>
              </div>
              <p className="text-asn-gray text-base sm:text-sm md:text-base leading-relaxed">
                {prop.text}
              </p>
            </GlassCard>
          </FadeInUp>
        ))}
      </div>
    </SectionWrapper>
  );
}