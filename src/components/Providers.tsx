'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const AuthContextProvider = dynamic(
  () => import('@/context/AuthContext').then((mod) => mod.AuthContextProvider),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}