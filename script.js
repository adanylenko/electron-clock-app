const moment = require("moment-timezone");
const remote = require("electron").remote;
const axios = require("axios").default;

const timeContainer = document.getElementById("time");
const dateContainer = document.getElementById("date");
const tempOutValue = document.getElementById("temperature-out-value");

loadTemp();
loadTime();

function loadTemp() {
  axios
    .get(
      "http://api.openweathermap.org/data/2.5/weather?appid=87db97741fe65573bc7d699cac6409fe&units=metric&q=Chernihiv,ua"
    )
    .then(result => {
      const temp =
        result && result.data && result.data.main && result.data.main.temp
          ? `${result.data.main.temp} °C`
          : "N/A";

      tempOutValue.innerText = temp;
    });
}

function loadTime() {
  timeContainer.innerText = moment()
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("HH:mm:ss");
  dateContainer.innerText = moment()
    .tz(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .format("dddd DD MMMM YYYY");
}

setInterval(() => {
  loadTime();
}, 1000);

setInterval(() => {
  loadTemp();
}, 30 * 60 * 1000);

document.getElementById("close-button").addEventListener("click", function(e) {
  remote.getCurrentWindow().close();
});
