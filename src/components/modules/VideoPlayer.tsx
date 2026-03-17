'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract video ID from YouTube URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('embed')) return url;
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  };

  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="relative w-full bg-[#0a0506] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50" style={{ paddingBottom: '56.25%' }}>
      {!isPlaying ? (
        <div 
          className="absolute inset-0 cursor-pointer group z-10"
          onClick={() => setIsPlaying(true)}
        >
          {/* Immersive Thumbnail Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0909] via-[#181111]/40 to-transparent flex flex-col items-center justify-center p-8 text-center transition-all duration-700 group-hover:bg-black/20">
            <div className="relative">
              {/* Pulsing ring effect */}
              <div className="absolute inset-0 rounded-full bg-[#ea2a33] blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-700 animate-pulse" />
              
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#CC2630] to-[#ea2a33] flex items-center justify-center shadow-[0_0_40px_rgba(234,42,51,0.4)] group-hover:scale-110 group-active:scale-95 transition-all duration-500">
                <Play size={44} className="text-white ml-2 md:w-14 md:h-14" fill="white" />
              </div>
            </div>
            
            <div className="mt-8 transform transition-all duration-500 group-hover:translate-y-[-4px]">
              <p className="text-[10px] md:text-xs font-black text-[#ea2a33] uppercase tracking-[0.3em] mb-2 opacity-80">Now Playing</p>
              <h3 className="text-xl md:text-3xl font-black text-white max-w-2xl balance">{title}</h3>
            </div>
          </div>
          
          {/* Grainy Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
      ) : (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
