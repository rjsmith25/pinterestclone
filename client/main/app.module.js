(function(){
	'use strict'
	 angular
	 	 .module('app',[
	 	    /*third party modules*/
			'ngRoute',
			/*my modules*/
			'app.common',
			'app.auth',
			'app.home',
			'app.pinboard'
	 	 ])
	 	 .config(configFunction)

	 	 configFunction.$inject = ['$routeProvider', '$locationProvider'];

	 	 function configFunction($routeProvider,$locationProvider){
	 	 	$locationProvider.html5Mode(true);
			$routeProvider.otherwise({
				redirectTo:'/'
			})
	 	 }

})()