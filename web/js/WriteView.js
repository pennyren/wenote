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
            view.$title = view.$el.find('.note-title');
            view.$bookname = view.$el.find('.select-wrap .book-name');
            view.$star =  view.$el.find('.handle .mdi-star');
            view.$el.trigger('GET_CHECKED_NOTE');
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
                brite.display("CreateView", "body", {note: false, aside: false});
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
        },
        docEvents: {
            "GET_NOTE_CONTENT": function (e, data) {
                var view = this;
                var data = data || {};
                var id = data.id;
                app.doPost('/getNoteContent', {_id: id}).done(function (data) {
                    var result = data.result;
                    view.$editor.val(reuslt.content);
                    view.$title.val(reuslt.name);
                    view.$bookname.text(result.bookname || '移动笔记');
                    if (result.start) {
                        view.$star.addClass('star');
                    } else {
                        view.$star.removeClass('star');
                    }
                    renderMarkdown.call(view, view.$editor, view.$generate);
                });
                
            },
            "UPDATE_NOTE_CONTENT": function (e, data) {
                var view = this;
                var data = data || {};
                var result = data.note;
                view.$editor.val('');
                view.$title.val(result.name);
                view.$bookname.text('移动笔记');
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