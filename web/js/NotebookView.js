(function() {
    brite.registerView("NotebookView",{
        create: function() {
            return render("NotebookView");
        },
        postDisplay: function() {
            var view = this;
            view.$noteBooks = view.$el.find('.notebook-wrap');
            view.$input = view.$el.find('.form-group input');
            view.$search = view.$el.find('.search');
            view.$noteBooks.bEmpty();
            app.doGet('/getNotebookList').done(function (data) {
                var reuslt = data.result;
                var books = render('NotebookView-book', {book: reuslt});
                view.$noteBooks.append(books);
                setTimeout(function () {
                    view.$el.find(".bkg").addClass("set-opacity");
                    view.$el.find(".slide").addClass("slide-done");
                }, 100);
            });
        },
        events: {
            "click; .plus": function (e) {
                var view = this;
                brite.display("CreateView", "body", {note: false, aside: true});
            },
            "click; .item .mdi-delete": function (e) {
                var $item = $(e.currentTarget).closest('.item');
                var id = $item.attr('data-id');
                var star = !!$item.attr('data-star');
                var props = {
                    id: id,
                    star: star
                };
                console.log(props);
                app.doPost('/deleteNotebook', props).done(function (data) {
                    if (data.success) {
                        $item.bRemove();
                    }
                });
            },
            "click; .item .mdi-star": function (e) {
                var view = this;
                var $cur = $(e.currentTarget);
                var $item = $cur.closest('.item');
                var id = $item.attr('data-id');
                var name = $item.find('.book-name').text();
                var props = {
                    refId: id,
                    starName: name,
                    isNote: false
                };
                app.doPost('/createStar', props).done(function (data) {
                    if (data.success) {
                        $cur.addClass('star');
                    }
                });
            },
            "click; .search": function (e) {
                var view = this;
                view.$input.focus();
            },
            "input; .form-group input": function (e) {
                var view = this;
                var content = $(e.currentTarget).val();
                if (content.length != 0) {
                    view.$search.hide();
                } else {
                    view.$search.show();
                }
            }
        },
        docEvents: {
            "REMOVE_NOTEBOOK_VIEW": function (e) {
                var view = this;
                view.$el.find(".slide").removeClass("slide-done");
                view.$el.find(".bkg").removeClass("set-opacity");
                setTimeout(function () {
                    view.$el.bRemove();
                }, 300);
            },
            "ASIDE_NOTEBOOK_UPDATE": function (e, data) {
                var view = this;
                var result = data.notebook || {};
                var notebooks = [];
                notebooks.push(result);
                var notebook = render('NotebookView-book', {book: notebooks});
                view.$noteBooks.prepend(notebook);
            }
        }
    });
})();