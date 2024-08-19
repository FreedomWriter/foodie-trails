import React from 'react';
import { PrimaryButton, SecondaryButton } from './button';

interface Props {
  restaurant: google.maps.places.PlaceResult;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmRestaurant = ({
  restaurant,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-background bg-opacity-80 z-50'>
      <div className='bg-background text-primary p-6 rounded-retro shadow-retro max-w-md w-full'>
        <h2 className='text-2xl font-dos mb-4 text-center border-b-2 border-highlight'>
          Confirm Your Choice
        </h2>
        <p className='text-dos text-center mb-6'>
          Do you want to travel to{' '}
          <span className='text-retroRed'>{restaurant.name}</span>?
        </p>
        <div className='mt-4 flex justify-around'>
          <PrimaryButton label='Yes' onClick={onConfirm} />
          <SecondaryButton label='No' onClick={onCancel} />
        </div>
      </div>
    </div>
  );
};
