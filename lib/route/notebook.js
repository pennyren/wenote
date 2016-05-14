
var notebookModel = require('../model/notebook');
module.exports = function(app) {
	app.post('/getNotebookList', function (req, res) {
		var uid = req.body.uid;
		notebookModel.find({uid: uid}, '_id name star time', function (err, result) {
			return res.send(data(true, result));
		});
	});

	app.post('/getNotebookNameByNote', function (req, res) {
		var noteId = req.body._id;
	});

	app.post('/createNotebook', function (req, res) {
		var props = req.body;
		var notebook = {
			name: props.bookname,
			start: false,
			uid: props.uid
		};
		notebookModel.create(notebook, function (err, result) {
			if (err) {
				res.send(err);
			} else {
            	return res.send(data(true));
			}
		});
	});

	app.post('/deleteNotebookById', function (req, res) {

	});
}