angular.module('starter.services')

.service('ImageSvc', function() {
    var self = this;
    //array used for POJO collections
    self.images = [];
    self.addImage = _addImage;
    self.deleteImage = _deleteImage;
    
    function _addImage(image) {
        console.log('ImageSvc::addImage');
        image.id = self.images.length;
        self.images.push(image);
    }
    
    function _deleteImage(image) {
        console.log('ImageSvc::deleteImage');
        var index = self.images.indexOf(image);
        if (index >-1) {
            self.images.splice(index,1);
        } else {
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