module.exports = function () {
    $.gulp.task('styles:build', () => {
        // return $.gulp.src('./dev/static/stylus/main.styl')
        return $.gulp.src(['./dev/static/scss/main.scss'])
            // .pipe($.gp.stylus({
            //     'include css': true
            // }))
            .pipe($.scss())
            .pipe($.gp.autoprefixer({
                browsers: ['last 15 versions', '>1%', 'ie 8', 'ie 7']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.rename('main.min.css'))
            .pipe($.gulp.dest('./build/static/css/'))
    });

    $.gulp.task('styles:dev', () => {
        // return $.gulp.src('./dev/static/stylus/main.styl')
        return $.gulp.src(['./dev/static/scss/main.scss'])
            .pipe($.gp.sourcemaps.init())
            // .pipe($.gp.stylus({
            //     'include css': true
            // }))
            .pipe($.scss())
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    // title: 'Stylus',
                    title: 'Scss',
                    message: error.message
                };
            }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gp.autoprefixer({
                browsers: ['last 15 versions', '>1%', 'ie 8', 'ie 7']
            }))
            .pipe($.rename('main.min.css'))
            .pipe($.gulp.dest('./build/static/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
