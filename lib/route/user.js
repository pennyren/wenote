
var userModel = require('../model/user');
var token = require('../util/token');
module.exports = function(app) {
	app.post('/register', function (req, res) {
		var user = req.body;
		var doc = {
			username: user.username,
			password: user.password
		};
		var isRegistered = false;
		userModel.findByUsername(user.username, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				if (result == null) {
					isRegistered = true;
				} else {
					return res.send({success: false, result: null});

				}
			} 
		});
		if (!isRegistered) {
			userModel.create(doc, function (err, result) {
				if (err) {
					res.send(err);
				} else {
					token.set(app, result.username);
	            	res.cookie('token', d, {maxAge: 900000, httpOnly: true});
	            	res.cookie('user', result.username, {maxAge: 900000, httpOnly: true});
					return res.send({success: true, result: null});
				}
			});
		}
	});

	app.post('/singin', function (req, res) {
		var user = req.body;
		userModel.findByUsername(user.username, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				if (result == null) {
					return res.send({success: false, result: null});
				} else if (result.password !== user.password) {
					return res.send({success: false, result: null});
				} else {
					token.set(app, result.username);
                	res.cookie('token', d, {maxAge: 900000, httpOnly: true});
                	res.cookie('user', result.username, {maxAge: 900000, httpOnly: true});
 					return res.send({success: true, result: null});
				}
			} 
		});
	});
}