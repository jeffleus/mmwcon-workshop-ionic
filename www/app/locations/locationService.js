angular.module('starter.services')

.service('LocationSvc', function() {
    var self = this;
    //array used for POJO collections
    self.locations = [];
    self.current = {};
    //single POJO object for current state
    self.currentLocation = {};
    //publish public methods
    self.addLocation = _addLocation;
    self.deleteLocation = _deleteLocation;
    
    function _addLocation(loc) {
        console.log('LocationSvc::addLocation - ' + loc.city);
        loc.id = self.locations.length;
        self.locations.push(loc);
    }
    
    function _deleteLocation(loc) {
        console.log('LocationSvc::deleteLocation - ' + loc.city);
        var index = self.locations.indexOf(loc);
        if (index >-1) {
            self.locations.splice(index,1);
        } else {
            console.log('location not found in LocationSvc');
        }
    }
    
    return self;
})

//use the factory to create a POJO object to allow for OOP of locations
.factory('Location', function() {
    var Location = function(data) {
        this.id = -1;
        this.city = data.name;
        this.zip = data.zip;
        this.coord = data.coord;
    }
    
    Location.prototype.info = function() {
        console.log('Location: ' + this.zip + ' - ' + this.city);
    }

    return Location;
});