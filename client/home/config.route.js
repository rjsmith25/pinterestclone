(function(){
	'use strict'
	 angular
	 	 .module('app.home')
	 	 .config(configFunction)
	 	 
	 	 configFunction.$inject = ['$routeProvider'];

	 	 function configFunction($routeProvider){
	 	 	$routeProvider.when('/',{
	 	 		templateUrl:'/home/home.html',
				controller:'homeController',
				controllerAs:'vm'
	 	 	})
	 	 }
})()