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
				controllerAs:'vm'
	 	 	})
	 	 	$routeProvider.when('/createpin',{
	 	 		templateUrl:'/pinboard/createpin.html',
				controller:'createpinController',
				controllerAs:'vm',
				resolve:{user:resolveUser}
	 	 	})
	 	 }

	 	 resolveUser.$inject = ['authentication','$q'];

	 	 function resolveUser(authentication,$q){
	 	 	var deferred = $q.defer();
	 	 	if(authentication.isLoggedIn()){
	 	 		deferred.resolve(true);
	 	 	}else{
	 	 		deferred.reject('Authorization Required');
	 	 	}
	 	 	return deferred.promise;
	 	 }
	 	 
})()