module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug', 'pugphp'));
        $.gulp.watch('./dev/static/stylus/**/*.styl', $.gulp.series('styles:dev'));
        $.gulp.watch('./dev/static/scss/**/*.scss', $.gulp.series('styles:dev'));
        $.gulp.watch('./dev/static/img/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./dev/static/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
        $.gulp.watch(['./dev/static/img/general/**/*.{png,jpg,gif}',
                     './dev/static/img/content/**/*.{png,jpg,gif}'], $.gulp.series('img:dev'));
        $.gulp.watch(['./dev/static/img/spritePNG/**/*.{png}'], $.gulp.series('sprite'));
    });
};