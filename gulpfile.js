var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var critical = require('critical');


gulp.task('critical', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: 'index.html',
        dest: 'dist/index.html',
        minify: true,
        width: 320,
        height: 480,
        ignore: ['@import']
    });
});


gulp.task('compress', function (cb) {
  pump([
        gulp.src('./js/*.js'),
        uglify(),
        gulp.dest('./dist/js')
    ],
    cb
  );
});

gulp.task('default', function() {
    return gulp.src(['./css/style.css','./css/print.css'])
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('img', function(){
    gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});
