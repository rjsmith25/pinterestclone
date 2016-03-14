(function(){
	'use strict'
	angular
		.module('app.common')
		.factory('pinModel',pinModel)

		pinModel.$inject = [];

		function pinModel(){

			function model(){
				this.image_url='',
				this.image_name='',
				this.title=''
				this.description=''
				this.author='',
				this.uid=''
			}

			return {
				model:model
			}
		} 
})()