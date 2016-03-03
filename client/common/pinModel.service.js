(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinModel',pinModel)

		pinModel.$inject = [];

		function pinModel(){
			return {
				title:'',
	 	 		image:'',
				description:'',
				_creator:''
			}
		} 
})()