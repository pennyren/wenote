var mongoose = require('mongoose');
var db = require('../util/db');
var notebookSchema = new mongoose.Schema({
	name: {
		type: String
	},
	star: {
		type: Boolean
	},
	time: {
		type: Date,
        default: Date.now
	},
	count: {
		type: Number
	},
	uid: {
    	type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
});
module.exports = db.model('notebook', notebookSchema);