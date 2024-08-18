import React from 'react';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className='bg-background border-2 border-highlight p-5 shadow-retro rounded-retro text-primary font-dos'>
    {children}
  </div>
);
