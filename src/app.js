function displayWeather(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let info = document.querySelector("#info");
  info.innerHTML = response.data.condition.description;
  let humid = document.querySelector("#humid");
  humid.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
}

let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=1276dbfdft169fo302ba35426e760566&units=metric`;

axios.get(apiUrl).then(displayWeather);
