import React from 'react';

interface NarrativeOptionsProps {
  text: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

export const NarrativeOptionsBox: React.FC<NarrativeOptionsProps> = ({
  text,
  options,
  onSelect,
}) => (
  <div className='bg-retroGreen border-4 border-retroBrown rounded-retro p-4 shadow-retro max-w-3xl mx-auto my-6'>
    <p className='font-body text-retroYellow text-lg sm:text-xl md:text-2xl mb-4'>
      {text}
    </p>
    <div className='flex flex-col space-y-2'>
      {options.map((option) => (
        <button
          key={option.value}
          className='bg-retroYellow text-retroBrown font-pixel p-2 shadow-retro rounded-retro hover:bg-retroBrown hover:text-retroYellow focus:outline-none focus:ring-2 focus:ring-retroYellow focus:ring-opacity-50'
          onClick={() => onSelect(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  </div>
);
