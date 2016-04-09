(function() {
    brite.registerView("NotebookView",{
        create: function() {
            return render("NotebookView");
        },
        postDisplay: function() {
            var view = this;
            setTimeout(function () {
                view.$el.find(".bkg").addClass("set-opacity");
                view.$el.find(".slide").addClass("slide-done");
            }, 100);
        },
        events: {
            "click; .plus": function (e) {
                var view = this;
                brite.display("CreateView", "body", {note: false});
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
            }
        }
    });
})();