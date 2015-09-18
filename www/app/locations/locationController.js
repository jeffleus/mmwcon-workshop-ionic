angular.module('starter.controllers')

.controller('LocationCtrl', function($scope, $ionicLoading, LocationSvc, Location, WeatherSvc, Weather) {
    $scope.locationSvc = LocationSvc;
    
    $scope.refreshWeather = _refreshWeather;
    function _refreshWeather() {
        $ionicLoading.show();
        WeatherSvc.getWeather(LocationSvc.current.zip).then(function(results) {
            $scope.weather = new Weather(results.data);
            console.log(results.data);
            $ionicLoading.hide();
        });
    }
});