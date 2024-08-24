import React from 'react';
import { ConfirmationOptionsBox } from './confirmation-options-box';

interface Props {
  onSelect: (mode: 'WALKING' | 'BICYCLING' | 'DRIVING' | 'TRANSIT') => void;
}

export const ConfirmTransportationMode = ({ onSelect }: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <ConfirmationOptionsBox
        text='Choose Your Mode of Transportation'
        options={[
          { label: 'Walk', value: 'WALKING' },
          { label: 'Bike', value: 'BICYCLING' },
          { label: 'Drive', value: 'DRIVING' },
          { label: 'Public Transport', value: 'TRANSIT' },
        ]}
        onSelect={(value) =>
          onSelect(value as 'WALKING' | 'BICYCLING' | 'DRIVING' | 'TRANSIT')
        }
      />
    </div>
  );
};
