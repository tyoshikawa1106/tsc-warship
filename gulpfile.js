var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var runSequence = require('run-sequence');
var webpack = require('gulp-webpack');;
var webpackConfig = require('./webpack.config.js');

// Default
gulp.task('default', function(callback) {
  return runSequence(
    ['webpack', 'sass', 'slds-copy'],
    'js',
    'watch',
    callback
  );
});

// Sass Compile
gulp.task("sass", function() {
  gulp.src("./public/stylesheets/sass/**/*scss")
      .pipe(sass())
      .pipe(gulp.dest("./public/stylesheets/css"));
});

// JS Minify
gulp.task("js", function() {
  gulp.src(["./public/javascripts/**/*.js","!./public/javascripts/min/**/*.js"])
      .pipe(uglify())
      .pipe(gulp.dest("./public/javascripts/min"));
});

// SLDS Copy
gulp.task("slds-copy", function() {
  return gulp.src("./node_modules/@salesforce-ux/design-system/assets/**/*")
              .pipe(gulp.dest( './public/vendor/SLDS/assets/' ) );
});

// Webpack
gulp.task('webpack', function () {
    gulp.src(['./public/javascripts/**/*.ts'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public/javascripts/build'));
});

// Watch
gulp.task('watch', function () {
  gulp.watch('./public/javascripts/**/*.ts', ['webpack']);
  gulp.watch(["./public/javascripts/**/*.js","!./public/javascripts/min/**/*.js"],["js"]);
  gulp.watch("./public/stylesheets/sass/**/*.scss",["sass"]);
});