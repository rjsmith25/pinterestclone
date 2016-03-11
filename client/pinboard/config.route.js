(function(){
	'use strict'
	 angular
	 	 .module('app.pinboard')
	 	 .config(configFunction)

	 	 configFunction.$inject = ['$routeProvider'];

	 	 function configFunction($routeProvider){
	 	 	$routeProvider.when('/pinboard',{
	 	 		templateUrl:'/pinboard/pinboard.html',
				controller:'pinboardController',
				controllerAs:'vm',
				requiresLogin: true
	 	 	})
	 	 	$routeProvider.when('/createpin',{
	 	 		templateUrl:'/pinboard/createpin.html',
				controller:'createpinController',
				controllerAs:'vm',
				requiresLogin: true
	 	 	})
	 	 	$routeProvider.when('/user/:username/id/:userid',{
	 	 		templateUrl:'/pinboard/user.html',
				controller:'userController',
				controllerAs:'vm'

	 	 	})
	 	 }
 
})()