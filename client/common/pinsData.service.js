(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinsService',pinsService)

		pinsService.$inject = ['$http','$q'];

		function pinsService($http,$q){
			
			//upload pin image to filesystem temporarily;
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

			// upload store image using aws 
			function uploadaws(data){
				return $http.get('/api/awsupload',{params: {img:data.img,contenType:data.contentType,filename:data.filename}});
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
				uploadaws:uploadaws,
				getPinsByUserId:getPinsByUserId,
				createPin:createPin,
				deletePin:deletePin
			}

		}
})()