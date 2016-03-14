var router = require('express').Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: new Buffer(process.env.Client_Secret,'base64'),
	audience:'gkpoo1A5WB4XwiUT2e4bdJRFI0QXqUEA',
})

var pinsCtrl = require('../controllers/pins');

/*pin routes*/
router.get('/uploadImage',auth,pinsCtrl.uploadImage);
router.get('/awsupload',auth,pinsCtrl.uploadaws)
router.get('/pins',pinsCtrl.getPins);
router.get('/pins/user/:userid',pinsCtrl.getPinsByUserId);
router.post('/pins',auth,pinsCtrl.createPin);
router.delete('/pins/:pinid',auth,pinsCtrl.deletePin);


module.exports = router;