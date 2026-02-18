import SectionWrapper from '../shared/SectionWrapper';
import SectionHeader from '../shared/SectionHeader';
import FadeInUp from '../shared/FadeInUp';
import { MISSION_VISION } from '@/lib/data/homepage';

export default function Mission() {
  return (
    <SectionWrapper bg="white" id="mission">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        <FadeInUp>
          <SectionHeader title={MISSION_VISION.mission.title} />
          <p
            className="text-asn-black text-base md:text-lg xl:text-xl leading-relaxed md:leading-relaxed xl:leading-[48px]"
            dangerouslySetInnerHTML={{ __html: MISSION_VISION.mission.description }}
          />
        </FadeInUp>
        <FadeInUp delay={200}>
          <SectionHeader title={MISSION_VISION.vision.title} />
          <p
            className="text-asn-black text-base md:text-lg xl:text-xl leading-relaxed md:leading-relaxed xl:leading-[48px]"
            dangerouslySetInnerHTML={{ __html: MISSION_VISION.vision.description }}
          />
        </FadeInUp>
      </div>
    </SectionWrapper>
  );
}