import Image from 'next/image'
import React from 'react'
import SingleBlogHerobody from '../Herobody/SingleBlogHerobody'
import NavBar from '../NavBar/NavBar'

const SingleBlogHero = ({ articleData, edit, id }: { articleData: any, edit: boolean, id: string }) => {
  return (
    <div className="relative min-h-screen bg-[#402527] w-full" id="home">
      <Image 
        src="/asn_bg.svg"
        fill
        style={{ objectFit: "cover", mixBlendMode: "multiply" }}
        alt="Background Image"
        className="z-0"
        priority
      />

      <div className="relative w-full">
        <div className="max-w-screen-xl mx-auto lg:px-20 lg:py-12 md:p-10 p-6 w-full">
          <NavBar />
          <SingleBlogHerobody id={id} edit={edit} articleData={articleData} />
        </div>
      </div>
    </div>
  )
}

export default SingleBlogHero
