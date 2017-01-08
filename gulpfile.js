var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require('gulp-htmlmin');
var notify = require("gulp-notify");

gulp.task('minifyTask', function() {
    return gulp.src("./source/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task("copyScssTask", function() {
    return gulp.src("./source/scss/*.scss")
        .pipe(sass({ outputStyle: 'compressed' }))
        .on('error', notify.onError({ title: 'Erro ao compilar', message: '<%= error.message %>' }))
        .pipe(gulp.dest("./dist/css"));
});

gulp.task('listenTask', function() {
    gulp.watch('./source/scss/**/*.scss', ['copyScssTask']);
    gulp.watch('./source/**/*.html', ['minifyTask']);
});

gulp.task('default', ['copyScssTask', 'listenTask', 'minifyTask']);