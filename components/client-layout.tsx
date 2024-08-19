'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from './nav';
import { Footer } from './footer';
import Script from 'next/script';
import { appearance } from '@utils/clerk-styles';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={appearance}>
      {/* Add the Google Maps script in the top-level component */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy='beforeInteractive' // Ensures the script is loaded early
      />
      {/* Layout container */}
      <div className='min-h-screen flex flex-col font-dos overflow-hidden w-full'>
        <Navbar />
        {/* Main content area with calculated max-height */}
        <main className='flex-grow flex flex-col items-center justify-center max-h-[calc(100vh-8rem)] p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 overflow-hidden'>
          {children}
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
