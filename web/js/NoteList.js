(function() {
	brite.registerView("NoteList",{
		create: function() {
            return render("NoteList");
		},
        postDisplay: function() {
      		var view = this;
            var dfd = $.Deferred();
            view.$title = view.$el.find('header .title');
            view.$searchCtx = view.$el.find('.search-ctx');
            view.$delete = view.$el.find('.search-ctx .delete');
            view.$input = view.$el.find('.search-ctx input');
            view.$count = view.$el.find('.count span');
            view.$wrap = view.$el.find('.list-wrap');
            view.uid = app.getUserId();
            app.doPost('/getNoteCount', {uid: view.uid}).done(function (data) {
                var count = data.result.count;
                view.$count.text(count);
                if (count == 0) {
                    view.$wrap.append(render('NodeList-empty'));
                } else {
                    dfd.resolve();
                }
            });
            dfd.done(function () {
                app.doGet('/getNoteList').done(function (data) {
                    var result = data.result;
                    var i = result.length;
                    while (i--) {
                        var cur = result[i];
                        cur.time = moment(cur.time).format('YYYY/MM/DD');
                    }
                    var notes = render('NoteList-item', {note: result});
                    view.$wrap.append(notes);
                    view.$wrap.find('li:first-child').addClass('checked');
                    view.$el.trigger('DISPLAY_NOTEVIEW');
                });
            });
        },
        events: {
        	"keyup; .search-ctx input": function (e) {
                var view = this;
                var text = view.$input.val();
                if (text.length) {
                    view.$delete.removeClass('hidden');
                } else {
                    view.$delete.addClass('hidden');
                }
                if (e.keyCode == 13) {
                    getSearchNoteList.call(view, view.uid, text)
                }
            },
            "click; .delete": function (e) {
                var view = this;
                view.$input.val('');
                view.$delete.addClass('hidden');
            },
            "click; .item": function (e) {
                var view = this;
                var $items = view.$el.find('.item');
                var $cur = $(e.currentTarget);
                var id = $cur.attr('data-id');
                $items.removeClass('checked');
                $cur.addClass('checked');
                view.$el.trigger('GET_CHECKED_NOTE');
            },
            "click; .list-wrap .mdi-delete": function (e) {
                var view = this;
                var $note = $(e.currentTarget).closest('.item');
                var isChecked = $note.hasClass('checked');
                var id = $note.attr('data-id');
                var star = !!$note.attr('data-star');
                var props = {
                    id: id,
                    star: star
                };
                app.doPost('/deleteNote', props).done(function (data) {
                    if (data.success) {
                        $note.bRemove();
                        var count = view.$count.text()*1;
                        view.$count.text(--count);

                        if (isChecked) {
                            if (count == 0) {
                                view.$wrap.append(render('NodeList-empty'));
                                view.$el.trigger('UPDATE_NOTE_CONTENT', {note: null});
                            } else {
                                var $item = view.$wrap.find('.item:first-child');
                                $item.addClass('checked');
                                view.$el.trigger('GET_NOTE_CONTENT', {id: $item.attr('data-id')});
                            }
                        }
                    }
                });
            },
            "click; .item .mdi-star": function (e) {
                var view = this;
                $(e.currentTarget).addClass('star');
                view.$el.trigger('GET_CHECKED_NOTE', {isStar: true});
            }
        },
        docEvents: {
            "SHOW_SEARCH_CTX": function (e) {
                var view = this;
                view.$title.addClass('hidden');
                view.$searchCtx.removeClass('hidden');
            },
            "HIDE_SEARCH_CTX": function (e) {
                var view = this;
                view.$delete.addClass('hidden');
                view.$title.removeClass('hidden');
                view.$searchCtx.addClass('hidden');
            },
            "GET_CHECKED_NOTE": function (e, data) {
                var view = this;
                data = data || {};
                var $checkedItem = view.$el.find('.list-wrap .checked');
                var id = $checkedItem.attr('data-id');
                if (data.isUpdate) {
                    view.$el.trigger('SAVE_NOTE_CONTENT', {id: id});
                } else if (data.isStar) {
                    var props = {
                        refId: id,
                        starName: $checkedItem.find('.title .textfix').text(),
                        isNote: true
                    }
                    app.doPost('/createStar', props).done(function (data) {
                        if (data.success) {
                            view.$el.trigger('MAKE_NOTE_STAR');
                        }
                    });
                } else {
                    view.$el.trigger('GET_NOTE_CONTENT', {id: id});
                }
            },
            "RENDER_CREATE_NOTE": function (e, data) {
                var view = this;
                var result = data.note || {};
                var notes = [];
                notes.push(result);
                var note = render('NoteList-item', {note: notes});
                var hasEmpty = view.$wrap.find('.note-empty').length;
                if (!hasEmpty) {
                    view.$wrap.prepend(note);
                } else {
                    view.$wrap.bEmpty();
                    view.$wrap.append(note);
                }
                var $noteList = view.$wrap.find('li');
                $noteList.removeClass('checked');
                $noteList.eq(0).addClass('checked');
                var count = view.$count.text()*1;
                view.$count.text(++count);
                view.$el.trigger('UPDATE_NOTE_CONTENT', {note: result});
            },
            "SET_NOTEBOOK_REF": function (e, data) {
                var view = this;
                data = data || {};
                var bookId = data.id;
                var noteId = view.$el.find('.list-wrap .checked').attr('data-id');
                var props = {
                    noteId: noteId,
                    bookId: bookId
                };
                app.doPost('/changeNoteRef', props);
            },
            "SET_NOTE_OVERVIEW": function (e, data) {
                var view = this;
                data= data || {};
                var $checkedItem = view.$el.find('.list-wrap .checked');
                $checkedItem.find('.overview').text(data.overview);
            },
            "UPDATE_NOTE_NAME": function (e, data) {
                var view = this;
                data= data || {};
                var $checkedItem = view.$el.find('.list-wrap .checked');
                var id = $checkedItem.attr('data-id');
                var name = data.name;
                var props = {
                    id: id,
                    name: name
                };

                app.doPost('/updateNoteName', props).done(function (result) {
                    if (result.success) {
                        $checkedItem.find('.title .textfix').text(name);
                    }
                });
            }
        }
	});

    function getSearchNoteList(id, search) {
        var view = this;
        var props = {
            uid: id,
            search: search
        }
        app.doPost('/getSearchNoteList', props).done(function (data) {
            var result = data.result;
            var i = result.length;
            var count = i;
            if (i == 0) {
                brite.display('Toast', 'body', {message: '搜索笔记名不存在!'})
            } else {
                while (i--) {
                    var cur = result[i];
                    cur.time = moment(cur.time).format('YYYY/MM/DD');
                }
                var notes = render('NoteList-item', {note: result});
                view.$count.text(count);
                view.$wrap.bEmpty();
                view.$wrap.append(notes);
                view.$wrap.find('li:first-child').addClass('checked');
                view.$el.trigger('DISPLAY_NOTEVIEW');
            }
        });
    }
})();