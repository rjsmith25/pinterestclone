(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinsService',pinsService)

		pinsService.$inject = ['$http'];

		function pinsService($http){
			
			//upload pin image
			function uploadImage(url){
				return $http.get('/api/uploadImage',{params: {url:url}});
			}

			// get pins
			function getPins(){
				return $http.get('/api/pins');
			}

			// get pin by user id
			function getPinsByUserId(userid){
				return $http.get('/api/pins/user/' + userid);
			}

			// create new pin
			function createPin(data){
				return $http.post('/api/pins',data);
			}

			// delete pin
			function deletePin(pinid){
				return $http.delete('/api/pins/' + pinid);
			}

			return {
				uploadImage:uploadImage,
				getPins:getPins,
				getPinsByUserId:getPinsByUserId,
				createPin:createPin,
				deletePin:deletePin
			}

		}
})()