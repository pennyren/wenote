(function() {
	brite.registerView("CreateView",{
		create: function(data) {
            var data = data || {};
            return render("CreateView", data);
	    },
        postDisplay: function(data) {
      		var view = this;
            var data = data || {};
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
                    app.doPost('/createNotebook', props).done(function (result) {
                        if (result.success) {
                            if (view.aside) {

                            } else {
                                
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