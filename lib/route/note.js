
var noteModel = require('../model/note');
var data = require('../util/res');

module.exports = function (app) {
	app.post('/getNoteList', function (req, res) {
		noteModel.find({uid: ''}, ['_id', 'name', 'overview', 'start', 'time'], function (req, res) {

		});
	});

	app.post('/getNoteListByNotebook', function (req, res) {
		noteModel.find({uid: '', bid: ''}, ['_id', 'name', 'overview', 'start', 'time'], function (req, res) {

		});
	});

	app.post('/getNoteContent', function (req, res) {
		noteModel.findById({_id: ''}, ['content'], function (req, res) {

		});
	});

	app.post('/createNote', function (req, res) {
		var props = req.body;
		var note = {
			name: props.notename,
			start: false,
			uid: props.uid
		};
		noteModel.create(note, function (err, result) {
			if (err) {
				res.send(err);
			} else {
            	return res.send(data(true));
			}
		});
	});

	app.post('/updateNoteName', function (req, res) {

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

	app.post('/getNoteCount', function (req, res) {
		var uid = req.body.uid;
		noteModel.where({uid: uid}).count(function (err, count) {
			if (err) {
				return res.send(err);
			} else {
				return res.send(data(true, {count: count}));
			}
		});
	});
}