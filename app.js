<!DOCTYPE html>
<html>
<head>
  <title>Buggy SF Weather App</title>
</head>
<body>
  <h1>San Francisco Weather 🐛</h1>

  <p id="time">Loading time...</p>
  <p id="weather">Loading weather...</p>

  <button onclick="getWeather()">Refresh Weather</button>

  <script>
    const latitude = 37.7749;
    const longitude = -122.4194;

    function updateTime() {
      const now = new Date();
      document.getElementById("time").innerText =
        "Local time in San Francisco: " + now.toLocaleTimeString("en-US", { timeZone: "America/Los_Angeles" });
    }

    async function getWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        const data = await response.json();

        // BUG: Misspelled temperature key
        const temp = data.current_weather.temprature;

        // BUG: Weather code is shown directly instead of translated
        const weatherCode = data.current_weather.weathercode;

        document.getElementById("weather").innerText =
          `Temperature: ${temp}°C | Weather code: ${weatherCode}`;
      } catch (error) {
        document.getElementById("weather").innerText =
          "Oops, the weather bugs escaped.";
      }
    }

    updateTime();
    getWeather();

    // BUG: Updates every 1000ms forever, but never clears interval
    setInterval(updateTime, 1000);
  </script>
</body>
</html>
