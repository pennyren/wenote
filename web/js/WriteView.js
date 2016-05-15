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
            view.$bookList = view.$el.find('.book-list');
            view.$el.trigger('GET_CHECKED_NOTE');
        },
        events: {
        	"input; textarea": function (e) {
                var view = this;
                renderMarkdown.call(view, view.$editor, view.$generate);
            },
            "click; .select-book": function (e) {
                var view = this;
                app.doGet('/getNotebookList').done(function (data) {
                    var reuslt = data.result;
                    var books = render('WriteView-books', {books: reuslt});
                    var $bookItems = view.$bookList.find('.book-item');
                    $bookItems.bRemove();
                    view.$bookList.append(books);
                    view.$noteBook.toggleClass('hidden');
                });
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
            },
            "click; .book-item": function (e) {
                var view = this;
                var $cur = $(e.currentTarget);
                var name = $cur.find('div').text();
                var id = $cur.attr('data-id');
                view.$bookname.text(name);
                view.$noteBook.toggleClass('hidden');
                view.$el.trigger('SET_NOTEBOOK_REF', {id: id});
            },
            "click; .mdi-save": function (e) {
                var view = this;
                view.$el.trigger('GET_CHECKED_NOTE', {isUpdate: true});
            },
            "keyup; .note-title": function (e) {
                var view = this;
                var name = $(e.currentTarget).val();
                if (e.keyCode == 13) {
                    view.$el.trigger('UPDATE_NOTE_NAME', {name: name});
                }
            }
        },
        docEvents: {
            "GET_NOTE_CONTENT": function (e, data) {
                var view = this;
                var result = data || {};
                console.log(data);
                app.doPost('/getNoteContent', {id: result.id}).done(function (data) {
                    console.log(data);
                    var result = data.result;
                    console.log(result);
                    view.$editor.val(result.content);
                    view.$title.val(result.name);
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
                var result = data.note || {};
                var name = result.name || '';
                view.$editor.val('');
                view.$title.val(name);
                view.$bookname.text('移动笔记');
                renderMarkdown.call(view, view.$editor, view.$generate);
            },
            "WRITE_NOTEBOOK_UPDATE": function (e, data) {
                var view = this;
                var result = data.notebook || {};
                view.$bookname.text(result.name);
            },
            "SAVE_NOTE_CONTENT": function (e, data) {
                var view = this;
                var content = view.$editor.val();
                data = data|| {};
                var props = {
                    id: data.id,
                    content: content,
                    overview: content.substr(0, 70)
                }
                app.doPost('/updateNoteContent', props).done(function (data) {
                    var result = data.result;
                    if (data.success) {
                        brite.display('Toast', 'body', {message: '保存成功'});
                        view.$el.trigger('SET_NOTE_OVERVIEW', {overview: result.overview});
                    }
                });  
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