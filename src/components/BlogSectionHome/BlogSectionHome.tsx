"use client"
import { useEffect, useState } from "react"
import { manual } from "../../styles/font"
import BlogCard from "./BlogCard"
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore"
import firebase_app from "../../firebase/config"
import { PageButtonLoader } from "../Button/buttonload"
import { ArrowRightIcon } from "../icons/arrow-right"
import Link from "next/link"

const BlogSectionHome = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [optionsList, setOptionsList] = useState<[] | any[]>([])

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

  return (
    <div className="px-4 sm:px-7 md:px-20 lg:px-[80px] xl:px-[120px]">
      {/* Added flex container for header */}
      <div className="flex justify-between items-center pt-8 md:pt-[60px] xl:pt-[150px] pb-[10px] md:pb-[6px]">
        <h1 className={`text-[#CC2630] font-medium text-base md:text-[42px] xl:text-[56px] ${manual.className}`}>
          Our Blog
        </h1>
        {/* Added Go to blog link */}
        <Link
          href="/blog"
          className="flex items-center gap-2 text-[#CC2630] hover:opacity-90 transition-opacity text-sm md:text-base"
        >
          Go to blog
          <ArrowRightIcon />
        </Link>
      </div>

      {isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="h-[60px] w-[60px]">
            <PageButtonLoader />
          </div>
        </div>
      ) : (
        <div className="pb-10 md:pb-16 xl:pb-[121px] flex flex-wrap gap-5 xl:gap-12">
          {optionsList?.map((option) => (
            <BlogCard key={option?.id} data={option} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BlogSectionHome

