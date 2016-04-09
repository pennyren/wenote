var mongoose = require('mongoose');
var db = require('../util/db');
var noteSchema = new mongoose.Schema({
	name: {
		type: String
	},
	content: {
		type: String
	},
	start: {
		type: Boolean
	},
	time: {
        type: Date,
        default: Date.now
    },
    uid: {
    	type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    bid: {
    	type: mongoose.Schema.ObjectId,
        ref: 'nootebook'
    }
});
module.exports = db.model('note', noteSchema);