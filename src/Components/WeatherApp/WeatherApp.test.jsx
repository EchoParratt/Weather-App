import React from 'react';
import { render } from '@testing-library/react';
import WeatherApp from './WeatherApp';

test('renders without crashing', () => {
  render(<WeatherApp />);
});

test('renders search input', () => {
    const { getByPlaceholderText } = render(<WeatherApp />);
    expect(getByPlaceholderText("Search")).toBeInTheDocument();
  });

test('initial icon is the cloud icon', () => {
    const { getByAltText } = render(<WeatherApp />);
    const icon = getByAltText('weather-icon');
    expect(icon.src).toContain('cloud.png'); })



