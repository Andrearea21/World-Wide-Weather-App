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
}

function search(city) {
  let apiKey = "298f9405a9a634fd43294220b3f6b208";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentWeather);
  //console.log(document.querySelector("#city-input").value);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
