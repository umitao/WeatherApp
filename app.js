const apiKey = "aa416464083b84bd7ed6a75d81c8725f";

let latitude;
let longitude;

//"https://api.openweathermap.org/data/2.5/onecall?lat=40.9551462&lon=29.0881428&exclude={part}&appid=aa416464083b84bd7ed6a75d81c8725f""

let weather;

function getLocation() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

const onSuccess = (position) => {
  console.log("onSuccess function", position);
  const {
    coords: { latitude, longitude },
  } = position;

  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
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
  console.log(weather);
};

getLocation();
setTimeout(console.log(weather), 5000);
