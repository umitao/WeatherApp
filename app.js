const apiKey = "aa416464083b84bd7ed6a75d81c8725f";

let latitude;
let longitude;
let weather;

function getLocation() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

const onSuccess = (position) => {
  console.log("onSuccess function", position);
  const {
    coords: { latitude, longitude },
  } = position;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(url)
    .then((resolve) => resolve.json())
    .then((weatherInfo) => {
      onWeatherIsReady(weatherInfo);
    });
};

const onError = (error) => {
  const { message } = error;
  const notification = document.querySelector(".notification");
  console.error("onError fn", error, "put it on the", notification);
  notification.innerHTML = message;
  notification.style.display = "block";
};

const onWeatherIsReady = (weather) => {
  //convert temperature to metric and append before the existing text
  const temperature = document.querySelector(".temperature-value p");
  let tempMetric = weather.main.temp - 273.15;
  tempMetric = tempMetric.toFixed(1);
  temperature.textContent = tempMetric + temperature.textContent;

  //get temperature icon
  const tempIcon = document.querySelector("img");
  tempIcon.src = `icons/${weather.weather[0].icon}.png`;

  //get description
  const tempDesription = document.querySelector(".temperature-description p");
  tempDesription.innerHTML = weather.weather[0].description;

  //get location
  const location = document.querySelector(".location p");
  location.innerHTML = weather.name;
};

getLocation();
