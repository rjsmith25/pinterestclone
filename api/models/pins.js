var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
	image:String,
	title:String,
	description:String,
	_creator:String
})

mongoose.model('Pin',pinSchema);