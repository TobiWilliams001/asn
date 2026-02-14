'use client'
import SectionWrapper from '../shared/SectionWrapper';
import SectionHeader from '../shared/SectionHeader';
import FadeInUp from '../shared/FadeInUp';
import { WHO_WE_ARE } from '@/lib/data/homepage';

export default function WhoWeAre() {
  return (
    <SectionWrapper bg="white" id="about">
      <FadeInUp>
        <SectionHeader title={WHO_WE_ARE.title} />
        <p
          className="text-asn-black text-base md:text-xl xl:text-2xl leading-relaxed md:leading-relaxed xl:leading-[56px] max-w-4xl"
          dangerouslySetInnerHTML={{ __html: WHO_WE_ARE.description }}
        />
      </FadeInUp>
    </SectionWrapper>
  );
}