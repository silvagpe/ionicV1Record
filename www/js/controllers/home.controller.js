starter_controllers_module
  .controller('HomeCtrl', function ($scope, $ionicLoading, recordService, $timeout) {

    $scope.audioFirebase = null;
    $scope.tocando = false;
    $scope.gravando = false;
    $scope.record = null;

    /**
     * Captura câmera
     */
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

    /**
     * Toca ou pausa um audio do firebase
     */
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

    $scope.onRecordHolder = function(){

      $scope.gravando = true;
      console.log("Gravando...");

      $scope.record = recordService.newRecord(
        function() {console.log("record sucesso");},
        function(error) {console.log("Erro record", error);}
      )

      var record = recordService.getCurrentPlayMedia();
      if (record.media != null)
      {
        record.media.startRecord();
      }
    }

    $scope.onRecordRelease = function(){

      $scope.gravando = false;
      console.log("Parando...");

      var record = recordService.getCurrentPlayMedia();
      if (record.media != null)
      {
        record.media.stopRecord();
      }
    }

    $scope.onPlayRecord = function(){
      console.log("Reproduzindo gravação");

      recordService.playRecord();


    }


    $scope.onPlayM4A = function(){
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      var url = "https://firebasestorage.googleapis.com/v0/b/ionic-firebase-chat-silva.appspot.com/o/teste_ios.m4a?alt=media&token=6d2372ea-6d0a-434f-8547-a4be2d560659";
      recordService.playRecord(url, true)
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

    $scope.onPlay3GP = function(){
      $ionicLoading.show({
        template: 'Loading...'
      }).then(function () {
        console.log("The loading indicator is now displayed");
      });

      var url = "https://firebasestorage.googleapis.com/v0/b/ionic-firebase-chat-silva.appspot.com/o/teste_android.m4a?alt=media&token=dc1537e2-4081-42c0-a416-d3c6fe9f903c";
      recordService.playRecord(url, true)
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
