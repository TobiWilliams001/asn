'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Home, BookOpen, Rocket, FolderOpen, FileText } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center px-4 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ea2a33] rounded-full mix-blend-multiply filter blur-[140px] opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#c41e3a] rounded-full mix-blend-multiply filter blur-[140px] opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#8b1625] rounded-full mix-blend-multiply filter blur-[140px] opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-3xl w-full text-center relative z-10">
        
        <div className="mb-8 animate-in fade-in zoom-in duration-500">
          <h1 className="text-[10rem] md:text-[14rem] font-black bg-gradient-to-r from-[#ea2a33] to-[#ff6b6b] bg-clip-text text-transparent leading-none mb-4 select-none">
            404
          </h1>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            It might have been moved or doesn&apos;t exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-base transition-all backdrop-blur-sm active:scale-95"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>
          
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ea2a33] to-[#c41e3a] hover:shadow-xl hover:shadow-[#ea2a33]/20 text-white rounded-full font-bold text-base transition-all active:scale-95"
          >
            <Home size={20} />
            Go Home
          </Link>
        </div>

        <div className="pt-10 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
          <p className="text-sm text-gray-500 mb-6 font-semibold uppercase tracking-wider">
            You might be looking for:
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { href: '/learn/dashboard', label: 'Dashboard', icon: BookOpen },
              { href: '/accelerator', label: 'ASAP Program', icon: Rocket },
              { href: '/resources-hub', label: 'Resources', icon: FolderOpen },
              { href: '/blog', label: 'Blog', icon: FileText },
            ].map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 p-3 sm:p-4 bg-[#1a1314]/80 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl hover:border-[#ea2a33]/30 transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#ea2a33]/10 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-[#ea2a33]/20 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#ea2a33]" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-400 group-hover:text-white transition-colors text-center">
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}