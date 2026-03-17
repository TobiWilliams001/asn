'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail, MapPin, GraduationCap, Loader2, Trash2, Unlock } from 'lucide-react';
import StatusBadge from '@/components/admin/StatusBadge';
import ProgressBar from '@/components/modules/ProgressBar';
import { getUserById, updateUserRole, deleteUser, UserProfile } from '@/services/adminService';
import { getUserProgress, UserProgress } from '@/services/progressService';
import { MOCK_MODULES } from '@/lib/data/mockModules';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, progressData] = await Promise.all([
          getUserById(id),
          getUserProgress(id).catch(() => null) // Progress might not exist
        ]);
        setUser(userData);
        setProgress(progressData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleRoleChange = async (newRole: 'free' | 'applicant' | 'enrolled' | 'admin') => {
    if (!user || !confirm(`Change user role to ${newRole}?`)) return;

    setUpdating(true);
    try {
      await updateUserRole(user.id, newRole);
      setUser({ ...user, role: newRole });
      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user) return;
    
    const confirmed = confirm(
      `Are you ABSOLUTELY SURE you want to delete this user?\n\n` +
      `This will permanently delete:\n` +
      `- User account\n` +
      `- All progress data\n` +
      `- All applications\n\n` +
      `This action CANNOT be undone!`
    );

    if (!confirmed) return;

    setUpdating(true);
    try {
      await deleteUser(user.id);
      alert('User deleted successfully');
      router.push('/learn/admin/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Loading user...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center py-12">
        <h2 className="text-xl font-bold text-white mb-2">User not found</h2>
        <button
          onClick={() => router.push('/learn/admin/users')}
          className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const overallProgress = progress?.overallProgress || 0;
  const modulesWithProgress = MOCK_MODULES.map(module => ({
    ...module,
    ...progress?.modules[module.id]
  }));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/learn/admin/users')}
          className="flex items-center gap-2 text-sm font-semibold text-[#b89d9f] hover:text-white transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Users
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white mb-2">{user.fullName || 'Unnamed User'}</h1>
            <p className="text-[#b89d9f]">{user.email}</p>
          </div>
          <StatusBadge status={user.role} size="lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Info */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Email</p>
                <p className="text-white">{user.email}</p>
              </div>
              {user.country && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Country</p>
                  <p className="text-white">{user.country}</p>
                </div>
              )}
              {user.institution && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Institution</p>
                  <p className="text-white">{user.institution}</p>
                </div>
              )}
              {user.asapStatus && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">ASAP Status</p>
                  <p className="text-white capitalize">{user.asapStatus}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#b89d9f] mb-1">Joined</p>
                <p className="text-white">
                  {user.createdAt?.toDate?.()?.toLocaleDateString?.('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }) || 'Recently'}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          {user.role === 'enrolled' && progress && (
            <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-white">Progress Overview</h2>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{overallProgress}%</p>
                  <p className="text-xs text-[#b89d9f]">Overall</p>
                </div>
              </div>

              <div className="space-y-4">
                {modulesWithProgress.map((module) => (
                  <div key={module.id} className="p-4 rounded-xl bg-[#1a1314] border border-[#382929]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white text-sm">{module.title}</h3>
                      <StatusBadge status={module.status || 'locked'} size="sm" />
                    </div>
                    <ProgressBar progress={module.progress || 0} height="sm" />
                    <div className="flex items-center justify-between mt-2 text-xs text-[#b89d9f]">
                      <span>{module.completedLessons?.length || 0} / {module.lessons.length} lessons</span>
                      <span>{Math.round(module.progress || 0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Role Management */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Role Management</h3>
            <div className="space-y-2">
              {(['free', 'applicant', 'enrolled', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleChange(role)}
                  disabled={user.role === role || updating}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    user.role === role
                      ? 'bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white'
                      : 'bg-[#1a1314] border border-[#382929] text-[#b89d9f] hover:text-white hover:bg-[#2d2222]'
                  } disabled:opacity-50 disabled:cursor-not-allowed capitalize`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Actions */}
          <div className="bg-gradient-to-br from-[#2d2222] to-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Admin Actions</h3>
            <div className="space-y-3">
              {user.asapApplicationId && (
                <Link
                  href={`/learn/admin/applications/${user.asapApplicationId}`}
                  className="block w-full px-4 py-3 rounded-xl bg-[#1a1314] border border-[#382929] text-white font-semibold text-sm text-center hover:bg-[#2d2222] transition-all"
                >
                  View Application
                </Link>
              )}
              
              <button
                onClick={handleDeleteUser}
                disabled={updating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1a1314] border-2 border-red-500/30 text-red-400 font-bold hover:bg-red-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Trash2 size={16} />
                Delete User
              </button>
            </div>
          </div>

          {/* User IDs */}
          <div className="bg-[#261c1c] border border-[#382929] rounded-2xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#b89d9f] mb-4">User IDs</h3>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-[#b89d9f] mb-1">User ID</p>
                <p className="text-white font-mono break-all">{user.id}</p>
              </div>
              {user.asapApplicationId && (
                <div>
                  <p className="text-[#b89d9f] mb-1">Application ID</p>
                  <p className="text-white font-mono break-all">{user.asapApplicationId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
