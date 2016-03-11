(function(){
	'use strict'
	 angular
	 	 .module('app.pinboard')
	 	 .controller('userController',userController);

	 	 userController.$inject = ['$routeParams','pinsService'];

	 	 function userController($routeParams,pinsService){
	 	 	 var vm = this 
	 	 	 vm.username = $routeParams.username;
	 	 	 vm.pins;
	 	 	 pinsService.getPinsByUserId($routeParams.userid)
	 	 	 	.then(function(response){
	 	 	 		vm.pins = response.data;
	 	 	 	})
	 	 	 	.catch(function(err){
	 	 	 		console.log(err);
	 	 	 	})
			 	
	 	 }
	 	 
})()