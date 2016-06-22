
var noteModel = require('../model/note');
var starModel = require('../model/star');
var data = require('../util/res');
var token = require('../util/token');

module.exports = function (app) {
	app.get('/getNoteList', function (req, res) {
		var checked = token.check(app, req.cookies);
		if (!checked) {
			return res.send(data(false));
		} else {
			var condition = {uid: checked};
		}
		noteModel.find(condition, '_id name overview star time', function (err, result) {
			return res.send(data(true, result));
		});
	});

	app.post('/getNoteListByNotebook', function (req, res) {
		var ids = req.body;
		var condition = {
			uid: ids.uid,
			bid: ids.bid
		};
		noteModel.find(condition, '_id name overview start time', function (err, result) {

		});
	});

	app.post('/getNoteContent', function (req, res) {
		var condition = {
			_id: req.body.id
		};
		var notePromise = noteModel.findOne(condition, 'name start content').populate('bid', 'name').exec();
		notePromise.then(function (result) {
			return res.send(data(true, result));
		}).catch(function (err) {
			return res.send(err);
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
				var noteResult = {
					_id: result._id,
					name: result.name,
					time: result.time
				};
            	return res.send(data(true, noteResult));
			}
		});
	});

	app.post('/updateNoteName', function (req, res) {
		var props = req.body;
		var note = {
			_id: props.id
		};
		var update = {
			$set: {
				name: props.name
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

	app.post('/updateNoteContent', function (req, res) {
		var param = req.body;
		var note = {
			_id: param.id
		};
		var update = {
			$set: {
				content: param.content,
				overview: param.overview
			}
		};
		var opts = {
			upsert: true
		};
		noteModel.update(note, update, opts, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				var newResult = {
					overview: result.overview
				}
				res.send(data(true, newResult));
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

	app.post('/deleteNote', function (req, res) {
		var id = req.body.id;
		var star = req.body.star;
		var note = {
			_id: id
		};
		
		var notePromise = noteModel.remove(note);
		notePromise.then(function () {
			if (star) {
				starModel.remove({refId: id}, function (err) {
					if (err) {
						res.send(err);
					} else {
						res.send(data(true));
					}
				});
			}
		}).catch(function (err) {
			res.send(err);
		});
	});

	app.post('/changeNoteRef', function (req, res) {
		var param = req.body;
		var note = {
			_id: param.noteId
		};
		var update = {
			$set: {
				bid: param.bookId
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

	app.post('/getSearchNoteList', function (req, res) {
		var param = req.body;
		var uid = param.uid;
		var search = param.search;
		var condition = {
			uid: uid
		};
		if (search) {
			condition.name = new RegExp(search);
		}
		noteModel.find(condition, '_id name overview star time', function (err, result) {
			return res.send(data(true, result));
		});
	});
};