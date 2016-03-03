var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('mongoose').model('User');

// local strategy standard email and password
passport.use(new LocalStrategy({
	usernameField:'email'
},
 function(username,password,done){
 	User.findOne({'local.email':username},function(err,user){
 		if(err){
 			return done(err);
 		}
 		if(!user){
 			return done(null,false,{
 				message : 'Incorrect username.'
 			});
 		}
 		if(!user.validPassword(password)){
 			return done(null,false,{
 				message: 'Incorrect password.'
 			});
 		}

 		return done(null,user);
 	})
 }
))

/*passport.use(new TwitterStrategy({},
	function(){


	}

))*/



