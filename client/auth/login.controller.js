(function(){
	'use strict';
	angular
		.module('app.auth')
		.controller('loginController',loginController);

		loginController.$inject = ['$location','authentication'];

		function loginController($location,authentication){
                var vm = this;

                vm.user = {
                	email:'',
                	password:''
                }

                vm.error = null;

                vm.localLogin = function(){
                	authentication
                		.localLogin(vm.user)
                		.then(function(response){
                			$location.path('/createpin')
                		})
                		.catch(function(err){
                			vm.error = error.statusText;
                		})
                }

       }

})()