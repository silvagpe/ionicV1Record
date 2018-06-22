starter_services_module
  .service("fileService", function ($q) {

    var srv = this;

    /**
     * Carrega um arquivo local
     * @param {string} filePath Local onde o arquivo está salvo
     */
    this.readFileBase64 = function (filePath) {

      var deferred = $q.defer();

      //https://www.neontribe.co.uk/cordova-file-plugin-examples/
      //LocalFileSystem.PERSISTENT
      //LocalFileSystem.TEMPORARY
      //var size = 5 * 1024 * 1024;

      var pathToFile = filePath;
      window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
        fileEntry.file(function (file) {
          var reader = new FileReader();

          reader.onloadend = function (e) {
            //console.log(this.result);
            deferred.resolve(this.result);
          };

          reader.readAsDataURL(file);
        }, function (error) { erroReadFileBase64(error, deferred, filePath, 'fileEntry'); });
      }, function (error) { erroReadFileBase64(error, deferred, filePath, 'resolveLocalFileSystemURL'); });

      function erroReadFileBase64(error, deferred, filePath, errorLevel) {
        console.log(errorLevel);

        srv.errorHandler(error, filePath);
        deferred.reject('fileService erro to read file');
      }

      return deferred.promise;
    }

    this.readFileIOs = function (filePath) {

      var deferred = $q.defer();

      window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function (fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile(filePath, {}, function (fileEntry) {

          fileEntry.file(function (file) {
            var reader = new FileReader();

            reader.onloadend = function () {
              deferred.resolve(this.result);
            };

            reader.readAsDataURL(file);

          }, function (error) { erroReadFileIOS(error, deferred, filePath, 'fileEntry'); });
        }, function (error) { erroReadFileIOS(error, deferred, filePath, 'getFile'); });
      }, function (error) { erroReadFileIOS(error, deferred, filePath, 'requestFileSystem'); });

      function erroReadFileIOS(error, deferred, filePath, errorLevel) {
        console.log(errorLevel);

        srv.errorHandler(error, filePath);
        deferred.reject('fileService erro to read file');
      }

      return deferred.promise;
    }


    /**
     * Documentação: https://developer.mozilla.org/en-US/docs/Web/API/FileError
     * @param {error} error Objeto de erro
     * @param {stirng} filePath Caminho do arquivo
     */
    this.errorHandler = function (error, filePath) {


      var msg = '';

      switch (error.code) {
        case FileError.NOT_FOUND_ERR: //1
          msg = 'File not found - A required file or directory could not be found at the time an operation was processed. For example, a file did not exist but was being opened.';
          break;
        case FileError.SECURITY_ERR: //2
          msg = 'Security error - Access to the files were denied for one of the following reasons: 1) The files might be unsafe for access within a Web application. 2) Too many calls are being made on file resources. Other unspecified security error code or situations.';
          break;
        case FileError.NOT_READABLE_ERR: //4
          msg = 'Read error -  The file or directory cannot be read, typically due to permission problems that occur after a reference to a file has been acquired (for example, the file or directory is concurrently locked by another application).';
          break;
        case FileError.ENCODING_ERR: //5
          msg = 'URL malformed - The URL is malformed. Make sure that the URL is complete and valid.';
          break;
        case FileError.NO_MODIFICATION_ALLOWED_ERR: //6
          msg = 'Write error - The state of the underlying file system prevents any writing to a file or a directory.';
          break;
        case FileError.INVALID_STATE_ERR: //7
          msg = 'Invalid state - The operation cannot be performed on the current state of the interface object. For example, the state that was cached in an interface object has changed since it was last read from disk.';
          break;
        case FileError.INVALID_MODIFICATION_ERR: //9
          msg = 'Invalid modification - The modification requested is not allowed. For example, the app might be trying to move a directory into its own child or moving a file into its parent directory without changing its name.';
          break;
        case FileError.QUOTA_EXCEEDED_ERR: //10
          msg = 'Storage quota exceeded - Either there s not enough remaining storage space or the storage quota was reached and the user declined to give more space to the database. To ask for more storage, see Managing HTML5 Offline Storage.';
          break;
        case FileError.TYPE_MISMATCH_ERR: //11
          msg = 'Type mismatch - The app looked up an entry, but the entry found is of the wrong type. For example, the app is asking for a directory, when the entry is really a file.';
          break;
        case FileError.PATH_EXISTS_ERR: //12
          msg = 'Path exists - The file or directory with the same path already exists.';
          break;
        default:
          msg = 'Unknown error';
          break;
      };

      console.log('fileService Error : ' + filePath + ' - ' + msg);
    }

  });
