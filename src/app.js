function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
              <div class="weekday">${day}</div>
              <img
                src="https://ssl.gstatic.com/onebox/weather/48/rain_light.png"
                alt=""
                width="35px"
              />
              <br />
              <div class="forecast-temp">
                <span class="forecast-temp-max">14°</span>
                <span class="forecast-temp-min">10°</span>
              </div>
            </div>
           `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

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
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  celsiusTemp = response.data.temperature.current;
}

function search(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=1276dbfdft169fo302ba35426e760566&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFaren(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  let farenTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenTemp);
}

function displayCels(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsiusTemp);
}

search("Ryde");
displayForecast();

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let faren = document.querySelector("#faren");
faren.addEventListener("click", displayFaren);

let cels = document.querySelector("#cels");
cels.addEventListener("click", displayCels);
