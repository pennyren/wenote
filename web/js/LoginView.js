(function() {
	brite.registerView("LoginView",{
		create: function() {
			return render("LoginView");
	    },
        postDisplay: function() {
      		var view = this;
            view.$content = view.$el.find(".content");
            view.height = 270;
            view.heighter = view.height + 66;
            view.$el.addClass('opacity');
            view.$content.addClass('scale');
        },
        events: {
        	"click; .close": function (e) {
                var view = this;
                view.$el.removeClass('opacity');
                setTimeout(function() {
                    view.$el.bRemove();
                }, 500);
            },
            "click; .swap": function (e) {
                var view = this;
                var $btn = view.$el.find(".btn");
                var $content
                var $swapWrapper = $(e.currentTarget).parent();
                var $confirm = view.$el.find(".form-group").eq(2);
                if ($btn.hasClass("singin")) {
                    setTimeout(function () {
                        $confirm.removeClass("hidden");
                        $btn.removeClass("singin").addClass("register");
                        $btn.text("注册");
                        $swapWrapper.html("已有账号? <span class='swap'>点击登录</span>");
                    }, 400);
                    view.$content.animate({height: view.heighter}, 400);
                } else {
                    setTimeout(function () {
                        $confirm.addClass("hidden");
                        $btn.removeClass("register").addClass("singin");
                        $btn.text("登录");
                        $swapWrapper.html("木有账号? <span class='swap'>点击注册</span>");
                    }, 400);
                     view.$content.animate({height: view.height}, 400);
                }
            },
            "click; .btn": function (e) {
                var view = this;
                var $cur = $(e.currentTarget);
                if (!app.validate(view.$content)) {
                    return;
                }
                var props = app.getPropsFromeInputs(view.$content);
                if ($cur.hasClass('singin')) {
                    app.doPost('/singin', props).done(function(result) {
                        console.log(result);
                        return;
                        setCookieAndGoNoteView(reulst);
                    });
                } else {
                    app.doPost('/register', props).done(function(result){
                        return;
                        setCookieAndGoNoteView(reulst);
                    });
                }
            }
        }
	});

    function setCookieAndGoNoteView(reulst) {
        app.cookie.set();
        view.$el.bRemove();
        app.router.set('/u/note');
    }

})();