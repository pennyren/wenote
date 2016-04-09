var mongoose = require('mongoose');
var notebookSchema = new mongoose.Schema({
	name: {
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
    }
});
module.exports = db.model('notebook', notebookSchema);