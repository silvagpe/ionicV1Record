starter_services_module
  .service("recordService", function (helperService) {

    var srv = this;

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
  });
