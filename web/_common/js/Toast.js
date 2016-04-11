(function() {
	brite.registerView("Toast",{
		create: function(data) {
            var data = data || {};
			return render("Toast", data);
	    },
        postDisplay: function() {
      		var view = this;
            view.$el.addClass('opacity');
            setTimeout(function() {
               view.$el.bRemove();
            }, 1200);
        }
    });
})();