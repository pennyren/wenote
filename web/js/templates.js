Handlebars.templates['AccountView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"AccountView\">\r\n		<div class=\"user-info\">\r\n			<div class=\"img-wrap\">\r\n				<img src=\"images/user.jpg\">\r\n				<div class=\"profile tip\" data-tip=\"换一张照片\"></div>\r\n			</div>\r\n			<div class=\"user-name\">Hyacinty</div>\r\n		</div>\r\n		<ul class=\"user-state\">\r\n			<li><span class=\"mdi mdi-information\"></span>使用指南</li>\r\n			<li><span class=\"mdi mdi-exit\"></span>退出登录</li>\r\n		</ul>\r\n	</div>";
},"useData":true});


Handlebars.templates['AsideView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"AsideView\">\r\n		<div class=\"logo\"><img src=\"images/icon.jpg\"></div>\r\n		<ul class=\"operate\">\r\n			<li class=\"tip add-note\" data-tip=\"新建笔记\"><span class=\"mdi mdi-plus\"></span></li>\r\n			<li class=\"tip search\" data-tip=\"搜索\"><span class=\"mdi mdi-magnify\"></span></li>\r\n		</ul>\r\n		<ul class=\"content\">\r\n			<li class=\"tip shortcut\" data-tip=\"快捷方式\"><span class=\"mdi mdi-star\"></span></li>\r\n			<li class=\"tip note\" data-tip=\"笔记\"><span class=\"mdi mdi-file-document\"></span></li>\r\n			<li class=\"tip notebook\" data-tip=\"笔记本\"><span class=\"mdi mdi-library-books\"></span></li>\r\n		</ul>\r\n		<div class=\"account\">\r\n			<div class=\"account-wrap tip\" data-tip=\"账户\">\r\n				<img src=\"images/user.jpg\" >\r\n			</div>\r\n		</div>\r\n	</div>";
},"useData":true});


Handlebars.templates['CreateView']  = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "note";
},"3":function(container,depth0,helpers,partials,data) {
    return "mdi-file-document";
},"5":function(container,depth0,helpers,partials,data) {
    return "mdi-library-books";
},"7":function(container,depth0,helpers,partials,data) {
    return "创建笔记";
},"9":function(container,depth0,helpers,partials,data) {
    return "创建笔记本";
},"11":function(container,depth0,helpers,partials,data) {
    return "笔记名";
},"13":function(container,depth0,helpers,partials,data) {
    return "笔记本名称";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<div class=\"CreateView "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.note : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n		<div class=\"wrap\">\r\n			<header>\r\n				<div class=\"icon\"><span class=\"mdi "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.note : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></span></div>\r\n				<div class=\"text\"><span>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.note : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</span></div>\r\n			</header>\r\n			<input placeholder=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.note : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "\"></input>\r\n			<div class=\"btn-wrap clearfix\">\r\n				<button class=\"btn btn-cancel\">取消</button>\r\n				<button class=\"btn btn-confirm\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.note : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</button>\r\n			</div>\r\n		</div>\r\n	</div>";
},"useData":true});


Handlebars.templates['IntroduceView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"IntroduceView popup\">\r\n		<div class=\"content\">\r\n			<h1>笔记·初心<span class=\"mdi mdi-close-circle close\"></span></h1>\r\n			<ul class=\"concept clearfix\">\r\n				<li class=\"part\">\r\n					<h3>笔记的意义</h3>\r\n					<p>除了记录生活，写笔记让作者变得平静、幸福、以及更优秀，结交到性情相近的朋友，见证着自己的成长，甚至让薪资涨幅超过不写笔记的一些人。</p>\r\n				</li>\r\n				<li class=\"part\">\r\n					<h3>难在『坚持』</h3>\r\n					<p>也许折腾着搭建、模板，忘记了最重要的是“写点什么”；也许是心血来潮，最后提笔忘词；也许工作太忙碌，忘了让自己停下来。</p>\r\n				</li>\r\n				<li class=\"part\">\r\n					<h3>『简单』才持久</h3>\r\n					<p>wenote让一切简单，打开editor，就可以写了；让你轻松自在的使用markdown来记录学习和生活的点滴。无需繁杂的操作，更专注文字本身。</p>\r\n				</li>\r\n			</ul>\r\n		</div>\r\n	</div>";
},"useData":true});


