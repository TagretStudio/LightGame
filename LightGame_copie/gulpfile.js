var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');

gulp.task('default', function() {
    gulp.start('scripts', 'img', 'styles');
});

gulp.task('styles', function() {
  return gulp.src('src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('source/styles/css/'));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
	.pipe(gulp.dest('source/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('source/scripts/'));
});

gulp.task('img', function() {
  return gulp.src('src/media/img/*.png')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('source/media/img/'));
});

//automaticrefresh of the page on file change
gulp.task('watch', function() {

// Watch .scss files
  gulp.watch('src/styles/*.css', ['styles']);
 
  // Watch .js files
  gulp.watch('src/scripts/*.js', ['scripts']);
 
  // Watch image files
  gulp.watch('src/media/img/*', ['img'])

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['source/**']).on('change', livereload.changed);

});

//clean
gulp.task('clean', function(cb) {
    del(['source/styles/', 'source/scripts/js', 'source/media/img'], cb)
});