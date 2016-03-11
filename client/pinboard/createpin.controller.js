(function(){
	'use strict'
	 angular
	 	 .module('app.pinboard')
	 	 .controller('createpinController',createpinController);
	 	 
	 	 createpinController.$inject = ['pinsService','pinModel','$timeout'];

	 	 function createpinController(pinsService,pinModel,$timeout){
	 	 	var vm = this;
	 	 	vm.newPin =  new pinModel.model
	 	 	vm.profile = JSON.parse(localStorage.getItem('profile'));
	 	 	vm.isCreated = null;
	 	 	vm.error = null;

	 	 	vm.createpin = function(){
	 	 		 pinsService.uploadImage(vm.newPin.image)
	 	 				.then(function(response){
	 	 					vm.newPin.image = response.data.img;
	 	 					if(vm.profile.screen_name){
								vm.newPin.author = vm.profile.screen_name;
							}else{
								vm.newPin.author = vm.profile.nickname;
							}
							vm.newPin.uid = vm.profile.user_id;
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
	 	 					vm.error = error.statusText;
	 	 					vm.newPin = new pinModel.model;
	 	 					vm.isCreated = false;
							$timeout(function(){
								vm.isCreated = null;
								vm.error = null;
							},2000)
	 	 				}) 
	 	 	}
	 	 }

})()