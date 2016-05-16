
var starModel = require('../model/star');
var noteModel = require('../model/note');
var notebookModel = require('../model/notebook');
var token = require('../util/token');
var data = require('../util/res');

module.exports = function(app) {
	app.get('/getStarList', function (req, res) {
		var checked = token.check(app, req.cookies);
		if (!checked) {
			return res.send(data(false));
		} else {
			var condition = {uid: checked};
		}
		starModel.find(condition, '_id refId starName isNote', function (err, result) {
			return res.send(data(true, result));
		});
	});

	app.post('/createStar', function (req, res) {
		var checked = token.check(app, req.cookies);
		var props = req.body;
		if (!checked) {
			return res.send(data(false));
		} else {
			var star = {
				refId: props.refId,
				starName: props.starName,
				isNote: props.isNote,
				uid: checked
			};
		}
		var setStar = {
			id: props.refId,
			star: false
		};
		var starPromise = starModel.create(star);
		starPromise.then(function (result) {
			if (props.isNote) {
				noteModel.setNoteStar(setStar, function (err, result) {
					if (err) {
						return res.send(err);
					} else {
						return res.send(data(true));
					}
				});
			} else {
				notebookModel.setNotebookStar(setStar, function (err, result) {
					if (err) {
						return res.send(err);
					} else {
						return res.send(data(true));
					}
				});
			}
		}).catch(function (err) {
			res.send(err);
		});
	});

	app.post('/removeStar', function (req, res) {
		var props = req.body;
		var star = {
			_id: props.id
		};
		var isNote = props.isNote;
		var setStar = {
			id: props.refId,
			star: false
		};
		var starPromise = starModel.remove(star);
		starPromise.then(function (star) {
			if (isNote) {
				noteModel.setNoteStar(setStar, function (err, result) {
					if (err) {
						return res.send(err);
					} else {
						return res.send(data(true));
					}
				});
			} else {
				notebookModel.setNotebookStar(setStar, function (err, result) {
					if (err) {
						return res.send(err);
					} else {
						return res.send(data(true));
					}
				});
			}

		}).catch(function (err) {
			res.send(err);
		});
	});
};