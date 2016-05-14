var app = app || {};
(function () {
	app.getUserId = function () {
		var userInfo = JSON.parse(localStorage.userInfo);
		return userInfo.uid;
	};

	app.saveUserInfo = function (data) {
		var userInfo = {
            uid: data.result._id,
            user: data.result.username
        };
    	localStorage.setItem('userInfo', JSON.stringify(userInfo));
	}
})();