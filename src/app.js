function showCurrentWeather(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let cityElement = response.data.name;
  let windSpeed = document.querySelector("#wind");
  let windElement = Math.round(response.data.wind.speed);
  let currentDescription = document.querySelector("#description-current");
  let descriptionElement = response.data.weather[0].description;
  let currentIcon = document.querySelector("#big-icon");
  let iconElement = response.data.weather[0].icon;
  currentTemperature.innerHTML = `${temperatureElement}`;
  currentCity.innerHTML = `${cityElement}`;
  windSpeed.innerHTML = `${windElement} `;
  currentDescription.innerHTML = `${descriptionElement}`;
  currentIcon.innerHTML = `${currentIcon}`;
  console.log(response.data.weather[0].icon);
}

let apiKey = "298f9405a9a634fd43294220b3f6b208";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(showCurrentWeather);
