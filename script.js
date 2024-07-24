let city;
let weatherData;
let temp;
let humidity;
let windSpeed;
let icon;

const key = "fe9a6b6493b5d9374d904be30443f809";

let input = document.querySelector("#search");
let btn = document.querySelector("#searchButton");
let cityName = document.querySelector("#cityName");
let weatherInfo = document.querySelector("#weatherInfo");
let humidityInfo = document.querySelector("#humidityInfo");
let windInfo = document.querySelector("#windInfo");
let weatherIcon = document.querySelector("#weatherIcon");

const update = () => {
  cityName.innerText = weatherData["name"];
  temp = weatherData["main"]["temp"];
  weatherInfo.innerText = `${temp}\u00B0 C`;
  humidity = weatherData["main"]["humidity"];
  humidityInfo.innerText = `${humidity}%`;
  windSpeed = weatherData["wind"]["speed"];
  windInfo.innerText = `${windSpeed} km/h`;
};

const updateImage = () => {
  icon = weatherData["weather"][0]["main"];
  weatherIcon.src = `images/${icon.toLowerCase()}.png`;
};

window.onload = async function () {
  city = "delhi";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  let response = await fetch(BASE_URL);
  let data = await response.json();
  if (data.cod == 200) {
    weatherData = data;
    input.value = "";
  } else {
    alert("City not found");
    input.value = "";
  }
  update();
  updateImage();
};

btn.addEventListener("click", async () => {
  city = input.value;
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  let response = await fetch(BASE_URL);
  let data = await response.json();
  if (data.cod == 200) {
    weatherData = data;
    input.value = "";
  } else {
    alert("City not found");
    input.value = "";
  }
  update();
  updateImage();
});
