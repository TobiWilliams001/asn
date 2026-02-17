import Image from 'next/image';
import NavBar from '../NavBar/NavBar';
import Herobody from '../Herobody/Herobody';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-[#402527] w-full phone:min-h-screen" id="home">
        
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
        </div>
    </div>
  )
}