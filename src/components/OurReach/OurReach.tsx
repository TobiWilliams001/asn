'use client'
import SectionWrapper from '../shared/SectionWrapper';
import SectionHeader from '../shared/SectionHeader';
import FadeInUp from '../shared/FadeInUp';
import AnimatedCounter from '../shared/AnimatedCounter';
import { OUR_REACH } from '@/lib/data/homepage';
import { Users, Globe, GraduationCap, Handshake } from 'lucide-react';
const STAT_ICONS = [Users, Globe, GraduationCap, Handshake];
export default function OurReach() {
  return (
    <SectionWrapper bg="white">
      <SectionHeader
        title={OUR_REACH.title}
        subtitle="Join a movement that's transforming youth across Africa"
        centered
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
        {OUR_REACH.stats.map((stat, index) => {
          const Icon = STAT_ICONS[index % STAT_ICONS.length];
          return (
            <FadeInUp key={stat.label} delay={index * 100}>
              <div className="relative group bg-gray-50 rounded-2xl p-6 md:p-8 text-center border border-gray-100 hover:border-asn-red/20 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-asn-red/60 to-asn-red/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-asn-red/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-asn-red" />
                </div>
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              </div>
            </FadeInUp>
          );
        })}
      </div>
    </SectionWrapper>
  );
}