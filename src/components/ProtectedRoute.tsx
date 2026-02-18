'use client';

import { useAuthContext } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PageButtonLoader } from './Button/buttonload';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, userProfile, loading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in at all
        router.push('/learn/auth/login');
      } else if (userProfile && !userProfile.onboardingComplete && pathname !== '/onboarding') {
        // Logged in but onboarding is not done
        router.push('/onboarding');
      }
    }
  }, [user, userProfile, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="h-[60px] w-[60px]">
          <PageButtonLoader />
        </div>
      </div>
    );
  }

  // If not loading and no user, or profile incomplete, return null while redirecting
  if (!user || (userProfile && !userProfile.onboardingComplete && pathname !== '/onboarding')) {
    return null;
  }

  return <>{children}</>;
}