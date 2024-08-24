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
    stylers: [{ color: '#1a1a1a' }], // Background color
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
      { color: '#1a1a1a' }, // Black stroke for contrast
      { weight: 2 }, // Stroke weight
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }],
    // stylers: [{ color: '#999999' }], // Neutral gray for roads, colorblind-friendly
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#1a1a1a' }], // Black water bodies
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

export const createUserMarkerContent = () => {
  const userMarkerContent = document.createElement('div');
  userMarkerContent.className = 'user-marker';
  userMarkerContent.style.padding = '10px';
  userMarkerContent.style.backgroundColor = 'black';
  userMarkerContent.style.color = 'white';
  userMarkerContent.style.border = '4px solid #FF3333';
  userMarkerContent.style.borderRadius = '50%';
  userMarkerContent.style.textAlign = 'center';
  userMarkerContent.style.fontSize = '16px';
  userMarkerContent.textContent = 'You';
  userMarkerContent.style.color = '#FF3333';
  return userMarkerContent;
};

export const createRestaurantMarkerContent = () => {
  const markerContent = document.createElement('div');
  markerContent.className = 'x-marker';
  markerContent.style.width = '20px';
  markerContent.style.height = '20px';
  markerContent.style.position = 'relative';
  markerContent.style.backgroundColor = 'transparent';

  const xLine1 = document.createElement('div');
  xLine1.style.position = 'absolute';
  xLine1.style.width = '100%';
  xLine1.style.height = '4px';
  xLine1.style.fontWeight = 'semi-bold';
  xLine1.style.backgroundColor = '#FF3333';
  xLine1.style.transform = 'rotate(45deg)';
  xLine1.style.top = '50%';
  xLine1.style.left = '0';
  xLine1.style.transformOrigin = 'center';

  const xLine2 = document.createElement('div');
  xLine2.style.position = 'absolute';
  xLine2.style.width = '100%';
  xLine2.style.height = '4px';
  xLine2.style.fontWeight = 'semi-bold';
  xLine2.style.backgroundColor = '#FF3333';
  xLine2.style.transform = 'rotate(-45deg)';
  xLine2.style.top = '50%';
  xLine2.style.left = '0';
  xLine2.style.transformOrigin = 'center';

  markerContent.appendChild(xLine1);
  markerContent.appendChild(xLine2);
  return markerContent;
};
