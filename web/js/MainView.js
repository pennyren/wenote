(function() {
	brite.registerView("MainView",{
		create: function() {
			return render("MainView");
	    },
        postDisplay: function() {
      		var view = this;
        },
        events: {
        	"click; .item-main": function (e) {
        		var view = this;
        		view.$el.find(".main").removeClass("hidden").next().addClass("hidden");
			},
        	"click; .item-about": function (e) {
        		var view = this;
        		view.$el.find(".main").addClass("hidden").next().removeClass("hidden");
        	},
        	"click; .login": function (e) {
        		var view = this;
                brite.display("LoginView", "body");
        	},
            "click; .tip": function (e) {
                var view = this;
                brite.display("IntroduceView", "body");
            }
        }
	});
})();