(function() {
	brite.registerView("NoteView",{
		create: function() {
			return render("NoteView");
	    },
        postDisplay: function() {
      		var view = this;
            brite.display("AsideView", view.$el.find(".sidebar"));
            brite.display("NoteList", view.$el.find(".list"));
            brite.display("WriteView", view.$el.find(".write"));
        },
        events: {
        	
        }
	});
})();