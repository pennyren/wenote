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
            }
        }
	});
})();