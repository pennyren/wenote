
var notebookModel = require('../model/notebook');
var starModel = require('../model/star');
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
			star: false,
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
		var star = req.body.star;
		var notebook = {
			_id: id
		};
		
		var notebookPromise = notebookModel.remove(notebook);
		notebookPromise.then(function () {
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

	app.post('/getNotebookNameByNote', function (req, res) {
		var noteId = req.body._id;
	});
}