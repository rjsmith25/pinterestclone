var shortid = require('shortid');
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var Pin = mongoose.model('Pin');
var aws = require('aws-sdk');

aws.config.update({region: 'us-west-2',accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY});

function sendJsonResponse(res,status,content){
	res.status(status);
	res.json(content);
}

// delete image from filesystem after upload to amazon web service
function deleteImageFile(img){
	fs.unlinkSync('server'+img);
	console.log('image deleted from file');
}

// upload to filesystem
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
							  	filename:filename,
								img:'/images/' + filename,
								contentType:response.headers['content-type']
							  })
				});
			}else if(response.headers['content-type']==='image/gif'){
				filename = shortid.generate() +'.gif';
				request(req.query.url).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							  	filename:filename,
								img:'/images/' + filename,
								contentType:response.headers['content-type']
						})
							
				});
				return;
			}else if(response.headers['content-type']==='image/png'){
				filename = shortid.generate() +'.png';
				request(req.query.url).pipe(fs.createWriteStream('server/images/' + filename)).on('close',function(){
						sendJsonResponse(res,200,{
							  	filename:filename,
								img:'/images/' + filename,
								contentType:response.headers['content-type']
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

// upload to aws
function uploadaws(req,res){
	var s3 = new aws.S3();
	var params = {	
					'Bucket': 'imgstoragespaces',
	 				'Key':req.query.filename,
	 				'Expires': 60,
	 			    'ContentEncoding': 'base64',
	 			    'ContentType':req.query.contentType,
	 			    'ACL': 'public-read',
				}
	fs.readFile('server' + req.query.img,function(err,data){
		if(err){
			sendJsonResponse(res,404,err)
			return;
		}
		params['Body'] = data;
		s3.upload(params, function(err, data){
		if(err){
			sendJsonResponse(res,404,err);
		}else{
			deleteImageFile(req.query.img);
			sendJsonResponse(res,200,data);
		}
     }) 
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
 			image_url:req.body.image_url,
			image_name:req.body.image_name,
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
		var s3 = new aws.S3();
		Pin
			.findById(req.params.pinid)
			.exec(function(err,pin){
				if(err){
					sendJsonResponse(res,404,err);
					return;
				}
				var params = {
					Bucket:'imgstoragespaces',
					Key:pin.image_name
				}
				Pin.remove({_id:req.params.pinid},function(err){
					if(err){
						sendJsonResponse(res,404,err);
					} else{
						s3.deleteObject(params,function(err,data){
							if(err){
								sendJsonResponse(res,404,err);
							}else{
								sendJsonResponse(res,204,null);
							}

						})
					}
				})
			})

	}
}


module.exports = {
	uploadImage:uploadImage,
	createPin:createPin,
	getPins:getPins,
	uploadaws:uploadaws,
	getPinsByUserId:getPinsByUserId,
	deletePin:deletePin
}
