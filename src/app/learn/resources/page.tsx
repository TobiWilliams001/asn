'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Search, Lightbulb } from 'lucide-react';

const MOCK_RESOURCES = [
  {
    id: 'res-1',
    title: 'Professional Resume Template',
    description: 'ATS-friendly resume template optimized for African markets',
    category: 'Career',
    type: 'PDF',
    fileUrl: '#',
    uploadedBy: 'ASN Team',
    uploadedAt: new Date('2024-01-15'),
    downloads: 156,
  },
  {
    id: 'res-2',
    title: 'Industry Research Guide',
    description: 'Step-by-step framework for conducting industry analysis',
    category: 'Corporate',
    type: 'PDF',
    fileUrl: '#',
    uploadedBy: 'ASN Team',
    uploadedAt: new Date('2024-01-20'),
    downloads: 89,
  },
  {
    id: 'res-3',
    title: 'Design Thinking Canvas',
    description: 'Visual template for mapping your design thinking process',
    category: 'Design Thinking',
    type: 'PDF',
    fileUrl: '#',
    uploadedBy: 'ASN Team',
    uploadedAt: new Date('2024-02-01'),
    downloads: 134,
  },
  {
    id: 'res-4',
    title: 'Leadership Self-Assessment Tool',
    description: 'Evaluate your leadership strengths and growth areas',
    category: 'Leadership',
    type: 'PDF',
    fileUrl: '#',
    uploadedBy: 'ASN Team',
    uploadedAt: new Date('2024-02-10'),
    downloads: 102,
  },
  {
    id: 'res-5',
    title: 'Action Plan Template',
    description: 'Strategic planning template for your career goals',
    category: 'Career',
    type: 'PDF',
    fileUrl: '#',
    uploadedBy: 'ASN Team',
    uploadedAt: new Date('2024-02-15'),
    downloads: 78,
  },
  {
    id: 'res-6',
    title: 'Corporate Email Etiquette Guide',
    description: 'Best practices for professional communication in African corporate environments',
    category: 'Corporate',
    type: 'PDF',
    fileUrl: '#',
    uploadedBy: 'ASN Team',
    uploadedAt: new Date('2024-03-01'),
    downloads: 145,
  },
];

const CATEGORIES = ['All', 'Career', 'Corporate', 'Design Thinking', 'Leadership', 'General'];

export default function ResourceLabPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = MOCK_RESOURCES.filter((resource) => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#181111] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <Link
            href="/learn/dashboard"
            className="inline-flex items-center text-[#b89d9f] hover:text-white mb-4 text-sm transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Resource Lab</h1>
          <p className="text-[#b89d9f] text-sm sm:text-base">
            Curated materials to support your learning journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#b89d9f]" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#261c1c] border border-[#382929] rounded-lg text-white text-sm placeholder-[#b89d9f]/60 focus:outline-none focus:border-[#ea2a33]/50 transition-colors"
              data-testid="input-search-resources"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#ea2a33]/15 text-[#ea2a33] border border-[#ea2a33]/20'
                    : 'bg-[#261c1c] text-[#b89d9f] border border-[#382929] hover:text-white hover:border-[#4a3636]'
                }`}
                data-testid={`button-filter-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-xs text-[#b89d9f]/70 mb-5">
          Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-[#261c1c] border border-[#382929] rounded-xl p-5 sm:p-6 hover:border-[#4a3636] transition-all duration-200 flex flex-col group"
                data-testid={`card-resource-${resource.id}`}
              >
                {/* Resource Icon & Type */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#181111] border border-[#382929] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#ea2a33]" />
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#382929] text-[#b89d9f] rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {resource.type}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-0.5 bg-[#ea2a33]/10 text-[#ea2a33] rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {resource.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base font-bold mb-2 group-hover:text-[#ea2a33] transition-colors leading-snug">
                  {resource.title}
                </h3>
                <p className="text-sm text-[#b89d9f] mb-4 flex-1 leading-relaxed">
                  {resource.description}
                </p>

                {/* Meta Info */}
                <div className="text-xs text-[#b89d9f]/60 mb-4 pt-4 border-t border-[#382929]/60">
                  <p className="mb-0.5">By {resource.uploadedBy}</p>
                  <p>{resource.downloads.toLocaleString()} downloads</p>
                </div>

                {/* Download Button */}
                <a
                  href={resource.fileUrl}
                  download
                  className="w-full px-4 py-2.5 sm:py-3 bg-[#ea2a33] hover:bg-[#c41f27] text-white text rounded-lg transition-colors text-center flex items-center justify-center gap-2"
                  data-testid={`button-download-${resource.id}`}
                >
                  <Download className="w-4 h-4" />
                  Download Resource
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20">
            <div className="w-14 h-14 bg-[#261c1c] border border-[#382929] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-[#b89d9f]/30" />
            </div>
            <h3 className="text-lg font-bold mb-2">No resources found</h3>
            <p className="text-[#b89d9f] text-sm mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2.5 bg-[#382929] hover:bg-[#4a3636] text-white text-sm font-semibold rounded-lg transition-colors"
              data-testid="button-clear-filters"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-8 sm:mt-10 bg-[#261c1c] border border-[#382929] rounded-xl p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-sm mb-1">Want to contribute?</h4>
              <p className="text-sm text-[#b89d9f] leading-relaxed">
                Resource contribution features are coming soon. You&apos;ll be able to upload and share
                your own materials with the ASN community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}