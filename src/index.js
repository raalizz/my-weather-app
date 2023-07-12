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

// to get the forecast days names
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

//forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                <div class="dayOfWeek">
                  <h4>${formatDay(forecastDay.dt)}</h4>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                    width="40"
                    class="sun" 
                  />
                  <br />
                  <span class="highTemp">${Math.round(
                    forecastDay.temp.max
                  )}˚</span>
                  <span class="lowTemp">${Math.round(
                    forecastDay.temp.min
                  )}˚</span>
                </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//get daily forecast for 7 days API
function getForecast(coordinates) {
  let apiKey = "c8735bb7e8e2f8d8a38c7501f3cd47d3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

//show city and weather info using API
function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
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
let searchButton = document.querySelector("#big");
searchButton.addEventListener("click", handleSubmit);
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#show-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//temp value change
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Tokyo");
