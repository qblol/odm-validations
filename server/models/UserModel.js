var mongoose = require('mongoose');
const validate = require('mongoose-validator');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
			validator: 'isEmail',
			message: 'invalid email'
		})]

module.exports = mongoose.model('User', UserSchema);