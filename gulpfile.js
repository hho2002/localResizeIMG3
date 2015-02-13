var gulp         = require('gulp');
var clean        = require('gulp-clean');
var uglify       = require('gulp-uglify');
var minifyCSS    = require('gulp-minify-css');
var minifyHTML   = require('gulp-minify-html');
var staticHash   = require('gulp-static-hash');
var runSequence  = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
    src : 'src',
    dist: 'dist'
};

var files = {
    js  : paths.src + "/**/*.js",
    css : paths.src + "/**/*.css",
    jpg : paths.src + "/**/*.jpg",
    png : paths.src + "/**/*.png",
    gif : paths.src + "/**/*.gif",
    eot : paths.src + "/**/*.eot",
    svg : paths.src + "/**/*.svg",
    ttf : paths.src + "/**/*.ttf",
    pdf : paths.src + "/**/*.pdf",
    otf : paths.src + "/**/*.otf",
    html: paths.src + "/**/*.html",
    woff: paths.src + "/**/*.woff"
};


// 发布任务
gulp.task('build', function () {
    runSequence('clean');
});


// 清洁工作
gulp.task('clean', function () {
    gulp.src(paths.dist)
        .pipe(clean({force: true}));
});