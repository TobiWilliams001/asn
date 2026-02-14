"use client"
import { useEffect, useState, useRef } from "react"
import { manual } from "../../styles/font"
import BlogCard from "./BlogCard"
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore"
import firebase_app from "../../firebase/config"
import { PageButtonLoader } from "../Button/buttonload"
import { ArrowRightIcon } from "../icons/arrow-right"
import Link from "next/link"
import FadeInUp from '../shared/FadeInUp'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const BlogSectionHome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [optionsList, setOptionsList] = useState<[] | any[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const q = query(collection(getFirestore(firebase_app), "Article"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const recipients: any[] = []
      querySnapshot.forEach((doc) => {
        recipients.push({ ...doc.data(), id: doc.id } as any)
      })
      setOptionsList([...recipients])
    })
    setIsLoading(false)
    return () => {
      unsubscribe()
    }
  }, [])

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll)
    return () => { if (el) el.removeEventListener('scroll', checkScroll) }
  }, [optionsList])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.7
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  return (
    <section className="bg-white">
      <div className="section-wrapper">
        <FadeInUp>
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <h2 className={`text-asn-red font-medium text-2xl md:text-[42px] xl:text-[56px] ${manual.className}`}>
              Our Blog
            </h2>
            <div className="flex items-center gap-3">
              {/* Carousel Arrows */}
              {optionsList.length > 0 && (
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className={`w-10 h-10 rounded-full border border-asn-red/20 flex items-center justify-center transition-all ${
                      canScrollLeft
                        ? 'text-asn-red hover:bg-asn-red hover:text-white'
                        : 'text-asn-red/20 cursor-not-allowed'
                    }`}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className={`w-10 h-10 rounded-full border border-asn-red/20 flex items-center justify-center transition-all ${
                      canScrollRight
                        ? 'text-asn-red hover:bg-asn-red hover:text-white'
                        : 'text-asn-red/20 cursor-not-allowed'
                    }`}
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
              <Link
                href="/blog"
                className="flex items-center gap-2 text-asn-red hover:opacity-90 transition-opacity text-sm md:text-base font-medium"
              >
                Go to blog
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </FadeInUp>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-[60px] w-[60px]">
              <PageButtonLoader />
            </div>
          </div>
        ) : (
          <FadeInUp delay={100}>
            <div
              ref={scrollRef}
              className="flex gap-5 xl:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-1 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
              {optionsList?.map((option) => (
                <div key={option?.id} className="snap-start flex-shrink-0">
                  <BlogCard data={option} />
                </div>
              ))}
            </div>
          </FadeInUp>
        )}
      </div>
    </section>
  )
}

export default BlogSectionHome