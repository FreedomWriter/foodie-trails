import {
  createRestaurantMarkerContent,
  createUserMarkerContent,
} from '@utils/map-styles';
import { useEffect } from 'react';

declare global {
  interface Window {
    selectRestaurant: () => void;
  }
}

// Custom Hook to Load Map and Markers
export const useLoadMap = (
  mapRef: React.RefObject<HTMLDivElement>,
  userLocation: { lat: number; lng: number } | null,
  include: string | null,
  exclude: string | null,
  setRestaurants: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult[]>
  >,
  handleRestaurantSelect: (
    place: google.maps.places.PlaceResult,
    infoWindow: google.maps.InfoWindow
  ) => void,
  googleMapRef: React.MutableRefObject<google.maps.Map | null>
) => {
  // Helper function to filter out excluded types
  const isPlaceExcluded = (
    place: google.maps.places.PlaceResult,
    exclude: string | null
  ): boolean => {
    if (!exclude) return false;

    const excludeKeywords = exclude
      .split(',')
      .map((word) => word.trim().toLowerCase());

    const placeTypes = place.types?.map((type) => type.toLowerCase()) || [];
    return placeTypes.some((type) => excludeKeywords.includes(type));
  };

  // Function to create custom info window content
  const createCustomInfoWindowContent = (
    place: google.maps.places.PlaceResult
  ) => {
    const {
      name,
      vicinity,
      rating,
      photos,
      opening_hours,
      business_status,
      user_ratings_total,
    } = place;
    const isOpen = opening_hours?.isOpen() ? 'Open Now' : 'Closed';

    return `
    <div class="info-window">
      <h2 class="info-window-title">${name}</h2>
      <p class="info-window-address">${vicinity}</p>
      ${
        business_status
          ? `<p class="info-window-status">${business_status}</p>`
          : ''
      }
      ${place.opening_hours ? `<p class="info-window-hours">${isOpen}</p>` : ''}
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

  // Function to handle opening a custom info window for restaurants
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
        google.maps.event.addListener(infoWindow, 'domready', function () {
          const iwOuter = document.querySelector(
            '.gm-style-iw-d'
          ) as HTMLElement;
          if (iwOuter) iwOuter.style.overflow = 'hidden';
        });

        window.selectRestaurant = () =>
          handleRestaurantSelect(place, infoWindow);
      }
    });
  };

  useEffect(() => {
    const loadMapAndMarkers = async () => {
      if (
        typeof window !== 'undefined' &&
        window.google &&
        mapRef.current &&
        userLocation
      ) {
        const { AdvancedMarkerElement } = (await google.maps.importLibrary(
          'marker'
        )) as google.maps.MarkerLibrary;

        // Initialize the map
        googleMapRef.current = new google.maps.Map(mapRef.current, {
          center: userLocation!,
          zoom: 17,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID,
        });

        // Place user marker
        const userMarkerContent = createUserMarkerContent();
        new AdvancedMarkerElement({
          map: googleMapRef.current!,
          position: userLocation!,
          content: userMarkerContent,
        });

        // Prepare include and exclude logic
        const includeKeywords = include
          ? include.split(',').map((word) => word.trim())
          : null;

        // Prepare request for Google Places API, using `rankBy: 'distance'`
        const service = new google.maps.places.PlacesService(
          googleMapRef.current!
        );

        const request: google.maps.places.PlaceSearchRequest = {
          location: userLocation,
          rankBy: google.maps.places.RankBy.DISTANCE, // Prioritize proximity
          type: 'restaurant', // Searching for restaurants
          ...(includeKeywords ? { keyword: includeKeywords.join(' ') } : {}),
        };

        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const filteredResults = results.filter(
              (place) => !isPlaceExcluded(place, exclude) // Exclude restaurants based on the exclude string
            );

            const restaurantData = filteredResults.map((place) => {
              const markerContent = createRestaurantMarkerContent();
              new AdvancedMarkerElement({
                map: googleMapRef.current!,
                position: place.geometry!.location!,
                content: markerContent,
              });
              return place;
            });
            console.log({ restaurantData });
            setRestaurants(restaurantData.filter(Boolean));
          } else {
            console.error('Nearby search failed:', status);
          }
        });

        // Add click listener for opening info windows
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
    };

    if (userLocation) loadMapAndMarkers();
  }, [userLocation, exclude, include]); // Dependencies now include 'include'
};
