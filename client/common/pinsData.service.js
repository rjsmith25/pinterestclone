(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinsService',pinsService)

		pinsService.$inject = ['$http','authentication'];

		function pinsService($http,authentication){
			
			//upload pin image
			function uploadImage(url){
				return $http.get('api/uploadImage',{params: {url:url}},{
					headers:{
						Authorization:'Bearer ' + authentication.getToken()
					}
				});
			}

			// get pins
			function getPins(){
				return $http.get('/api/pins');
			}

			// create new pin
			function createPin(data){
				return $http.post('/api/pins',data,{
					headers:{
						Authorization:'Bearer ' + authentication.getToken()
					}
				});
			}

			return {
				uploadImage:uploadImage,
				getPins:getPins,
				createPin:createPin
			}

		}
})()