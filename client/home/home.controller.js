(function(){
	'use strict'
	 angular
	 	 .module('app.home')
	 	 .controller('homeController',homeController);
	 	 
	 	 homeController.$inject = ['pinsService'];

	 	 function homeController(pinsService){
	 	 	var vm = this;
	 	 	vm.pins;

	 	 	pinsService.getPins()
	 	 		.then(function(response){
	 	 		  console.log(response);
	 	 		  vm.pins = response.data;
	 	 		})
	 	 		.catch(function(err){
	 	 			console.log(err);
	 	 		})
	 	 }

})()