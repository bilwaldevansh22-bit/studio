
import type { Metadata } from 'next';
import type React from 'react'; // Changed from 'import React, { useEffect }'
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/components/layout/MainLayout';
import ThemeClientInitializer from '@/components/layout/ThemeClientInitializer'; // New import

export const metadata: Metadata = {
  title: 'TokenEstate - Real Estate Tokenization',
  description: 'Tokenize and trade real estate properties seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect for theme initialization has been moved to ThemeClientInitializer
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeClientInitializer /> {/* Added client component for theme effect */}
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
