import React, { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Wind, Thermometer, MapPin, Search, Navigation } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../context/LanguageContext";

export default function Weather() {
  const { t } = useLanguage();
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("current"); // 'current' or 'search'
  const [searchQuery, setSearchQuery] = useState("");
  const [locationName, setLocationName] = useState(t("weather.currentLocation"));

  // ✅ Get user's location
  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError(t("weather.errorGeo"));
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLocationName(t("weather.currentLocation"));
          setLoading(false);
        },
        (err) => {
          console.error(err);
          setError(t("weather.errorPermission"));
          setLoading(false);
        }
      );
    }
  };

  // ✅ Search for a city
  const searchCity = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=1&language=en&format=json`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country } = data.results[0];
        setCoords({ latitude, longitude });
        setLocationName(`${name}, ${country}`);
      } else {
        setError(t("weather.errorNotFound"));
      }
    } catch (err) {
      setError("Failed to search city.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mode === "current") {
      getCurrentLocation();
    }
  }, [mode]);

  // ✅ Fetch weather + forecast data
  useEffect(() => {
    if (coords) {
      setLoading(true);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setWeather(data.current_weather);
          setForecast(data.daily);
          setLoading(false);
        })
        .catch((err) => {
          setError(t("weather.errorFetch"));
          setLoading(false);
        });
    }
  }, [coords]);

  // ✅ Prepare chart data
  const chartData = forecast?.time.map((day, idx) => ({
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
    <div className="min-h-screen bg-background p-6 md:p-10 relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1600&q=80"
          alt="Weather Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background/90" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-primary font-heading">{t("weather.title")}</h1>
            <p className="text-gray-500">{t("weather.subtitle")}</p>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMode("current")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${mode === "current" ? "bg-white text-primary shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Navigation size={18} /> {t("weather.currentLocation")}
            </button>
            <button
              onClick={() => setMode("search")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${mode === "search" ? "bg-white text-primary shadow-sm font-semibold" : "text-gray-500 hover:text-gray-700"
                }`}
            >
              <Search size={18} /> {t("weather.searchCity")}
            </button>
          </div >
        </div >

        {/* Search Bar */}
        {
          mode === "search" && (
            <div className="flex gap-2 max-w-md mx-auto animate-fade-in">
              <input
                type="text"
                placeholder={t("weather.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchCity()}
                className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                onClick={searchCity}
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-green-800 transition-colors font-semibold"
              >
                {t("weather.searchButton")}
              </button>
            </div>
          )
        }

        {/* Error Message */}
        {
          error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
              {error}
            </div>
          )
        }

        {/* Loading State */}
        {
          loading && (
            <div className="flex justify-center items-center py-20 text-primary">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )
        }

        {/* Weather Content */}
        {
          !loading && weather && forecast && (
            <div className="space-y-8 animate-fade-in">

              {/* 🌦 CURRENT WEATHER CARD */}
              <div className="bg-gradient-to-r from-primary to-green-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>

                <div className="flex items-center gap-6 z-10">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Thermometer size={48} className="text-accent" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{locationName}</h2>
                    <p className="flex items-center text-sm mt-1 opacity-90">
                      <MapPin className="mr-2" size={16} />
                      {coords.latitude.toFixed(2)}, {coords.longitude.toFixed(2)}
                    </p>
                    <p className="text-lg mt-2 font-medium text-accent">
                      {weather.weathercode === 0 ? `☀️ ${t("weather.clearSky")}` : `☁️ ${t("weather.cloudyRainy")}`}
                    </p>
                  </div>
                </div>

                <div className="text-right z-10 mt-6 md:mt-0">
                  <p className="text-6xl font-extrabold tracking-tighter">{weather.temperature}°</p>
                  <p className="text-lg mt-2 flex justify-end items-center opacity-90">
                    <Wind className="mr-2" size={20} /> {weather.windspeed} km/h
                  </p>
                </div>
              </div>

              {/* 🌡 TEMPERATURE FORECAST */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                  <Sun className="text-accent" /> {t("weather.forecastTitle")}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {forecast.time.map((day, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl p-4 bg-background text-center border border-gray-100 hover:border-primary/30 transition-all hover:shadow-md"
                    >
                      <p className="font-semibold text-gray-600 mb-2 text-sm">
                        {formatDate(day)}
                      </p>
                      <div className="flex justify-center items-baseline gap-1">
                        <span className="text-xl font-bold text-gray-800">{forecast.temperature_2m_max[idx]}°</span>
                        <span className="text-sm text-gray-400">/ {forecast.temperature_2m_min[idx]}°</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🌧️ RAIN FORECAST & CHART */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Rain List */}
                <div className="md:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 text-primary flex items-center gap-2">
                    <CloudRain className="text-blue-500" /> {t("weather.precipitationTitle")}
                  </h3>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {forecast.time.map((day, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-background">
                        <span className="text-gray-600 font-medium">{formatDate(day)}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${forecast.precipitation_sum[idx] > 0 ? "text-blue-600" : "text-gray-400"}`}>
                            {forecast.precipitation_sum[idx]} mm
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <div className="md:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 text-primary">{t("weather.rainfallTrend")}</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="rain"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

            </div>
          )
        }
      </div >
    </div >
  );
}
