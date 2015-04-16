var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'www',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./www/**/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./www/css/*.css')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./www/*.html', './www/templates/*.html'], ['html']);
  gulp.watch(['./www/css/*.css'], ['css']);
});

gulp.task('default', ['connect', 'watch']);
