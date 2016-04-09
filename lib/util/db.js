var mongoose = require('mongoose');
if (process.env.VCP_SERVICES) {
	var service = JSON.parse(process.env.VCP_SERVICES);
	var uri = service.mongodb[0].credentials.uri;
} else {
	var uri = 'mongodb://mongodb://127.0.0.1:27017/wenote';
}

var db = mongoose.createConnection(uri);
db.on('error', function(error) {
    console.log(error + " wtf");
});
module.exports = db;