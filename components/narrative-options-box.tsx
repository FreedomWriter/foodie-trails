import React from 'react';
import { PrimaryButton } from './button';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

export interface Option {
  label: string;
  value: string;
  include?: string[];
  exclude?: string[];
  nextDiscoveryPrompt: number;
}
interface Props {
  prompt: {
    dialogue: string;
    question?: string;
    tooltip?: string;
    options: Option[];
  };
  onSelect: (option: Option) => void;
}

export const NarrativeOptionsBox: React.FC<Props> = (props) => {
  const { onSelect, prompt } = props;
  const { dialogue, question, tooltip, options } = prompt;
  return (
    <div className='bg-background border-4 border-highlight rounded-retro p-4 shadow-retro w-full'>
      <h2 className='font-dos text-primary text-xl sm:text-2xl md:text-3xl mb-4 text-center border-b pb-4'>
        {question}
      </h2>
      <div className='mb-4'>
        <p className='font-dos text-primary text-lg sm:text-xl md:text-2xl'>
          {dialogue}
        </p>
        {tooltip && (
          <Popover className='relative'>
            <PopoverButton className='font-dos text-secondary text-sm sm:text-md md:text-lg mt-2 underline cursor-pointer'>
              What does this mean?
            </PopoverButton>
            <PopoverPanel className='absolute z-10 bg-gray-800 text-white p-3 rounded-md shadow-md max-w-xs mt-2'>
              {tooltip}
            </PopoverPanel>
          </Popover>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        {options.map((option) => (
          <PrimaryButton
            key={option.value}
            label={option.label}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
};
