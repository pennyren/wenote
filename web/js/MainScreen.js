(function() {
	brite.registerView("MainScreen",{
		create: function(){
			return render("MainScreen");
	   },
        postDisplay: function () {
      		var view = this;
            app.router.set('/welcome');
        },
        docEvents: {
    	   "CTX_CHANGE": function (e) {
                var view = this;
                var rootPath = app.router.pathAt(0);
                var viewName = viewNameByPath[rootPath];
                if (view.currentViewName != viewName) {
                    view.currentViewName = viewName;
                    if (viewName == 'NoteView') {
                       app.doGet('/checkToken').done(function (result) {
                            if (result.success) {
                                view.$el.bEmpty();
                                brite.display(viewName, ".MainScreen");
                            } else {
                                app.router.set('/welcome');
                            }
                        });
                        
                    } else {
                        view.$el.bEmpty();
                        brite.display(viewName, ".MainScreen");
                    }
                }
                if(rootPath != 'u') {
                    view.$el.trigger('SCREEN_CHANGE');
                }
            }
    	}
	});
    //track hash, and manage view
    var viewNameByPath = {
        "welcome": "MainView",
        "about": "MainView",
        "u": "NoteView",
    };
})();