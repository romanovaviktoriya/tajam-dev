module.exports = function() {
    $.gulp.task('favicon', ()=>  {
        return $.gulp.src('./dev/static/favicon/*.*')
            .pipe($.gulp.dest('./build/static/favicon/'));
    });
};