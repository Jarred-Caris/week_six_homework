var iconId = document.getElementById(".icon");
var locationId = document.getElementById("#city");
var tempId = document.getElementById("#temp");
var humidityId = document.getElementById("#humid");
var windId = document.getElementById("#windSpeed");
var uvId = document.getElementById("#uvIndex");
var apiKey = "a0eaeb1750b072dd8c163d6a70ddb7ff";
var searchButton = document.getElementById("#submit");

$(searchButton).on("click", function (event) {
  event.preventDefault();
  $(this).val(value);

  console.log(searchButton);
});

function displayWeather() {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationId +
    "&units=metric&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

//$(".searchBtn").on("click", function (event) {
//$(this).val();
//event.preventDefault();
//var locationId = document.getElementById("city");

//localStorage.setItem(locationId);
//console.log("search");
//});
