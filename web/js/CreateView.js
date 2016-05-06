(function() {
	brite.registerView("CreateView",{
		create: function(data) {
            var data = data || {};
            return render("CreateView", data);
	    },
        postDisplay: function() {
      		var view = this;
            setTimeout(function () {
                view.$el.addClass("make-opacity");
            }, 100);
        },
        events: {
            "click; .btn-cancel": function (e) {
                var view = this;
                view.$el.removeClass("make-opacity");
                setTimeout(function () {
                    view.$el.bRemove();
                }, 500);
            },
            "click; .btn-confirm": function (e) {
                var view = this;
                if (!app.validate(view.$el)) {
                    return;
                }
                var props = app.getPropsFromeInputs(view.$el);
                props.uid = JSON.parse(localStorage.userInfo).uid;
                if (view.$el.hasClass('note')) {
                    app.doPost('/createNote', props).done(function (result) {
                        console.log(result);
                    });
                } else {
                    app.doPost('/createNotebook', props).done(function (result) {
                        console.log(result);
                    });
                }
            }
        }
	});
})();