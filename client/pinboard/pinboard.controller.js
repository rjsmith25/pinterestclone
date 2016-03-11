(function(){
	'use strict'
	 angular
	 	 .module('app.pinboard')
	 	 .controller('pinboardController',pinboardController);
	 	 
	 	 pinboardController.$inject = ['pinsService'];

	 	 function pinboardController(pinsService){
	 	 	var vm = this;
	 	 	vm.pins;
	 	 	vm.profile = JSON.parse(localStorage.getItem('profile'));
	 	 	vm.delete = function(pinid){
	 	 		pinsService.deletePin(pinid)
	 	 			.then(function(response){
	 	 				getPinById();
	 	 			})
	 	 			.catch(function(error){
	 	 				console.log(error);
	 	 			})
	 	 	}

	 	 	function getPinById(){
	 	 		pinsService.getPinsByUserId(vm.profile.user_id)
	 	 	 	.then(function(response){
	 	 	 		console.log(response);
	 	 	 		vm.pins = response.data;
	 	 	 	})
	 	 	 	.catch(function(err){
	 	 	 		console.log(err);
	 	 	 	})
	 	 	}

	 	 	getPinById();
	 	 	
	 	 }

})()