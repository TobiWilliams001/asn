import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { Calendar, ArrowUpRight } from 'lucide-react'

type CardSize = 'featured' | 'secondary' | 'compact'

interface BlogCardProps {
    data: any
    size?: CardSize
    index?: number
}

const formattedDate = (data: any) =>
    data?.dateAdded?.seconds
        ? dayjs(data.dateAdded.seconds * 1000).format('MMM DD, YYYY')
        : dayjs().format('MMM DD, YYYY')


function FeaturedCard({ data, index }: { data: any; index: number }) {
    return (
        <div
            className="group fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <Link href={`/blog/${data?.id}`} className="block">
                <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
                    {/* Image */}
                    <Image
                        priority
                        src={data?.image}
                        fill
                        alt={data?.title || 'Featured article'}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Gradient — darker on the left third for text, lighter on right */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#130a0a] via-[#130a0a]/70 to-[#130a0a]/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130a0a]/80 via-transparent to-transparent" />

                    {/* Red tint on hover */}
                    <div className="absolute inset-0 bg-[#CC2630]/0 group-hover:bg-[#CC2630]/6 transition-colors duration-500" />

                    {/* Content — left aligned */}
                    <div className="absolute inset-0 flex flex-col justify-between p-7 md:p-10">
                        {/* Top row */}
                        <div className="flex items-start justify-between">
                            {data?.category && (
                                <span className="px-3 py-1 rounded-full bg-[#CC2630] text-white text-[10px] font-black uppercase tracking-widest">
                                    {data.category}
                                </span>
                            )}
                            <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 ml-auto">
                                <ArrowUpRight size={15} className="text-white" />
                            </div>
                        </div>

                        {/* Bottom — title area, max half width on desktop */}
                        <div className="max-w-full md:max-w-[60%] space-y-4">
                            <div className="flex items-center gap-2 text-[#b89d9f] text-[11px] font-medium">
                                <Calendar size={12} className="text-[#ea2a33]" />
                                {formattedDate(data)}
                            </div>

                            <h2 className="text-white font-black text-2xl md:text-4xl xl:text-5xl leading-tight group-hover:text-[#EEB7BA] transition-colors duration-300">
                                {data?.title}
                            </h2>

                            {data?.excerpt && (
                                <p className="text-[#b89d9f] text-sm leading-relaxed line-clamp-2 hidden md:block">
                                    {data.excerpt}
                                </p>
                            )}

                            {/* Read CTA */}
                            <div className="inline-flex items-center gap-2 pt-1">
                                <span className="text-[#ea2a33] text-[11px] font-black uppercase tracking-widest">
                                    Read Article
                                </span>
                                <div className="h-px w-8 bg-[#ea2a33]/50 group-hover:w-14 transition-all duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Inset border on hover */}
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500" />
                </div>
            </Link>
        </div>
    )
}

/* ─────────────────────────────────────────
   SECONDARY — portrait card, title bottom
───────────────────────────────────────── */
function SecondaryCard({ data, index }: { data: any; index: number }) {
    return (
        <div
            className="group h-full fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <Link href={`/blog/${data?.id}`} className="block h-full">
                <div className="relative w-full h-[380px] md:h-[440px] rounded-2xl overflow-hidden">
                    <Image
                        src={data?.image}
                        fill
                        alt={data?.title || 'Article'}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130a0a] via-[#130a0a]/50 to-transparent" />
                    <div className="absolute inset-0 bg-[#CC2630]/0 group-hover:bg-[#CC2630]/6 transition-colors duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
                        {/* Top */}
                        <div className="flex items-start justify-between">
                            {data?.category && (
                                <span className="px-3 py-1 rounded-full bg-[#CC2630] text-white text-[10px] font-black uppercase tracking-widest">
                                    {data.category}
                                </span>
                            )}
                            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 ml-auto">
                                <ArrowUpRight size={13} className="text-white" />
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="space-y-2.5">
                            <div className="flex items-center gap-2 text-[#b89d9f] text-[11px]">
                                <Calendar size={11} className="text-[#ea2a33]" />
                                {formattedDate(data)}
                            </div>

                            <h3 className="text-white font-black text-lg md:text-xl leading-snug group-hover:text-[#EEB7BA] transition-colors duration-300">
                                {data?.title}
                            </h3>

                            {/* Slide-up read CTA */}
                            <div className="h-4 overflow-hidden">
                                <div className="flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-[#ea2a33] text-[10px] font-black uppercase tracking-widest">
                                        Read Article
                                    </span>
                                    <div className="h-px w-5 bg-[#ea2a33]/40" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500" />
                </div>
            </Link>
        </div>
    )
}

/* ─────────────────────────────────────────
   COMPACT — landscape thumbnail card
───────────────────────────────────────── */
function CompactCard({ data, index }: { data: any; index: number }) {
    return (
        <div
            className="group fade-in-up"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <Link href={`/blog/${data?.id}`} className="block">
                <div className="relative w-full h-[200px] md:h-[240px] rounded-xl overflow-hidden">
                    <Image
                        src={data?.image}
                        fill
                        alt={data?.title || 'Article'}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#130a0a] via-[#130a0a]/40 to-transparent" />
                    <div className="absolute inset-0 bg-[#CC2630]/0 group-hover:bg-[#CC2630]/6 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                        {data?.category && (
                            <span className="self-start px-2.5 py-1 rounded-full bg-[#CC2630] text-white text-[9px] font-black uppercase tracking-widest">
                                {data.category}
                            </span>
                        )}
                        <div>
                            <p className="text-[#b89d9f] text-[10px] mb-1.5 flex items-center gap-1.5">
                                <Calendar size={10} className="text-[#ea2a33]" />
                                {formattedDate(data)}
                            </p>
                            <h4 className="text-white font-black text-sm leading-snug group-hover:text-[#EEB7BA] transition-colors line-clamp-2">
                                {data?.title}
                            </h4>
                        </div>
                    </div>

                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/0 group-hover:ring-white/10 transition-all duration-500" />
                </div>
            </Link>
        </div>
    )
}

/* ─────────────────────────────────────────
   MAIN EXPORT — routes to correct variant
───────────────────────────────────────── */
export default function BlogCard({ data, size = 'secondary', index = 0 }: BlogCardProps) {
    if (size === 'featured') return <FeaturedCard data={data} index={index} />
    if (size === 'compact') return <CompactCard data={data} index={index} />
    return <SecondaryCard data={data} index={index} />
}