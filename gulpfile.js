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
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    ffmpeg = require('gulp-fluent-ffmpeg'),
    del = require('del');

// var run = require('gulp-run');
// var cmd = new run.Command('audio');

gulp.task('default', function() {
    gulp.start('scriptsMin', 'img', 'styles', 'connect', 'index', 'scripts','audio');
    
});


// gulp.task('simple', function () {
//   gulp.src('./index.html')
//     .pipe(connect.reload());
// });


gulp.task('styles', function() {
  return gulp.src('src/styles/*.css')
    .pipe(sourcemaps.init())
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dest/styles/css/'));
});

// gulp.task('audio', function () {
//   // transcode ogg files to mp3
//   return gulp.src('src/media/audio/*.ogg')
//     .pipe(ffmpeg('ogg', function (cmd) {
//       return cmd
//         .audioBitrate('128k')
//         .audioChannels(2)
//         .audioCodec('libmp3lame')
//     }))
//     .pipe(gulp.dest('dest/media/audio/'));
// });

gulp.task('audio', function () {
  // transcode ogg files to mp3
  gulp.src(['src/media/audio/*.ogg'])
    .pipe(gulp.dest('dest/media/audio/'))
});

gulp.task('scriptsMin', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('main.js'))
  .pipe(gulp.dest('dest/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest/scripts/'));
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest/scripts/'));
});

gulp.task('img', function() {
  return gulp.src('src/media/img/*.png')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dest/media/img/'));
});

gulp.task('index', function() {
  gulp.src(['src/index.html'])
    .pipe(gulp.dest('dest/'))
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

  // Watch any files in dest/, reload on change
  gulp.watch(['dest/**']).on('change', livereload.changed);

});

//clean
gulp.task('clean', function(cb) {
    del(['dest/'], cb)
});

gulp.task('connect', function() {
  connect.server({
    port: 8888,
    root: 'dest',
    livereload: true
  });
});

 