angular.module('starter.services')

//singleton service to provide a list of image objects
.service('ImageSvc', function() {
    var self = this;
    //array used for POJO collections
    self.images = [];
    //publish public methods at the top of the service
    self.addImage = _addImage;
    self.deleteImage = _deleteImage;
    //private methods backing the public interface methods
    function _addImage(image) {
        //console logs like this help a lot in the debuggger to see
        // what is going on w/ your service api
        console.log('ImageSvc::addImage');
        //poor man's indexing as items are added to the collection
        image.id = self.images.length;
        self.images.push(image);
    }
    
    function _deleteImage(image) {
        //more console logging
        console.log('ImageSvc::deleteImage');
        //check for the existence of the object in the collection array
        var index = self.images.indexOf(image);
        if (index >-1) {
            //if found, splice out the item at the index
            self.images.splice(index,1);
        } else {
            //otherwise, log to the console that now image found
            console.log('image not found in ImageSvc');
        }
    }
    
    return self;
})

//use the factory to create a POJO object to allow for OOP of images
.factory('Image', function() {
    var Image = function(data) {
        this.id = -1;
        this.data = data.imageData;
        this.title = imageTitle;
    }
    
    Image.prototype.info = function() {
        console.log('Image: ' + this.imageTitle);
    }

    return Image;
});