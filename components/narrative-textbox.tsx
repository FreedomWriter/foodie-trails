import React from 'react';

interface NarrativeTextProps {
  text: string;
}

export const NarrativeTextBox: React.FC<NarrativeTextProps> = ({ text }) => (
  <div className='bg-retroGreen border-4 border-retroBrown rounded-retro p-4 shadow-retro max-w-3xl mx-auto my-6'>
    <p className='font-body text-retroYellow text-lg sm:text-xl md:text-2xl'>
      {text}
    </p>
  </div>
);
