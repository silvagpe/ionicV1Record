angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      try {
        console.log('Media ok ', Media);
      } catch (error) {
        console.log('Media not found ', error.message);
      }

      try {
        console.log('navigator.camera ok ', navigator.camera);
      } catch (error) {
        console.log('navigator.camera not found ', error.message);
      }


      //capturarFoto();
      //playAudio("https://firebasestorage.googleapis.com/v0/b/zortea-chat-app.appspot.com/o/AeroSmith%20-%20The%20Other%20Side.mp3?alt=media&token=dddb7d2e-8c9c-4411-a004-7d9f6d4cf675");





      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };


    function capturarFoto() {
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


    function playAudio(url) {

      console.log('Iniciando player');

      try {
        // Play the audio file at url
        var my_media = new Media(url,

          // success callback
          function () {
            console.log("playAudio():Audio Success");
          },

          // error callback
          function (err) {
            console.log("playAudio():Audio Error: " + err);
          }
        );

        // Play audio
        my_media.play();
      } catch (error) {
        console.log('Erro ao iniciar o player ', error.message);
      }


    }


  })

  .controller('PlaylistsCtrl', function ($scope, helperService) {

    $scope.txtBtnGravando = "Gravar";
    $scope.mediaRec = null;
    $scope.audioFireBase = null;

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

    $scope.onTocarAudio = function () {
      var url = "https://firebasestorage.googleapis.com/v0/b/zortea-chat-app.appspot.com/o/AeroSmith%20-%20The%20Other%20Side.mp3?alt=media&token=dddb7d2e-8c9c-4411-a004-7d9f6d4cf675";
      console.log('Iniciando player');

      try {
        // Play the audio file at url
        $scope.audioFireBase = new Media(url,

          // success callback
          function () {
            console.log("playAudio():Audio Success");
          },

          // error callback
          function (err) {
            console.log("playAudio():Audio Error: " + err);
          }
        );

        // Play audio
        $scope.audioFireBase.play();
      } catch (error) {
        console.log('Erro ao iniciar o player ', error.message);
      }
    }

    $scope.onPararAudio = function () {
      $scope.audioFireBase.stop();
    }

    $scope.onGravar1 = function () {
      recordAudio();
    }



    $scope.onHold = function () {
      $scope.txtBtnGravando = "Gravando";
      console.log("Gravando");

      var src = "myrecording.mp3";
      var mediaRec = new Media(src,
        // success callback
        function () {
          console.log("recordAudio():Audio Success");
        },

        // error callback
        function (err) {
          console.log("recordAudio():Audio Error: " + err.code);
        });

      // Record audio
      mediaRec.startRecord();

    };

    $scope.onRelease = function () {
      console.log("Parando gravação");
      $scope.txtBtnGravando = "Gravar";

      mediaRec.resumeRecord();

    };

    $scope.onTouch = function () {
      mediaRec.play();
    }


    function recordAudio() {


      console.log("recordAudio");

      var src = helperService.dirCache() + "myrecsound.3gp";

      var mediaRec = new Media(src,
        // success callback
        function () {
          console.log("recordAudio():Audio Success");
        },

        // error callback
        function (err) {
          console.log("recordAudio():Audio Error: " + err.code);
        });

      // Record audio
      mediaRec.startRecord();
      console.log("recordAudio - stated");

      // Pause Recording after 5 seconds
      setTimeout(function () {
        mediaRec.pauseRecord();
        console.log("recordAudio - paused");
      }, 5000);

      // Resume Recording after 10 seconds
      setTimeout(function () {
        mediaRec.stopRecord();
        console.log("recordAudio - stopped");
      }, 7000);

      setTimeout(function () {
        mediaRec.play();
        console.log("recordAudio - played");
      }, 9000);
    }
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams) {
  });
