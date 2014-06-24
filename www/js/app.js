(function(){
  "use strict";

  	//
	// App
	//
	var codeApp = angular.module('codeApp', [
		'ui.router', 'ui.showhide', 'ngAnimate',
		'codeApp.controllers', 'codeApp.directives'
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
		      //template: '<div class="demo"> {{ test }} </div>',
		      templateUrl: 'partials/main.tpl.html',
		      controller: 'mainController'
		    });

		}
	]);

	//
	// Controllers
	//
	var appControllers = angular.module('codeApp.controllers', []);

	var MainController = function($scope, $timeout, $log) {
		// --------------
	    // PUBLIC METHODS
	    // --------------

		$scope.showNav = false;

		$scope.showTest = false;

		// ---------------
	    // PRIVATE METHODS
	    // ---------------

		//
		// Boot app
		//
		var bootApp = function() {};
	};

	//
	//	Directives
	//
	var appDirectives = angular.module('codeApp.directives', []);

	appDirectives.directive("board", function($timeout) {
		var tpl = "[BOARD TPL here]";

		// Link DOM element to view
		var link = function(scope, element, attrs) {};

		return {
			restrict: "E",
			scope: true,
			template: tpl,
			link: link
		}
	});

	
	// Set controllers
	appControllers.controller(
	  "mainController",
	  [
	    '$scope',
	    '$timeout',
	    '$log',
	    MainController
	  ]
	);

})();