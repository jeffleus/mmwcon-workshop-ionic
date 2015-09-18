angular.module('starter.services')

.service('WeatherSvc', function($http, $timeout) {
  function _getWeather(zip) {
    return $timeout(function() {
      return $http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial');
    }, 2500);
  }
  return {
    getWeather: _getWeather
  };
})

.factory('Weather', function() {
    var Weather = function(data) {
        var self = this;
        self.main = data.weather[0].main;
        self.description = data.weather[0].description;
        self.temp = data.main.temp;
        self.pressure = data.main.pressure;
        self.humidity = data.main.humidity;
    };
    
    return Weather;
});