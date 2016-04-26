/**
 * Created by along on 16/1/26.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var jss = [
    'src/ja.core.js',
    'src/ja.event.js',
    'src/ja.is.js',
    'src/ja.cookie.js',
    'src/ja.platform.js',
    'src/ja.browser.js',
    'src/ja.format.js',
    'src/ja.util.js',
    'src/ja.string.js',
    'src/ja.template.js'
];


// 语法检查
gulp.task('jshint', function () {
  return gulp.src(jss)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});


// 合并文件之后压缩代码
gulp.task('minify', function (){
  return gulp.src(jss)
      .pipe(concat('ja.js'))
      .pipe(gulp.dest('dist'))
      .pipe(uglify())
      .pipe(rename('ja.min.js'))
      .pipe(gulp.dest('dist'));
});


// 监视文件的变化
gulp.task('watch', function () {
  gulp.watch(jss, ['jshint', 'minify']);
});

// 注册缺省任务
gulp.task('default', ['jshint','minify','watch']);