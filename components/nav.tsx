import { SignInButton, UserButton } from '@clerk/nextjs';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';
import React from 'react';

export const Navbar: React.FC = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <header className='w-full'>
      <nav className='w-full px-4 py-3 sm:px-6 sm:py-4 gap-x-4 sm:gap-x-8 bg-background border-b-2 border-highlight shadow-retro'>
        <ul className='flex justify-between items-center gap-x-2 sm:gap-x-4'>
          <li>
            <Link href='/' className='text-primary hover:text-highlight'>
              <div className='text-xl sm:text-2xl font-dos text-primary uppercase'>
                Foodie Trails
              </div>
            </Link>
          </li>
          <li>
            {isAuthenticated && !isLoading ? <UserButton /> : <SignInButton />}
          </li>
        </ul>
      </nav>
    </header>
  );
};
