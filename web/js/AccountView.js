(function() {
	brite.registerView("AccountView",{
		create: function() {
			return render("AccountView");
	    },
        postDisplay: function() {
      		var view = this;
            setTimeout(function () {
                view.$el.addClass("opacity");
            }, 100);
        },
        events: {
        	"click; .signout": function (e) {
                var view = this;
                app.doPost('/signout').done(function (result) {
                    if (result.success) {
                        view.$el.bRemove();
                        app.cookie.clear();
                        app.router.set('/welcome');
                    }
                });
            }
        },
        docEvents: {
           "REMOVE_ACCOUNT_VIEW": function (e) {
                var view = this;
                view.$el.removeClass("opacity");
                setTimeout(function () {
                    view.$el.bRemove();
                }, 500);
            }
        }
	});
})();