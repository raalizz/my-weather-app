//date
function updateTime() {
  let currentDate = new Date();
  let h7 = document.querySelector("#date");

  let date = currentDate.getDate();
  let hours = currentDate.getHours();
  if (hours < 10) {
    //to put a 0 infront of single digits
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  let amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  h7.innerHTML = `${day} ${hours}:${minutes}:${seconds} ${amPm}`;
}
window.setInterval(updateTime, 1000);

//show city and weather info using API
function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  document.querySelector("#humidity-info").innerHTML = `humidity:
    ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  document.querySelector("#wind-info").innerHTML = `wind: ${wind} mph`;
}
function searchCity(city) {
  let apiKey = "20cd239ce7bd47f6ff543a68b3fb7412";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "20cd239ce7bd47f6ff543a68b3fb7412";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
let magnifyingGlass = document.querySelector("#big");
magnifyingGlass.addEventListener("click", handleSubmit);
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#show-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");

//temp value change
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 73;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 22;
}
let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

celsiusLink.addEventListener("click", convertToCelsius);
fahrenheitLink.addEventListener("click", convertToFahrenheit);
