function showTemperature(response) {
  let temperatureElement = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperatureElement}`;
}

let apiKey = "298f9405a9a634fd43294220b3f6b208";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(showTemperature);
