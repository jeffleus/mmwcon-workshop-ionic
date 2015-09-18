angular.module('starter.controllers')

.controller('LocationsCtrl', function($scope, $ionicModal, $state, LocationSvc, Location, WeatherSvc) {
    //bind the location svc to the controller's scope for use in the view
    $scope.locationSvc = LocationSvc;
    //search object for holding the zip on the modal
    $scope.search = {};
    //publish the private methods for use from the UI events of the view
    $scope.lookupZip = _lookupZip;    
    $scope.addLocation = _addLocation;
    $scope.gotoLocation = _gotoLocation;

    //given a zip code use the weather svc to lookup the city
    function _lookupZip(zip) {
        WeatherSvc.getWeather(zip).then(function(results) {
            //the api of the svc returns 200 for a successful zip submission
            if (results.data.cod == "200") {
                //clear the error bit in the scope model
                $scope.locError = false;
                //pass the results to the Location ctor, log it and set as the newLoc on scope
                var loc = new Location(results.data);
                console.log(loc);
                $scope.newLoc = loc;
            }
            //the api of the svc returns codes other than 200 for error conditions
            else { 
                //log the error, set the error bit, and clear the newLoc object
                console.log(results.data.message); 
                $scope.locError = true;
                $scope.newLoc = null;
            }
        });
    }    
    //add the newLoc to the location service collection and close modal
    function _addLocation() {
        LocationSvc.addLocation($scope.newLoc);
        $scope.closeModal();
    };
    //set the current location in the svc to the selected loc and go to the location screen
    function _gotoLocation(loc) {
        LocationSvc.current = loc;
        $state.go('app.location');
    };
//
// MODAL - Add Location Form
//
    //load the modal service from a separate view file
    $ionicModal.fromTemplateUrl('app/locations/addLocation.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        //attach the resulting modal to the scope for use by the view
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        //on open: clear search, init the newLoc, and clear the error bit
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