'use strict';

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
  'permission', 'permission.ui',
  'angular-progress-button-styles',
  'BlurAdmin.signin',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.theme.components'

])
.factory('AuthenticationService',
    [ '$http', '$rootScope', '$timeout',
        function ( $http, $rootScope, $timeout) {
            var service = {};
            if (localStorage.getItem("loggedIn") === null) {
                console.log("inside the null");
                var loggedIn = false;
                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
            }

            service.isLoggedIn = function(){
                console.log("1 st in isloggedin = "+localStorage.loggedIn);
                console.log("inside the isloggedin = " + JSON.parse(localStorage.loggedIn));
                var login = JSON.parse(localStorage.loggedIn);
                if (login){
                    return true;
                }
                return false;
            };

            service.setLoggedIn = function(state){
                console.log("setting login =  "+localStorage.loggedIn);
                console.log("inside the isloggedin = " + JSON.parse(localStorage.loggedIn));
                var loggedIn = state;
                localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
                console.log("then isloggedin = " + JSON.parse(localStorage.loggedIn));
            };

            return service;
  }])
.run(function($rootScope, $state,PermRoleStore, AuthenticationService) {
    PermRoleStore.defineRole('AUTHORIZED', function() {
      return AuthenticationService.isLoggedIn();
    });

    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });
  })
;
