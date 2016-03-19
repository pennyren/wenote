(function() {
	brite.registerView("WriteView",{
		create: function() {
			return render("WriteView");
	    },
        postDisplay: function() {
      		var view = this;
            view.$editor = view.$el.find(".editor textarea");
            view.$generate = view.$el.find(".editor .generate");
            renderMarkdown.call(view, view.$editor, view.$generate);
        },
        events: {
        	"input; textarea": function (e) {
                var view = this;
                renderMarkdown.call(view, view.$editor, view.$generate);
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