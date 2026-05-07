'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';



export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </SessionProvider>);
}