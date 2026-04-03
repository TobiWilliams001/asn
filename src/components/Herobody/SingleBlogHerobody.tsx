import dayjs from 'dayjs'
import Link from 'next/link';
import React from 'react'
import { Clock, User, Calendar, Edit3 } from 'lucide-react';

const SingleBlogHerobody = ({articleData, edit, id}: {articleData: any, edit: boolean, id: string}) => {
    const calculateReadingTime = (text: any) => {
        if (!text) return 1;
        const wordsPerMinute = 250;
        const words = text.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const readingTime = calculateReadingTime(articleData?.body);

    return (
        <div className="w-full flex flex-col justify-center items-center py-16 md:py-24 px-6 min-h-[60vh]">
            <div className='flex flex-col items-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000'>
                {/* Category & Time */}
                <div className='flex items-center gap-4 text-white/80 font-bold uppercase tracking-widest text-xs md:text-sm'>
                    <span className="px-3 py-1 bg-[#ea2a33] text-white rounded-md">{articleData?.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40"></span>
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#ea2a33]" />
                        <span>{readingTime} min read</span>
                    </div>
                </div>

                {/* Title & Description */}
                <div className='text-center space-y-6'>
                    <h1 className='text-4xl md:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight'>
                        {articleData?.title}
                    </h1>
                    <p className='text-xl md:text-2xl text-[#dbb8ba] font-light leading-relaxed max-w-3xl mx-auto italic'>
                        "{articleData?.description}"
                    </p>
                </div>

                {/* Author & Date */}
                <div className='flex flex-wrap justify-center items-center gap-6 text-white/70 text-sm md:text-base border-t border-white/10 pt-8 w-full max-w-2xl'>
                    <div className="flex items-center gap-2">
                        <User size={18} className="text-[#ea2a33]" />
                        <span className="font-bold text-white capitalize">{articleData?.author || "ASN"}</span>
                    </div>
                    <span className="hidden md:block w-1 h-1 rounded-full bg-white/20"></span>
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-[#ea2a33]" />
                        <span>
                            {(articleData?.dateAdded?.seconds) 
                                ? dayjs((articleData?.dateAdded?.seconds * 1000) + Math.floor(articleData?.dateAdded?.nanoseconds / 1000000)).format("MMMM DD, YYYY") 
                                : dayjs().format("MMMM DD, YYYY")
                            }
                        </span>
                    </div>
                    {edit && (
                        <>
                            <span className="hidden md:block w-1 h-1 rounded-full bg-white/20"></span>
                            <Link 
                                href={`/edit/blog/${id}`} 
                                className="flex items-center gap-2 text-[#ea2a33] hover:text-white transition-colors font-bold"
                            >
                                <Edit3 size={16} />
                                Edit Article
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SingleBlogHerobody