var userRoute = require('./user');
var noteRoute = require('./note');
var notebookRoute = require('./notebook');
module.exports = function(app) {
	userRoute(app);
	noteRoute(app);
	notebookRoute(app);
}
