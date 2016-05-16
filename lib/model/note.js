var mongoose = require('mongoose');
var db = require('../util/db');
var noteSchema = new mongoose.Schema({
	name: {
		type: String
	},
	content: {
		type: String
	},
    overview: {
        type: String
    },
	star: {
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
        ref: 'notebook'
    }
});

noteSchema.statics.setNoteStar = function (props, cb) {
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
    return this.model('note').update(note, update, opts, cb);
}
module.exports = db.model('note', noteSchema);