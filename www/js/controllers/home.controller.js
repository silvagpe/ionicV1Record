starter_controllers_module
  .controller('HomeCtrl', function ($scope, $ionicLoading, recordService, $timeout) {

    $scope.audioFirebase = null;
    $scope.tocando = false;



    $scope.onCamera = function () {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });

      function onSuccess(imageURI) {
        var image = document.getElementById('myImage');
        image.src = imageURI;
      }

      function onFail(message) {
        alert('Failed because: ' + message);
      }
    }


    $scope.onPlayStopAudioFirabase = function () {

      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });


      var url = "https://firebasestorage.googleapis.com/v0/b/zortea-chat-app.appspot.com/o/AeroSmith%20-%20The%20Other%20Side.mp3?alt=media&token=dddb7d2e-8c9c-4411-a004-7d9f6d4cf675";
      recordService.playRecord(url, false)
        .then(
          function (result) {
            $scope.tocando = recordService.getCurrentPlayMedia().playing;
            console.log(result);
            $ionicLoading.hide().then(function () {
              console.log("The loading indicator is now hidden");
            });
          },
          function (error) {
            console.warn(error);

            $timeout(function(){
              $ionicLoading.hide().then(function () {
                console.log("The loading indicator is now hidden");
              });
            }, 1000)

          });
    }

  }
  );
