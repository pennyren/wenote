
var noteModel = require('../model/note');
var data = require('../util/res');

module.exports = function(app) {
	app.get('/getNoteCount', function (req, res) {
		noteModel.count(function (err, count) {
			if (err) {
				return res.send(err);
			} else {
				return res.send(data(true, {count: count}));
			}
		});
	});

	app.post('/createNote', function (req, res) {
		var note = req.body;
		var doc = {
			name: note.name,
			start: false,
			uid: 
		};
		noteModel.create(doc, function (err, result) {
			if (err) {
				res.send(err);
			} else {
            	return res.send(data(true));
			}
		});
	});

	app.post('/updateNoteContent', function (req, res) {
		var param = req.body;
		var note = {
			_id: param.id
		};
		var update = {
			$set: {
				content: param.content
			}
		};
		var opts = {
			upsert: true
		};
		noteModel.update(note, update, opts, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				res.send(data(true));
			}
		});

	});
}