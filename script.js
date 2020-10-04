var userSearch = ""
var searchTerm = $("#city-search")
var searchButton = $("button")
var fiveDay = $("#fiveDay")
var cityData = $("#city-data")


searchButton.on("click",function(event){

    userSearch = searchTerm.val();

    console.log(userSearch);
    // API request for OpenWeather API
    
    
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userSearch + "&appid=485317cd57c3e86e686cb63f938bd3c6"
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

    newDate = "  "          + month + "/" + day + "/" + year;

    console.log(newDate);

    newCity.append(newDate)

    // weather image COMING SOON

    // Temperature 
    var finalTemp = (response.main.temp - 273.15) * 1.80 + 32
    console.log(finalTemp)
    var newTemp = $("<h4>")
    newTemp.text("Temperature: " + finalTemp)
    newDate.append(newTemp);
    



  


  })});
