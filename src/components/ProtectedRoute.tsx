'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after auth state is fully resolved
    if (loading) return;

    if (!user) {
      router.push('/learn/auth/login');
      return;
    }

    // If profile loaded and onboarding not complete, send to onboarding
    if (userProfile && !userProfile.onboardingComplete) {
      router.push('/onboarding');
      return;
    }
  }, [user, userProfile, loading, router]);

  // Show loading spinner while Firebase resolves auth state
  // This prevents the flash of the signup/login page
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#ea2a33] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in - don't flash content, router.push handles redirect
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#ea2a33] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Logged in but onboarding not complete
  if (userProfile && !userProfile.onboardingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0506] via-[#181111] to-[#0f0909] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#ea2a33] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // All checks passed - render the protected content
  return <>{children}</>;
}