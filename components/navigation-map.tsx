'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Typography } from './typography';
import {
  createRestaurantMarkerContent,
  createUserMarkerContent,
  defaultMapStyles,
  retroMapStyles,
} from '@utils/map-styles';
import { SecondaryButton } from './button';
import cc from 'classcat';
import { useSearchParams } from 'next/navigation';
import { ConfirmTransportationMode } from './confirm-transportation-mode';
import { ConfirmNavigationSelection } from './confirm-navigation-selection';

export const NavigationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );

  const [state, setState] = useState({
    isRetroMode: false,
    isLoading: true,
    userLocation: null as { lat: number; lng: number } | null,
    destination: null as google.maps.places.PlaceResult | null,
    transportationMode: null as
      | 'WALKING'
      | 'BICYCLING'
      | 'DRIVING'
      | 'TRANSIT'
      | null,
    showNavigationOptionModal: false,
    showTransportationModeModal: true,
  });

  const params = useSearchParams();
  const placeId = params.get('placeId');

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
      const loadMapAndMarkers = async () => {
        // Import the AdvancedMarkerElement dynamically
        // @ts-ignore
        const { AdvancedMarkerElement } =
          await google.maps.importLibrary('marker');
        console.log({ AdvancedMarkerElement });
        googleMapRef.current = new google.maps.Map(
          mapRef.current as HTMLDivElement,
          {
            center: state.userLocation!,
            zoom: 17,
            disableDefaultUI: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
          }
        );

        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
        directionsRendererRef.current.setMap(googleMapRef.current);

        // Create custom content for the user marker
        const userMarkerContent = createUserMarkerContent();

        // Place user location marker on the map
        new AdvancedMarkerElement({
          map: googleMapRef.current!,
          position: state.userLocation!,
          content: userMarkerContent,
        });

        if (placeId) {
          const service = new google.maps.places.PlacesService(
            googleMapRef.current
          );

          service.getDetails({ placeId }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              setState((prev) => ({
                ...prev,
                destination: place,
              }));

              // Create a custom "X" marker for the destination
              const markerContent = createRestaurantMarkerContent();

              new AdvancedMarkerElement({
                map: googleMapRef.current!,
                position: place.geometry!.location!,
                content: markerContent,
              });
            } else {
              console.error('Failed to retrieve place details:', status);
            }
          });
        }
      };

      loadMapAndMarkers();
    }
  }, [state.isRetroMode, state.userLocation, placeId]);

  const handleTransportationSelect = (
    mode: 'WALKING' | 'BICYCLING' | 'DRIVING' | 'TRANSIT'
  ) => {
    setState((prev) => ({
      ...prev,
      transportationMode: mode,
      showTransportationModeModal: false,
      showNavigationOptionModal: true,
    }));
  };

  const handleNavigationOptionSelect = (option: string) => {
    if (state.destination && state.userLocation && state.transportationMode) {
      if (option === 'in-game') {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: state.userLocation!,
            destination: state.destination.geometry!.location!,
            travelMode:
              state.transportationMode.toUpperCase() as google.maps.TravelMode,
          },
          (result, status) => {
            if (status === 'OK') {
              directionsRendererRef.current!.setDirections(result);
            } else {
              console.error(`Error fetching directions: ${status}`);
            }
          }
        );
      } else if (option === 'external') {
        const url = `https://www.google.com/maps/dir/?api=1&origin=${
          state.userLocation?.lat
        },${
          state.userLocation?.lng
        }&destination=${state.destination.geometry?.location?.lat()},${state.destination.geometry?.location?.lng()}&travelmode=${
          state.transportationMode
        }`;
        window.open(url, '_blank');
      }
      setState((prev) => ({ ...prev, showNavigationOptionModal: false }));
    }
  };

  return (
    <div className='w-full h-screen max-h-[calc(100vh-8rem)] flex flex-col space-y-6 relative'>
      {state.isLoading && (
        <div
          className={cc([
            'flex-grow h-full flex flex-col items-center justify-center',
            {
              invisible: !state.isLoading,
              visible: state.isLoading,
            },
          ])}
        >
          <Typography variant='p' className='animate-blink'>
            Loading map...
          </Typography>
        </div>
      )}
      {!state.isLoading && (
        <>
          <div
            ref={mapRef}
            className={cc([
              'flex-grow h-full max-h-[calc(100vh-16rem)]',
              {
                hidden:
                  state.isLoading ||
                  state.showTransportationModeModal ||
                  state.showNavigationOptionModal,
              },
            ])}
          ></div>
          {state.showTransportationModeModal && (
            <ConfirmTransportationMode onSelect={handleTransportationSelect} />
          )}

          {state.showNavigationOptionModal && (
            <ConfirmNavigationSelection
              onSelect={handleNavigationOptionSelect}
            />
          )}
        </>
      )}
    </div>
  );
};
