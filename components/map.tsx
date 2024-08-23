'use client';

// <reference types="google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { Typography } from './typography';
import { Input } from './input';
import { defaultMapStyles, retroMapStyles } from '@utils/map-styles';
import { SecondaryButton } from './button';
import { ConfirmRestaurant } from './confirm-restaurant';
import { ConfirmTransportationMode } from './confirm-transportation-mode';
import cc from 'classcat';
import { ConfirmNavigationSelection } from './confirm-navigation-selection';

export const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const searchBoxRef = useRef<HTMLInputElement | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);

  const [state, setState] = useState({
    isRetroMode: false,
    isLoading: true,
    userLocation: null as { lat: number; lng: number } | null,
    selectedRestaurant: null as google.maps.places.PlaceResult | null,
    transportationMode: null as string | null,
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showTransportationModeModal, setShowTransportationModeModal] =
    useState(false);
  const [showNavigationOptionModal, setShowNavigationOptionModal] =
    useState(false);

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

      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
      });
      directionsRendererRef.current.setMap(googleMapRef.current);

      // Place user location marker on the map
      userMarkerRef.current = new google.maps.Marker({
        position: state.userLocation,
        map: googleMapRef.current,
        title: 'Your Location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#00FF00',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#00FF00',
        },
      });

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
    }
  }, [state.isRetroMode, state.userLocation]);

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

    const isOpen = place.opening_hours?.isOpen() ? 'Open Now' : 'Closed';

    return `
      <div class="info-window">
        <h2 class="info-window-title">${name}</h2>
        <p class="info-window-address">${vicinity}</p>
        ${
          business_status
            ? `<p class="info-window-status">${business_status}</p>`
            : ''
        }
        ${
          place.opening_hours
            ? `<p class="info-window-hours">${isOpen}</p>`
            : ''
        }
        ${
          rating
            ? `<p class="info-window-rating">Rating: ${rating} (${user_ratings_total} reviews)</p>`
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
    infoWindow: google.maps.InfoWindow
  ) => {
    infoWindow.close(); // Close the info window after selecting the restaurant
    setState((prev) => ({
      ...prev,
      selectedRestaurant: place,
    }));
    setShowConfirmationModal(true);
  };

  const handleConfirmRestaurant = () => {
    setShowConfirmationModal(false);
    setShowTransportationModeModal(true);
  };

  const handleTransportationSelect = (mode: string) => {
    setState((prev) => ({
      ...prev,
      transportationMode: mode,
    }));
    setShowTransportationModeModal(false);

    // Immediately show the navigation option modal
    setShowNavigationOptionModal(true);
  };

  const handleNavigationOptionSelect = (option: string) => {
    if (option === 'in-game') {
      // Logic for showing in-game directions
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: state.userLocation!,
          destination: state.selectedRestaurant!.geometry!.location!,
          travelMode:
            state.transportationMode!.toUpperCase() as google.maps.TravelMode,
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
      }&destination=${state.selectedRestaurant?.geometry?.location?.lat()},${state.selectedRestaurant?.geometry?.location?.lng()}&travelmode=${
        state.transportationMode
      }`;
      window.open(url, '_blank');
    }

    setShowNavigationOptionModal(false);
  };

  return (
    <div className='w-full h-screen max-h-[calc(100vh-8rem)] flex flex-col space-y-6'>
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
          <Loader />
        </div>
      )}
      {!state.isLoading && (
        <>
          <SecondaryButton
            label={
              state.isRetroMode ? 'Disable Retro Mode' : 'Enable Retro Mode'
            }
            onClick={() =>
              setState((prev) => ({ ...prev, isRetroMode: !prev.isRetroMode }))
            }
          />
          <Input
            ref={searchBoxRef}
            type='text'
            placeholder='Find your next foodie destination'
          />
          <div
            ref={mapRef}
            className={cc([
              'flex-grow h-full max-h-[calc(100vh-16rem)]',
              {
                invisible: state.isLoading,
                visible: !state.isLoading,
              },
            ])}
          ></div>
          {showConfirmationModal && state.selectedRestaurant && (
            <ConfirmRestaurant
              restaurant={state.selectedRestaurant}
              onConfirm={handleConfirmRestaurant}
              onCancel={() => setShowConfirmationModal(false)}
            />
          )}
          {showTransportationModeModal && (
            <ConfirmTransportationMode onSelect={handleTransportationSelect} />
          )}
          {showNavigationOptionModal && (
            <ConfirmNavigationSelection
              onSelect={handleNavigationOptionSelect}
            />
          )}
        </>
      )}
    </div>
  );
};
