module.exports = function() {
    var FAVICON_DATA_FILE = 'faviconData.json';
    // Generate the icons. This task takes a few seconds to complete.
    // You should run it at least once to create the icons. Then,
    // you should run it whenever RealFaviconGenerator updates its
    // package (see the check-for-favicon-update task below).
    $.gulp.task('generate-favicon', function(done) {
        $.realFavicon.generateFavicon({
            masterPicture: './dev/static/img/general/logo3d.png',
            dest: './build/static/favicon/',
            iconsPath: 'static/favicon',
            design: {
                ios: {
                    pictureAspect: 'backgroundAndMargin',
                    backgroundColor: '#ffffff',
                    margin: '14%',
                    assets: {
                        ios6AndPriorIcons: false,
                        ios7AndLaterIcons: false,
                        precomposedIcons: false,
                        declareOnlyDefaultIcon: true
                    }
                },
                desktopBrowser: {
                    design: 'raw'
                },
                windows: {
                    pictureAspect: 'noChange',
                    backgroundColor: '#ffffff',
                    onConflict: 'override',
                    assets: {
                        windows80Ie10Tile: false,
                        windows10Ie11EdgeTiles: {
                            small: false,
                            medium: true,
                            big: false,
                            rectangle: false
                        }
                    }
                },
                androidChrome: {
                    pictureAspect: 'noChange',
                    themeColor: '#ffffff',
                    manifest: {
                        name: 'tajam',
                        display: 'standalone',
                        orientation: 'notSet',
                        onConflict: 'override',
                        declared: true
                    },
                    assets: {
                        legacyIcon: false,
                        lowResolutionIcons: false
                    }
                },
                safariPinnedTab: {
                    pictureAspect: 'silhouette',
                    themeColor: '#5bbad5'
                }
            },
            settings: {
                scalingAlgorithm: 'Mitchell',
                errorOnImageTooSmall: false,
                readmeFile: false,
                htmlCodeFile: false,
                usePathAsIs: false
            },
            markupFile: FAVICON_DATA_FILE
        }, function() {
            done();
        });
    });
};