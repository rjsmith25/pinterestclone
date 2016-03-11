(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinModel',pinModel)

		pinModel.$inject = [];

		function pinModel(){

			function model(){
				this.title=''
				this.image=''
				this.description=''
				this.author='',
				this.uid=''
			}

			return {
				model:model
			}
		} 
})()