import dayjs from 'dayjs'
import React from 'react'
import { User, Calendar, Quote } from 'lucide-react';

const BlogContent = ({articleData}: {articleData: any}) => {
  return (
    <div className='bg-white/[0.02] border-y border-white/5'>
        <div className='max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24'>
            {/* Main Content Area */}
            <div 
                className='prose prose-invert prose-lg md:prose-xl max-w-none 
                    prose-headings:text-white prose-headings:font-black 
                    prose-p:text-[#b89d9f] prose-p:leading-[1.8] 
                    prose-strong:text-white prose-strong:font-bold
                    prose-a:text-[#ea2a33] prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-2xl prose-img:shadow-2xl
                    blog_content_refined' 
                dangerouslySetInnerHTML={{ __html: articleData?.body}} 
            />
            
            {/* Author Footer Card */}
            <div className='mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#261c1c] to-[#1a1111] border border-white/10 relative overflow-hidden'>
                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 rounded-2xl bg-[#ea2a33] flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-[#ea2a33]/20">
                        {(articleData?.author || "ASN").charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="text-center md:text-left space-y-4">
                        <div className="space-y-1">
                            <p className='text-[#ea2a33] text-xs font-black uppercase tracking-[0.2em]'>Written By</p>
                            <p className='text-3xl font-black text-white capitalize'>{articleData?.author || "ASN"}</p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-[#b89d9f] text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#ea2a33]" />
                                <span>
                                    {(articleData?.dateAdded?.seconds) 
                                        ? dayjs((articleData?.dateAdded?.seconds * 1000) + Math.floor(articleData?.dateAdded?.nanoseconds / 1000000)).format("MMMM DD, YYYY") 
                                        : dayjs().format("MMMM DD, YYYY")
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style jsx global>{`
            .blog_content_refined p {
                margin-bottom: 2rem;
            }
            .blog_content_refined h2, .blog_content_refined h3 {
                margin-top: 3rem;
                margin-bottom: 1.5rem;
            }
        `}</style>
    </div>
  )
}

export default BlogContent