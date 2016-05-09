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
                app.doPost('/getNoteList', {uid: view.uid}).done(function (data) {
                    var result = data.result;
                    var i = result.length;
                    while (i--) {
                        var cur = result[i];
                        cur.time = moment(cur.time).format('YYYY/MM/DD');
                    }
                    var notes = render('NoteList-item', {note: result});
                    view.$wrap.append(notes);
                    view.$wrap.find('li:first-child').addClass('checked');
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
                app.doPost('/deleteNote', {id: id}).done(function (data) {
                    if (data.success) {
                        $note.bRemove();
                        var count = view.$count.text()*1;
                        view.$count.text(--count);
                        if (count == 0) {
                            view.$wrap.append(render('NodeList-empty'));
                        }
                        return;
                        if (isChecked) {
                            var $items = view.$wrap.find('.item');
                            if ($items.length == 0) {
                                view.$el.trigger('CLEAR_NOTE_CONTENT');
                            } else {
                                view.$el.trigger('GET_NOTE_CONTENT', {id: $items.eq(0).attr('data-id')});
                            }
                        }
                    }
                });
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
            "GET_CHECKED_NOTE": function (e) {
                var view = this;
                var $checkedItem = view.$el.find('.list-wrap .checked');
                var id = $checkedItem.attr('data-id');
                view.$el.trigger('GET_NOTE_CONTENT', {id: id});
            },
            "RENDER_CREATE_NOTE": function (e, data) {
                var view = this;
                var data = data || {};
                var notes = [];
                notes.push(data.note);
                var note = render('NoteList-item', {note: notes});
                var $emptyNotes = view.$wrap.find('.note-empty');
                if ($emptyNotes.length == 0) {
                    view.$wrap.prepend(note);
                } else {
                    view.$wrap.bEmpty();
                    view.$wrap.append(note);
                }
                var $noteList = view.$wrap.find('li');
                var count = view.$count.text()*1;
                $noteList.removeClass('checked');
                $noteList.eq(0).addClass('checked');
                view.$count.text(++count);
                view.$el.trigger('UPDATE_NOTE_CONTENT', {note: data.note});
            }
        }
	});
})();