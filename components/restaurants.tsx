'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { Typography } from './typography';
import { SecondaryButton } from './button';
import cc from 'classcat';
import { useRouter, useSearchParams } from 'next/navigation';
import { ConfirmRestaurant } from './confirm-restaurant';
import {
  createRestaurantMarkerContent,
  createUserMarkerContent,
} from '@utils/map-styles';

export const Restaurants = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<
    google.maps.places.PlaceResult[]
  >([]);
  const [state, setState] = useState({
    isListMode: false,
    isLoading: true,
    userLocation: null as { lat: number; lng: number } | null,
    showConfirmationModal: false,
    selectedRestaurant: null as google.maps.places.PlaceResult | null,
  });

  const params = useSearchParams();
  const include = params.get('include');
  const exclude = params.get('exclude');

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
    const loadMapAndMarkers = async () => {
      if (
        typeof window !== 'undefined' &&
        window.google &&
        mapRef.current &&
        state.userLocation
      ) {
        // Import the AdvancedMarkerElement dynamically
        // @ts-ignore
        const { AdvancedMarkerElement } =
          await google.maps.importLibrary('marker');
        console.log({ mapRef, googleMapRef });
        // Initialize the map
        googleMapRef.current = new google.maps.Map(mapRef.current, {
          center: state.userLocation!,
          zoom: 17,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
        });
        // Create custom content for the user marker
        const userMarkerContent = createUserMarkerContent();

        // Place user location marker on the map
        new AdvancedMarkerElement({
          map: googleMapRef.current!,
          position: state.userLocation!,
          content: userMarkerContent,
        });
        // Create and show markers for nearby places
        const service = new google.maps.places.PlacesService(
          googleMapRef.current
        );

        // Restrict within the map viewport.
        let center = new google.maps.LatLng(
          state.userLocation.lat,
          state.userLocation.lng
        );
        const request = {
          location: state.userLocation,
          radius: 500,
          locationRestriction: {
            center: center,
            radius: 500,
          },
          type: 'restaurant',
          include: include !== null ? include : undefined,
          exclude: exclude !== null ? exclude : undefined,
          rankPreference: 'DISTANCE',
        };

        googleMapRef.current.addListener(
          'click',
          (event: google.maps.MapMouseEvent) => {
            const placeId = (event as any).placeId as string | undefined;
            if (placeId) {
              event.stop(); // Prevent default info window
              openCustomInfoWindow(placeId);
            }
          }
        );

        service.nearbySearch(request, (results, status) => {
          console.log({ results, status, request });
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const restaurantData = results?.map((place) => {
              // Create an "X" marker
              const markerContent = createRestaurantMarkerContent();

              // Add marker for each place
              new AdvancedMarkerElement({
                map: googleMapRef.current!,
                position: place.geometry!.location!,
                content: markerContent,
              });

              return place;
            });

            // Filter out nulls and set state
            setRestaurants(restaurantData!.filter(Boolean));
          } else {
            console.error('Nearby search failed:', status);
          }
        });
      }
    };

    loadMapAndMarkers();
  }, [state.userLocation]);

  const openCustomInfoWindow = (placeId: string) => {
    const service = new google.maps.places.PlacesService(googleMapRef.current!);

    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const content = createCustomInfoWindowContent(place);
        const infoWindow = new google.maps.InfoWindow({
          content,
          position: place.geometry?.location,
        });

        infoWindow.open(googleMapRef.current);
        // After the infoWindow is opened, you can force the overflow style on the wrapping container
        google.maps.event.addListener(infoWindow, 'domready', function () {
          const iwOuter = document.querySelector(
            '.gm-style-iw-d'
          ) as HTMLElement;
          if (iwOuter) {
            iwOuter.style.overflow = 'hidden';
          }
        });

        // Pass both arguments to handleRestaurantSelect
        // @ts-ignore
        window.selectRestaurant = () => {
          handleRestaurantSelect(place, infoWindow); // Ensure both arguments are passed
        };
      }
    });
  };

  const createCustomInfoWindowContent = (
    place: google.maps.places.PlaceResult
  ) => {
    const {
      name,
      vicinity,
      rating,
      user_ratings_total,
      photos,
      business_status,
    } = place;
    console.log({ place });

    const isOpen = place.opening_hours?.isOpen() ? 'Open Now' : 'Closed';

    return `
      <div class="info-window">
        <h2 class="info-window-title">${name}</h2>
        <p class="info-window-address">${vicinity}</p>
        ${
          place.opening_hours
            ? `<p class="info-window-hours">${isOpen}</p>`
            : ''
        }
        ${
          photos && photos.length > 0
            ? `<img src="${photos[0].getUrl({
                maxWidth: 200,
                maxHeight: 100,
              })}" alt="${name}" class="info-window-photo" />`
            : ''
        }
        <button
          class="primary-button mt-4"
          id="select-restaurant-button"
          onclick="window.selectRestaurant()">
          Select Restaurant
        </button>
      </div>
    `;
  };

  const handleRestaurantSelect = (
    place: google.maps.places.PlaceResult,
    infoWindow?: google.maps.InfoWindow
  ) => {
    infoWindow?.close(); // Close the info window after selecting the restaurant
    setState((prev) => ({
      ...prev,
      selectedRestaurant: place,
      showConfirmationModal: true,
    }));
  };
  const handleConfirmRestaurant = () => {
    console.log('Confirming restaurant', state.selectedRestaurant);
    router.push(`/directions?placeId=${state.selectedRestaurant?.place_id}`);
  };

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
  console.log({ restaurants });
  return (
    <div className='w-full h-screen max-h-[calc(100vh-8rem)] flex flex-col space-y-6 overflow-auto'>
      <SecondaryButton
        label={state.isListMode ? 'View Map' : 'View List '}
        onClick={() =>
          setState((prev) => ({ ...prev, isListMode: !prev.isListMode }))
        }
      />
      <div
        ref={mapRef}
        // className={'flex-grow h-full max-h-[calc(100vh-16rem)]'}
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
