//every route has a pretex of 
//message/

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

//get messages 
router.get('/', function(req, res, next){
	Message.find()
		.exec(function(err, messages){
			if(err){
				return res.status(500).json({
					title: 'An error occured',
					error: err
				});
			}
			res.status(200).json({
				message: 'Success',
				obj: messages
			});
		});		
}); 
//store messages 
router.post('/', function (req, res, next) {
	var message = new Message({
		content: req.body.content, 
		user: req.body.user
	});

	message.save(function(err, result){
		if(err){
			//set a status code as a json 
			return res.status(500).json({
				title: "An eror occured",
				error: err
			});
		}
		//successful response 
		res.status(201).json({
			message: "Saved message",
			obj: result
		});
	})
});

module.exports = router;