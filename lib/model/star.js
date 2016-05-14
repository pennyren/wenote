var mongoose = require('mongoose');
var db = require('../util/db');
var starSchema = new mongoose.Schema({
    refId: {
        type: String
    },
    starName: {
        type: String
    },
    isNote: {
        type: Boolean
    },
    uid: {
    	type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
});
module.exports = db.model('star', starSchema);