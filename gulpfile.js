global.$ = {
    path: {
        task: require('./gulp/paths/tasks.js')
    },
    gulp: require('gulp'),
    del: require('del'),
    fs: require('fs'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')(),
    scss: require('gulp-sass'),
    rename: require('gulp-rename'),
    webp: require('gulp-webp'),
    realFavicon: require ('gulp-real-favicon'),
    spritesmith: require('gulp.spritesmith'),
    merge: require('merge-stream')
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('dev', $.gulp.series(
    'clean',
    $.gulp.parallel('favicon', 'styles:dev', 'pug', 'js:copy', 'libs:dev', 'svg', 'img:dev', 'webp', 'fonts','svg:copy', 'sprite')/*,
    'generate-favicon',
    'inject-favicon-markups'*/
    ));

$.gulp.task('build', $.gulp.series(
    'clean',
    $.gulp.parallel('favicon', 'styles:build', 'pug', 'js:copy', 'libs:build', 'svg', 'img:build', 'webp', 'fonts','svg:copy', 'sprite')/*,
    'generate-favicon',
    'inject-favicon-markups'*/
    ));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));