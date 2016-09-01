
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    del = require('del'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),

    connect = require('gulp-connect'),

    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer');

var config = {
    style: {
        src: "./src/scss/",
        globs: "m-date-picker.scss",
        dist: "./dist/css",
        distName: "m-date-picker.css",
        autoprefixer: {
            browsers: ['last 2 version']
        }
    }
};
var style = config.style;

gulp.task('connect', function() {
    connect.server({
        port: 3000,
        root: '../',
        livereload: true
    });
});

//清理dist文件夹
gulp.task('clean', function(cb) {
    return del([style.dist], cb);
});

//编译并合并压缩sass文件成style.css 、style.min.css 和 style.min.css.map 文件

gulp.task('build:css', function() {
    return gulp.src(style.src + style.globs)
        .pipe(sourcemaps.init())
        .pipe(concat(style.distName))
        .pipe(sass({
            styleWap: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer(style.autoprefixer))
        .pipe(gulp.dest(style.dist))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: style.src
        }))
        .pipe(gulp.dest(style.dist))
        .pipe(notify({
            message: 'style task complete'
        }));
});

gulp.task('watch:css', ['connect'], function() {
    gulp.watch(style.src + "m-date-picker.scss", ['build:css']);
});