Handlebars.templates['LoginView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"LoginView popup\">\r\n		<div class=\"content\">\r\n			<span class=\"mdi mdi-close-circle close\"></span>\r\n			<div class=\"form-group\">\r\n				<label>用户名</label>\r\n				<input type=\"text\" name=\"username\"></input>\r\n			</div>\r\n			<div class=\"form-group\">\r\n				<label>密码</label>\r\n				<input type=\"password\" name=\"password\"></input>\r\n			</div>\r\n			<div class=\"form-group hidden\">\r\n				<label>确认密码</label>\r\n				<input type=\"password\" name=\"confirm\"></input>\r\n			</div>\r\n			<button class=\"btn login\">登录</button>\r\n			<div class=\"swap-wrapper\">木有账号? <span class=\"swap\">点击注册</span></div>\r\n		</div>\r\n	</div>";
},"useData":true});


Handlebars.templates['MainScreen']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"MainScreen\"></div>";
},"useData":true});


Handlebars.templates['MainView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"MainView\">\r\n		<header>\r\n			<div class=\"nav\">\r\n				<a class=\"logo\" href=\"#\"><img src=\"images/icon.jpg\"></a>\r\n				<ul class=\"title\">\r\n					<li class=\"item-main\"><a href=\"#\">首页</a></li>\r\n					<li class=\"item-about\"><a href=\"#\">关于</a></li>\r\n				</ul>\r\n				<div class=\"login\">\r\n					<span><i class=\"mdi mdi-account\"></i>登录<span>\r\n				</div>\r\n			</div>\r\n		</header>\r\n\r\n		<section class=\"main\">\r\n			<div class=\"description\">\r\n				<h1>The Best <b>Note Platform</b> with Markdown</h1>\r\n			</div>\r\n			<div class=\"pen\">\r\n				<img src=\"images/pen.png\">\r\n			</div>\r\n			<div class=\"introduce\">\r\n				<a href=\"#\" data-tip=\"写笔记，wenote是个不错的选择?\" class=\"tip\">\r\n					<i class=\"mdi mdi-heart-outline\"></i>\r\n					<span>为何wenote</span>\r\n				</a>\r\n			</div>\r\n		</section>\r\n\r\n		<section class=\"about hidden\">\r\n			<ul>\r\n				<li>追求极简是我们的宗旨。wenote让一切都变得那么简单。</li>\r\n				<li>在前端我们用brite.js来管理组件，handelbars.js作为模板引擎，组件化是web开发的趋势。SPA页面让用户体验更佳。</li>\r\n				<li>后台使用高性能的node.js作为支撑，数据库使用mangodb。wenote让一切变得那么快速。</li>\r\n				<li>使用markdown记录身边点滴，wenote让一切都变得那么轻松。</li>\r\n				<li>那么让我们开始愉快写作之旅吧~</li>\r\n			</ul>\r\n		</section>\r\n		\r\n		<footer>\r\n			Simple is Everything.\r\n			<span>PennyRen</span>\r\n			<span>©2016 All Rights Reserved.</span>\r\n		</footer>\r\n	</div>";
},"useData":true});


Handlebars.templates['NotebookView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"NotebookView\">\r\n		<aside class=\"slide\">\r\n			<div class=\"header\">\r\n				<h1 class=\"title\">笔记本<div class=\"plus tip\" data-tip=\"创建笔记本\"><span class=\"mdi mdi-library-plus\"></span></div></h1>\r\n				<div class=\"form-group\">\r\n					<input type=\"text\"></input>\r\n					<div class=\"search\"><span class=\"mdi mdi-magnify\"></span>查找笔记本</div>\r\n				</div>\r\n			</div>\r\n			\r\n			<ul class=\"notebook-wrap\">\r\n				<li class=\"item\">\r\n					<div class=\"book\">\r\n						<div class=\"book-name\">Android</div>\r\n						<div class=\"count\"><span>3</span>条笔记</div>\r\n					</div>\r\n					<div class=\"icon-wrap tip\" data-tip=\"删除笔记本\"><span class=\"mdi mdi-delete\"></span></div>\r\n					<div class=\"icon-wrap tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n\r\n				</li>\r\n				<li class=\"item\">\r\n					<div class=\"book\">\r\n						<div class=\"book-name\">Android</div>\r\n						<div class=\"count\"><span>3</span>条笔记</div>\r\n					</div>\r\n					<div class=\"icon-wrap tip\" data-tip=\"删除笔记本\"><span class=\"mdi mdi-delete\"></span></div>\r\n					<div class=\"icon-wrap tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n				</li>\r\n				\r\n			</ul>\r\n		</aside>\r\n		<div class=\"bkg\"></div>\r\n	</div>";
},"useData":true});


