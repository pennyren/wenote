var gulp = require('gulp');
var less = require('gulp-less');
var hbsp = require('hbsp');
var concat = require('gulp-concat');
var del = require('del');
var fs = require('fs');
var path = require('path');

var hbsPrecompile = hbsp.precompile;

var assetsDir = 'src/assets';
var webappDir = 'src/webapp';
var cssDir = path.join(webappDir, '/css/');
var commonCssDir = path.join(webappDir, '/_common/css/');

gulp.task('default', ['clean', 'less-common', 'less', 'hbs-common', 'hbs', 'js-common', 'js', 'css-common', 'css']);

gulp.task('watch', ['default'], function () {
	gulp.watch(path.join(webappDir, '/tmpl/', '*.tmpl'), ['hbs', 'js']);
	gulp.watch(path.join(webappDir, '/_common/tmpl/', '*.tmpl'), ['hbs-common', 'js-common']);

	gulp.watch(path.join(webappDir, '/less/', '*.less'), ['less', 'css']);
	gulp.watch(path.join(webappDir, '/_common/less/', '*.less'), ['less-common', 'css-common']);
});

gulp.task('clean', function () {
	var dirs = [cssDir, commonCssDir];
	var dir;
	for (var i = 0; i < dirs.length ; i ++) {
		dir = dirs[i];
        // make sure the directories exists
		if (!fs.existsSync(dir)) {
			fs.mkdir(dir);
		}
        // delete the .css files
		del.sync(dir + '*.css');
	}
});

gulp.task("less", function () {
	gulp.src(path.join(webappDir, '/less/', '*.less'))
        .pipe(less())
        .pipe(gulp.dest(cssDir));
});

gulp.task('less-common', function() {
    gulp.src(path.join(webappDir,'/_common/less/', '*.less'))
        .pipe(less())
        .pipe(gulp.dest(commonCssDir));
});

gulp.task('hbs', function () {
	gulp.src(path.join(webappDir,'/tmpl/', '*.tmpl'))
        .pipe(hbsPrecompile())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.join(webappDir, '/js/')));
});

gulp.task('hbs-common', function() {
    gulp.src(path.join(webappDir, '/_common/tmpl/', '*.tmpl'))
        .pipe(hbsPrecompile())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(path.join(webappDir, '/_common/js/')));
});

gulp.task('js', function () {
	gulp.src(path.join(webappDir, '/js/', '*.js'))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(assetsDir));
});

gulp.task('js-common', function () {
	gulp.src(path.join(webappDir, '/_common/js/', '*.js'))
		.pipe(concat('build.js'))
		.pipe(gulp.dest(path.join(assetsDir, '/_common/')));
});

gulp.task('css', function () {
	gulp.src(path.join(webappDir, '/css/', '*.css'))
		.pipe(concat('app.css'))
		.pipe(gulp.dest(assetsDir));
});

gulp.task('css-common', function () {
	gulp.src(path.join(webappDir, '/_common/css/', '*.css'))
		.pipe(concat('build.css'))
		.pipe(gulp.dest(path.join(assetsDir, '/_common/')));
});
