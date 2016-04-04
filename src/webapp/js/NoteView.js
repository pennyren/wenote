(function() {
	brite.registerView("NoteView",{
		create: function() {
			return render("NoteView");
	    },
        postDisplay: function() {
      		var view = this;
            view.$sidebar = view.$el.find('.sidebar');
            brite.display("AsideView", view.$el.find(".sidebar"));
            brite.display("NoteList", view.$el.find(".list"));
            brite.display("WriteView", view.$el.find(".write"));
        },
        docEvents: {
            "MAKE_VIEW_EXPAND": function (e) {
                var view = this;
                view.$el.addClass('expand');
                view.$sidebar.addClass('slow');
            },
            "VIEW_EXPAND_BACK": function (e) {
                var view = this;
                view.$el.removeClass('expand');
                setTimeout(function () {
                    view.$sidebar.removeClass('slow');
                }, 200);
            }
        }
	});
})();