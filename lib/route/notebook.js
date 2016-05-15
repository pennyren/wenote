
var notebookModel = require('../model/notebook');
var data = require('../util/res');
var token = require('../util/token');

module.exports = function(app) {
	app.get('/getNotebookList', function (req, res) {
		var checked = token.check(app, req.cookies);
		if (!checked) {
			return res.send(data(false));
		} else {
			var condition = {uid: checked};
		}
		notebookModel.find(condition, '_id name star time count', function (err, result) {
			return res.send(data(true, result));
		});
	});

	app.post('/createNotebook', function (req, res) {
		var props = req.body;
		var notebook = {
			name: props.bookname,
			start: false,
			count: 0,
			uid: props.uid
		};
		notebookModel.create(notebook, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				var bookResult = {
					_id: result._id,
					name: result.name,
					count: result.count,
					time: result.time
				};
            	return res.send(data(true, bookResult));
			}
		});
	});

	app.post('/deleteNotebook', function (req, res) {
		var id = req.body.id;
		var notebook = {
			_id: id
		};
		notebookModel.remove(notebook, function (err) {
			if (err) {
				return res.send(err);
			} else {
				return res.send(data(true));
			}
		});
	});

	app.post('/getNotebookNameByNote', function (req, res) {
		var noteId = req.body._id;
	});
}