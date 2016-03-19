(function() {
	brite.registerView("IntroduceView",{
		create: function() {
			return render("IntroduceView");
	    },
        postDisplay: function() {
      		var view = this;
        },
        events: {
        	"click; .close": function (e) {
        		var view = this;
				view.$el.bRemove();
        	}
        }
	});
})();