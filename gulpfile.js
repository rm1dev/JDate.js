var gulp = require('gulp');
var uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('build', function() {
  return gulp.src('dist/date.extensions.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/'));
});

exports.default = function() {
  // All events will be watched
  gulp.watch('dist/date.extensions.js', { events: 'all' }, gulp.series('build'));
};