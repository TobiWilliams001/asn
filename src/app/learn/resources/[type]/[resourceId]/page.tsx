'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Briefcase, MapPin, Clock, Calendar, DollarSign, Download, Play, FileText, Loader2 } from 'lucide-react';
import ResourceTypeBadge from '@/components/admin/ResourceTypeBadge';
import { getResource, Resource } from '@/services/resourceService';

export default function ResourceDetailPage({ params }: { params: { type: string; resourceId: string } }) {
  const { type, resourceId } = params;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource();
  }, [resourceId]);

  async function fetchResource() {
    try {
      const data = await getResource(resourceId);
      setResource(data);
    } catch (error) {
      console.error('Error fetching resource:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
        <div className="text-center">
          <FileText size={48} className="text-[#382929] mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Resource not found</h2>
          <Link
            href="/learn/resources"
            className="inline-block mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
          >
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const getIcon = () => {
    switch (resource.type) {
      case 'job': return Briefcase;
      case 'toolkit': return Download;
      case 'video': return Play;
      case 'article': return FileText;
      default: return FileText;
    }
  };

  const Icon = getIcon();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      {/* Header */}
      <div className="border-b border-[#382929] bg-gradient-to-r from-[#181111] to-[#0f0909]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link
            href={`/learn/resources/${type}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to {type === 'job' ? 'Jobs' : type === 'toolkit' ? 'Toolkits' : type === 'video' ? 'Videos' : 'Articles'}
          </Link>

          <div className="flex items-start gap-6">
            {/* Icon/Image */}
            {resource.imageUrl ? (
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#261c1c] flex-shrink-0">
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#CC2630] to-[#ea2a33] flex items-center justify-center flex-shrink-0">
                <Icon size={48} className="text-white" />
              </div>
            )}

            {/* Title & Badge */}
            <div className="flex-1">
              <div className="mb-3">
                <ResourceTypeBadge type={resource.type} size="md" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
                {resource.title}
              </h1>
              {resource.company && (
                <p className="text-lg text-[#b89d9f]">{resource.company}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-[#b89d9f] leading-relaxed whitespace-pre-wrap">
                {resource.description}
              </p>
            </div>

            {/* Job-Specific Details */}
            {resource.type === 'job' && (
              <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Job Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resource.location && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1314] flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-[#ea2a33]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Location</p>
                        <p className="text-white font-semibold">{resource.location}</p>
                      </div>
                    </div>
                  )}

                  {resource.jobType && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1314] flex items-center justify-center flex-shrink-0">
                        <Briefcase size={20} className="text-[#ea2a33]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Job Type</p>
                        <p className="text-white font-semibold capitalize">{resource.jobType.replace('-', ' ')}</p>
                      </div>
                    </div>
                  )}

                  {resource.salary && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1314] flex items-center justify-center flex-shrink-0">
                        <DollarSign size={20} className="text-[#ea2a33]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Salary</p>
                        <p className="text-white font-semibold">{resource.salary}</p>
                      </div>
                    </div>
                  )}

                  {resource.deadline && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1a1314] flex items-center justify-center flex-shrink-0">
                        <Calendar size={20} className="text-[#ea2a33]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Deadline</p>
                        <p className="text-white font-semibold">
                          {new Date(resource.deadline).toLocaleDateString('en-US', { 
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Video-Specific Details */}
            {resource.type === 'video' && resource.duration && (
              <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1314] flex items-center justify-center">
                    <Clock size={20} className="text-[#ea2a33]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Duration</p>
                    <p className="text-white font-semibold">{resource.duration} minutes</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] rounded-2xl p-6 sticky top-8">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold hover:shadow-lg transition-all"
              >
                {resource.type === 'job' && 'Apply Now'}
                {resource.type === 'toolkit' && 'Download'}
                {resource.type === 'video' && 'Watch Now'}
                {resource.type === 'article' && 'Read Article'}
                <ExternalLink size={20} />
              </a>

              <p className="text-xs text-[#b89d9f] text-center mt-4">
                Opens in a new window
              </p>
            </div>

            {/* Category Card */}
            <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f] mb-3">Category</h3>
              <p className="text-white font-semibold">{resource.category}</p>
            </div>

            {/* Additional Info */}
            {resource.fileType && (
              <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f] mb-3">File Type</h3>
                <p className="text-white font-semibold uppercase">{resource.fileType}</p>
              </div>
            )}

            {resource.platform && (
              <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f] mb-3">Platform</h3>
                <p className="text-white font-semibold capitalize">{resource.platform}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
