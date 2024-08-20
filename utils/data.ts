export const generateNarrativeText = (weatherData, mode) => {
  let narrative = `You decided to ${mode.toLowerCase()} to the restaurant. `;

  if (weatherData.weather[0].main === 'Rain') {
    narrative += 'The rain makes the journey more challenging.';
  } else if (weatherData.weather[0].main === 'Clear') {
    narrative += 'It's a clear day, perfect for your journey.';
  } else {
    narrative += 'The weather conditions are moderate, be careful on your way.';
  }

  return narrative;
};
