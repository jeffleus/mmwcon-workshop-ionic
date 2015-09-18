angular.module('starter.controllers')

.controller('CameraCtrl', function($scope, $timeout, $cordovaCamera, $ionicActionSheet, ImageSvc) {
    $scope.imageSvc = ImageSvc;
    $scope.takePicture = _takePicture;
    $scope.addImageSheet = _addImageSheet;  

    function _addImageSheet() {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: 'Take New Photo' },
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

    function _takePicture(useLibrary) {
        var options = {
          quality: 80,
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: (useLibrary==0)?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 850,
          targetHeight: 1100,
          saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            var img = new Image();
            img.data = imageData;
            img.title = "test image";
            ImageSvc.addImage(img);
            
            $state.go('app.camera');
        }, function(err) {
          // error
            console.log(err);
        });
    }    

});