// var collection

var iconId = $(".icon");
var currentCity = $("<h2>");
var tempId = $("#temp");
var humidityId = $("#humid");
var windId = $("#windSpeed");
var apiKey = "a0eaeb1750b072dd8c163d6a70ddb7ff";
var searchButton = $("#submit");
var history = $("#buttonsView");
var cityList;


// generate previous search history in buttons

// function renderButtons() {
//   $("#buttons-view").empty();
//   for (var i = 0; i < locationId.length; i++) {
//     var add = $("<button>");
//     add.addId("#submit");
//     add.text(localStorageHistory[i]);
//     $("#history").append(add);
//     console.log("render");
//   }
// }

// function generateButton() {
//   var loadData = localStorage.getItem("history");
//   if (loadData == null || loadData == "") return;

//   var cityButtonArr = JSON.parse(loadData);

//   for (i = 0; i < cityButtonArr.length; i++) {
//     var create = $("<button>");
//     create.attr("#submit", "btn btn-outline-secondary");
//     create.attr("history", "button");
//     create.text(cityButtonArr[i]);
//     localStorageHistory.prepend(create);
//   }
// }


var localStorageHistory = localStorage.getItem("history");


if (localStorageHistory === null) {
   cityList = [];
} else {
   cityList = JSON.parse(localStorageHistory);
}



generateButtons();
function generateButtons() {
  console.log(cityList)
  for (var i = 0; i < cityList.length; i++) {
       search = $("<button>").attr({
          "class": "history"
      });
      search.text(cityList[i]);

      $(".cityList").append(search);

    }
  };

// add searches to array in local storage
function addToSearchHistory(cityName) {
  var localStorageHistory = localStorage.getItem("history");
  // var existing = localStorageHistory.includes(cityList[""]);

  if (localStorageHistory === null) {
     cityList = [];
  } else {
     cityList = JSON.parse(localStorageHistory);
  }
  cityList.push(cityName);
  localStorage.setItem("history", JSON.stringify(cityList));
}

// initiate search when city name entered and get information from api
$(searchButton).on("click", function (displayWeather) {
  displayWeather.preventDefault();
  console.log(searchButton);
  var locationId = $("#city").val().trim();
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

    var cityName = response.name;

    var cityElement = $("#cityName");
    cityElement.text(cityName);

    addToSearchHistory(cityName);
    generateButtons();

    var tempId = $("#temp");
    tempId.text("Temperature: " + response.main.temp + "°C");

    var humidityId = $("#humid");
    humidityId.text("Humidity: " + response.main.humidity + "%");

    var windId = $("#windSpeed");
    windId.text("Wind Speed: " + response.wind.speed + "kmph");

    var uvId = $("#humid");
    uvId.text("Humidity: " + response.main.humidity + "%");

    let lon = response.coord.lon;
    let lat = response.coord.lat;

     var uvIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
     $.ajax({
      url: uvIndex,
      method: "GET"
      }).then(function (response) {
      var uvId = $("#uvIndex");;
      var uvSpan = $("<span>");
      uvId.text("UV Index: ");
      uvSpan.text(response.value);
      if (response.value >= 7) {
          uvId.addClass("high");
      }
      else if (response.value >= 4) {
          uvId.addClass("moderate");
      }
      else  {
          uvId.addClass("low");
      };
      uvId.append(uvSpan);
      $("#uvIndex").append(uvId);
  });
  // uv index search function
  

  });

  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationId + "&units=metric&appid=" + apiKey
  $.ajax({
      url: forecastURL,
      method: "GET",
  }).then(function (response) {

    for (var i = 0; i < cityList.length; i++) {
      let box = $("<div>").attr({

      });

      let hour = moment(response.list[i].dt_txt);
      if (hour.hour() == 12) {
         
          date.text(moment(response.list[i].dt_txt).format('MMMM Do YYYY'));
          $(box).append(date);

          };
           
           var foracastTemp = $("<p>");
           foracastTemp.text("Temperature: " + response.list[i].main.temp + "°C");
           $(box).append(foracastTemp);

           
           var forecast = $("<p>");
           forecast.text("Humidity: " + response.list[i].main.humidity + "%");
           $(box).append(forecast);

           $(".forecast").append(box);
    }

  });

  

});
