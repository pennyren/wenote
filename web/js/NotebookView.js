(function() {
    brite.registerView("NotebookView",{
        create: function() {
            return render("NotebookView");
        },
        postDisplay: function() {
            var view = this;
            view.$noteBooks = view.$el.find('.notebook-wrap');
            view.$noteBooks.bEmpty();
            app.doGet('/getNotebookList').done(function (data) {
                var reuslt = data.result;
                console.log(reuslt);
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
                app.doPost('/deleteNotebook', {id: id}).done(function (data) {
                    if (data.success) {
                        $item.bRemove();
                    }
                });
            },
            "click; .item": function (e) {

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