var gulp = require('gulp');
var react = require('gulp-react');
var jshint = require('gulp-jshint');

// add more entries to this array to watch more files
var files = ['js/*.jsx']

// task to compile the jsx files
gulp.task('jsx', function () {
  return gulp.src(files)
    .pipe(react())
    // on errors, output error message
    .on('error', function(err) {
      console.error('JSX ERROR in ' + err.fileName);
      console.error(err.message);
      this.end();
    })
    // pass the compiled .js file through jshint
    .pipe(jshint())
    // output the compiled file to the `dist` folder
    .pipe(gulp.dest('dist'));
});

// default tusk, run by `gulp`
gulp.task('default', function(){
  // run the jsx task when first, even if the file is not changed
  gulp.start('jsx');
  console.log('Watching');
  gulp.watch(files, ['jsx']);
});
