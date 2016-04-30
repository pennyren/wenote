
var userModel = require('../model/user');
var token = require('../util/token');
var data = require('../util/res');

module.exports = function(app) {
	app.post('/register', function (req, res) {
		var user = req.body;
		var doc = {
			username: user.username,
			password: user.password
		};
		var userPromise = userModel.findOne({username: user.username}).exec();
		userPromise.then(function (result) {
			if (result == null) {
				userModel.create(doc, function (err, result) {
					if (err) {
						res.send(err);
					} else {
						token.set(app, res, result.username);
		            	return res.send(data(true));
					}
				});
			} else {
				return res.send(data(false));
			}
		}).catch(function (err) {
			res.send(err);
		});
	});

	app.post('/signin', function (req, res) {
		var user = req.body;
		userModel.findByUsername(user.username, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				if (result == null) {
					return res.send(data(false));
				} else if (result.password !== user.password) {
					return res.send(data(false));
				} else {
					token.set(app, res, result.username);
	            	return res.send(data(true));
				}
			}
		});
	});

	app.get('/checkToken', function (req, res) {
		var cookie = req.cookies;
		var isSigned = token.check(app, cookie);
		return isSigned ? res.send(data(true)) : res.send(data(false));
	});

	app.post('/signout', function(req, res) {
		var cookie = req.cookies;
		token.clear(app, cookie);
		return res.send(data(true));
	});
}