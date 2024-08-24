import React from 'react';
import { PrimaryButton } from './button';

interface Props {
  text: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}

export const ConfirmationOptionsBox: React.FC<Props> = ({
  text,
  options,
  onSelect,
}) => (
  <div className='bg-background border-4 border-highlight rounded-retro p-4 shadow-retro max-w-3xl mx-auto my-6'>
    <p className='font-dos text-primary text-lg sm:text-xl md:text-2xl mb-4'>
      {text}
    </p>
    <div className='flex flex-col space-y-2'>
      {options.map((option) => (
        <PrimaryButton
          key={option.value}
          label={option.label}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  </div>
);
