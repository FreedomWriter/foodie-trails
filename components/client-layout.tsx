'use client';

import React, { PropsWithChildren } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from './nav';
import { Footer } from './footer';
import Script from 'next/script';

interface Props {
  appearance: any;
}

export default function ClientLayout({
  children,
  appearance,
}: PropsWithChildren<Props>) {
  return (
    <ClerkProvider appearance={appearance}>
      {/* Add the Google Maps script in the top-level component */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy='beforeInteractive' // Ensures the script is loaded early
      />
      {/* No need for <html> and <body> tags here */}
      <div className='min-h-screen flex flex-col font-dos overflow-auto w-full'>
        <Navbar />
        <main className='flex-grow flex items-center justify-center'>
          {children}
        </main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
