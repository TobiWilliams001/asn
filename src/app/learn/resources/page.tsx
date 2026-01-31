// src/app/learn/resources/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock resource data
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
    downloads: 156
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
    downloads: 89
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
    downloads: 134
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
    downloads: 102
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
    downloads: 78
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
    downloads: 145
  }
];

const CATEGORIES = ['All', 'Career', 'Corporate', 'Design Thinking', 'Leadership', 'General'];

export default function ResourceLabPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#181111] text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <Link 
            href="/learn/dashboard"
            className="inline-flex items-center text-[#b89d9f] hover:text-white mb-4 text-sm"
          >
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black mb-2">Resource Lab</h1>
          <p className="text-[#b89d9f]">Curated materials to support your learning journey</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-[#261c1c] border border-[#382929] rounded-lg text-white placeholder-[#b89d9f] focus:outline-none focus:border-[#ea2a33]"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-[#ea2a33] text-white'
                    : 'bg-[#261c1c] text-[#b89d9f] hover:bg-[#382929]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-[#b89d9f]">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-[#261c1c] border border-[#382929] rounded-xl p-6 hover:border-[#533c3d] transition-all flex flex-col"
              >
                {/* Resource Icon & Type */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[#181111] rounded-lg text-[#ea2a33]">
                    <span className="text-3xl">&#128196;</span>
                  </div>
                  <span className="px-3 py-1 bg-[#382929] text-[#b89d9f] rounded-full text-xs font-bold">
                    {resource.type}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-[#ea2a33]/10 text-[#ea2a33] rounded text-xs font-bold uppercase">
                    {resource.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                <p className="text-sm text-[#b89d9f] mb-4 flex-1">{resource.description}</p>

                {/* Meta Info */}
                <div className="text-xs text-[#b89d9f] mb-4 pt-4 border-t border-[#382929]">
                  <p className="mb-1">Uploaded by {resource.uploadedBy}</p>
                  <p>{resource.downloads} downloads</p>
                </div>

                {/* Download Button */}
                <a
                  href={resource.fileUrl}
                  download
                  className="w-full px-4 py-3 bg-[#ea2a33] hover:bg-[#c41f27] text-white text-sm font-bold rounded-lg transition-colors text-center"
                >
                  Download Resource
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mb-4 text-6xl opacity-20">&#128269;</div>
            <h3 className="text-xl font-bold mb-2">No resources found</h3>
            <p className="text-[#b89d9f] mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-[#382929] hover:bg-[#4a3636] text-white font-bold rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Info Banner - V2 Feature */}
        <div className="mt-10 bg-[#261c1c] border border-[#382929] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">&#128161;</div>
            <div>
              <h4 className="font-bold mb-2">Want to contribute?</h4>
              <p className="text-sm text-[#b89d9f]">
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