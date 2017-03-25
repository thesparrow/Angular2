var mongoose = require('mongoose');
var Schema = mongoose.Schema; //helper to create blueprint models

var User = require('../models/user');

var schema = new Schema({
	content: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

//what happens to a message 
schema.post('remove', function (message) {
	User.findById(message.user, function (err, user) {
		user.messages.pull(message);
		user.save();
	});
});

//export the collection 
module.exports = mongoose.model('Message', schema);