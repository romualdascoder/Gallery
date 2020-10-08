const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const reload = browserSync.reload;
const rename = require("gulp-rename");

function style() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(gulp.dest('./css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest('./css'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./*.html').on('change', reload);
    gulp.watch('js/*.js').on('change', reload);

}

exports.style = style;
exports.watch = watch;
