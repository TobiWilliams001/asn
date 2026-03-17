'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Users as UsersIcon, Loader2 } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import { getAllUsers, UserProfile } from '@/services/adminService';

export default function UsersListPage() {
  const searchParams = useSearchParams();
  const roleFilter = searchParams?.get('role') as 'free' | 'applicant' | 'enrolled' | 'admin' | null;

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>(roleFilter || 'all');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
        setFilteredUsers(allUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...users];

    // Role filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(user => user.role === activeFilter);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [activeFilter, searchQuery, users]);

  const stats = {
    all: users.length,
    free: users.filter(u => u.role === 'free').length,
    applicant: users.filter(u => u.role === 'applicant').length,
    enrolled: users.filter(u => u.role === 'enrolled').length,
    admin: users.filter(u => u.role === 'admin').length,
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Users</h1>
        <p className="text-[#b89d9f]">Manage user accounts and roles</p>
      </div>

      {/* Filters & Search */}
      <div className="mb-6 space-y-4">
        {/* Role Tabs */}
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
            onClick={() => setActiveFilter('free')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'free'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Free ({stats.free})
          </button>
          <button
            onClick={() => setActiveFilter('applicant')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'applicant'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Applicant ({stats.applicant})
          </button>
          <button
            onClick={() => setActiveFilter('enrolled')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'enrolled'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Enrolled ({stats.enrolled})
          </button>
          <button
            onClick={() => setActiveFilter('admin')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              activeFilter === 'admin'
                ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                : 'bg-[#261c1c] border border-[#382929] text-[#b89d9f] hover:text-white'
            }`}
          >
            Admin ({stats.admin})
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

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link
              key={user.id}
              href={`/learn/admin/users/${user.id}`}
              className="block bg-[#261c1c] border border-[#382929] rounded-2xl p-6 hover:bg-[#2d2222] hover:border-[#533c3d] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{user.fullName || 'Unnamed User'}</h3>
                    <StatusBadge status={user.role} size="sm" />
                  </div>
                  <p className="text-sm text-[#b89d9f] mb-3">{user.email}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {user.country && (
                      <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                        {user.country}
                      </span>
                    )}
                    {user.institution && (
                      <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f]">
                        {user.institution}
                      </span>
                    )}
                    {user.asapStatus && (
                      <span className="px-3 py-1 bg-[#1a1314] rounded-full text-[#b89d9f] capitalize">
                        ASAP: {user.asapStatus}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#b89d9f] mb-1">Joined</p>
                  <p className="text-sm font-semibold text-white">
                    {user.createdAt?.toDate?.()?.toLocaleDateString?.('en-US', {
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
            <UsersIcon size={48} className="text-[#382929] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">No users found</h3>
            <p className="text-[#b89d9f]">
              {searchQuery ? 'Try a different search term' : 'No users match the selected filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
