'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { userProfile, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && userProfile?.role !== 'admin') {
      router.push('/learn/dashboard');
    }
  }, [userProfile, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-[#ea2a33] animate-spin mx-auto mb-4" />
          <p className="text-[#b89d9f]">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (userProfile?.role !== 'admin') {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
