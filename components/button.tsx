import React from 'react';
import { Typography } from './typography';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    className='bg-background text-primary px-4 py-2 border-2 border-highlight shadow-retro rounded-retro hover:bg-highlight hover:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-200 flex items-center justify-center w-full'
    onClick={onClick}
  >
    <Typography variant='p' className='uppercase text-center'>
      {label}
    </Typography>
  </button>
);

export const SecondaryButton: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button
    className='bg-background text-primary p-2 md:p-4 border border-highlight rounded-retro shadow-retro hover:bg-highlight hover:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-200 flex items-center justify-center w-full'
    onClick={onClick}
  >
    <Typography variant='p' className='uppercase text-center'>
      {label}
    </Typography>
  </button>
);
