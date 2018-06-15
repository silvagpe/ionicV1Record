starter_services_module
.service("helperService", function () {

  /**
   * Retorna o diretorio cache conforme a plataforma
   */
  this.dirCache = function()
  {
    try {
      switch (cordova.platformId) {
        case "android": return cordova.file.externalCacheDirectory;
        case "ios": return "";
      }
    } catch (error) {
      console.log("dirCache: ", error);
      return "";
    }
  }

  this.newGuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }



});
