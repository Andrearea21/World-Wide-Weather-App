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
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index > 0) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2 forecast">
        <div class="weather-forecast-date">${formatForecastDate(
          forecastDay.dt
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="60"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max" id="max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min" id="min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
        <div class="description">${forecastDay.weather[0].description}</div>
      </div>`;

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
  let currentMaxTemperature = document.querySelector("#current-max");
  let currentMinTemperature = document.querySelector("#current-min");
  let currentMaxTempElement = Math.round(response.data.main.temp_max);
  currentMaxTemperature.innerHTML = `${currentMaxTempElement}`;

  let currentMinTempElement = Math.round(response.data.main.temp_min);
  currentMinTemperature.innerHTML = `${currentMinTempElement}`;

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

search("Copenhagen");
