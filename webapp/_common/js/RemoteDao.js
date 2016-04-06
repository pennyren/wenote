var app = app || {};
//ajax
(function($) {
	app.doGet = function (path, data) {
		return ajax(false, path, data);
	};

	app.doPost = function (path, data) {
		return ajax(true, path, data);
	};

	function ajax(isPost, path, data) {
		var dfd = $.Deferred();
		var method = (isPost) ? "POST" : "GET";
		data = data || {};
		var opts = {
			url: path,
			type: method,
			dataType: "json",
			data: data
		};

		var jqXHR = $.ajax(opts);

		jqXHR.done(function (results) {
			dfd.resolve(results);
		});

		jqXHR.fail(function (jqx, textStatus, error) {
			dfd.reject(jqx, textStatus, error);
		});
		return dfd.promise();
	}
})(jQuery);