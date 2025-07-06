'use client';

import { AuthProvider } from '@/hooks/useAuth'

export function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}