var app = app || {};
//router
(function() {
	var routerInfo= {};
	var e = document.createEvent('CustomEvent');
	e.initCustomEvent('CTX_CHANGE', false, true, null);

	app.router = {
		pathAt: function (index) {
			var l = routerInfo.paths.length;
			if (l > index) {
				var val = routerInfo.paths[index];
				var parsed = Number(val);
				return isNaN(parsed) ? val : parsed;
			} else {
				return null;
			}
		},
		get: function () {
			return routerInfo;
		},
		set: function (ctx) {
			window.location.hash = ctx;
		},
		init: function () {
			routerInfo = parseCtx();
			triggerCtxChange();
		}
	};

	window.onhashchange = function () {
		routerInfo = parseCtx();
		triggerCtxChange();
	};

	function triggerCtxChange() {
		document.dispatchEvent(e);
	}

	function parseCtx() {
		var hash = window.location.hash;
		var router = {};
		if (hash) {
			hash = hash.slice(3);
			var arr = hash.split('?');
			router.paths = arr[0].split('/');
			router.search = {};
			if (arr[1]) {
				var map = arr[1].split('&');
				for (var i = 0; i < map.length; i++) {
					var keyVal = map[i].split('=');
					var key = keyVal[0];
					var val = keyVal[1];
					router.search[key] = val;
				}
			}
		}else{
			router.paths = [];
			router.search = {};
		}
		return router;
	}
})();
