// <reference types="google.maps" />
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from './loader';
import { Typography } from './typography';
import { Input } from './input';

interface MapContainerProps {
  children: React.ReactNode;
  retroMode: boolean;
}

export const MapContainer: React.FC<MapContainerProps> = ({
  children,
  retroMode,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const searchBoxRef = useRef<HTMLInputElement | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        () => {
          console.error('Error getting user location');
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      googleMapRef.current = new google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 15,
        styles: retroMode ? retroMapStyles : defaultMapStyles,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
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
  }, [retroMode, userLocation]);

  const handleRestaurantSelect = (place) => {
    console.log('Restaurant selected:', place);
    // Add logic to handle the restaurant selection
  };

  const openCustomInfoWindow = (placeId: string) => {
    const service = new google.maps.places.PlacesService(googleMapRef.current!);

    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const content = createCustomInfoWindowContent(
          place,
          handleRestaurantSelect
        );
        const infoWindow = new google.maps.InfoWindow({
          content,
          position: place.geometry?.location,
        });

        infoWindow.open(googleMapRef.current);
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
      opening_hours,
      photos,
      business_status,
    } = place;

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
          opening_hours
            ? `<p class="info-window-hours">${
                opening_hours.open_now ? 'Open Now' : 'Closed'
              }</p>`
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
      </div>
    `;
  };

  return (
    <div className='w-full h-screen relative bg-background border-2 border-highlight'>
      {isLoading && (
        <div className='flex flex-col h-full justify-center items-center w-full'>
          <Typography variant='p' className='animate-blink'>
            Loading map...
          </Typography>
          <Loader />
        </div>
      )}
      <Input
        ref={searchBoxRef}
        className='p-4'
        type='text'
        placeholder='Find your next foodie destination'
      />
      <div
        ref={mapRef}
        className={`${isLoading ? 'invisible' : 'visible'} w-full h-full`}
      >
        {children}
      </div>
    </div>
  );
};

// Retro map styles designed to emulate the Oregon Trail map
const retroMapStyles = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }], // Background color
  },
  {
    featureType: 'all',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00FF00' }], // Bright green for text, easily distinguishable
  },
  {
    featureType: 'all',
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#000000' }, // Black stroke for contrast
      { weight: 2 }, // Stroke weight
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#999999' }], // Neutral gray for roads, colorblind-friendly
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00FF00' }], // Bright green for road labels
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }], // Black water bodies
  },
  {
    featureType: 'water',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#999999' }], // Neutral gray outline for water
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#00FF00' }], // Bright green for water labels
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }, { color: '#FFB347' }], // Orange for business POIs, colorblind-friendly
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'simplified' }, { color: '#FFB347' }], // Orange icons for better visibility
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text.stroke',
    stylers: [
      { visibility: 'on' },
      { color: '#000000' }, // Black stroke for business labels
      { weight: 2 }, // Stroke weight
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'on' }, { color: '#00FF00' }], // Bright green text fill for businesses
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }, { color: '#FFB347' }], // Orange for transit stations
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }, { color: '#FFB347' }], // Orange transit lines
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }], // Hide non-business POIs
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }], // Black natural landscape
  },
];

// Default map styles, focusing only on restaurants and transit stations
const defaultMapStyles = [
  {
    featureType: 'poi.business',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }], // Hide all other POIs
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }], // Hide natural landscapes
  },
];
