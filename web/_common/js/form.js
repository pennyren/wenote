var app = app || {};
app.getPropsFromeInputs = function($formContainer) {
	var props = {};
	var $inputs = $formContainer.find('input');
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
	return false;
}