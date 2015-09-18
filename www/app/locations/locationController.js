angular.module('starter.controllers')
/*
Injected Services
*****************
-$loading used for UI feedback when bkgd operations run, like the web svc call
-LocationSvc used for state of current selected location
-Location class included but not really used in this controller
-WeatherSvc used to lookup weather in the refresh call
-Weather class included to format svc JSON data as an object w/ easy property reference
*/
.controller('LocationCtrl', function($scope, $ionicLoading, LocationSvc, Location, WeatherSvc, Weather) {
    //bind the location svc to the scope to support binding to our location data
    $scope.locationSvc = LocationSvc;
    //publish private method for the weather svc to allow binding to button event in view
    $scope.refreshWeather = _refreshWeather;
    function _refreshWeather() {
        //start by showing the spinner for UI feeback while svc runs
        $ionicLoading.show();
        //svc uses JS promise design: getWeather(zip) --> .then(function(...) { ... })
        WeatherSvc.getWeather(LocationSvc.current.zip).then(function(results) {
            //use the class svc to consume the JSON returned
            $scope.weather = new Weather(results.data);
            //log an update of the svc results and hide the spinner from the ionicLoading svc
            console.log(results.data);
            $ionicLoading.hide();
        });
    }
});