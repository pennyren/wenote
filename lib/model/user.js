var mongoose = require('mongoose');
var db = require('../util/db');
var userSchema = new mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
});
module.exports = db.model('user', userSchema);