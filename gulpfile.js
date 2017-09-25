var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
const babel = require('gulp-babel');
// 
var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
//
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src('./app/js/lib/*.js')
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./app/js'));
});

// gulp.task('build', function () {
//    // app.js is your main JS file with all your module inclusions
//    return browserify({entries: './app/js/app.js', debug: true})
//        .transform("babelify", { presets: ["es2015"] })
//        .bundle()
//        .pipe(source('app.js'))
//        .pipe(buffer())
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(sourcemaps.write('./maps'))
//        .pipe(gulp.dest('./dist/js'))
//        .pipe(livereload());
// });

// gulp.task('watch', ['build'], function () {
//    livereload.listen();
//    gulp.watch('./app/js/*.js', ['build']);
// });

// To ES5

gulp.task('babel', () =>
gulp.src('app/js/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest('app/js/main'))
);

// gulp.task('default', ['scripts', 'babel']);

gulp.task('default', function(callback) {
  runSequence('build', 'browserSync', 'watch', callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    'scripts',
    'babel',
    ['useref', 'images', 'fonts'],
    callback
  )
})



// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Zell!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})




// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('app/*.js', uglify()))
    .pipe(gulpIf('app/*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

// gulp.task('default', function(callback) {
//   runSequence(['sass', 'browserSync'], 'watch',
//     callback
//   )
// })

// gulp.task('build', function(callback) {
//   runSequence(
//     'clean:dist',
//     'sass',
//     ['useref', 'images', 'fonts'],
//     callback
//   )
// })
