import Image from 'next/image';
import NavBar from '../NavBar/NavBar';
import Herobody from '../Herobody/Herobody';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-[#402527] w-full overflow-hidden" id="home">
        
        <Image 
          src="/asn_bg.svg" 
          fill 
          style={{ objectFit: "cover", mixBlendMode: "multiply" }} 
          alt="" 
          className="z-0" 
          priority 
        />
        
        <div className='relative z-10 w-full min-h-screen'>
            <NavBar />
            <Herobody />
        </div>
    </div>
  )
}