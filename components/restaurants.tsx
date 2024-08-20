'use client';

import React, { useEffect, useState } from 'react';

interface Restaurant {
  name: string;
  address: string;
  rating: number;
  // Add other fields as needed
}

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(window.location.search);
        const include = params.get('include') || '';
        const exclude = params.get('exclude') || '';

        // Construct the Google Places API URL
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;
        const location = 'YOUR_LATITUDE,YOUR_LONGITUDE'; // Replace with user's location
        const radius = '5000'; // Adjust the search radius as needed
        const type = 'restaurant';

        // Include and exclude parameters could be used in keyword or query, depending on your logic
        const keyword = include.split(',').join(' ');
        const excludeKeyword = exclude.split(',').join(' ');

        const url = `${baseUrl}?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // Filter out excluded results
        const filteredRestaurants = data.results.filter((restaurant: any) =>
          excludeKeyword
            ? !excludeKeyword
                .split(' ')
                .some((excludeWord) =>
                  restaurant.name
                    .toLowerCase()
                    .includes(excludeWord.toLowerCase())
                )
            : true
        );

        setRestaurants(filteredRestaurants);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to fetch restaurants.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.name}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
          <p>Rating: {restaurant.rating}</p>
        </div>
      ))}
    </div>
  );
};
