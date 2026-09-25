import { useState } from "react";
import "../App.css";

const hourlyForecast = [
  { time: "Now", temp: 29, condition: "Cloudy", icon: "☁️" },
  { time: "11 PM", temp: 28, condition: "Cloudy", icon: "☁️" },
  { time: "12 AM", temp: 28, condition: "Cloudy", icon: "☁️" },
  { time: "1 AM", temp: 27, condition: "Rain", icon: "🌧️" },
  { time: "2 AM", temp: 27, condition: "Rain", icon: "🌧️" },
  { time: "3 AM", temp: 27, condition: "Cloudy", icon: "☁️" },
  { time: "4 AM", temp: 26, condition: "Cloudy", icon: "☁️" },
];

const dailyForecast = [
  { day: "Today", date: "25", temp: 30, condition: "Cloudy", icon: "☁️" },
  { day: "Sat", date: "26", temp: 30, condition: "Rain", icon: "🌧️" },
  { day: "Sun", date: "27", temp: 31, condition: "Sunny", icon: "☀️" },
  { day: "Mon", date: "28", temp: 29, condition: "Rain", icon: "🌧️" },
  { day: "Tue", date: "29", temp: 30, condition: "Cloudy", icon: "☁️" },
  { day: "Wed", date: "30", temp: 31, condition: "Sunny", icon: "☀️" },
  { day: "Thu", date: "1", temp: 30, condition: "Cloudy", icon: "☁️" },
];

