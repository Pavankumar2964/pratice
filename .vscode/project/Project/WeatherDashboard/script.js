const apiKey = "d61e48a4e33146ac99f124359260801";
const apiUrl =" https:api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=Hyderabad&days=3"
;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("City not found!");
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Update icon based on weather condition
        const condition = data.weather[0].main.toLowerCase();
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});