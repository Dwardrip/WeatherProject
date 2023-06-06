let currentTime = new Date();

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

let date = currentTime.getDate();
let year = currentTime.getFullYear();

let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
} else {
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];

h2.innerHTML = `${day} ${month} ${date} ${year}`;
h3.innerHTML = `${hours}:${minutes}`;

//

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[date.getDay()];
}



function getForecast(coordinates) {
  let apiKey = "3at253b114d8ffb09faf86d264boff05";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="weather-forecast row" id="forecast">`;

  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
                  <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    day.time
                  )}</div>
                    <img
                      src="${day.condition.icon_url}"
                      alt="description"
                      width="50"
                    />
                    <div class="weather-forecast-temp">
                    <span class="weather-forecast-temp-max">
                    ${Math.round(day.temperature.maximum)}°
                      </span>
                      <span class="weather-forecast-temp-min">
                      ${Math.round(day.temperature.minimum)}°
                      </span>
                      </div>
                      </div>
                      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function displayWeather(response) {
 
  celsiusTemperature = response.data.temperature;
  
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#humidity").innerHTML = `${response.data.temperature.humidity} %`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(
    response.data.wind.speed)} km/h`;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

   let iconElement = document.querySelector(".icon");
    iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
    iconElement.setAttribute("alt", `${response.data.condition.description}`);
    getForecast(response.data.coordinates);
  }



function searchCity(city) {
  let apiKey = "3at253b114d8ffb09faf86d264boff05";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handelSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  }

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "bb7d3a16c0a16792a34131254852ed9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let displayWeather = document.querySelector("#temperature");
  displayWeather.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let displayWeather = document.querySelector("#temperature");
  displayWeather.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchFrom = document.querySelector("#search-form");
searchFrom.addEventListener("submit", handelSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Gingelom");
