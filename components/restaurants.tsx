'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { Typography } from './typography';
import { defaultMapStyles, retroMapStyles } from '@utils/map-styles';
import { SecondaryButton } from './button';
import cc from 'classcat';
import { useSearchParams } from 'next/navigation';

interface Restaurant {
  name: string;
  address: string;
  rating: number;
}

export const Restaurants = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [state, setState] = useState({
    isRetroMode: false,
    isLoading: true,
    userLocation: null as { lat: number; lng: number } | null,
  });

  const params = useSearchParams();
  const include = params.get('include');
  const exclude = params.get('exclude');
  console.log({ include, exclude });
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
          console.error('Error getting user location');
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.google &&
      mapRef.current &&
      state.userLocation
    ) {
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center: state.userLocation!,
        zoom: 15,
        styles: state.isRetroMode ? retroMapStyles : defaultMapStyles,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      const service = new google.maps.places.PlacesService(
        googleMapRef.current
      );
      const request = {
        location: state.userLocation,
        radius: 500,
        type: 'restaurant',
        include: include !== null ? include : undefined,
        exclude: exclude !== null ? exclude : undefined,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const restaurantData = results?.map((place) => ({
            name: place.name || 'Unknown',
            address: place.vicinity || 'Unknown',
            rating: place.rating || 0,
          }));
          console.log({ results, restaurantData });
          setRestaurants(restaurantData || []);
        } else {
          console.error('Nearby search failed:', status);
        }
      });
    }
  }, []);

  if (state.isLoading) {
    return (
      <div
        className={cc([
          'flex-grow h-full w-full flex flex-col items-center justify-center',
          {
            invisible: !state.isLoading,
            visible: state.isLoading,
          },
        ])}
      >
        <Typography variant='p' className='animate-blink'>
          Loading map...
        </Typography>
        <Loader />
      </div>
    );
  }

  return (
    <div className='w-full h-screen max-h-[calc(100vh-8rem)] flex flex-col space-y-6 overflow-auto'>
      {/* <SecondaryButton
        label={state.isRetroMode ? 'Disable Retro Mode' : 'Enable Retro Mode'}
        onClick={() =>
          setState((prev) => ({ ...prev, isRetroMode: !prev.isRetroMode }))
        }
      /> */}
      {/* <div
        ref={mapRef}
        className='flex-grow h-full max-h-[calc(100vh-16rem)]'
      ></div> */}
      <h1>Choose one</h1>
      <div className='flex flex-wrap gap-4 flex-grow'>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.name}
            className='border p-4'
            onClick={() => console.log}
          >
            <h3>{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
