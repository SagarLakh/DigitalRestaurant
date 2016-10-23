/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .directive('selectpickernationalities', selectpickernationalities);

  /** @ngInject */
  function selectpickernationalities() {
    return {
      restrict: 'A',
      require: '?ngOptions',
      priority: 1500, // make priority bigger than ngOptions and ngRepeat
      link: {
        pre: function(scope, elem, attrs) {
          console.log("ATTRS");
          console.log(attrs);
          elem.append('<option data-hidden="true" disabled value=""><span class="flag-icon flag-icon-'+ (attrs.title.ISOCode) + '">' + (attrs.title.country_name || 'Select something') + '</option>')
        },
        post: function(scope, elem, attrs) {
          function refresh() {
            console.log("ATTRS");
            console.log(attrs);
            console.log(elem);
            elem.selectpicker('refresh');
          }

          if (attrs.ngModel) {
            scope.$watch(attrs.ngModel, refresh);
          }

          if (attrs.ngDisabled) {
            scope.$watch(attrs.ngDisabled, refresh);
          }

          elem.selectpicker({ dropupAuto: false, hideDisabled: true });
        }
      }
    };
  }


})();