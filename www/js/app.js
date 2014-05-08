(function(){
  "use strict";

	// App
	var codeApp = angular.module('codeApp', [
		'ui.router', 'ui.ace',
		'codeApp.controllers'
	])

	// Add references of $state and $stateParams to the $rootScope
	// so we can access them from any scope within the app
	.run(
		[		 '$rootScope', '$state', '$stateParams',
	    function ($rootScope,   $state,   $stateParams) {
		    $rootScope.$state = $state;
		    $rootScope.$stateParams = $stateParams;
	    }
	])

	// Redirects + States
	.config(
		[		 '$stateProvider', '$urlRouterProvider',
	    function ($stateProvider,   $urlRouterProvider) {

		  $urlRouterProvider.otherwise('/');

		  $stateProvider

		  	// Home
		  	.state("home", { 
		      url: '/',
		      template: '<div class="demo"> {{ test }} </div>',
		      controller: 'mainController'
		    });

		}
	]);



	var MainController = function($scope, $timeout, $log) {
		$scope.test = "da fak";
	};


	// Controllers
	var appControllers = angular.module('codeApp.controllers', []);

	appControllers.controller(
	  "mainController",
	  [
	    '$scope',
	    '$timeout',
	    '$log',
	    MainController
	  ]);

})();