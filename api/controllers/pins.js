var shortid = require('shortid');
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var User = mongoose.model('User');

function sendJsonResponse(res,status,content){
	res.status(status);
	res.json(content);
}

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
				request(req.query.url).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							img:'/images/' + filename
						})
							
				});
			}else if(response.headers['content-type']==='image/gif'){
				filename = shortid.generate() +'.gif';
				request(req.query.url).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							img:'/images/' + filename
						})
							
				});
				return;
			}else if(response.headers['content-type']==='image/png'){
				filename = shortid.generate() +'.png';
				request(req.query.url).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
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

function getUser(req,res,callback){
	var search = {}
	if(req.payload.email && req.payload.emailType){
		search[req.payload.emailType] = req.payload.email;
		User
			.findOne(search)
			.exec(function(err,user){
				if(err){
					sendJsonResponse(res,404,err);
					return;
				}else if(!user){
					sendJsonResponse(res,404,{
						"message":"User not found"
					})
					return;
				}
				callback(req,res,user,req.payload.userType);
			});
	}else{
		sendJsonResponse(res,404,{
			"message":"User not found"
		})
		return;
	}
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

	getUser(req,res,function(req,res,userInfo,userType){
		Pin.create({
		 	image:req.body.image,
			title:req.body.title,
		 	description:req.body.description,
			author:userInfo[userType].name,
			uid:userInfo._id
		 },function(err,pin){
		 	if(err){
		 		sendJsonResponse(res,400,err);
		 	}else{
		 		sendJsonResponse(res,201,pin);
		 	}
	 	})
	})
	
}


module.exports = {
	uploadImage:uploadImage,
	getPins:getPins,
	createPin:createPin
}
