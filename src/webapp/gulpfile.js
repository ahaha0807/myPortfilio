var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webpack = require('webpack-stream');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var webpackConfig = require('./webpack.config.js');

gulp.task('clean', function () {
  return del.sync(['../../public/'], {force: true});
});

gulp.task('build', function () {
  gulp.src('./index.html')
  .pipe(gulp.dest('../../public/'))

  return gulp.src('./js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('../../public/'));
});

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(gulp.dest('../../public/css'));
});

gulp.task('js-minify', function () {
  return gulp.src('../../public/js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('../../public/min/js/'));
});

gulp.task('css-minify', function () {
  return gulp.src('../../public/css/*.css')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(concat('bundle.min.css'))
    .pipe(gulp.dest('../../public/min/css/'));
});

gulp.task('watch', function () {
  gulp.watch(['./js/*.js', './index.html'], ['build', 'sass']);
  gulp.watch(['./sass/*.scss', './index.html'], ['build', 'sass']);
});

gulp.task('default', ['clean', 'build', 'sass', 'watch']);
gulp.task('minify', ['js-minify', 'css-minify']);
gulp.task('production', ['clean', 'build', 'sass', 'minify']);