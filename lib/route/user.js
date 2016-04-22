
var userModel = require('../model/user');
var crypto = require('crypto');
var session;
module.exports = function(app) {
	app.post('/register', function (req, res) {
		var user = req.body;
		var doc = {
			username: user.username,
			password: user.password
		}
		userModel.create(doc, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				res.send(result);
			}
		})
	});

	app.post('/singin', function (req, res) {
		var user = req.body;
		userModel.findByUsername(user.username, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				if (result == null) {
					return res.send({
						success: false,
						result: []
					});
				} else if (result.password !== user.password) {
					return res.send({
						success: false,
						result: []
					});
				} else {
					var md5 = crypto.createHash('md5');
					var curTime = new Date();
                	md5.update(curTime + '233');
                	var d = md5.digest('hex');
                	session = {
                		sid: d,
                		username: user.username
                	}
                	console.log(result);
                	return res.send({
	                    success: true,
	                    result: {
	                        token: d,
	                        username: result.username
	                    }
                	});
				}
			} 
		});
	});
}