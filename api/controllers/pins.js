var shortid = require('shortid');
var sharp = require('sharp');
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');

function sendJsonResponse(res,status,content){
	res.status(status);
	res.json(content);
}

var transformer = sharp()
  .resize(300, 300)
  .on('error', function(err) {
    console.log(err);
  }); 

function uploadImage(req,res){
	var filename;
	var maxLength = 10
	request.head(req.query.url,function(error,response,body){
		if(error){
			sendJsonResponse(res,404,error);
			return;
		}else if(response.headers['content-length'] > maxLength*1024*1024){
			sendJsonResponse(res,400,{
				'message':'image too large'
			});
			return;
		}else{
			if(response.headers['content-type']==='image/jpeg'){
				filename = shortid.generate() +'.jpg'
				request(req.query.url).pipe(transformer).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							img:'/images/' + filename
						})
							
				});
			}else if(response.headers['content-type']==='image/gif'){
				filename = shortid.generate() +'.gif';
				request(req.query.url).pipe(transformer).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							img:'/images/' + filename
						})
							
				});
				return;
			}else if(response.headers['content-type']==='image/png'){
				filename = shortid.generate() +'.png';
				request(req.query.url).pipe(transformer).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							img:'/images/' + filename
						})
							
				});
			}else{
				sendJsonResponse(res,404,{
				"message" : "image type must be jpg ,gif, or png"
				})
			}
		}
	})
}


function getPins(req,res){
	Pin.find({},function(err,pin){
		if(err){
			sendJsonResponse(res,404,err);
		}else{
			sendJsonResponse(res,200,pin)
		}

	})
}

function createPin(req,res){
	Pin.create({
		image:req.body.image,
		title:req.body.title,
		description:req.body.description,
		_creator:req.body._creator
	},function(err,pin){
		if(err){
			sendJsonResponse(res,400,err);
		}else{
			sendJsonResponse(res,201,pin);
		}
	})
}


module.exports = {
	uploadImage:uploadImage,
	getPins:getPins,
	createPin:createPin
}
