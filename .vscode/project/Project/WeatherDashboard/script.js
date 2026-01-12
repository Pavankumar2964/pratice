const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    if (city === "") return;

    try {
        // Step 1: Get coordinates for the city name (Geocoding)
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("City not found");
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        // Step 2: Get weather data using those coordinates
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=kmh`;
        const weatherResponse = await fetch(weatherUrl);
        const data = await weatherResponse.json();

        // Step 3: Update the UI
        document.querySelector(".city").innerHTML = name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temperature_2m) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.relative_humidity_2m + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_speed_10m + " km/h";

        // Step 4: Update Icon based on Weather Code
        const code = data.current.weather_code;
        updateWeatherIcon(code);

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching data.");
    }
}

function updateWeatherIcon(code) {
    // Simple mapping for common codes (0=Clear, 1-3=Cloudy, 45-48=Fog, 51-67=Rain, 71-77=Snow)
    if (code === 0) {
        weatherIcon.src = "https://openweathermap.org/img/wn/01d@2x.png"; // Clear
    } else if (code <= 3) {
        weatherIcon.src = "https://openweathermap.org/img/wn/03d@2x.png"; // Clouds
    } else if (code >= 51 && code <= 67) {
        weatherIcon.src = "https://openweathermap.org/img/wn/10d@2x.png"; // Rain
    } else {
        weatherIcon.src = "https://openweathermap.org/img/wn/02d@2x.png"; // Default
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});