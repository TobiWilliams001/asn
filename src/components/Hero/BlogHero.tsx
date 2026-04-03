import Image from 'next/image'
import React from 'react'
import BlogHerobody from '../Herobody/BlogHerobody'
import NavBar from '../NavBar/NavBar'

const BlogHero = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#402527] overflow-hidden" id="home">

      {/* Background */}
      <Image
        src="/asn_bg.svg"
        fill
        style={{ objectFit: 'cover', mixBlendMode: 'multiply' }}
        alt=""
        className="z-0"
        priority
      />

      {/* Top fade — navbar legibility */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent z-[1] pointer-events-none" />

      {/* Bottom fade — merges into articles */}
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#181111] to-transparent z-[1] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <BlogHerobody />
      </div>
    </div>
  )
}

export default BlogHero