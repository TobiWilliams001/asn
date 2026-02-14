'use client'
import Image from 'next/image';
import SectionWrapper from '../shared/SectionWrapper';
import SectionHeader from '../shared/SectionHeader';
import FadeInUp from '../shared/FadeInUp'; // Default import - correct!
import GlassCard from '../shared/GlassCard'; // Default import - correct!
import { VALUE_PROPOSITIONS } from '@/lib/data/homepage';

export default function ValueProposition() {
  return (
    <SectionWrapper bg="white">
      <SectionHeader 
        title="Our Value Proposition" 
        subtitle="Comprehensive programs designed to empower African students across key areas" 
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
        {VALUE_PROPOSITIONS.map((prop, index) => (
          <FadeInUp key={prop.header} delay={index * 150}>
            <GlassCard className="h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-asn-red/10 flex items-center justify-center flex-shrink-0">
                  <Image 
                    src={prop.icon} 
                    alt={prop.header} 
                    width={32} 
                    height={32} 
                    className="w-7 h-7 md:w-8 md:h-8" 
                  />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-asn-black">
                  {prop.header}
                </h3>
              </div>
              <p className="text-asn-gray text-sm md:text-base leading-relaxed">
                {prop.text}
              </p>
            </GlassCard>
          </FadeInUp>
        ))}
      </div>
    </SectionWrapper>
  );
}