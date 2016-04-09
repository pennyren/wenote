var userRoute = require('./user');
var noteRoute = require('./note');
var notebookRoute = require('./notebook');
module.exports = function(app) {
	app.get('/', function (req, res) {
  		res.sendFile(__dirname + '/index.html');
	});
	userRoute(app);
	noteRoute(app);
	notebookRoute(app);
}
