//every route has a pretex of 
//message/

var express = require('express');
var router = express.Router();

var Message = require('../models/message');
var User = require('../models/user');

var jwt = require('jsonwebtoken');

//get messages 
router.get('/', function (req, res, next) {
	Message.find()
		.exec(function (err, messages) {
			if (err) {
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

//allow only authenticated users
//the token is passed in the query parameters url  
router.use('/', function (req, res, next) {
	jwt.verify(req.query.token, 'secret', function (err, decoded) {
		if (err) {
			return res.status(401).json({
				title: "Not Authenticated",
				error: err
			});
		}
		next(); //allow the flow to continue 
	});
});

//store messages 
router.post('/', function (req, res, next) {
	var decoded = jwt.decode(req.query.token);
	User.findById(decoded.user._id, function (err, user) {
		if (err) {
			return res.status(500).json({
				title: "An error occured",
				error: err
			});
		}
		var message = new Message({
			content: req.body.content,
			user: user
		});

		message.save(function (err, result) {
			if (err) {
				//set a status code as a json 
				return res.status(500).json({
					title: "An error occured",
					error: err
				});
			}
			user.messages.push(result); 
			user.save(); //update to stack of messages 
			//successful response 
			res.status(201).json({
				message: "Saved message",
				obj: result
			});
		});//end of message save 
	});//end findById
});//end post 


//update existing messages in the storage 
router.patch('/:id', function (req, res, next) {
	//the id is passed as a parameter

	Message.findById(req.params.id, function (err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if (!message) {
			return res.status(500).json({
				title: 'Message was not updated.',
				error: { message: "Message not found " }
			});
		}
		message.content = req.body.content;
		console.log(message.content);

		message.save(function (err, result) {
			if (err) {
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
});//end of update 

//DELETE resource based on id
router.delete('/:id', function (req, res, next) {
	Message.findById(req.params.id, function (err, message) {
		if (err) {
			return res.status(500).json({
				title: 'An error occured',
				error: err
			});
		}
		if (!message) {
			return res.status(500).json({
				title: 'No Message Found!',
				error: { message: "Message not found " }
			});
		}

		message.remove(function (err, result) {
			if (err) {
				return res.status(500).json({
					title: 'An error occurred',
					error: err
				});
			}
			user.messages.remove(result); 
			user.save(); 
			res.status(200).json({
				message: "Message has been removed",
				obj: result
			});
		});
	});
});

module.exports = router;