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

//router
(function($){
	var routerInfo = {};
	app.router = {
		pathAt: function (idx) {
			return (routerInfo.paths.length > idx) ? routerInfo.paths[idx] : null;
		},
		pathAsNum: function (idx) {
			var num = app.routerInfo.pathAt(idx);
			return (num !== null && $.isNumeric(num)) ? (num * 1) : null;
		},
		paths: function () {
			return routerInfo.paths;
		},
		get: function () {
			return $.extend({}, routerInfo);
		},
		init: function () {
			routerInfo = extractHash();
			triggerHashChange();
		}
	};

	window.onhashchange = function () {
		routerInfo = extractHash();
		triggerHashChange();
	}

	function triggerHashChange () {
		$(document).trigger("APP_HASH_CHANGE");
	}

	function extractHash () {
		var hash = window.location.hash;
		var router = {};
		if (hash) {
			hash = hash.substring(1);
			var pathAndParam = hash.split("!");
			router.paths = pathAndParam[0].split("/");
			router.params = {};
			if (pathAndParam[1]) {
				var params = pathAndParam[1].split("&");
				for (var i = 0; i < params.length; i++) {
					var keyVal = params[i].split("=");
					var key = keyVal[0];
					var val = keyVal[1];
					router.params[key] = val;
				}
			}
		}else{
			router.paths = [];
			router.params = {};
		}
		return router;
	}
})(jQuery);

