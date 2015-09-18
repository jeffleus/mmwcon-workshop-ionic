angular.module('starter.controllers')

.controller('TripCtrl', function($scope, TripSvc, Trip) {
    $scope.tripSvc = TripSvc;
    
    $scope.$on('$ionicView.enter', function() {
        var trip = new Trip('TEST TRIP');
        TripSvc.addTrip(trip);
    });
});
