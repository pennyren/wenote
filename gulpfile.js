var gulp = require('gulp');
var less = require('gulp-less');
var hbsp = require('hbsp');
var concat = require('gulp-concat');
var del = require('del');
var fs = require('fs');
var path = require('path');

var hbsPrecompile = hbsp.precompile;

var publicDir = 'public';
var webappDir = 'webapp';
var cssDir = path.join(webappDir, '/css/');
var commonCssDir = path.join(webappDir, '/_common/css/');

gulp.task('default', ['clean', 'css-common', 'css', 'js-common', 'js']);

gulp.task('watch', ['default'], function () {
	gulp.watch(path.join(webappDir, '/tmpl/', '*.tmpl'), ['js']);
	gulp.watch(path.join(webappDir, '/_common/tmpl/', '*.tmpl'), ['js-common']);

	gulp.watch(path.join(webappDir, '/less/', '*.less'), ['css']);
	gulp.watch(path.join(webappDir, '/_common/less/', '*.less'), ['css-common']);
});

gulp.task('clean', function () {
	var dirs = [cssDir, commonCssDir];
	var dir;
	for (var i = 0; i < dirs.length ; i ++) {
		dir = dirs[i];
       	if (!fs.existsSync(dir)) {
			fs.mkdir(dir);
		}
        del.sync(dir + '*.css');
	}
});

gulp.task("less", function () {
	var stream = gulp.src(path.join(webappDir, '/less/', '*.less'))
        .pipe(less())
        .pipe(gulp.dest(cssDir));
    return stream;
});

gulp.task('less-common', function() {
    var stream = gulp.src(path.join(webappDir,'/_common/less/', '*.less'))
        .pipe(less())
        .pipe(gulp.dest(commonCssDir));
    return stream;
});

gulp.task('hbs', function () {
	var stream = gulp.src(path.join(webappDir,'/tmpl/', '*.tmpl'))
        .pipe(hbsPrecompile())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.join(webappDir, '/js/')));
    return stream;
});

gulp.task('hbs-common', function() {
    var stream = gulp.src(path.join(webappDir, '/_common/tmpl/', '*.tmpl'))
        .pipe(hbsPrecompile())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.join(webappDir, '/_common/js/')));
    return stream;
});

gulp.task('css', ['less'], function () {
	gulp.src(path.join(webappDir, '/css/', '*.css'))
		.pipe(concat('app.css'))
		.pipe(gulp.dest(publicDir));
});

gulp.task('css-common', ['less-common'], function () {
	gulp.src(path.join(webappDir, '/_common/css/', '*.css'))
		.pipe(concat('build.css'))
		.pipe(gulp.dest(path.join(publicDir, '/_common/')));
});

gulp.task('js', ['hbs'], function () {
	gulp.src(path.join(webappDir, '/js/', '*.js'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(publicDir));
});

gulp.task('js-common', ['hbs-common'], function () {
	gulp.src(path.join(webappDir, '/_common/js/', '*.js'))
		.pipe(concat('build.js'))
		.pipe(gulp.dest(path.join(publicDir, '/_common/')));
});


