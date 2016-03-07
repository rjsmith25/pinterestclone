(function(){
	'use strict'
	 angular
	 	 .module('app.pinboard')
	 	 .controller('createpinController',createpinController);
	 	 
	 	 createpinController.$inject = ['pinsService','pinModel','$timeout'];

	 	 function createpinController(pinsService,pinModel,$timeout){
	 	 	var vm = this;
	 	 	vm.newPin =  new pinModel.model
	 	 	vm.isCreated = null;
	 	 	vm.error = null;
	 	 	
	 	 	vm.createpin = function(){
	 	 		return pinsService.uploadImage(vm.newPin.image)
	 	 				.then(function(response){
	 	 					vm.newPin.image = response.data.img;
	 	 					return pinsService.createPin(vm.newPin);
	 	 				})
	 	 				.then(function(response){
	 	 					console.log(response);
	 	 					vm.newPin = new pinModel.model;
	 	 					vm.isCreated = true;
							$timeout(function(){
								vm.isCreated = null;
							},1500)
	 	 				})
	 	 				.catch(function(error){
	 	 					console.log(error);
	 	 					vm.error = error
	 	 					vm.newPin = new pinModel.model;
	 	 					vm.isCreated = false;
							$timeout(function(){
								vm.isCreated = null;
								vm.error = null;
							},1500)
	 	 				}) 
	 	 	}
	 	 }

})()