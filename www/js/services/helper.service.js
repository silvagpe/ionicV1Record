angular.module('starter.services', [])
.service("helperService", function () {

  /**
   * Retorna o diretorio cache conforme a plataforma
   */
  this.dirCache = function()
  {
    switch (cordova.platformId) {
      case "android": return cordova.file.externalCacheDirectory;
      case "ios": return cordova.file.cacheDirectory;
    }
  }



});
