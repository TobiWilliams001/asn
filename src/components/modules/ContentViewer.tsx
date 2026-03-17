'use client';

import { ExternalLink, Download, FileText, ArrowUpRight } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface ContentViewerProps {
  contentType: 'video' | 'article' | 'pdf';
  title: string;
  videoUrl?: string;
  articleUrl?: string;
  pdfUrl?: string;
}

export default function ContentViewer({
  contentType,
  title,
  videoUrl,
  articleUrl,
  pdfUrl,
}: ContentViewerProps) {
  if (contentType === 'video' && videoUrl) {
    return <VideoPlayer videoUrl={videoUrl} title={title} />;
  }

  const isArticle = contentType === 'article' && articleUrl;
  const isPdf = contentType === 'pdf' && pdfUrl;

  if (isArticle || isPdf) {
    const href = isArticle ? articleUrl! : pdfUrl!;
    const label = isPdf ? 'Download PDF' : 'Open Article';
    const hint = isPdf
      ? 'A downloadable resource for this lesson. Open or save the document below.'
      : 'This lesson is an external article. Open it in a new tab, then return here to mark complete.';
    const typeLabel = isPdf ? 'PDF Resource' : 'External Article';

    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#261c1c] to-[#181111] relative overflow-hidden">

        {/* Subtle background texture — two faint rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full border border-[#382929]/60" />
          <div className="absolute w-96 h-96 rounded-full border border-[#382929]/30" />
        </div>
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#CC2630]/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xs w-full text-center px-6 py-10">

          {/* Type label */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#CC2630]/10 border border-[#CC2630]/20 rounded-full text-[10px] font-black text-[#ea2a33] uppercase tracking-widest mb-6">
            {isPdf ? <Download size={10} /> : <ArrowUpRight size={10} />}
            {typeLabel}
          </span>

          {/* Icon */}
          <div className="relative w-16 h-16 mx-auto mb-5">
            {/* Ring pulse */}
            <div className="absolute inset-0 rounded-2xl bg-[#CC2630]/10 animate-pulse" />
            <div className="relative w-full h-full rounded-2xl bg-[#2d2222] border border-[#382929] flex items-center justify-center">
              <FileText size={26} className="text-[#ea2a33]" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-black text-white leading-snug mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Hint */}
          <p className="text-xs text-[#b89d9f] leading-relaxed mb-7">{hint}</p>

          {/* CTA */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            download={isPdf}
            className="
              inline-flex items-center gap-2
              px-6 py-3 rounded-xl w-full justify-center
              bg-gradient-to-r from-[#CC2630] to-[#ea2a33]
              text-white text-[11px] font-black uppercase tracking-widest
              hover:shadow-lg hover:shadow-[#CC2630]/30 active:scale-[0.98]
              transition-all duration-200
            "
          >
            {isPdf ? <Download size={14} /> : <ExternalLink size={14} />}
            {label}
          </a>

          {/* Reassurance note */}
          <p className="text-[10px] text-[#b89d9f]/40 mt-4 leading-relaxed">
            {isPdf
              ? 'Opens in a new tab'
              : 'Come back here after reading to mark complete'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[#181111]">
      <p className="text-xs text-[#b89d9f]/40 font-bold uppercase tracking-widest">
        Content not available
      </p>
    </div>
  );
}