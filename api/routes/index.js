var router = require('express').Router();
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
	secret:process.env.JWT_SECRET,
	userProperty:'payload'
})

var pinsCtrl = require('../controllers/pins');
var authCtrl = require('../controllers/authentication');

/*pin routes*/
router.get('/pins',pinsCtrl.getPins);
router.get('/uploadImage',pinsCtrl.uploadImage)
router.post('/pins',auth,pinsCtrl.createPin);

/*authentication routes*/
router.post('/register',authCtrl.register);
router.post('/localLogin',authCtrl.localLogin);
router.get('/twitterLogin',passport.authenticate('twitter'))
router.get('/twitter/callback',passport.authenticate('twitter', {
    successRedirect : '/createpin',
    failureRedirect : '/'
  }));

module.exports = router;