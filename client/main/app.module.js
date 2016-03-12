(function(){
	'use strict'
	 angular
	 	 .module('app',[
	 	    /*third party modules*/
			'ngRoute',
			'auth0',
			'angular-storage',
			'angular-jwt',
			/*my modules*/
			'app.common',
			'app.home',
			'app.pinboard'
	 	 ])
	 	 .config(configFunction)
	 	 .run(runFunction);

	 	 configFunction.$inject = ['authProvider','$routeProvider', '$locationProvider','$httpProvider','jwtInterceptorProvider'];

	 	 function configFunction(authProvider,$routeProvider,$locationProvider,$httpProvider,jwtInterceptorProvider){
	 	 	authProvider.init({
    			domain: 'mywebapp.auth0.com',
    			clientID: 'gkpoo1A5WB4XwiUT2e4bdJRFI0QXqUEA',
    			loginUrl: '/'
  			});
	 	 	$locationProvider.html5Mode(true);
			$routeProvider.otherwise({
				redirectTo:'/'
			})

			jwtInterceptorProvider.tokenGetter = function(store){
				return store.get('token');
			}

			$httpProvider.interceptors.push('jwtInterceptor');

	 	 }

	 	 runFunction.$inject = ['$rootScope','auth', 'store', 'jwtHelper', '$location'];

	 	 function runFunction($rootScope,auth,store,jwtHelper,$location){
	 	 	auth.hookEvents();
	 	 	$rootScope.$on('$locationChangeStart', function() {
				var token = store.get('token');
				if (token) {
				  if (!jwtHelper.isTokenExpired(token)) {
				    if (!auth.isAuthenticated) {
				      auth.authenticate(store.get('profile'), token);
				    }
				  }
				}
		  	});
	 	 }

})()