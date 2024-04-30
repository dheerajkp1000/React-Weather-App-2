import React, { useState } from 'react';
import './App.css'

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '7ba4abd65a2d05c35ad5b8f4d2a76123'; //

  const fetchWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }) 
      .then(data => { 
        setWeatherData(data);
        console.log(data);
      })
      .catch(error => {
        alert('Error fetching weather data. Please try again later.');
        console.error('Error fetching weather data:', error);
      });
  };
  
  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeatherData();
    }
  };
  
  return (
    <div>
      <div className="weather">
      <h2>Search for City Weather</h2>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name"/>
      <button onClick={handleSearch}>Search</button>
      {weatherData && (
        <div>
          <div className="result">
          <h2>Weather in {weatherData.name} </h2>
          <p>Temperature: {weatherData.main.temp}°C </p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}% </p>
          <p>wind speed:{weatherData.wind.speed}k/m</p>
        </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;
