'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Rocket, ArrowLeft } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ComingSoonPage() {
  return (
    <ProtectedRoute>
      <ComingSoonContent />
    </ProtectedRoute>
  );
}

function ComingSoonContent() {
  const searchParams = useSearchParams();
  const feature = searchParams.get('feature') || 'This feature';

  // Map feature names to display text
  const featureNames: Record<string, string> = {
    asap: 'ASAP Program',
    resources: 'Resource Hub',
    community: 'Community',
    mentorship: 'Mentorship',
  };

  const displayName = featureNames[feature] || 'This feature';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#ea2a33]/10 border border-[#ea2a33]/20 flex items-center justify-center">
            <Rocket className="w-12 h-12 text-[#ea2a33]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {displayName} <span className="text-[#ea2a33]">Coming Soon</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          We&apos;re working hard to bring you this feature. Stay tuned for updates!
        </p>

        {/* CTA Button */}
        <Link
          href="/learn/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ea2a33] hover:bg-[#b91c1c] text-white font-semibold rounded-lg transition-all shadow-lg shadow-[#ea2a33]/20 hover:shadow-[#ea2a33]/30"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}