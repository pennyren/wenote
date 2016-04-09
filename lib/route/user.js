
var userModel = require('../model/user');
module.exports = function(app) {
	app.post('/register', function (req, res) {
		var param = req.body;
		var doc = {
			username: param.username,
			password: param.password
		}
		userModel.create(doc, function (err, result) {
			if (err) {
				res.send(err);
			} else {
				res.send(result);
			}
		})
	});
}