Handlebars.templates['NoteList']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"NoteList\">\r\n		<header>\r\n			<div class=\"search-ctx hidden\">\r\n				<input type=\"text\" placeholder=\"搜索笔记\"></input>\r\n				<span class=\"mdi mdi-close-circle delete hidden\"></span>\r\n			</div>\r\n			<h2 class=\"title\">笔记</h2>\r\n			<div class=\"count\"><span>6</span>条笔记</div>\r\n		</header>\r\n		<section>\r\n			<ul class=\"list-wrap\">\r\n				<li class=\"item checked\">\r\n					<div class=\"title clearfix\">\r\n						<h3 class=\"textfix\">javascript基本概念</h3>\r\n						<div class=\"setting\">\r\n							<div class=\"tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n							<div class=\"tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n							\r\n						</div>\r\n					</div>\r\n					<div class=\"time\">15/9/17</div>\r\n					<p class=\"overview multiline\">ECMA-262通过叫ECMAScript的“伪语言”来描述了JavaScript的所有基本概念及最基本的工作原理。描述的内容涉及这门语言的语法</p>\r\n				</li>\r\n				<li class=\"item\">\r\n					<div class=\"title clearfix\">\r\n						<h3 class=\"textfix\">javascript基本概念</h3>\r\n						<div class=\"setting\">\r\n							<div class=\"tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n							<div class=\"tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n							\r\n						</div>\r\n					</div>\r\n					<div class=\"time\">15/9/17</div>\r\n					<p class=\"overview multiline\">ECMA-262通过叫ECMAScript的“伪语言”来描述了JavaScript的所有基本概念及最基本的工作原理。描述的内容涉及这门语言的语法</p>\r\n				</li>\r\n				<li class=\"item\">\r\n					<div class=\"title clearfix\">\r\n						<h3 class=\"textfix\">javascript基本概念</h3>\r\n						<div class=\"setting\">\r\n							<div class=\"tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n							<div class=\"tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n							\r\n						</div>\r\n					</div>\r\n					<div class=\"time\">15/9/17</div>\r\n					<p class=\"overview\">ECMA-262通过叫ECMAScript的“伪语言”来描述了JavaScript的所有基本概念及最基本的工作原理。描述的内容涉及这门语言的语法</p>\r\n				</li>\r\n				<li class=\"item\">\r\n					<div class=\"title clearfix\">\r\n						<h3 class=\"textfix\">javascript基本概念</h3>\r\n						<div class=\"setting\">\r\n							<div class=\"tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n							<div class=\"tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n							\r\n						</div>\r\n					</div>\r\n					<div class=\"time\">15/9/17</div>\r\n					<p class=\"overview\">ECMA-262通过叫ECMAScript的“伪语言”来描述了JavaScript的所有基本概念及最基本的工作原理。描述的内容涉及这门语言的语法</p>\r\n				</li>\r\n				<li class=\"item\">\r\n					<div class=\"title clearfix\">\r\n						<h3 class=\"textfix\">javascript基本概念</h3>\r\n						<div class=\"setting\">\r\n							<div class=\"tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n							<div class=\"tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n							\r\n						</div>\r\n					</div>\r\n					<div class=\"time\">15/9/17</div>\r\n					<p class=\"overview\">ECMA-262通过叫ECMAScript的“伪语言”来描述了JavaScript的所有基本概念及最基本的工作原理。描述的内容涉及这门语言的语法</p>\r\n				</li>\r\n			</ul>\r\n		</section>\r\n	</div>";
},"useData":true});

