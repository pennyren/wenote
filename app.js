var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var startRoutes = require('./lib/route/index');
app.set('port', process.env.PROT || 8080);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function (req, res) {
  	res.sendFile(__dirname + '/index.html');
});
startRoutes(app);
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
});