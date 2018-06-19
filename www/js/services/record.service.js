starter_services_module
  .service("recordService", function (helperService, $q) {

    var srv = this;
    srv.currentPlayMedia = {
      media: null,
      playing: false,
      src : ''
    };

    this.recordExtension = function () {

      try {
        switch (cordova.platformId) {
          case "android": return "m4a";
          case "ios": return "m4a";
        }
      } catch (error) {
        console.log("recordExtension: ", error);
        return "mp3";
      }
    }

    this.newFileRecord = function () {
      var filePath = helperService.dirCache();
      filePath += helperService.newGuid();
      filePath += "." + srv.recordExtension();

      return filePath;
    }

    /**
     * Retorna o locar do arquivo e o objeto Media
     */
    this.newRecord = function (sucessoCallback, errorCallback) {

      srv.currentPlayMedia = srv.newCurrentPlayMeda(true);

      try {
        srv.currentPlayMedia.media = new Media(
          srv.currentPlayMedia.src,
          // success callback
          function () {
            console.log("recordAudio():Audio Success");
            if (sucessoCallback)
              sucessoCallback();
          },
          // error callback
          function (err) {
            console.log("recordAudio():Audio Error: " + err.code);
            if (errorCallback)
              errorCallback();

          });
      } catch (error) {
        console.warn("newRecord: ", error);
      }

      return srv.currentPlayMedia;
    }

    this.playRecord = function (src, newAudio) {

      var deferred = $q.defer();


      if (newAudio) {
        srv.currentPlayMedia = srv.newCurrentPlayMeda(true);
      }

      try {

        if (srv.currentPlayMedia.media == null) {

          console.log('Iniciando Media');

          srv.currentPlayMedia.media = new Media(src,

            // success callback
            function () {
              console.log("playAudio():Audio Success");
            },

            // error callback
            function (err) {
              console.log("playAudio():Audio Error: " + err);
            }
          );
        }

        playAudioFirebase(deferred);

      } catch (error) {
        console.log('playRecord: Erro ao iniciar o player ', error.message);
        deferred.reject('Media não carregada ou nula');
      }


      return deferred.promise;
    }

    this.getCurrentPlayMedia =function()
    {
      return srv.currentPlayMedia;
    }

    this.newCurrentPlayMeda = function(newFile){

      if (srv.currentPlayMedia == null){
        srv.currentPlayMedia = {};
      }

      if (srv.currentPlayMedia.media != null) {
        srv.currentPlayMedia.media.stop();
        srv.currentPlayMedia.media.release();
      }

      srv.currentPlayMedia.media = null;
      srv.currentPlayMedia.playing = false;
      srv.currentPlayMedia.src = newFile ? srv.newFileRecord() : "";

      return srv.currentPlayMedia;
    }

    function playAudioFirebase(deferred) {

      if (srv.currentPlayMedia.media != null) {
        if (srv.currentPlayMedia.playing == false) {
          srv.currentPlayMedia.media.play();
          srv.currentPlayMedia.playing = true;
          console.log("Play current media");

        }
        else {
          srv.currentPlayMedia.media.pause();
          srv.currentPlayMedia.playing = false;
          console.log("Pause current media");
        }

        deferred.resolve("Media carregada com sucesso");
      }
      else {
        console.log("currentPlayMedia.media está nula");
        deferred.reject('Media não carregada ou nula');
      }
    }

  });
