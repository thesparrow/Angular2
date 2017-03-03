var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //helper to create blueprint models
var mongooseUniqueValidator = require('mongoose-unique-validator'); 


var schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	messages: [
		{type: Schema.Types.ObjectId, ref: 'Message' }
	]
}); 

//validate the unique schema constraints 
schema.plugin(mongooseUniqueValidator);

//export the collection 
module.exports = mongoose.model('User', schema);