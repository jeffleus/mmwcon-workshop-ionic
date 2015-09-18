angular.module('starter.controllers')

.controller('LocationsCtrl', function($scope, $ionicModal, $state, LocationSvc, Location, WeatherSvc) {
    $scope.locationSvc = LocationSvc;
    $scope.search = {};
    $scope.lookupZip = _lookupZip;    
    $scope.addLocation = _addLocation;
    $scope.gotoLocation = _gotoLocation;

    function _lookupZip(zip) {
        WeatherSvc.getWeather(zip).then(function(results) {
            if (results.data.cod == "200") {
                $scope.locError = false;        
                var data = results.data;
                data.zip = zip;
                var loc = new Location(data);
                console.log(loc);
                $scope.newLoc = loc;
            }
            else { 
                console.log(results.data.message); 
                $scope.locError = true;
                $scope.newLoc = null;
            }
        });
    }    
    function _addLocation() {
        LocationSvc.addLocation($scope.newLoc);
        $scope.closeModal();
    };
    function _gotoLocation(loc) {
        LocationSvc.current = loc;
        $state.go('app.location');
    };
//
// MODAL - Add Location Form
//    
    $ionicModal.fromTemplateUrl('app/locations/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.search = {};
        $scope.newLoc = null;
        $scope.locError = false;        
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });    
    
});
