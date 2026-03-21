'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Loader2, Briefcase, MapPin, Clock, ExternalLink, ArrowLeft } from 'lucide-react';
import ResourceTypeBadge from '@/components/admin/ResourceTypeBadge';
import { getPublishedResources, Resource, ResourceType } from '@/services/resourceService';

export default function ResourcesListPage({ params }: { params: { type: string } }) {
  const { type } = params;
  const resourceType = type === 'all' ? undefined : (type as ResourceType);

  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchResources();
  }, [resourceType]);

  useEffect(() => {
    let filtered = [...resources];

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(r => r.category === categoryFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredResources(filtered);
  }, [categoryFilter, searchQuery, resources]);

  async function fetchResources() {
    try {
      const data = await getPublishedResources(resourceType);
      setResources(data);
      setFilteredResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  }

  // Get unique categories
  const categories = Array.from(new Set(resources.map(r => r.category)));

  const pageTitle = {
    job: 'Job Board',
    toolkit: 'Toolkits & Templates',
    video: 'Video Library',
    article: 'Articles & Guides',
    all: 'All Resources',
  }[type] || 'Resources';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Header */}
      <div className="border-b border-[#382929] bg-gradient-to-r from-[#181111] to-[#0f0909]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            href="/learn/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Resource Hub
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">{pageTitle}</h1>
              <p className="text-[#b89d9f]">{filteredResources.length} resources available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b89d9f]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#261c1c] border border-[#382929] text-white placeholder-[#b89d9f] focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
            />
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategoryFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  categoryFilter === 'all'
                    ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                    : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    categoryFilter === category
                      ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                      : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Link
                key={resource.id}
                href={`/learn/resources/${resource.type}/${resource.id}`}
                className="group bg-[#261c1c] border border-[#382929] rounded-2xl overflow-hidden hover:bg-[#2d2222] hover:border-[#533c3d] transition-all"
              >
                {/* Image */}
                {resource.imageUrl && (
                  <div className="w-full h-48 bg-[#1a1314] overflow-hidden">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Type Badge */}
                  <div className="mb-3">
                    <ResourceTypeBadge type={resource.type} size="sm" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-[#ea2a33] transition-colors">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#b89d9f] mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2">
                    {resource.company && (
                      <div className="flex items-center gap-2 text-xs text-[#b89d9f]">
                        <Briefcase size={14} />
                        <span>{resource.company}</span>
                      </div>
                    )}
                    {resource.location && (
                      <div className="flex items-center gap-2 text-xs text-[#b89d9f]">
                        <MapPin size={14} />
                        <span>{resource.location}</span>
                      </div>
                    )}
                    {resource.duration && (
                      <div className="flex items-center gap-2 text-xs text-[#b89d9f]">
                        <Clock size={14} />
                        <span>{resource.duration} min</span>
                      </div>
                    )}
                  </div>

                  {/* Category Tag */}
                  <div className="mt-4 pt-4 border-t border-[#382929]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b89d9f]">
                      {resource.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-12 text-center">
            <Filter size={48} className="text-[#382929] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No resources found</h3>
            <p className="text-[#b89d9f]">
              {searchQuery ? 'Try a different search term' : 'Check back later for new resources'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
