import Image from 'next/image';
import NavBar from '../NavBar/NavBar';
import Herobody from '../Herobody/Herobody';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-[#402527] w-full" id="home">
      <Image
        src="/asn_bg.svg"
        fill={true}
        style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
        alt="Background"
        className="z-0"
        priority
      />
      <div className="relative w-full min-h-screen flex flex-col">
        <div className="px-6 md:px-10 xl:px-20 pt-4 md:pt-6 xl:pt-12">
          <NavBar />
        </div>
        <Herobody />
      </div>
    </div>
  );
}