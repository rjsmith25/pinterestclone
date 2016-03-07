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
	 	 .run(runFunction);

	 	 configFunction.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];

	 	 function configFunction($routeProvider,$locationProvider){
	 	 	$locationProvider.html5Mode(true);
			$routeProvider.otherwise({
				redirectTo:'/'
			})
	 	 }

	 	 runFunction.$inject = ['$rootScope','$location'];

	 	 function runFunction($rootScope,$location){
	 	 	$rootScope.$on('$routeChangeError',function(event,next,previous,error){
	 	 		if(error === 'Authorization Required'){
	 	 			$location.path('/login');
	 	 		}
	 	 	})
	 	 }

})()