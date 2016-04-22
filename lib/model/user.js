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
userSchema.statics.findByUsername = function (username, cb) {
	return this.model('user').findOne({
        username: username
    }, cb);
}
module.exports = db.model('user', userSchema);