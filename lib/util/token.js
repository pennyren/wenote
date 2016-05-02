var crypto = require('crypto');
function set(app, res, username) {
	var md5 = crypto.createHash('md5');
	var curTime = new Date();
	md5.update(curTime + '233');
	var d = md5.digest('hex');
	app.locals[username] = d;
	res.cookie('sid', d, {maxAge: 9000000, httpOnly: true});
	res.cookie('user', username, {maxAge: 9000000, httpOnly: true});
}

function check(app, cookie) {
	var sid = cookie.sid;
	var username = cookie.user;
	var curSid = app.locals[username];
	return (curSid && curSid == sid) ? true : false;
}

function clear(app, cookie) {
	var username = cookie.user;
	app.locals[username] = '';
}

module.exports = {
	set: set,
	check: check,
	clear: clear
};