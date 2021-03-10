module.exports = function() {
    $.gulp.task('libsCSS:dev', () => {
        return $.gulp.src(['node_modules/normalize.css/normalize.css'])
            .pipe($.gp.concat('libs.min.css'))
            .pipe($.gulp.dest('./build/static/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('libsCSS:build', () => {
        return $.gulp.src(['node_modules/normalize.css/normalize.css'])
            .pipe($.gp.concat('libs.min.css'))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.gulp.dest('./build/static/css/'));
    });

    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src(['node_modules/svg4everybody/dist/svg4everybody.min.js', 'node_modules/svg4everybody/dist/svg4everybody.legacy.min.js'])
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src(['node_modules/svg4everybody/dist/svg4everybody.min.js', 'node_modules/svg4everybody/dist/svg4everybody.legacy.min.js'])
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gp.uglifyjs())
            .pipe($.gulp.dest('./build/static/js/'));
    });

    $.gulp.task('js:copy', () => {
        return $.gulp.src(['./dev/static/js/*.js',
                           '!./dev/static/js/libs.min.js'])
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
