(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('ProfileService',profileService);


    function profileService($http) {

      return {
        getCookie : function(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length,c.length);
              }
          }
          return "";
        },

        verifyToken : function(username, token, callback){
          var data = {
            username: username,
            token: token
          }
          $http.post(api.url + '/registeredusers/token', data).then(
            function(result) {
              callback(result.data.Autenticated);
            },
            function(error) {
              console.log(error);
              callback(error);
            }
          );
        },

        checkUser : function(username, token){
          if (username != "" && token != "") {
            this.verifyToken(username,token, function(auth) {
              if (auth == "False") {
                console.log('Lets leave');
                location.replace(web.url + "/auth.html");
              }
            });
          }
          else {
            location.replace(web.url + "/auth.html");
          }
        },

        setCookie : function(cookieName,cookieValue,nDays) {
           var today = new Date();
           var expire = new Date();
           if (nDays==null || nDays==0) nDays=1;
           expire.setTime(today.getTime() + 3600000*24*nDays);
           document.cookie = cookieName+"="+escape(cookieValue)
                           + ";expires="+expire.toGMTString();
        },

        deleteCookie : function(cookieName) {
           document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        

        logOut : function() {
           this.deleteCookie("username");
           this.deleteCookie("uid");
           this.deleteCookie("token");
           this.deleteCookie("id_restaurant");
           location.replace(web.url + '/auth.html');
        },

        getMessagesByLabel : function(label){
          return messages.filter(function(m){
            return m.labels.indexOf(label) != -1;
          });
        }
      }
    }

})();
