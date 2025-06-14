import React, { useState } from "react";
import axios from "axios";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/weather", {
        params: { city }
      });
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching weather. Please check the city name.");
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>🌤 Weather Forecast</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name (e.g. Pune)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "0.5rem", marginRight: "1rem", width: "250px" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Get Weather
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "2rem" }}>
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>🌡 Temp: {weather.main.temp}°C</p>
          <p>🌥 Condition: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
