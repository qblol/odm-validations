var mongoose = require('mongoose');
const validate = require('mongoose-validator');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({	'email' : {		type:String,		required: [true, 'insert email'],		unique: [true, 'email already registered'],		validate: [validate({
			validator: 'isEmail',
			message: 'invalid email'
		})]	 },	'username' : {		type:String,		required: [true, 'insert username'],		unique: [true, 'username already registered']	},	'password' : {		type:String,		required: [true, 'insert password']	}});

module.exports = mongoose.model('User', UserSchema);
