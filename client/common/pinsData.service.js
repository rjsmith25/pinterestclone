(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinsService',pinsService)

		pinsService.$inject = ['$http'];

		function pinsService($http){
			
			//upload pin image
			function uploadImage(url){
				return $http.get('api/uploadImage',{params: {url:url}});
			}

			// get pins
			function getPins(){
				return $http.get('/api/pins');
			}

			// create new pin
			function createPin(data){
				return $http.post('/api/pins',data);
			}

			return {
				uploadImage:uploadImage,
				getPins:getPins,
				createPin:createPin
			}

		}
})()