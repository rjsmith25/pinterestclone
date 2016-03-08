(function(){
	'use strict'
	angular
		.module('app.common')
		.provider('redirectInterceptor',redirectInterceptor)

		redirectInterceptor.$inject = ['$q', '$injector', 'auth', 'store', '$location'];

		function redirectInterceptor($q, $injector, auth, store, $location){
			return {
				responseError: function(rejection) {

				  if (rejection.status === 401) {
				    auth.signout();
				    store.remove('profile');
				    store.remove('token');
				    $location.path('/')
				  }
				  return $q.reject(rejection);
				}
			}
		}
})()