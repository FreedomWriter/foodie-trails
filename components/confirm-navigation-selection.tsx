import React from 'react';
import { NarrativeOptionsBox } from './narrative-options-box';

interface Props {
  onSelect: (option: string) => void;
}

export const ConfirmNavigationSelection = ({ onSelect }: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <NarrativeOptionsBox
        text='Choose Navigation Option'
        options={[
          { label: 'In-Game Directions', value: 'in-game' },
          { label: 'External Navigation', value: 'external' },
        ]}
        onSelect={(value) => onSelect(value)}
      />
    </div>
  );
};
