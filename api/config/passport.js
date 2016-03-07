var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('mongoose').model('User');

// implement local strategy
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

// implement twitter strategy
passport.use(new TwitterStrategy({
	consumerKey:process.env.TWITTER_CONSUMER_KEY,
	consumerSecret:process.env.TWITTER_CONSUMER_SECRET,
	callbackURL:'http://127.0.0.1:3000/api/twitter/callback'
},
	function(token, tokenSecret, profile, done){
		User.findOne({'twitter.profile_id':profile.id},function(err,user){
			if(err){
				return done(err);
			}
			if(user){
				return done(null,user);
			}

			var twitterUser = new User();

			twitterUser.twitter.profile_id = profile.id;
			twitterUser.twitter.name = profile.displayName;
  			twitterUser.twitter.email = profile.emails[0].value;

  			twitterUser.save(function(err){
  				if(err){
  					throw err;
  				}
  				return done(null,twitterUser);
  			})

		})

	}
))



