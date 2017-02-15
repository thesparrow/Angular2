var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; //helper to create blueprint models

var schema = new Schema({
	content: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref:'User'}
}); 

//export the collection 
module.exports = mongoose.model('Message', schema);