Handlebars.templates['NoteList-item']  = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<li class=\"item\">\r\n		<div class=\"title clearfix\">\r\n			<h3 class=\"textfix\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\r\n			<div class=\"setting\">\r\n				<div class=\"tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n				<div class=\"tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n				\r\n			</div>\r\n		</div>\r\n		<div class=\"time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</div>\r\n		<p class=\"overview\">"
    + alias4(((helper = (helper = helpers.overview || (depth0 != null ? depth0.overview : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"overview","hash":{},"data":data}) : helper)))
    + "</p>\r\n	</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.note : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});


Handlebars.templates['NoteView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"NoteView\">\r\n		<section class=\"sidebar\"></section>\r\n		<section class=\"list\"></section>\r\n		<section class=\"write\"></section>\r\n	</div>";
},"useData":true});


Handlebars.templates['ShortcutView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ShortcutView\">\r\n		<aside class=\"slide\">\r\n			<h1 class=\"title\">快捷方式</h1>\r\n			<ul class=\"shortcut-wrap\">\r\n				<li class=\"item\">\r\n					<span class=\"mdi mdi-file-document\"></span>javascript基本概念\r\n					<div class=\"delete tip\" data-tip=\"删除快捷方式\"><span class=\"mdi mdi-minus-outline\"></span></div>\r\n				</li>\r\n				<li class=\"item\">\r\n					<span class=\"mdi mdi-library-books\"></span>android\r\n					<div class=\"delete tip\" data-tip=\"删除快捷方式\"><span class=\"mdi mdi-minus-outline\"></span></div>\r\n				</li>\r\n				\r\n			</ul>\r\n		</aside>\r\n		<div class=\"bkg\"></div>\r\n	</div>";
},"useData":true});

Handlebars.templates['ShortcutView-item']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<li class=\"item\">javascript基本概念</li>";
},"useData":true});


Handlebars.templates['WriteView']  = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"WriteView\">\r\n		<header>\r\n			<div class=\"operate-wrap clearfix\">\r\n				<div class=\"handle\">\r\n					<div class=\"operate tip\" data-tip=\"添加快捷方式\"><span class=\"mdi mdi-star\"></span></div>\r\n					<div class=\"operate tip\" data-tip=\"删除笔记\"><span class=\"mdi mdi-delete\"></span></div>\r\n				</div>\r\n				<div class=\"expand\">\r\n					<div class=\"wrap\">\r\n						<span class=\"mdi mdi-arrow-bottom-left\"></span>\r\n						<span class=\"mdi mdi-arrow-top-right\"></span>\r\n					</div>\r\n					<span class=\"done\">完成</span>\r\n				</div>\r\n			</div>\r\n			<div class=\"select-wrap clearfix\">\r\n				<div class=\"select-book tip\" data-tip=\"移动笔记\">\r\n					<span class=\"mdi mdi-library-books move-book\"></span>\r\n					<span class=\"book-name\">name</span>\r\n					<span class=\"mdi mdi-chevron-down chevron\"></span>\r\n				</div>\r\n				<div class=\"book-wrap hidden\">\r\n						<header class=\"form-group\">\r\n							<input type=\"text\"></input>\r\n							<div class=\"search\"><span class=\"mdi mdi-magnify\"></span>查找笔记本</div>\r\n						</header>\r\n						<ul>\r\n							<li>\r\n								<div class=\"plus\">\r\n									<span class=\"mdi mdi-library-plus\"></span>\r\n									<span>创建新笔记本</span>\r\n								</div>\r\n							</li>\r\n							<li><div>Android</div></li>\r\n							<li><div>CSS</div></li>\r\n						</ul>\r\n					</div>\r\n			</div>\r\n			\r\n		</header>\r\n		<section class=\"editor\">\r\n			<textarea></textarea>\r\n  			<div class=\"generate\" id=\"preview\"></div>\r\n		</section>\r\n	</div>";
},"useData":true});

