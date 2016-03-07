var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
	image:String,
	title:String,
	description:String,
	author:String,
	uid:String
})

mongoose.model('Pin',pinSchema);