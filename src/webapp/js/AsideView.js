(function() {
	brite.registerView("AsideView",{
		create: function() {
			return render("AsideView");
	    },
        postDisplay: function() {
      		var view = this; 
        },
        events: {
        	"click; .account-wrap": function (e) {
                var view = this;
                var $account = $(e.currentTarget);
                $account.toggleClass("tip");
                if (!$account.hasClass("tip")) {
                    brite.display("AccountView", "body");
                } else {
                    view.$el.trigger("REMOVE_ACCOUNT_VIEW");
                }
                
            },
            "click; .shortcut": function (e) {
                var view = this;
                var $cur = $(e.currentTarget);
                var currentIndex = $cur.index();
                var $hasFocus = $cur.parent().find(".has-focus");
                if ($hasFocus.length) {
                    var index = $hasFocus.index();
                    if (index == currentIndex) {
                        $cur.removeClass("has-focus");
                        view.$el.trigger("REMOVE_SHORTCUT_VIEW");
                    } else {
                        $hasFocus.removeClass("has-focus");
                        view.$el.trigger("REMOVE_NOTEBOOK_VIEW");
                        $cur.addClass("has-focus");
                        brite.display("ShortcutView", "body");
                    }
                } else {
                    $cur.addClass("has-focus");
                    brite.display("ShortcutView", "body");
                }
            },
            "click; .notebook": function (e) {
                var view = this;
                var $cur = $(e.currentTarget);
                var currentIndex = $cur.index();
                var $hasFocus = $cur.parent().find(".has-focus");
                if ($hasFocus.length) {
                    var index = $hasFocus.index();
                    if (index == currentIndex) {
                        $cur.removeClass("has-focus");
                        view.$el.trigger("REMOVE_NOTEBOOK_VIEW");
                    } else {
                        $hasFocus.removeClass("has-focus");
                        view.$el.trigger("REMOVE_SHORTCUT_VIEW");
                        $cur.addClass("has-focus");
                        brite.display("NotebookView", "body");
                    }
                } else {
                    $cur.addClass("has-focus");
                    brite.display("NotebookView", "body");
                }
            },
            "click; .add-note": function (e) {
                var view = this;
                brite.display("CreateView", "body", {note: true});
            },
            "click; .note": function (e) {
                var view = this;
                var $hasFocus= view.$el.find('.has-focus');
               if ($hasFocus.length) {
                    var index = $hasFocus.index();
                    $hasFocus.removeClass("has-focus");
                    if (index == 0) {
                        view.$el.trigger("REMOVE_SHORTCUT_VIEW");
                    } else {
                        view.$el.trigger("REMOVE_NOTEBOOK_VIEW");
                    }
                }
            }
        }
	});
})();