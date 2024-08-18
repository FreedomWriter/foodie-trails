'use client';

import React from 'react';
import { PrimaryButton, SecondaryButton } from './button';
import { Card } from './card';
import { EmptyState } from './empty-state';
import { Typography } from './typography';
import { Input } from './input';
import { Loader } from './loader';
import { MapContainer } from './map-container';

export const Test = () => {
  const [state, setState] = React.useState({ isRetromode: false });
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl font-pixel mb-4 text-center'>Test</h1>{' '}
      <SecondaryButton
        label={state.isRetromode ? 'Disable Retro Mode' : 'Enable Retro Mode'}
        onClick={() =>
          setState((prev) => ({ ...prev, isRetromode: !prev.isRetromode }))
        }
      />
      <MapContainer retroMode={state.isRetromode}>
        <div className='absolute top-4 left-4 p-2 bg-background border-2 border-highlight rounded-retro'>
          <p className='text-primary font-dos'>Retro Map Mode Enabled</p>
        </div>
      </MapContainer>
      <PrimaryButton
        label='Primary Button'
        onClick={() => console.log('Primary Clicked')}
      />
      <SecondaryButton
        label='Secondary Button'
        onClick={() => console.log('Secondary Clicked')}
      />
      <Card>
        <div>
          <h2>Card</h2>
          <p>This is what a card is going to look like</p>
        </div>
      </Card>
      <EmptyState
        message='No items found'
        actionLabel='Add New Item'
        onActionClick={() => alert('Redirect to add new item')}
      />
      <Typography variant='h1'>Welcome to Foodie Trails</Typography>
      <Typography variant='h2'>Your Journey Begins Here</Typography>
      <Typography variant='h3'>Explore the Best Restaurants</Typography>
      <Typography>Discover, savor, and share your food experiences.</Typography>
      <Input
        label='Search for restaurants'
        placeholder='Yummy stuff on the way...'
      />
    </div>
  );
};