function HomePage() {
  const [city, setCity] = useState("Cebu City");
  const [search, setSearch] = useState("");

  // This can later come directly from your Spring Boot API.
  const weather = {
    city: city,
    temperature: 29,
    feelsLike: 31,
    humidity: 78,
    windSpeed: 12,
    pressure: 1008,
    description: "Partly cloudy",
    main: "Clouds",
  };

  const getWeatherTheme = (condition) => {
    const value = condition.toLowerCase();

    if (value.includes("rain") || value.includes("drizzle")) {
      return "rainy";
    }

    if (value.includes("thunder") || value.includes("storm")) {
      return "stormy";
    }

    if (value.includes("snow")) {
      return "snowy";
    }

    if (value.includes("cloud")) {
      return "cloudy";
    }

    if (value.includes("clear") || value.includes("sun")) {
      return "sunny";
    }

    return "default";
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    setCity(search.trim());
    setSearch("");
  };

  const refreshWeather = () => {
    // Later:
    // call your Spring Boot API here
    console.log("Refreshing weather...");
  };

  return (
    <div className="weather-app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <button className="side-button active" title="Home">
          <span>⌂</span>
        </button>

        <button className="side-button" title="Wind Map">
          <span>⌖</span>
        </button>

        <button
          className="side-button refresh-button"
          title="Refresh"
          onClick={refreshWeather}
        >
          <span>↻</span>
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* SEARCH */}
        <header className="topbar">

          <form className="search-container" onSubmit={handleSearch}>
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">
              Search
            </button>
          </form>

          <div className="top-location">
            <span>📍</span>
            {city}
          </div>

        </header>

        {/* DASHBOARD */}
        <section className="dashboard">

          {/* LEFT / MAIN AREA */}
          <div className="left-section">

            {/* MAIN WEATHER */}
            <section
              className={`main-weather-card ${getWeatherTheme(
                weather.main
              )}`}
            >

              <div className="weather-overlay"></div>

              <div className="weather-content">

                <div className="weather-header">
                  <div>
                    <p className="weather-label">CURRENT WEATHER</p>

                    <h1>{weather.city}</h1>

                    <p className="weather-description">
                      {weather.description}
                    </p>
                  </div>

                  <div className="weather-icon">
                    {weather.main === "Clear" ? "☀️" : "☁️"}
                  </div>
                </div>

                <div className="temperature">
                  {weather.temperature}°
                </div>

                <div className="feels-like">
                  Feels like {weather.feelsLike}°
                </div>

                <div className="weather-details">

                  <div>
                    <span>💧</span>
                    <div>
                      <small>Humidity</small>
                      <strong>{weather.humidity}%</strong>
                    </div>
                  </div>

                  <div>
                    <span>💨</span>
                    <div>
                      <small>Wind</small>
                      <strong>{weather.windSpeed} km/h</strong>
                    </div>
                  </div>

                  <div>
                    <span>◉</span>
                    <div>
                      <small>Pressure</small>
                      <strong>{weather.pressure} hPa</strong>
                    </div>
                  </div>

                </div>

                <div className="selected-date">
                  Friday, September 25, 2026
                </div>

              </div>

            </section>

            {/* HOURLY FORECAST */}
            <section className="forecast-section">

              <div className="section-title">
                <div>
                  <span className="eyebrow">FORECAST</span>
                  <h2>Hourly weather</h2>
                </div>

                <span className="scroll-hint">
                  ← scroll →
                </span>
              </div>

              <div className="hourly-container">

                {hourlyForecast.map((item, index) => (
                  <div
                    className={`hour-card ${
                      index === 0 ? "selected" : ""
                    }`}
                    key={item.time}
                  >
                    <span className="hour-time">
                      {item.time}
                    </span>

                    <span className="forecast-icon">
                      {item.icon}
                    </span>

                    <strong>{item.temp}°</strong>

                    <small>{item.condition}</small>
                  </div>
                ))}

              </div>

            </section>

            {/* DAILY FORECAST */}
            <section className="forecast-section">

              <div className="section-title">
                <div>
                  <span className="eyebrow">7 DAY FORECAST</span>
                  <h2>Daily weather</h2>
                </div>
              </div>

              <div className="daily-container">

                {dailyForecast.map((item, index) => (
                  <div
                    className={`day-card ${
                      index === 0 ? "selected" : ""
                    }`}
                    key={item.date}
                  >

                    <span className="day-name">
                      {item.day}
                    </span>

                    <span className="day-date">
                      {item.date}
                    </span>

                    <span className="forecast-icon">
                      {item.icon}
                    </span>

                    <strong>{item.temp}°</strong>

                    <small>{item.condition}</small>

                  </div>
                ))}

              </div>

            </section>

          </div>

          {/* RIGHT SECTION */}
          <aside className="right-section">

            {/* LIVE CONDITIONS */}
            <section className="panel live-panel">

              <div className="panel-heading">
                <div>
                  <span className="eyebrow">LIVE CONDITIONS</span>
                  <h2>Weather diagnosis</h2>
                </div>

                <span className="live-dot">
                  LIVE
                </span>
              </div>

              <div className="condition-grid">

                <div className="condition-item">
                  <span>💨</span>
                  <small>Wind</small>
                  <strong>{weather.windSpeed} km/h</strong>
                </div>

                <div className="condition-item">
                  <span>💧</span>
                  <small>Humidity</small>
                  <strong>{weather.humidity}%</strong>
                </div>

                <div className="condition-item">
                  <span>◉</span>
                  <small>Pressure</small>
                  <strong>{weather.pressure} hPa</strong>
                </div>

              </div>

              {/* GRAPH */}
              <div className="graph-container">

                <div className="graph-labels">
                  <span>HIGH</span>
                  <span>NORMAL</span>
                  <span>LOW</span>
                </div>

                <svg
                  className="weather-graph"
                  viewBox="0 0 400 150"
                  preserveAspectRatio="none"
                >

                  <line
                    x1="0"
                    y1="40"
                    x2="400"
                    y2="40"
                    className="graph-line"
                  />

                  <line
                    x1="0"
                    y1="80"
                    x2="400"
                    y2="80"
                    className="graph-line"
                  />

                  <line
                    x1="0"
                    y1="120"
                    x2="400"
                    y2="120"
                    className="graph-line"
                  />

                  <polyline
                    points="
                      0,90
                      50,70
                      100,85
                      150,45
                      200,60
                      250,35
                      300,70
                      350,55
                      400,65
                    "
                    className="graph-path"
                  />

                </svg>

              </div>

              <div className="diagnosis safe">
                <span>✓</span>

                <div>
                  <strong>Conditions are stable</strong>
                  <p>
                    Current weather conditions are
                    within normal levels.
                  </p>
                </div>
              </div>

            </section>

            {/* WIND MAP */}
            <section className="panel wind-panel">

              <div className="panel-heading">

                <div>
                  <span className="eyebrow">WIND MAP</span>
                  <h2>{city}</h2>
                </div>

                <span className="map-icon">
                  ◎
                </span>

              </div>

              <div className="wind-map">

                <div className="map-grid"></div>

                <div className="wind-wave wave-1"></div>
                <div className="wind-wave wave-2"></div>
                <div className="wind-wave wave-3"></div>

                <div className="location-marker">
                  <span>📍</span>
                  <small>{city}</small>
                </div>

                <div className="wind-direction">
                  <span>N</span>
                  <div className="compass-arrow">↑</div>
                  <span>S</span>
                </div>

              </div>

              <div className="map-footer">
                <span>Wind speed</span>
                <strong>{weather.windSpeed} km/h</strong>
              </div>

            </section>

          </aside>

        </section>

      </main>
    </div>
  );
}

export default HomePage;