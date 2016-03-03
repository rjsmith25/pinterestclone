var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	local:{
		email:{
		type:String,
		unique:true,
		required:true
		},
		name:{
			type:String,
			required:true
		},
		hash:String,
		salt:String
	},
	twitter:{
		name:String,
		email:String
	}
});

userSchema.methods.setPassword = function(password){
	this.local.salt = crypto.randomBytes(16).toString('hex');
	this.local.hash = crypto.pbkdf2Sync(password,this.local.salt,1000,64).toString('hex');
};

userSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password,this.local.salt,1000,64).toString('hex');
	return this.local.hash === hash;
};

userSchema.methods.generateJwt = function(userType){
	var expire = new Date();
	expire.setDate(expire.getDate() + 7);

	return jwt.sign({
		_id:this[userType]._id,
		email:this[userType].email,
		name:this[userType].name,
		exp:parseInt(expire.getTime() / 1000)
	},process.env.JWT_SECRET);
};


mongoose.model('User',userSchema);