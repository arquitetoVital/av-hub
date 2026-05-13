'use client';

import { SessionProvider } from 'next-auth/react';
import { AppThemeProvider } from './theme-provider';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AppThemeProvider>
        {children}
      </AppThemeProvider>
    </SessionProvider>
  );
}