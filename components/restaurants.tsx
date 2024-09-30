'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { Typography } from './typography';
import { SecondaryButton } from './button';
import cc from 'classcat';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConfirmRestaurant } from './confirm-restaurant';
import { useLoadMap } from '../hooks/useLoadMap';

interface State {
  isListMode: boolean;
  isLoading: boolean;
  userLocation: { lat: number; lng: number } | null;
  showConfirmationModal: boolean;
  selectedRestaurant: google.maps.places.PlaceResult | null;
}

export const Restaurants = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const include = params.get('include');
  const exclude = params.get('exclude');

  const [restaurants, setRestaurants] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [state, setState] = useState<State>({
    isListMode: false,
    isLoading: true,
    userLocation: null,
    showConfirmationModal: false,
    selectedRestaurant: null,
  });

  // Handle geolocation to get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState((prev) => ({
            ...prev,
            userLocation: { lat: latitude, lng: longitude },
            isLoading: false,
          }));
        },
        () => {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      );
    } else {
      // TODO: Handle error case
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Function to handle restaurant selection
  const handleRestaurantSelect = (
    place: google.maps.places.PlaceResult,
    infoWindow?: google.maps.InfoWindow
  ) => {
    infoWindow?.close();
    setState((prev) => ({
      ...prev,
      selectedRestaurant: place,
      showConfirmationModal: true,
    }));
  };

  // Load map and markers using custom hook
  useLoadMap(
    mapRef,
    state.userLocation,
    include,
    exclude,
    setRestaurants,
    handleRestaurantSelect,
    googleMapRef // Pass googleMapRef here
  );

  // Handle confirmation modal
  const handleConfirmRestaurant = () => {
    router.push(`/directions?placeId=${state.selectedRestaurant?.place_id}`);
  };

  if (state.isLoading) {
    return (
      <div className='flex-grow h-full w-full flex flex-col items-center justify-center'>
        <Typography variant='p' className='animate-blink'>
          Loading map...
        </Typography>
        <Loader />
      </div>
    );
  }

  return (
    <div className='w-full h-screen max-h-[calc(100vh-8rem)] flex flex-col space-y-6 overflow-auto'>
      <SecondaryButton
        label={state.isListMode ? 'View Map' : 'View List'}
        onClick={() =>
          setState((prev) => ({ ...prev, isListMode: !prev.isListMode }))
        }
      />
      <div
        ref={mapRef}
        className={cc([
          'flex-grow h-full max-h-[calc(100vh-16rem)]',
          { hidden: state.isListMode },
        ])}
      ></div>

      <div
        className={cc([
          'flex-grow h-full max-h-[calc(100vh-16rem)] border-4 border-highlight rounded-retro p-4 shadow-retro max-w-3xl mx-auto my-6 space-y-4 overflow-auto custom-scrollbar',
          { hidden: !state.isListMode || !restaurants.length },
        ])}
      >
        <ul role='list' className='space-y-2'>
          {restaurants.map((restaurant) => (
            <li key={restaurant.place_id}>
              <button
                onClick={() => handleRestaurantSelect(restaurant)}
                className='restaurant-card text-left w-full p-4 border rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary'
                aria-label={`Select ${restaurant.name}`}
              >
                <h2 className='font-bold text-lg'>{restaurant.name}</h2>
                <p>{restaurant.vicinity}</p>
                <p>{restaurant.rating}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {state.showConfirmationModal && state.selectedRestaurant && (
        <ConfirmRestaurant
          restaurant={state.selectedRestaurant}
          onConfirm={handleConfirmRestaurant}
          onCancel={() =>
            setState((prev) => ({ ...prev, showConfirmationModal: false }))
          }
        />
      )}
    </div>
  );
};
