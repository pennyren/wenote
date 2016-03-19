(function() {
	brite.registerView("ShortcutView",{
		create: function() {
            console.log(render("ShortcutView"));
			return render("ShortcutView");
	    },
        postDisplay: function() {
      		var view = this;
            setTimeout(function () {
                view.$el.find(".bkg").addClass("set-opacity");
                view.$el.find(".slide").addClass("slide-done");
            }, 100);
        },
        docEvents: {
        	"REMOVE_SHORTCUT_VIEW": function (e) {
                var view = this;
                view.$el.find(".slide").removeClass("slide-done");
                view.$el.find(".bkg").removeClass("set-opacity");
                setTimeout(function () {
                    view.$el.bRemove();
                }, 300);
            }
        }
	});
})();