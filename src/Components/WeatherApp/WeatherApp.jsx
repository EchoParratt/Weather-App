import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';

const WeatherApp = () => {
  const api_key = '8f5af98cd2a407387922a2eaffa213d3';
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    city: '',
    date: '',
    description: '',
    temp: null,
    icon: rain_icon
  });

  const [backgroundColor, setBackgroundColor] = useState(''); 


  const search = async () => {
    if (city === '') {
      return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();

      const date = new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const getWeatherIcon = (iconCode) => {
        if (iconCode === "01d" || iconCode === "01n") {
          return clear_icon;
        } else if (iconCode === "02d" || iconCode === "02n") {
          return cloud_icon;
        } else if (iconCode === "03d" || iconCode === "03n") {
          return cloud_icon;
        } else if (iconCode === "04d" || iconCode === "04n") {
          return cloud_icon;
        } else if (iconCode === "09d" || iconCode === "09n") {
          return rain_icon;
        } else if (iconCode === "010d" || iconCode === "010n") {
          return rain_icon;
        } else if (iconCode === "013d" || iconCode === "013n") {
          return snow_icon;
        } else {
          return rain_icon;
        }
      };

      const getBackgroundColor = (iconCode) => {
        switch (iconCode) {
          case "01d":
          case "01n":
            return '#FFD700'; // Gold for clear sky
          case "02d":
          case "02n":
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            return '#B0C4DE'; // LightSteelBlue for clouds
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            return '#4682B4'; // SteelBlue for rain
          case "13d":
          case "13n":
            return '#F0F8FF'; // AliceBlue for snow
          default:
            return '#87CEEB'; // SkyBlue as default
        }
      };

      const bgColor = getBackgroundColor(data.weather[0].icon);
        setBackgroundColor(bgColor);
    
      const weatherIcon = getWeatherIcon(data.weather[0].icon);
      setWeather({
        city: data.name,
        date: date,
        description: data.weather[0].main,
        temp: Math.floor(data.main.temp),
        icon: weatherIcon
        
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container' style={{ backgroundColor: backgroundColor }}>
      <div className='top-bar'>
        <input
          type='text'
          className='cityInput'
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && search()}
        />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt='Search icon' />
        </div>
      </div>
      <div className='weather-image'>
          <img src={weather.icon} />
        </div>
      <div className='weather-card'>
        <div className='weather-info'>
          <div className='inputed-city'>{weather.city}</div>
          <div className='date'>{weather.date}</div>
          <div className='weather-type'>{weather.description}</div>
          <div className='weather-temp'>{weather.temp ? `${weather.temp} °C` : ''}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
