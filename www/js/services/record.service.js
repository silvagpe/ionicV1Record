starter_services_module
  .service("recordService", function (helperService, $q) {

    var srv = this;
    srv.currentPlayMedia = {
      media: null,
      playing: false,
    };

    this.recordExtension = function () {

      try {
        switch (cordova.platformId) {
          case "android": return "3gp";
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

      var retorno = {};

      try {
        retorno.src = srv.newFileRecord();
        retorno.mediaRec = new Media(
          retorno.src,
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
        console.log("newRecord: ", error);
      }

      return retorno;
    }

    this.playRecord = function (src, newAudio) {

      var deferred = $q.defer();

      console.log('Iniciando player');

      if (newAudio && srv.currentPlayMedia.media != null) {
        srv.currentPlayMedia.media.stop();
        srv.currentPlayMedia.media.release();
      }

      try {

        if (srv.currentPlayMedia.media == null) {
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
        console.log('Erro ao iniciar o player ', error.message);
        deferred.reject('Media não carregada ou nula');
      }


      return deferred.promise;
    }

    this.getCurrentPlayMedia =function()
    {
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
