(function () {
  'use strict';

  angular.module('BlurAdmin.common.services')
    .service('NotificationService',notificationService);


    function notificationService($http, toastr, toastrConfig) {
      //////////////     NOTIFICATIONS //////////////////////
    var defaultConfig = angular.copy(toastrConfig);
    var types = ['success', 'error', 'info', 'warning'];

    

    var openedToasts = [];
    var options = {
      autoDismiss: false,
      positionClass: 'toast-top-right',
      type: 'info',
      timeOut: '5000',
      extendedTimeOut: '2000',
      allowHtml: false,
      closeButton: false,
      tapToDismiss: true,
      progressBar: false,
      newestOnTop: true,
      maxOpened: 0,
      preventDuplicates: false,
      preventOpenDuplicates: false,
      title: "Some title here",
      msg: "Type your message here"
    };

    var openToast = function (data) {
      angular.extend(toastrConfig, options);
      options.type = data.type;
      options.msg = data.msg;
      options.title = data.title;
      openedToasts.push(toastr[options.type](options.msg, options.title));
      var strOptions = {};
      for (var o in  options) if (o != 'msg' && o != 'title')strOptions[o] = options[o];
      var optionsStr = "toastr." + options.type + "(\'" + options.msg + "\', \'" + options.title + "\', " + JSON.stringify(strOptions, null, 2) + ")";
    };

    //////////////     NOTIFICATIONS //////////////////////



      return {
        openNotification : function(data) {
          openToast(data);
        },

        getMessagesByLabel : function(label){
          return messages.filter(function(m){
            return m.labels.indexOf(label) != -1;
          });
        }
      }
    }

})();
