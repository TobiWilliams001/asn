import Image from 'next/image';
import NavBar from '../NavBar/NavBar';
import Herobody from '../Herobody/Herobody';

export default function Hero() {
  return (
<<<<<<< HEAD
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
=======
    <div className="relative min-h-screen bg-[#402527] w-full phone:min-h-screen" id="home">
        {/* Fix Image path & scaling */}
        <Image 
          src="/asn_bg.svg" 
          fill 
          style={{ objectFit: "cover", mixBlendMode: "multiply" }} 
          alt="Bgimage" 
          className="z-[0]" 
          priority 
        />
        
        <div className='relative w-full phone:min-h-screen'>
            <div className="lg:px-20 lg:py-12 md:p-10 p-6 w-full phone:min-h-screen max-w-screen-lg mx-auto">
                <NavBar />
                <Herobody />
            </div>
>>>>>>> feature/v2-authentication
        </div>
        <Herobody />
      </div>
    </div>
<<<<<<< HEAD
  );
}
=======
  )
}

export default Hero
>>>>>>> feature/v2-authentication
