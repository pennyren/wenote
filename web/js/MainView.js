(function() {
	brite.registerView("MainView",{
		create: function() {
			return render("MainView");
	    },
        postDisplay: function() {
      		var view = this;
        },
        events: {
        	"click; .login": function (e) {
        		var view = this;
                brite.display("LoginView", "body");
        	},
            "click; .tip": function (e) {
                var view = this;
                brite.display("IntroduceView", "body");
            }
        },
        docEvents: {
            "SCREEN_CHANGE": function (e) {
                var view = this;
                var $body = view.$el.find('.body');
                $body.bEmpty();
                var rootPath = app.router.pathAt(0);
                if (rootPath == 'welcome') {
                    $body.append(render('MainView-welcome'));
                } else {
                    $body.append(render('MainView-about'));
                }
            }
        }
	});
})();