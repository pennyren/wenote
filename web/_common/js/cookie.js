var app = app || {};

(function() {
	app.cookie = {};
	app.cookie.get = function (key) {
		return cookie(key);
	}

	app.cookie.set = function (key, val, opts) {
		cookie(key, val, opts);
	}

	app.cookie.remove = function (key, opts) {
		if (!opts) opts = {};
		cookie(key, '', extend(opts, {expires: -1}));
	}

	function cookie(key, val, opts) {
		if (typeof val !== 'undefined') {
			opts = extend({path: '/'}, opts);
			if (typeof opts.expires == 'number') {
				var expires =  new Date();
				expires.setMilliseconds(expires.getMilliseconds() + opts.expires * 864e+5);
				opts.expires = expires;
			}
			var domain = opts.domain ? '; domain=' + opts.domain : '';
			var expires = opts.expires ? '; expires=' + opts.expires.toUTCString() : '';
			var path = '; path=' + opts.path;
			var secure = opts.secure ? '; secure' : '';
			document.cookie = [key, '=', encodeURIComponent(val), expires, path, domain, secure].join('');

		} else {
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var cookieVal;
			var i = cookies.length;
			if (!i) return null;
			while (i--) {
				var cookie = cookies[i];
				if (cookie.indexOf(key) !== -1) {
					cookieVal = decodeURIComponent(cookie.split('=')[1]);
					break;
				}
			}
			return cookieVal;
		}
	}

	function extend(to, from) {
		var keys = Object.keys(from);
		var i = keys.length;
		while (i--) {
			to[keys[i]] = from[keys[i]];
		}
		return to;
	}
})();