var app = app || {};
(function() {
	var _defaultValidators = {
		required: {
			message: '不能为空',
			validator: function (val, $cur) {
				return val.trim().length > 0;
			}
		},
		equalto: {
			message: '不匹配密码',
			validator: function (val, $cur) {
				var prevVal = $cur.closest('.form-group').prev().find('input').val();
				return prevVal == val ? true : false;
			}
		}
	};
	var _cnMap = {
		'username': '用户名',
		'password': '密码',
		'confirm': '确认密码',
		'notename': '笔记名',
		'bookname': '笔记本名'
	}
	app.getPropsFromeInputs = function($formContainer) {
		var props = {};
		var $inputs = $formContainer.find('input:visible');
		$inputs.each(function() {
			var $cur = $(this);
			var name = $cur.attr('name');
			props[name] = $cur.val();
		});
		return props;
	}

	app.fillInputsWithProps = function($formContainer, props) {
		for(var p in props) {
			var $cur = $formContainer.find('[name=' + p + ']');
			$cur.val(props[p]);
		}
	}

	app.validate = function($formContainer) {
		var $rule = $formContainer.find('[data-validation_rule]:visible');
		var isMatch = true;
		$rule.each(function() {
			var $cur = $(this);
			var rulekey = $cur.attr('data-validation_rule');
			var ruleval = $cur.val();
			var keys = rulekey.split(' ');
			var prop = $cur.attr('name');
			for (var i = 0; i < keys.length; i++) {
				if (!getCurrentValidationResult(keys[i], ruleval, prop, $cur)) {
					isMatch = false;
					break;
				}
			}
			return isMatch;
		});
		return isMatch;
	}

	function getCurrentValidationResult(key, val, prop, $cur) {
		var rule = _defaultValidators[key];
		if (!rule.validator(val, $cur)) {
			brite.display('Toast', 'body', {message: _cnMap[prop] + rule.message});
			return false;
		} else {
			return true;
		}
	}
})();
