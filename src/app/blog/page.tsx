'use client'

import React from 'react'
import BlogHero from '@/components/Hero/BlogHero'
import Footer from '@/components/Footer/Footer'
import RecentArticle from '@/components/RecentArticle/RecentArticle'

const BlogPage = () => {
  return (
    <main className="min-h-screen w-full bg-[#181111]">
      {/* Hero */}
      <section className="relative">
        <BlogHero />
      </section>

      {/* Articles — overlap the hero slightly for depth */}
      <section className="relative z-10 -mt-16 md:-mt-24">
        <RecentArticle />
      </section>

      <Footer />
    </main>
  )
}

export default BlogPage