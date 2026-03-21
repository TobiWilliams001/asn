'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, Package, Video, FileText, Loader2, ArrowRight } from 'lucide-react';
import { getPublishedResources, Resource } from '@/services/resourceService';

export default function ResourcesHubPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      const data = await getPublishedResources();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  }

  const stats = {
    jobs: resources.filter(r => r.type === 'job').length,
    toolkits: resources.filter(r => r.type === 'toolkit').length,
    videos: resources.filter(r => r.type === 'video').length,
    articles: resources.filter(r => r.type === 'article').length,
  };

  const categories = [
    {
      type: 'job',
      title: 'Job Board',
      description: 'Browse opportunities from top companies',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      count: stats.jobs,
    },
    {
      type: 'toolkit',
      title: 'Toolkits & Templates',
      description: 'Download resources to accelerate your career',
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      count: stats.toolkits,
    },
    {
      type: 'video',
      title: 'Video Library',
      description: 'Watch curated educational content',
      icon: Video,
      color: 'from-emerald-500 to-emerald-600',
      count: stats.videos,
    },
    {
      type: 'article',
      title: 'Articles & Guides',
      description: 'Read industry insights and expert advice',
      icon: FileText,
      color: 'from-amber-500 to-amber-600',
      count: stats.articles,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Hero Section */}
      <div className="border-b border-[#382929] bg-gradient-to-r from-[#181111] to-[#0f0909]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Resource Hub
            </h1>
            <p className="text-lg text-[#b89d9f]">
              Access curated opportunities, tools, and learning materials to accelerate your career journey.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.type}
                href={`/learn/resources/${category.type}`}
                className="group relative bg-[#261c1c] border border-[#382929] rounded-2xl p-8 hover:bg-[#2d2222] hover:border-[#533c3d] transition-all overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-black text-white">{category.title}</h2>
                      <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#1a1314] text-[#b89d9f]">
                        {category.count}
                      </span>
                    </div>
                    <p className="text-[#b89d9f]">{category.description}</p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-[#ea2a33] font-bold group-hover:gap-3 transition-all">
                    <span>Browse {category.title}</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Resources Preview */}
        {resources.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-white">Recently Added</h2>
              <Link href="/learn/resources/all" className="text-sm font-bold text-[#ea2a33] hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resources.slice(0, 3).map((resource) => (
                <Link
                  key={resource.id}
                  href={`/learn/resources/${resource.type}/${resource.id}`}
                  className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6 hover:bg-[#2d2222] hover:border-[#533c3d] transition-all"
                >
                  {resource.imageUrl && (
                    <div className="w-full h-40 rounded-xl bg-[#1a1314] mb-4 overflow-hidden">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b89d9f]">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-[#b89d9f] line-clamp-2">
                    {resource.description}
                  </p>
                  {resource.company && (
                    <p className="text-xs text-[#b89d9f] mt-3">
                      {resource.company} • {resource.location}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}