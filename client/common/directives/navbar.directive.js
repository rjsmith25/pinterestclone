(function(){
	'use strict';
	angular
		.module('app.common')
		.directive('ptNavbar',ptNavbar);

		function ptNavbar(){
			return {
				templateUrl:'/common/directives/navbar.html',
				restrict:'E',
				controller:navbarController,
				controllerAs:'vm'
			}
		}

		navbarController.$inject = ['auth','store','$location'];
		
		function navbarController(auth,store,$location){
			var vm = this;
			vm.auth = auth;

			vm.login = function(){
				auth.signin({},function(profile,token){
					store.set('profile',profile);
					store.set('token',token);
					$location.path('/createpin')
				},function(error){
					console.log(error);
				})
			}

			vm.logout = function(){
				auth.signout();
				store.remove('profile');
				store.remove('token');
				$location.path('/');
			}
				
		}
			
})();