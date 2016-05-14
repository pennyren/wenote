var userRoute = require('./user');
var noteRoute = require('./note');
var notebookRoute = require('./notebook');
var starRoute = require('./star');
module.exports = function(app) {
	userRoute(app);
	noteRoute(app);
	notebookRoute(app);
	starRoute(app);
}
