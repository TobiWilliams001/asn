'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Loader2, FileText } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { getAllApplications, Application } from '@/services/adminService';

export default function ApplicationsListPage() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams?.get('status') as 'pending' | 'accepted' | 'rejected' | null;

  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(statusFilter || 'all');

  useEffect(() => {
    async function fetchApplications() {
      try {
        const apps = await getAllApplications();
        setApplications(apps);
        setFilteredApps(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...applications];

    // Status filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(app => app.status === activeFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(app => 
        app.personalInfo.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.personalInfo.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredApps(filtered);
  }, [activeFilter, searchQuery, applications]);

  const stats = {
    all: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Applications</h1>
        <p className="text-[#b89d9f]">Review and manage ASAP enrollment applications</p>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            All ({stats.all})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'pending'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setActiveFilter('accepted')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'accepted'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Accepted ({stats.accepted})
          </button>
          <button
            onClick={() => setActiveFilter('rejected')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'rejected'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Rejected ({stats.rejected})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b89d9f]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#261c1c] border border-[#382929] text-white placeholder-[#b89d9f] focus:border-[#ea2a33] focus:ring-2 focus:ring-[#ea2a33]/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <Link
              key={app.id}
              href={`/learn/admin/applications/${app.id}`}
              className="block bg-[#261c1c] border border-[#382929] rounded-2xl p-6 hover:bg-[#2d2222] hover:border-[#533c3d] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{app.personalInfo.fullName}</h3>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <p className="text-sm text-[#b89d9f] mb-3">{app.personalInfo.email}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f] capitalize">
                      {app.track} Track
                    </span>
                    <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                      {app.personalInfo.country}
                    </span>
                    <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                      {app.academicInfo.university}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#b89d9f] mb-1">Submitted</p>
                  <p className="text-sm font-semibold text-white">
                    {app.submittedAt?.toDate?.()?.toLocaleDateString?.('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) || 'Recently'}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-12 text-center">
            <FileText size={48} className="text-[#382929] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No applications found</h3>
            <p className="text-[#b89d9f]">
              {searchQuery ? 'Try a different search term' : 'No applications match the selected filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
