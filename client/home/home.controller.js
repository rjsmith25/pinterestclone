(function(){
	'use strict'
	 angular
	 	 .module('app.home')
	 	 .controller('homeController',homeController);
	 	 
	 	 homeController.$inject = ['pinsService','$location'];

	 	 function homeController(pinsService,$location){
	 	 	var vm = this;
	 	 	vm.pins;
	 	 	pinsService.getPins()
	 	 		.then(function(response){
	 	 			vm.pins = response.data;
	 	 		})
	 	 		.catch(function(error){
	 	 			console.log(error);
	 	 		})
	 	 	vm.userPins = function(pin){
	 	 		$location.path('/user/' + pin.author + '/id/'+ pin.uid);
	 	 	}
	 	 }

})()