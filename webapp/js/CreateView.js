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
            }
        }
	});
})();