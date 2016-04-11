(function() {
	brite.registerView("IntroduceView",{
		create: function() {
			return render("IntroduceView");
	    },
        postDisplay: function() {
      		var view = this;
            view.$content = view.$el.find('.content');
            view.$el.addClass('opacity');
            view.$content.addClass('scale');
        },
        events: {
        	"click; .close": function (e) {
        		var view = this;
                view.$el.removeClass('opacity');
                setTimeout(function() {
                    view.$el.bRemove();
                }, 500);
			}
        }
	});
})();