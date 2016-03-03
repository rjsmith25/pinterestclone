 (function(){
    'use strict'
	angular
		.module('app.common')
		.factory('authentication',authentication)

		authentication.$inject = ['$window','$http','$q'];

		function authentication($window,$http,$q){

			function saveToken(token){
				$window.localStorage['pin-token'] = token;
			}

			function getToken(){
				return $window.localStorage['pin-token'];
			}

			function register(user){
				var deferred = $q.defer();
				$http.post('/api/register',user)
					.then(function(response){
						saveToken(response.data.token);
						deferred.resolve(response.data);
					})
					.catch(function(err){
						console.log(err);
						deferred.reject(err);
					})
					return deferred.promise;
			}

			function localLogin(user){
				var deferred = $q.defer();
				return $http.post('/api/localLogin',user)
					.then(function(response){
						saveToken(response.data.token);
						deferred.resolve(response.data);
					})
					.catch(function(err){
						console.log(err);
						deferred.reject(err);
					})
					return deferred.promise;
			}

			function isLoggedIn(){
				var token = getToken();

				if(token){
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return payload.exp > Date.now() / 1000;
				}else{
					return false;
				}
			}

			function currentUser(){
				if(isLoggedIn()){
					var token = getToken();
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return {
						email : payload.email,
						name: payload.name
					}
				}
			}

			function logout(){
				$window.localStorage.removeItem('pin-token');
			}

			return {
				saveToken:saveToken,
				getToken:getToken,
				register:register,
				localLogin:localLogin,
				currentUser:currentUser,
				isLoggedIn:isLoggedIn,
				logout:logout
			}

		} 
})()