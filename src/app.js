function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row"`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6 || index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2">
            <div class="week-day">${formatForecastDate(forecastDay.dt)}</div>
            <div>
              <img
               src ="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png"
                alt= "weather icon"
               />
              </div>
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
            </div>
            <div class="description">${
              forecastDay.weather[0].description
            }</div>`;

      forecastHTML = forecastHTML + `</div>`;
    }

    forecastElement.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let apiKey = "6db953501a1796221633635ef5980630";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function showCurrentWeather(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city-input").value;
  let cityElement = document.querySelector("#city-name");
  let windSpeed = document.querySelector("#wind");
  let windElement = Math.round(response.data.wind.speed);
  let currentHumidity = document.querySelector("#humidity");
  let humidityElement = response.data.main.humidity;
  let currentDescription = document.querySelector("#description-current");
  let descriptionElement = response.data.weather[0].description;
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#big-icon");

  celsiusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${temperatureElement}`;
  cityElement.innerHTML = `${currentCity}`;
  windSpeed.innerHTML = `${windElement} `;
  currentHumidity.innerHTML = `${humidityElement}`;
  currentDescription.innerHTML = `${descriptionElement}`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "298f9405a9a634fd43294220b3f6b208";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//unit conversion
let celsiusTemperature = null;

function displayFahrenheitTemperatures(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperatures);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Copenhagen");
