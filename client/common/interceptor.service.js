(function(){
	'use strict'
	angular
		.module('app.common')
		.provider('twitterInterceptor',twitterInterceptor)

		
		function twitterInterceptor(){
			var redirectUrl;
	        this.RedirectUrl = function(value) {
	            redirectUrl = value;
	        };
	        this.$get = ['$q', '$location', '$window', function($q, $location, $window) {
	            return {
	                response: function(response){
	                    return response || $q.when(response);
	                },
	                responseError: function(rejection) {
	                    $q.when(rejection.status == 401)
	                    if (rejection.status === 401) {
	                        if(redirectUrl) {
	                            $location.path(redirectUrl);
	                            var authUrl = $location.absUrl();
	                            $window.location.href = authUrl;
	                        }
	                    } else if (rejection.status === 429) {
	                        $location.path('/error');
	                    }
	                    return $q.reject(rejection);
	                }
	            }
	        }];
		}
})()