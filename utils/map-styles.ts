const baseMapStyles = [
  // Hide all POIs by default
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  // Show only restaurants and transit stations
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
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ visibility: 'on' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ visibility: 'simplified' }],
  },
  // Additional rules to hide places of worship, schools, and any other unwanted POIs
  {
    featureType: 'poi.place_of_worship',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

// Retro map styles designed to emulate the Oregon Trail map
export const retroMapStyles = [
  ...baseMapStyles,
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
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#000000' }], // Black water bodies
  },
  {
    featureType: 'water',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#999999' }], // Neutral gray outline for water
  },
];

// Default map styles, focusing only on restaurants and transit stations
export const defaultMapStyles = [
  ...baseMapStyles,
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }], // Hide natural landscapes
  },
];
