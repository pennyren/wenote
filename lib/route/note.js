
var noteModel = require('../model/note');
var data = require('../util/res');

module.exports = function (app) {
	app.post('/getNoteList', function (req, res) {
		var uid = req.body.uid;
		noteModel.find({uid: uid}, '_id name overview start time', function (err, result) {
			return res.send(data(true, result));
		});
	});

	app.post('/getNoteListByNotebook', function (req, res) {
		var ids = req.body;
		var condition = {
			uid: ids.uid,
			bid: ids.bid
		}
		noteModel.find(condition, '_id name overview start time', function (err, result) {

		});
	});

	app.post('/getNoteContent', function (req, res) {
		var id = req.body._id;
		noteModel.findById(id, 'content', function (err, result) {

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