angular.module('starter.services')

.service('WeatherSvc', function($http, $timeout) {
  function _getWeather(zip) {
    //calling svc w/ $timeout wrapper to allow forced delay for UI testing
    return $timeout(function() {
        //use the $http svc to make a direct call to API and return the promise
      return $http.get('http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&units=imperial');
    }, 250);
      //note, this last parameter can be used to add a svc delay for demo'g the $ionicLoading
  }
    //wrap the private method in an object and return from the svc singleton
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