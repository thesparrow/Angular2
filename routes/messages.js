//every route has a pretex of 
//message/

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

//get messages 
//TO DO: remove 
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


//update existing messages in the storage 
router.patch('/:id', function(req, res, next){
	//the id is passed as a parameter

	Message.findById(req.params.id, function(err, message){
		if(err){
			return res.status(500).json({
					title: 'An error occured',
					error: err
			}); 
		}
		if(!message){
			return res.status(500).json({
					title: 'Message was not updated.',
					error:  {message: "Message not found "}
			}); 	
		}
		message.content = req.body.content; 
		console.log(message.content);

		message.save(function(err,result){
			if(err){
				return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
			}
			res.status(200).json({
				message: "Updated message",
				obj: result
			}); 
		}); 
	});
});

//DELETE resource based on id
router.delete('/:id', function(req,res,next){
	Message.findById(req.params.id, function(err, message){
		if(err){
			return res.status(500).json({
					title: 'An error occured',
					error: err
			}); 
		}
		if(!message){
			return res.status(500).json({
					title: 'No Message Found!',
					error:  {message: "Message not found "}
			}); 	
		}		

		message.remove(function(err,result){
			if(err){
				return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
			}
			res.status(200).json({
				message: "Message has been removed",
				obj: result
			}); 
		}); 
	});
}); 

module.exports = router;