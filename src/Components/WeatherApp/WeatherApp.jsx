import React, { useState } from 'react';  // Imports and State Initialization
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import github_icon from '../Assets/github-icon.png'; // Make git icon link to github
import umbrella_icon from '../Assets/umbrella.png';

// We are using the OpenWeatherMap api
// Thunderclient is used to check the specifics behind the calls
const WeatherApp = () => {
  const api_key = '8f5af98cd2a407387922a2eaffa213d3';
  // city is current state and setCity is the update method for the state (Hooks)
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({
    city: '',
    date: '',
    description: '',
    temp: null,
    icon: umbrella_icon,
    gitIcon: github_icon,
    intro: null
  });
  // might add intro message later

const [backgroundColor, setBackgroundColor] = useState(''); 

// Asynchronous function that is called when the user searches for a city's weather
// Using a asynchronous function in this case is important since we are fetching data and we do not want to block other code in the process
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

    // Converting the JSON-formatted response data into a JavaScript object
    const data = await response.json();

    // Caculating correct date according to the timezone of the city
    const timezoneOffset = data.timezone * 1000;
    const localTime = new Date(Date.now() + timezoneOffset);


    const date = localTime.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'UTC' 
      });

      // Used to determine which icon is to be displayed, perhaps changed if else statements to something more optimal like buckets
      // Considering using switch statements here instead
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
        } else if (iconCode === "10d" || iconCode === "10n") {
          return rain_icon;
        } else if (iconCode === "13d" || iconCode === "13n") {
          return snow_icon;
        } else {
          return rain_icon;
        }
      };

      // Background setter depending on the same variable as the above, "icon" in the api call
      // Tried using switch statements 
      const getBackgroundColor = (iconCode) => {
        switch (iconCode) {
          case "01d":
          case "01n":
            return '#e27055'; // Clear
          case "02d":
          case "02n":
          case "03d":
          case "03n":
          case "04d":
          case "04n":
            return '#00cec9'; // Clouds
          case "09d":
          case "09n":
          case "10d":
          case "10n":
            return '#0b84e3'; // rain
          case "13d":
          case "13n":
            return '#2d3435'; // snow
          default:
            return '#87CEEB'; // default, most likely won't be reached
        }
      };

      const bgColor = getBackgroundColor(data.weather[0].icon);
        setBackgroundColor(bgColor);
    
      // Setting the variables on the weather-card
      const weatherIcon = getWeatherIcon(data.weather[0].icon);
      setWeather({
        city: data.name,
        date: date,
        description: data.weather[0].main,
        temp: Math.floor(data.main.temp),
        icon: weatherIcon,
        gitIcon: null,
        intro: null
        
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
          onChange={(e) => setCity(e.target.value)}  // Code to used to add a enter button press search function (Found Online)
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
          <div className='weather-intro'>{weather.intro}</div>
        </div>
      </div>
      <div className='github-icon'>
      <img src={weather.gitIcon} />
      </div>
    </div>
  );
};
// The code within the weather-temp div is used to avoid showing "undefined °C" or "null °C" in the UI.

export default WeatherApp;
