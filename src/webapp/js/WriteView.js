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