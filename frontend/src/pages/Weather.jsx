import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Weather() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Get user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        (err) => {
          console.error(err);
          setError("Location permission denied — showing Delhi weather.");
          setCoords({ latitude: 28.6, longitude: 77.2 });
        }
      );
    }
  }, []);

  // ✅ Fetch weather + forecast data
  useEffect(() => {
    if (coords) {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data.current_weather);
          setForecast(data.daily);
        })
        .catch((err) => setError("Failed to load weather data."));
    }
  }, [coords]);

  if (error) {
    return (
      <div className="flex flex-col items-center mt-20 text-red-600 text-lg">
        ❌ {error}
      </div>
    );
  }

  if (!weather || !forecast) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500 text-lg">
        Loading weather data... ☁️
      </div>
    );
  }

  // ✅ Prepare chart data
  const chartData = forecast.time.map((day, idx) => ({
    date: new Date(day).toLocaleDateString("en-IN", {
      weekday: "short",
    }),
    rain: forecast.precipitation_sum[idx],
  }));

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 🌦 CURRENT WEATHER SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <Thermometer size={48} />
            <div>
              <h2 className="text-3xl font-bold">Current Weather</h2>
              <p className="flex items-center text-sm mt-1 opacity-90">
                <MapPin className="mr-2" size={18} />
                {coords.latitude.toFixed(2)}, {coords.longitude.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-5xl font-extrabold">{weather.temperature}°C</p>
            <p className="text-lg mt-2 flex justify-end items-center">
              <Wind className="mr-2" /> {weather.windspeed} km/h
            </p>
            <p className="text-md mt-2 opacity-90">
              {weather.weathercode === 0 ? "☀️ Clear Sky" : "☁️ Cloudy"}
            </p>
          </div>
        </div>

        {/* 🌧️ RAIN FORECAST SECTION */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
          <h3 className="text-2xl font-semibold mb-6 text-blue-700 text-center">
            ☔ Rain Forecast (Next 7 Days)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 mb-10">
            {forecast.time.map((day, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 shadow-md transition transform hover:-translate-y-1 hover:shadow-lg ${
                  forecast.precipitation_sum[idx] > 10
                    ? "bg-blue-100"
                    : "bg-emerald-50"
                }`}
              >
                <p className="font-semibold text-gray-700 mb-1">
                  {formatDate(day)}
                </p>
                <div className="flex flex-col items-center">
                  <CloudRain size={28} className="text-blue-500 mb-1" />
                  <p className="text-lg font-bold text-blue-700">
                    {forecast.precipitation_sum[idx]} mm
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 📊 Rainfall Chart */}
          <div className="mt-10">
            <h4 className="text-xl font-semibold text-center text-blue-600 mb-4">
              Rainfall Trend (mm)
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rain"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🌡 TEMPERATURE FORECAST SECTION */}
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
          <h3 className="text-2xl font-semibold mb-6 text-emerald-700 text-center">
            🌡 Temperature Forecast
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
            {forecast.time.map((day, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-gradient-to-br from-emerald-50 to-green-100 text-center shadow-sm hover:shadow-md transition"
              >
                <p className="font-semibold text-gray-700 mb-1">
                  {formatDate(day)}
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  <Sun className="text-yellow-500" size={22} />
                  <p className="text-lg font-semibold text-gray-800">
                    {forecast.temperature_2m_max[idx]}°
                  </p>
                </div>
                <div className="flex justify-center gap-2 mt-1">
                  <Cloud className="text-blue-400" size={20} />
                  <p className="text-sm text-gray-700">
                    {forecast.temperature_2m_min[idx]}°
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
