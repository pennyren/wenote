(function() {
	brite.registerView("WriteView",{
		create: function() {
			return render("WriteView");
	    },
        postDisplay: function() {
      		var view = this;
            view.$editor = view.$el.find(".editor textarea");
            view.$generate = view.$el.find(".editor .generate");
            view.$noteBook = view.$el.find('.book-wrap');
            renderMarkdown.call(view, view.$editor, view.$generate);
        },
        events: {
        	"input; textarea": function (e) {
                var view = this;
                renderMarkdown.call(view, view.$editor, view.$generate);
            },
            "click; .select-book": function (e) {
                var view = this;
                view.$noteBook.toggleClass('hidden');
            },
            "click; .plus": function (e) {
                var view = this;
                view.$noteBook.toggleClass('hidden');
                brite.display("CreateView", "body", {note: false});
            },
            "click; .expand": function (e) {
                var view = this;
                var $cur = $(e.currentTarget);
                $cur.toggleClass("focus");
                if ($cur.hasClass('focus')) {
                    view.$el.trigger('MAKE_VIEW_EXPAND');
                } else {
                     view.$el.trigger('VIEW_EXPAND_BACK');
                }
            }
        }
    });
    
    function renderMarkdown($textarea, $genarate) {
        var view = this;
        var markdown = $textarea.val();
        $genarate.html(marked(markdown, {
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        }));
    }
})();