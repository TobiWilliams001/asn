"use client"
import { useEffect, useState, useRef } from "react"
import { manual } from "../../styles/font"
import BlogCard from "./BlogCard"
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore"
import firebase_app from "../../firebase/config"
import { PageButtonLoader } from "../Button/buttonload"
import { ArrowRightIcon } from "../icons/arrow-right"
import Link from "next/link"

const BlogSectionHome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [optionsList, setOptionsList] = useState<any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    const q = query(collection(getFirestore(firebase_app), "Article"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipients: any[] = []
      querySnapshot.forEach((doc) => {
        recipients.push({ ...doc.data(), id: doc.id })
      })
      setOptionsList(recipients)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="px-4 sm:px-7 md:px-20 lg:px-[80px] xl:px-[120px] bg-white">
      <div className="flex justify-between items-center pt-8 md:pt-[60px] xl:pt-[150px] pb-6">
        <h1 className={`text-[#CC2630] font-medium text-2xl md:text-[42px] xl:text-[56px] ${manual.className}`}>
          Our Blog
        </h1>
        
        <div className="flex items-center gap-6">
          {/* Manual Navigation Arrows */}
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-[#CC2630] flex items-center justify-center text-[#CC2630] hover:bg-[#CC2630] hover:text-white transition-all"
            >
              ←
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-[#CC2630] flex items-center justify-center text-[#CC2630] hover:bg-[#CC2630] hover:text-white transition-all"
            >
              →
            </button>
          </div>

          <Link href="/blog" className="flex items-center gap-2 text-[#CC2630] hover:opacity-70 transition-opacity text-sm md:text-base font-bold">
            Go to blog <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <PageButtonLoader />
        </div>
      ) : (
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {optionsList?.map((option) => (
              <div key={option?.id} className="snap-start shrink-0 w-[280px] sm:w-[350px] md:w-[400px]">
                <BlogCard data={option} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BlogSectionHome