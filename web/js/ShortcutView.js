(function() {
	brite.registerView("ShortcutView",{
		create: function() {
           return render("ShortcutView");
	    },
        postDisplay: function() {
      		var view = this;
            view.$shortcut = view.$el.find('.shortcut-wrap');
            view.$shortcut.bEmpty();
            app.doGet('/getStarList').done(function (data) {
                if (data.success) {
                    var result = data.result;
                    var shortcut = render('ShortcutView-item', {items: result});
                    view.$shortcut.append(shortcut);
                }
                setTimeout(function () {
                    view.$el.find(".bkg").addClass("set-opacity");
                    view.$el.find(".slide").addClass("slide-done");
                }, 100);
            });
        },
        events: {
            "click; .delete .mdi": function (e) {
                var view = this;
                var $cur = $(e.currentTarget).closest('.item');
                var id = $cur.attr('data-id');
                var refId= $cur.attr('data-ref');
                var isNote = $cur.attr('data-note');
                var props = {
                    id: id,
                    refId: refId,
                    isNote: !!isNote
                };
                console.log(props);
                app.doPost('/removeStar', props).done(function (data) {
                    if (data.success) {
                        $cur.bRemove();
                    }
                });
            }
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