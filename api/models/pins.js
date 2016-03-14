var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
	image_url:String,
	image_name:String,
	title:String,
	description:String,
	author:String,
	uid:String
})

mongoose.model('Pin',pinSchema);