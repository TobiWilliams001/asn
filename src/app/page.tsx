import Hero from '@/components/Hero/Hero';
import WhoWeAre from '@/components/WhoWeAre/WhoWeAre';
import Mission from '@/components/Mission/Mission';
import ValueProposition from '@/components/ValueProposition/ValueProposition';
import OurReach from '@/components/OurReach/OurReach';
import GetInvolved from '@/components/GetInvolved/GetInvolved';
import BlogSectionHome from '@/components/BlogSectionHome/BlogSectionHome';
import YouTubeSectionHome from '@/components/YouTubeSectionHome/YouTubeSectionHome';
import Donation from '@/components/Donation/Donation';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <WhoWeAre />
      <Mission />
      <ValueProposition />
      <OurReach />
      <GetInvolved />
      <Donation />
      <BlogSectionHome />
      <YouTubeSectionHome />
      <Footer />
    </main>
  );
}