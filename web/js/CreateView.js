(function() {
	brite.registerView("CreateView",{
		create: function(data) {
            data = data || {};
            return render("CreateView", data);
	    },
        postDisplay: function(data) {
      		var view = this;
            data = data || {};
            view.aside = data.aside;
            setTimeout(function () {
                view.$el.addClass("make-opacity");
            }, 100);
        },
        events: {
            "click; .btn-cancel": function (e) {
                var view = this;
                view.$el.trigger('REMOVE_CREATE_VIEW');
            },
            "click; .btn-confirm": function (e) {
                var view = this;
                if (!app.validate(view.$el)) {
                    return;
                }
                var props = app.getPropsFromeInputs(view.$el);
                props.uid = app.getUserId();
                if (view.$el.hasClass('note')) {
                    app.doPost('/createNote', props).done(function (data) {
                        if (data.success) {
                            var result = data.result;
                            result.time = moment(result.time).format('YYYY/MM/DD');
                            view.$el.trigger('REMOVE_CREATE_VIEW');
                            view.$el.trigger('RENDER_CREATE_NOTE', {note: result});
                        }
                    });
                } else {
                    app.doPost('/createNotebook', props).done(function (data) {
                        if (data.success) {
                            view.$el.trigger('REMOVE_CREATE_VIEW');
                            if (view.aside) {
                                view.$el.trigger('ASIDE_NOTEBOOK_UPDATE', {notebook: data.result});
                            } else {
                                view.$el.trigger('WRITE_NOTEBOOK_UPDATE', {notebook: data.result});
                            }
                        }
                    });
                }
            }
        },
        docEvents: {
            "REMOVE_CREATE_VIEW": function (e) {
                var view = this;
                view.$el.removeClass("make-opacity");
                setTimeout(function () {
                    view.$el.bRemove();
                }, 500);
            }
        }
	});
})();