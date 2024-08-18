import React from 'react';
import { Typography } from './typography';
import { Loader } from './loader';

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message,
  actionLabel,
  onActionClick,
}) => (
  <div className='flex flex-col items-center justify-center h-full text-center'>
    <Loader />
    <Typography variant='p' className='animate-blink mb-4'>
      {message}
    </Typography>
    {actionLabel && onActionClick && (
      <button
        onClick={onActionClick}
        className='bg-background text-primary font-dos px-4 py-2 border-2 border-highlight shadow-retro rounded-retro hover:bg-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition duration-200'
      >
        {actionLabel}
      </button>
    )}
  </div>
);
