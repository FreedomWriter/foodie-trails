import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';

export const Navbar: React.FC = () => {
  const { user } = useUser();
  return (
    <header className='w-full px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center gap-x-4 sm:gap-x-8 bg-background border-b-2 border-highlight shadow-retro'>
      <div className='text-xl sm:text-2xl font-dos text-primary uppercase'>
        Foodie Trails
      </div>
      <nav>
        <ul className='flex gap-x-2 sm:gap-x-4'>
          <li>
            <Link href='/' className='text-primary hover:text-highlight'>
              Home
            </Link>
          </li>
          <li>
            <Link href='/test' className='text-primary hover:text-highlight'>
              Test
            </Link>
          </li>
          <li>{user ? <UserButton /> : <SignInButton />}</li>
        </ul>
      </nav>
    </header>
  );
};
