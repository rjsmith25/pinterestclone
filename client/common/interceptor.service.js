(function(){
	'use strict'
	angular
		.module('app.common')
		.provider('redirectInterceptor',redirectInterceptor)

		function redirectInterceptor(){

			this.$get = ['$q', 'auth', 'store', '$location',function($q, auth,store,$location){

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
			
			}]
		}
})()