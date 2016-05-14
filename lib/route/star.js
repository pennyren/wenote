
var starModel = require('../model/star');
var token = require('../util/token');
var data = require('../util/res');

module.exports = function(app) {
	app.get('/getStarList', function (req, res) {
		var uid = req.body.uid;
		starModel.find({uid: uid}, '_id refId starName isNote', function (err, result) {
			return res.send(data(true, result));
		});
	});
};