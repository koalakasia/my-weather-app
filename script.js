//challenge1
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[now.getDay()];

let time = document.querySelector("#time");

let hours = now.getHours();

if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}
time.innerHTML = `${currentDay} ${hours}:${minutes}`;

//challenge2
let apiKey = "743bee57fddbfaf52447193a87d5dd25";

function city(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");
  let cityName = searchInput.value;

  let geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  console.log(geoUrl);
  axios.get(`${geoUrl}`).then(getTemperature);
}
function getTemperature(response) {
  let lat = response.data[0].lat;
  let lon = response.data[0].lon;

  console.log(lat);
  console.log(lon);

  //let apiKey = "743bee57fddbfaf52447193a87d5dd25";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function showTemperature(response) {
  console.log(response.data.main.temp);
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  console.log(`${temperature} ${city}`);
  let currentCity = document.querySelector("#cityTitle");
  currentCity.innerHTML = cityName;
  let tempInfo = document.querySelector("#tempInfo");
  tempInfo.innerHTML = temperature;
}

let form = document.querySelector("#search");
form.addEventListener("submit", city);

let myLocation = document.querySelector("#myLocation");
myLocation.addEventListener("click", getLocation);

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  console.log(lat);
  console.log(lon);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
