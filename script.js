var iconId = document.getElementById("icon");
var tempId = document.getElementById("temperature");
var humidityId = document.getElementById("humidity");
var windId = document.getElementById("wind");
var uvId = document.getElementById("uv");
var apiKey = "a0eaeb1750b072dd8c163d6a70ddb7ff";

$(".searchBtn").on("click", function (event) {
  $(this).val();
  event.preventDefault();
  var locationId = document.getElementById("city");

  localStorage.setItem(locationId);
  console.log("search");
});

function displayWeather() {
  var weather = $(this).attr("data-name");
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationId +
    "&units=metric&appid=" +
    apiKey;
  console.log(displayWeather);
  $.ajax({
    url: queryURL,
  }).then(function (response) {});
}
