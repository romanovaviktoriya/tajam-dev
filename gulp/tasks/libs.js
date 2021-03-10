module.exports = function () {
    $.gulp.task('libs:build', () => {
        // return $.gulp.src('./dev/static/stylus/main.styl')
        return $.gulp.src(['./dev/static/libs/*.css','./dev/static/libs/*.js', './dev/static/libs/**/*.*'])
            // .pipe($.gp.stylus({
            //     'include css': true
            // }))
            //.pipe($.scss())
            //.pipe($.gp.autoprefixer({
            //    browsers: ['last 15 versions', '>1%', 'ie 8', 'ie 7']
            //}))
            //.pipe($.gp.csscomb())
            //.pipe($.gp.csso())
            .pipe($.gulp.dest('./build/static/libs/'))
    });

    $.gulp.task('libs:dev', () => {
        // return $.gulp.src('./dev/static/stylus/main.styl')
        return $.gulp.src(['./dev/static/libs/*.css','./dev/static/libs/*.js', './dev/static/libs/**/*.*'])
            //.pipe($.gp.sourcemaps.init())
            // .pipe($.gp.stylus({
            //     'include css': true
            // }))
            //.pipe($.scss())
            //.on('error', $.gp.notify.onError(function (error) {
            //    return {
            //        // title: 'Stylus',
            //        title: 'Scss',
            //        message: error.message
            //    };
            //}))
            //.pipe($.gp.sourcemaps.write())
            //.pipe($.gp.autoprefixer({
            //    browsers: ['last 15 versions', '>1%', 'ie 8', 'ie 7']
            //}))
            .pipe($.gulp.dest('./build/static/libs/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
