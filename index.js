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

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  
  document.querySelector("#icon").setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
    );
}

function searchCity(city) {
  let apiKey = "bb7d3a16c0a16792a34131254852ed9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bb7d3a16c0a16792a34131254852ed9f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchFrom = document.querySelector("#search-form");
searchFrom.addEventListener("submit", handelSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Gingelom");
