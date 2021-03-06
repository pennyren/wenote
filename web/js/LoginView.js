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
                var $swapWrapper = $(e.currentTarget).parent();
                var $confirm = view.$el.find(".form-group").eq(2);
                if ($btn.hasClass("signin")) {
                    setTimeout(function () {
                        $confirm.removeClass("hidden");
                        $btn.removeClass("signin").addClass("register");
                        $btn.text("注册");
                        $swapWrapper.html("已有账号? <span class='swap'>点击登录</span>");
                    }, 400);
                    view.$content.animate({height: view.heighter}, 400);
                } else {
                    setTimeout(function () {
                        $confirm.addClass("hidden");
                        $btn.removeClass("register").addClass("signin");
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
                if ($cur.hasClass('signin')) {
                    app.doPost('/signin', props).done(function(result) {
                        checkResult.call(view, result, true);
                    });
                } else {
                    app.doPost('/register', props).done(function(result){
                        checkResult.call(view, result, false);
                    });
                }
            }
        }
	});

    function checkResult(data, isSignin) {
        var view = this;
        if (data.success) {
            app.saveUserInfo(data);
            view.$el.bRemove();
            app.router.set('/u');
        } else {
            if (isSignin) {
                brite.display('Toast', 'body', {message: '用户名或密码错误'});
            } else {
                brite.display('Toast', 'body', {message: '用户名已存在'});
            }
        }
    }
})();