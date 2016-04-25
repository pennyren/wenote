var crypto = require('crypto');
function set(app, res, username) {
	var md5 = crypto.createHash('md5');
	var curTime = new Date();
	md5.update(curTime + '233');
	var d = md5.digest('hex');
	app.locals[username] = d;
	res.cookie('token', d, {maxAge: 900000, httpOnly: true});
	res.cookie('user', username, {maxAge: 900000, httpOnly: true});
}

function check(app, cookie) {
	var sid = cookie.sid;
	var username = cookie.username;
	return (app.locals[username] && app.locals[username] == sid) ? true : false;
}

module.exports = {
	set: set,
	check: check
};