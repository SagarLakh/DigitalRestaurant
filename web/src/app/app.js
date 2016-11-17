'use strict';

function getCookie(cname) {
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
}

function deleteCookie (cookieName) {
     document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function deleteSesionCookies(){
     deleteCookie("username");
     deleteCookie("uid");
     deleteCookie("token_id");
     deleteCookie("id_restaurant");
}

function DoPost(data, callback){

        $.post(api.url + '/registeredusers/logout', data,
        function(result) {
          console.log("Callback DoPost Success");
          callback(result.Success);
        });
    };

function LogOut(uid, token){
    
    var data = {
      id_registered_user: uid,
      token: token
    }
    DoPost(data,  function(success) {
      if (success) {
        console.log('LogOut');
        deleteSesionCookies();
        location.replace(web.url + "/auth.html");
      }
    });
}


var protocol = 'http';

var api = {};
api.port = 8080;
api.domain = 'whaleat.com:' + api.port + '/api';
api.url = protocol + "://" + api.domain;

var web = {};
web.port = 80;
web.domain = 'whaleat.com:' + web.port;
web.url = protocol + "://" + web.domain;

var User = {};
User.Token = getCookie("token_id");
User.id = getCookie("uid");








angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
]);