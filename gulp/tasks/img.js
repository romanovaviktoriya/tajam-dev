module.exports = function() {
    $.gulp.task('img:dev', () => {
        return $.gulp.src('./dev/static/img/**/*.{png,jpg,gif}')
            .pipe($.gulp.dest('./build/static/img/'));
    });

    $.gulp.task('img:build', () => {
        return $.gulp.src('./dev/static/img/**/*.{png,jpg,gif}')
            .pipe($.gp.tinypng('rysh8mvjN459Mm3wuMGTOOx6LXggcley'))
            .pipe($.gulp.dest('./build/static/img/'));
    });

    $.gulp.task('webp', () => {
        return $.gulp.src('./dev/static/img/**/*.{png,jpg}')
            .pipe($.webp({quality: 90}))
            .pipe($.gulp.dest('./build/static/img/'));
    });

    $.gulp.task('svg:copy', () => {
        return $.gulp.src('./dev/static/img/general/*.svg')
            .pipe($.gulp.dest('./build/static/img/general/'));
    });

    // Generate Sprite icons
    $.gulp.task('sprite', () => {
        // Generate our spritesheet
        var spriteData = $.gulp.src('./dev/static/img/spritePNG/*.*')
            .pipe($.spritesmith({
                imgName: 'sprite.png',
                imgPath: '../img/general/sprite.png',
                cssName: '_sprite.scss',
                retinaSrcFilter: './dev/static/img/spritePNG/*@2x.png',
                retinaImgName: 'sprite@2x.png',
                retinaImgPath: '../img/general/sprite@2x.png',
                padding: 5
            }));

        // Pipe image stream onto disk
        var imgStream = spriteData.img
        .pipe($.gulp.dest('./build/static/img/general/'));

        // Pipe CSS stream onto disk
        var cssStream = spriteData.css
        .pipe($.gulp.dest('./dev/static/scss/mixins'));

        // Return a merged stream to handle both `end` events
        return $.merge(imgStream, cssStream);
    });
};
