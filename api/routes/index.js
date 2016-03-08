var router = require('express').Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: new Buffer(process.env.Client_Secret,'base64'),
	audience:'gkpoo1A5WB4XwiUT2e4bdJRFI0QXqUEA',
})

var pinsCtrl = require('../controllers/pins');

/*pin routes*/

router.get('/uploadImage',pinsCtrl.uploadImage)


module.exports = router;