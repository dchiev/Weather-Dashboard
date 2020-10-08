var userSearch = "";
var searchTerm = $("#city-search");
var searchButton = $("button");
var fiveDay = $("#five-day");
var cityData = $("#city-data");
var searchHistory = $(".search-history");



// Search call 
searchButton.on("click",function(event){

    userSearch = searchTerm.val();

    console.log(userSearch);
    var userSearchArray = [];
    userSearchArray.push(userSearch)
    localStorage.setItem("userSearch", JSON.stringify(userSearchArray))


    var lastSearch = JSON.parse(localStorage.getItem("userSearch"))
    var listSearch = $("<button>").text(lastSearch)
    $(".fa-search").append(listSearch)
    // API request for OpenWeather API
    
    
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=485317cd57c3e86e686cb63f938bd3c6"
  var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + userSearch + "&appid=485317cd57c3e86e686cb63f938bd3c6";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // City Name
    console.log(response);
    var newCity = $("<h3>");
    newCity.text("City: " + response.name);
    cityData.append(newCity);

    // Current date 

  
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    
    var newDate = "  " + month + "/" + day + "/" + year;

    console.log(newDate);

    newCity.append(newDate);

    // weather image 
    var currentWeather = response.weather[0].main;

    if (currentWeather === "Clouds" ){
      var weatherImage = $("<img>").attr("src", "./openweathermap-api-icons-master/icons/04d.png");
      weatherImage.attr("style", "height: 50px; width: 50px");
      $("#weather-image").html(weatherImage);
    }

    else if (currentWeather === "Rain" ){
      var weatherImage = $("<img>").attr("src", "./openweathermap-api-icons-master/icons/10d.png");
      weatherImage.attr("style", "height: 50px; width: 50px");
      $("#weather-image").html(weatherImage);
    }

    else if (currentWeather === "Drizle" ){
      var weatherImage = $("<img>").attr("src", "./openweathermap-api-icons-master/icons/09d.png");
      weatherImage.attr("style", "height: 50px; width: 50px");
      $("#weather-image").html(weatherImage);
    }

    else if (currentWeather === "Clear" ){
      var weatherImage = $("<img>").attr("src", "./openweathermap-api-icons-master/icons/01d.png");
      weatherImage.attr("style", "height: 50px; width: 50px");
      $("#weather-image").html(weatherImage);
    }

    
    // Temperature 
    var finalTemp = Math.floor (response.main.temp - 273.15) * 1.80 + 32
    console.log(finalTemp);
    var newTemp = $("<h4>");
    newTemp.text("Temperature: " + finalTemp + " F");
    cityData.append(newTemp);

    // Humidity

    var newHumidity = $("<h4>");
    newHumidity.text("Humidity: " + response.main.humidity);
    newTemp.append(newHumidity);

    // Wind Speed 

    var newWind = $("<h4>");
    newWind.text("Wind Speed: " + response.wind.speed + " MPH");
    newHumidity.append(newWind);

    // UV Index
    var latitude = response.coord.lat;
    var longitude = response.coord.lon;
    var queryURLuv = "https://api.openweathermap.org/data/2.5/uvi?&appid=485317cd57c3e86e686cb63f938bd3c6&lat=" + latitude  + "&lon=" + longitude;

        $.ajax({
            url: queryURLuv,
            method: 'GET'
        }).then(function (response) {
            var uvData = $("<h4 class= 'uv-index'>").text("UV Index: " + response.value);
          newWind.append(uvData);
       
    });


  // Five Day Forecast
  $.ajax({
    url: queryURLForecast,
    method: "GET"
  }).then(function(response) {

    console.log(response);
    var fiveDayArr = response.list;
    for (let i = 0; i < 5; i ++) {
      console.log(i)
    
  
    var newFiveDayTemp = $("<div class='col fiveDayForecast'>").text("Temperature: " + (Math.floor (fiveDayArr[i].main.temp - 273.15) * 1.80 + 32) + " F");
    var newFiveDayWind = $("<div class='col fiveDayForecast'>").text("Wind Speed " + fiveDayArr[i].wind.speed);
    var newFiveDayHumidity = $("<div class='col fiveDayForecast'>").text("Humidity: " + fiveDayArr[i].main.humidity);

    var fiveDayWeather = fiveDayArr[i].weather[0].main;

    if (fiveDayWeather === "Clouds" ){
      var fiveDayWeatherImage = $("<img class = 'fiveDayImage'>").attr("src", "./openweathermap-api-icons-master/icons/04d.png");
      fiveDayWeatherImage.attr("style", "height: 50px; width: 50px");
    }

    else if (fiveDayWeather === "Rain" ){
      var fiveDayWeatherImage = $("<img class = 'fiveDayImage'>").attr("src", "./openweathermap-api-icons-master/icons/10d.png");
      fiveDayWeatherImage.attr("style", "height: 50px; width: 50px");
    }

    else if (fiveDayWeather === "Drizle" ){
      var fiveDayWeatherImage = $("<img class = 'fiveDayImage'>").attr("src", "./openweathermap-api-icons-master/icons/09d.png");
      fiveDayWeatherImage.attr("style", "height: 50px; width: 50px");
    }

    else if (fiveDayWeather === "Clear" ){
      var fiveDayWeatherImage = $("<img class = 'fiveDayImage'>").attr("src", "./openweathermap-api-icons-master/icons/01d.png");
      fiveDayWeatherImage.attr("style", "height: 50px; width: 50px");
    }


      fiveDay.append(fiveDayWeatherImage)
      fiveDay.append(newFiveDayTemp);
      fiveDay.append(newFiveDayWind);
      fiveDay.append(newFiveDayHumidity); 
    }


    


  
  })})});
