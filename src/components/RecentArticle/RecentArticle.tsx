"use client"

import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogSectionHome/BlogCard'
import { db } from '../../firebase/config'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const RecentArticle = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<any[]>([])

  useEffect(() => {
    const q = query(collection(db, 'Article'), orderBy('dateAdded', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setArticles(data)
      setIsLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const featured = articles[0]
  const secondary = articles.slice(1, 4)
  const compact = articles.slice(4, 8)
  const rest = articles.slice(8)

  if (isLoading) {
    return (
      <div className="bg-[#181111] min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-[#CC2630]/20 border-t-[#ea2a33] animate-spin mx-auto" />
          <p className="text-[#b89d9f] text-[11px] font-bold uppercase tracking-widest">
            Loading articles…
          </p>
        </div>
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="bg-[#181111] min-h-[40vh] flex items-center justify-center">
        <p className="text-[#b89d9f]/40 text-sm font-bold uppercase tracking-widest">
          No articles yet
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#181111] w-full">
      {/* Smooth gradient join from hero */}
      <div className="h-8 bg-gradient-to-b from-[#1a0d0e] to-[#181111] -mt-1" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-16 pb-20 md:pb-32 space-y-6 md:space-y-8">

        {/* Section header */}
        <div className="flex items-end justify-between gap-6 pb-6 border-b border-[#2a1c1c]">
          <div>
            <p className="text-[10px] font-black text-[#ea2a33] uppercase tracking-[0.3em] mb-2">
              Latest
            </p>
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-black text-white tracking-tight leading-none">
              Recent Articles
            </h2>
          </div>
          <Link
            href="/blog/all"
            className="hidden sm:flex items-center gap-2 text-[#b89d9f] hover:text-white text-sm font-bold transition-colors group shrink-0 pb-1"
          >
            All Articles
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* ── ROW 1: Featured full-width ── */}
        {featured && (
          <BlogCard data={featured} size="featured" index={0} />
        )}

        {/* ── ROW 2: Secondary 1–3 col ── */}
        {secondary.length > 0 && (
          <div className={`grid grid-cols-1 gap-5 md:gap-6 ${secondary.length === 1
            ? 'md:grid-cols-1 max-w-2xl'
            : secondary.length === 2
              ? 'md:grid-cols-2'
              : 'md:grid-cols-3'
            }`}>
            {secondary.map((article, i) => (
              <BlogCard key={article.id} data={article} size="secondary" index={i + 1} />
            ))}
          </div>
        )}

        {/* ── ROW 3: Compact 2–4 col ── */}
        {compact.length > 0 && (
          <>
            {/* Divider with label */}
            <div className="flex items-center gap-4 pt-2">
              <div className="h-px flex-1 bg-[#2a1c1c]" />
              <span className="text-[10px] font-black text-[#b89d9f]/40 uppercase tracking-widest shrink-0">
                More to read
              </span>
              <div className="h-px flex-1 bg-[#2a1c1c]" />
            </div>

            <div className={`grid grid-cols-2 gap-4 md:gap-5 ${compact.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-4'
              }`}>
              {compact.map((article, i) => (
                <BlogCard key={article.id} data={article} size="compact" index={i + 4} />
              ))}
            </div>
          </>
        )}

        {/* ── REST: secondary grid ── */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {rest.map((article, i) => (
              <BlogCard key={article.id} data={article} size="secondary" index={i + 8} />
            ))}
          </div>
        )}

        {/* Mobile all-articles CTA */}
        <div className="sm:hidden flex justify-center pt-2">
          <Link
            href="/blog/all"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#382929] text-sm font-bold text-[#b89d9f] hover:border-[#533c3d] hover:text-white transition-all"
          >
            View All Articles <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default RecentArticle