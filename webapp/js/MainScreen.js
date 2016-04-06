(function() {
	brite.registerView("MainScreen",{
		create: function(){
			return render("MainScreen");
	   },
        postDisplay: function(){
      		var view = this;
            brite.display("MainView", ".MainScreen");
        },
        docEvents: {
    	   "APP_HASH_CHANGE": function (e) {
                var view = this;
                var rootPath = app.router.pathAt(0);
                var viewName = viewNameByPath[rootPath];
                if (view.currentViewName != viewName) {
                    view.currentViewName = viewName;
                    view.$el.bEmpty();
                    brite.display(viewName, ".MainScreen");
                }
            }
    	}
	});
    //track hash, and manage view
    var viewNameByPath = {
        "home": "MainView",
        "note": "NoteView"
    };
})();