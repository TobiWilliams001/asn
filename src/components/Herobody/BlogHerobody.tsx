import React from 'react'

const BlogHerobody = () => {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 xl:px-20">

      {/* Top-left floating badge */}
      <div className="absolute top-28 left-6 md:left-12 xl:left-20">
        <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 backdrop-blur-md rounded-full px-4 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ea2a33] animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.25em]">
            ASNAfrica Insights
          </span>
        </div>
      </div>

      {/* Main content — anchored bottom-left, editorial style */}
      <div className="max-w-6xl fade-in-up">

        {/* Issue label */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <div className="h-px w-12 bg-[#ea2a33]" />
          <span className="text-[#ea2a33] text-[11px] font-black uppercase tracking-[0.3em]">
            The Journal
          </span>
        </div>

        {/* Title — left-aligned, massive */}
        <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.9] tracking-[-0.03em] text-[#FFFDF6] mb-6 md:mb-8">
          Stories for<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ea2a33] to-[#ff8080]">
            Africa's
          </span>{' '}
          Next<br />
          Chapter.
        </h1>

        {/* Subtitle + scroll hint in a row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-16">
          <p className="text-base md:text-lg text-[#dbb8ba] leading-relaxed max-w-md font-light">
            Strategies, stories, and sharp thinking for the next generation of
            African leaders and innovators.
          </p>

          {/* Scroll indicator */}
          <div className="flex items-center gap-3 text-[#b89d9f]/60 sm:ml-auto shrink-0">
            <div className="flex flex-col gap-1">
              <div className="w-px h-8 bg-gradient-to-b from-[#ea2a33] to-transparent mx-auto" />
              <div className="w-1 h-1 rounded-full bg-[#ea2a33] mx-auto animate-bounce" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] rotate-90 origin-left translate-x-3 translate-y-[-0.5rem] whitespace-nowrap hidden md:block">
              Scroll to read
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogHerobody