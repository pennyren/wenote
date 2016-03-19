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