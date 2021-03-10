module.exports = function() {
    var FAVICON_DATA_FILE = 'faviconData.json';
    // Inject the favicon markups in your HTML pages. You should run
    // this task whenever you modify a page. You can keep this task
    // as is or refactor your existing HTML pipeline.
    $.gulp.task('inject-favicon-markups', ()=> {
        return $.gulp.src([ './build/*.html', './build/*.php' ])
            .pipe($.realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
            .pipe($.gulp.dest('./build'));
    });
};