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

notebookSchema.statics.setNotebookStar = function (props, cb) {
    var note = {
        _id: props.id
    };
    var update = {
        $set: {
            star: props.star
        }
    };
    var opts = {
        upsert: true
    };
    return this.model('notebook').update(note, update, opts, cb);
}
module.exports = db.model('notebook', notebookSchema);