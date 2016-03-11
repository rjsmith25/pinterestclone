var shortid = require('shortid');
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');

function sendJsonResponse(res,status,content){
	res.status(status);
	res.json(content);
}

function deleteImageFile(img){
	fs.unlinkSync('server'+img);
	console.log('image deleted from file');
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

function getPins(req,res){
	Pin.find({},function(err,pin){
		if(err){
			sendJsonResponse(res,404,err);
		}else{
			sendJsonResponse(res,200,pin)
		}

	})
}

function getPinsByUserId(req,res){
	if(req.params && req.params.userid){
		Pin.find({uid:req.params.userid},function(err,pin){
			if(err){
				sendJsonResponse(res,404,err);
			}else{
				sendJsonResponse(res,200,pin);
			}
		})
	} else{
		sendJsonResponse(res,404,{
			"message":"not found, userid require"
		})
	}

}

function createPin(req,res){
 	Pin.create({
		 	image:req.body.image,
			title:req.body.title,
		 	description:req.body.description,
			author:req.body.author,
			uid:req.body.uid
		 },function(err,pin){
		 	if(err){
		 		sendJsonResponse(res,400,err);
		 	}else{
		 		sendJsonResponse(res,201,pin);
		 	}
	 	})
}

function deletePin(req,res){
	if(req.params && req.params.pinid){
		Pin
			.findById(req.params.pinid)
			.exec(function(err,pin){
				if(err){
					sendJsonResponse(res,404,err);
					return;
				}
				var img = pin.image;
				Pin.remove({_id:req.params.pinid},function(err){
					if(err){
						sendJsonResponse(res,404,err);
					} else{
						deleteImageFile(img);
						sendJsonResponse(res,204,null);
					}
				})
			})

	}
}


module.exports = {
	uploadImage:uploadImage,
	createPin:createPin,
	getPins:getPins,
	getPinsByUserId:getPinsByUserId,
	deletePin:deletePin
}
