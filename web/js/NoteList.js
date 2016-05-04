(function() {
	brite.registerView("NoteList",{
		create: function() {
            var result = null;
            app.doPost('/getNoteCount', {uid: app.getUserId()}).done(function (data) {
                result = data.result;
            });
            return render("NoteList", result);
		},
        postDisplay: function() {
      		var view = this;
            view.$title = view.$el.find('header .title');
            view.$searchCtx = view.$el.find('.search-ctx');
            view.$delete = view.$el.find('.search-ctx .delete');
            view.$input = view.$el.find('.search-ctx input');
            
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