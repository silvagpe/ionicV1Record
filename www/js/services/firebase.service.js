starter_services_module
  .service("firebaseService", function ($q) {

    var srv = this;

    /**
     * Retorna o usuário logado do firebase
     */
    this.getCurrentFirebaseUser = function () {
      return firebase.auth().currentUser;

    };

    /**
     * Criar um novo usuário no firebase
     * @param {string} email
     * @param {string} password
     */
    this.createUserWithEmailAndPassword = function (email, password) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) { srv.firebaseErros(error) });
    };

    /**
     * Autentica um usuário no firebase e registra o evento de alteração de usuários (onAuthStateChanged)
     * @param {string} email
     * @param {string} password
     */
    this.signInWithEmailAndPassword = function (email, password) {

      firebase.auth().
        signInWithEmailAndPassword(email, password)
        .catch(function (error) { srv.firebaseErros(error) });


      firebase.auth().onAuthStateChanged(function (user) {


        if (user) {

          /*
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          */

          console.log("Usuário logado");
          // ...
        } else {
          console.log("Usuário deslogado");

        }
      });
    }

    /**
     * Realiza o logout do usuário
     */
    this.signOut = function () {

      var deferred = $q.defer();

      firebase.auth().signOut().then(
        function () {
          console.log("Logout");
          deferred.resolve("Logout efetuado com sucesso");
        },
        function (error) {
          srv.firebaseErros(error)
          deferred.reject('Erro ao realizar o logout');
        }
      );

      return deferred.promise;
    }

    /**
     * Altera a senha do usuário logado
     * @param {string} newPassword Nova senha do usuário
     */
    this.changePassword = function (newPassword) {

      var deferred = $q.defer();
      var user = srv.getCurrentFirebaseUser();

      if (user == null) {
        throw 'Ususário não localizado';
      }

      user.updatePassword(newPassword).then(
        function () {

          var retorno = {};
          retorno.sucesso = true;
          retorno.msg = "Senha alterada com sucesso"
          deferred.resolve(retorno);
        },
        function (error) {
          srv.firebaseErros(error)

          var retorno = {};
          retorno.sucesso = false;
          retorno.msg = 'Erro ao alterar a senha do usuário'

          deferred.reject(retorno);
        }
      );

      return deferred.promise;
    }


    /**
     * Realiza o tratamento de erros do firebase
     * @param {object} error
     */
    this.firebaseErros = function (error) {

      console.log("== FIREBASE Erros ==");

      switch (error.code) {
        case "auth/email-already-in-use": console.log(" O endereço de email já está em uso em outra conta. ", error);
          break;
        case "auth/wrong-password": console.log("Usuário ou senha inválidos. ", error);
          break;
        case "auth/user-not-found": console.log("Usuário não localiado ou excluído. ", error);
          break;
        default: console.log(error);

          break;
      }
    }


    this.uploadFile = function () {

      var storageRef = firebase.storage().ref();
      var imagesRef = storageRef.child('images');
      var fileName = 'space.jpg';
      var spaceRef = imagesRef.child(fileName);
      var path = spaceRef.fullPath;
      var name = spaceRef.name;
      var imagesRef = spaceRef.parent;
    }

  });
