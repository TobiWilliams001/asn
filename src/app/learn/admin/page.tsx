'use client';

import { useEffect, useState } from 'react';
import { FileText, Users, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import Link from 'next/link';
import { getDashboardStats, getAllApplications } from '@/services/adminService';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalEnrolled: 0,
    averageCompletion: 0,
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [dashStats, allApps] = await Promise.all([
          getDashboardStats(),
          getAllApplications()
        ]);
        
        setStats(dashStats);
        setRecentApplications(allApps.slice(0, 5)); // Latest 5
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-[#261c1c] rounded w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-40 bg-[#261c1c] rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Admin Dashboard</h1>
        <p className="text-[#b89d9f]">Overview of ASAP program management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={FileText}
          description="All time submissions"
        />
        <StatsCard
          title="Pending Review"
          value={stats.pendingApplications}
          icon={Clock}
          description="Awaiting decision"
        />
        <StatsCard
          title="Enrolled Students"
          value={stats.totalEnrolled}
          icon={Users}
          description="Active in program"
        />
        <StatsCard
          title="Avg. Completion"
          value={`${stats.averageCompletion}%`}
          icon={TrendingUp}
          description="Across all modules"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[#382929] flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Applications</h2>
            <Link
              href="/learn/admin/applications"
              className="text-sm font-semibold text-[#ea2a33] hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="divide-y divide-[#382929]">
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <Link
                  key={app.id}
                  href={`/learn/admin/applications/${app.id}`}
                  className="block p-6 hover:bg-[#2d2222] transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-white mb-1">{app.personalInfo.fullName}</p>
                      <p className="text-sm text-[#b89d9f]">{app.personalInfo.email}</p>
                    </div>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#b89d9f] mt-3">
                    <span className="px-2 py-1 bg-[#1a1314] rounded-full capitalize">
                      {app.track}
                    </span>
                    <span>
                      {app.submittedAt?.toDate?.()?.toLocaleDateString?.() || 'Recently'}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-12 text-center">
                <FileText size={48} className="text-[#382929] mx-auto mb-4" />
                <p className="text-[#b89d9f]">No applications yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              href="/learn/admin/applications?status=pending"
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1314] border border-[#382929] hover:bg-[#2d2222] hover:border-[#533c3d] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <AlertCircle size={24} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white mb-1">Review Pending Applications</p>
                <p className="text-sm text-[#b89d9f]">{stats.pendingApplications} waiting</p>
              </div>
            </Link>

            <Link
              href="/learn/admin/users?role=enrolled"
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1314] border border-[#382929] hover:bg-[#2d2222] hover:border-[#533c3d] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users size={24} className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white mb-1">View Enrolled Students</p>
                <p className="text-sm text-[#b89d9f]">{stats.totalEnrolled} active</p>
              </div>
            </Link>

            <Link
              href="/learn/admin/modules"
              className="flex items-center gap-4 p-4 rounded-xl bg-[#1a1314] border border-[#382929] hover:bg-[#2d2222] hover:border-[#533c3d] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle size={24} className="text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white mb-1">Manage Modules</p>
                <p className="text-sm text-[#b89d9f]">Add or edit content</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
