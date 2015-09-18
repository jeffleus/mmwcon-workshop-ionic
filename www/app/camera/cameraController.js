angular.module('starter.controllers')
/*
Injected Services
*****************
-timeout used to cancel actionSheet after a delay w/ no interaction
-cordovaCamera used to control the camera plugin (available thru ngCordova module)
-ionicActionSheet, used as example of iOS interface for choosing next action
-ImageSvc, provides the data service for managing a list of images grabbed thru camera
*/
.controller('CameraCtrl', function($scope, $timeout, $cordovaCamera, $ionicActionSheet, ImageSvc) {
    //link the service for images to the scope for binding in the view
    $scope.imageSvc = ImageSvc;
    //link the private actionSheet method to scope to allow binding to the view button
    $scope.addImageSheet = _addImageSheet;  

    function _addImageSheet() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                //button index used to identify which button is clicked
                { text: 'Take New Photo' },
                //options included to select from photo library
                { text: 'Exisiting Photo' }
            ],
            titleText: 'Add Image',
            cancelText: 'Cancel',
            cancelFunc: function() {
            },
            buttonClicked: function(index) {
                hideSheet();
                _takePicture(index);
                return true;
            }
        });
        //safety net timeout call to hide the action sheet if no input after 3sec
        $timeout(function() {
            hideSheet();
        }, 3000);
    }
    //private method used to call the camera plugin for taking a picture
    function _takePicture(useLibrary) {
        console.log('CameraCtrl::takePicture start the camera plugin');
        //option object used to configure camera when calling the native camers
        var options = {
          quality: 80,
        //note, this can be changed to return dataURL format instead of files
          destinationType: Camera.DestinationType.FILE_URI,
        //use the clicked button index to choose camera/library
          sourceType: (useLibrary==0)?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 850,
          targetHeight: 1100,
        //use to opt out of saving a copy of the image in the library
          saveToPhotoAlbum: false
        };

        //async design: ask for picture --> do something w/ the data
        // ngCordova uses $promises and .then( function() { ... }) design
        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log('CameraCtrl::getPicture end the promise and save the image');
            //this is where I think the factory class in my service is worth the effort
            var img = new Image();
            img.data = imageData;
            img.title = "test image";
            ImageSvc.addImage(img);
            //another example of using the $state service for navigation instead of urls
            $state.go('app.camera');
        }, function(err) {
          // error
            console.log(err);
        });
    }    

});