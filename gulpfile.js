const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfigProd = require('./webpack.config.js');
const webpackConfigDev = require('./webpack.dev.config.js');
const cache = require('gulp-cache');
const packageFile = require('package')('.');
const exec = require('child_process').exec;
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const tsProjectDev = ts.createProject('tsconfig.json', { isolatedModules: true });
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const lessBaseImport = require('gulp-less-base-import');
const mocha = require('gulp-mocha');
const plumber = require('gulp-plumber');
const path = require('path');
const oss = require('gulp-oss');
const gzip = require("gulp-gzip");
const del = require('del');
const moment = require('moment');

const BUILD_DIR = 'dist';
const SRC_DIR = 'src';
const TEST_DIR = 'test';
const IMG_SRC_DIR = 'images';
const IMG_DEST_DIR = 'images';
const JS_LIB_SRC_DIR = 'lib';
const JS_LIB_DEST_DIR = 'lib';
const FONT_SRC_DIR = 'font';
const FONT_DEST_DIR = 'font';

class WaitList {
    constructor() {
        this.tsReaday = false;
        this.webpackReady = false;
    }
    setTSReady() {
        this.tsReaday = true;
        this.notify();
    }
    setWebpackReady() {
        this.webpackReady = true;
        this.notify();
    }
    notify() {
        if (this.tsReaday && this.webpackReady) {
            exec(`pm2 restart ${packageFile.name}`);
            this.tsReaday = false;
            this.webpackReady = false;
        }
    }
}
const wl = new WaitList();

gulp.task('clean', function (done) {
    del([path.join(BUILD_DIR, '**')]).then(function () {
        done();
    });
});

// ---------------------------------------------------------
// production
gulp.task('image compression', ['clean'], function () {
    var imagemin = require('/usr/lib/node_modules/gulp-imagemin');

    return gulp.src([path.join(SRC_DIR, IMG_SRC_DIR, '**')])
        .pipe(cache(imagemin(), {
            fileCache: new cache.Cache({ tmpDir: '/home/build_cache', cacheDirName: packageFile.name + '-cache' })
        }))
        .pipe(gulp.dest(path.join(BUILD_DIR, IMG_DEST_DIR)));
});

gulp.task('update img to oss', ['image compression'], function () {
    var config = require('./conf/prod');

    return gulp.src(path.join(BUILD_DIR, IMG_SRC_DIR, '**'))
        .pipe(gzip({ append: false }))
        .pipe(cache(oss({
            "key": config['@ALIYUN'].ACCESS_KEY_ID,
            "secret": config['@ALIYUN'].ACCESS_KEY_SECRET,
            "endpoint": 'http://' + config['@ALIYUN'].OSS_ENDPOINT
        }, {
                headers: {
                    Bucket: config['@ALIYUN'].BUCKET,
                    ContentEncoding: 'gzip'
                },
                uploadPath: config['@ALIYUN'].APP_IMG_DIRECTORY + '/'
            }), {
                fileCache: new cache.Cache({ tmpDir: '/home/build_cache', cacheDirName: packageFile.name + '-cache-oss-img' })
            }));
});

gulp.task('webpack', ['clean'], function (done) {
    return webpack(webpackConfigProd, function (err, stats) {
        var output = stats.toString();
        if (output.indexOf('ERROR') !== -1) {
            console.log(output);
            return done(new Error('webpack build failed'));
        }
        done();
    });
});

gulp.task('compile less', ['clean'], function () {
    var processors = [autoprefixer, cssnano({ zindex: false, reduceIdents: false })];

    return gulp.src([path.join(SRC_DIR, '**/*.less')])
        .pipe(plumber())
        .pipe(lessBaseImport(webpackConfigProd.lessImportLoader.base))
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.join(BUILD_DIR)));
});

gulp.task('compile ts', ['clean'], function () {
    return tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(path.join(BUILD_DIR)));
});

gulp.task('move lib', ['clean'], function () {
    return gulp.src(path.join(SRC_DIR, JS_LIB_SRC_DIR, '*')).pipe(gulp.dest(path.join(BUILD_DIR, JS_LIB_DEST_DIR)));
});

gulp.task('move font', ['clean'], function () {
    return gulp.src(path.join(SRC_DIR, FONT_SRC_DIR, '*')).pipe(gulp.dest(path.join(BUILD_DIR, FONT_DEST_DIR)));
});
// ---------------------------------------------------------

// ---------------------------------------------------------
// development
gulp.task('compile less once', [], function () {
    var processors = [autoprefixer, cssnano({ zindex: false, reduceIdents: false })];

    return gulp.src([path.join(SRC_DIR, '**/*.less')])
        .pipe(plumber())
        .pipe(lessBaseImport(webpackConfigDev.lessImportLoader.base))
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.join(BUILD_DIR)))
        .on('end', function () {
            exec(`pm2 restart ${packageFile.name}`);
        });
});

gulp.task('compile ts once', [], function () {
    return tsProjectDev
        .src()
        .pipe(plumber())
        .pipe(tsProjectDev())
        .js
        .pipe(gulp.dest(path.join(BUILD_DIR)))
        .on('end', function () {
            wl.setTSReady();
        });
});


gulp.task('move lib once', [], function () {
    return gulp.src(path.join(SRC_DIR, JS_LIB_SRC_DIR, '*')).pipe(gulp.dest(path.join(BUILD_DIR, JS_LIB_DEST_DIR)));
});

gulp.task('watch webpack', [], function () {
    try {
        let compiler = webpack(webpackConfigDev);

        compiler.watch({
            aggregateTimeout: 300, // wait so long for more changes
        }, function (err, stats) {
            if (err) {
                console.error(err);
            } else {
                let now = new moment();
                console.info(`[${now.format('HH:mm:ss')}] -----webpack compile finished-------------`);
                wl.setWebpackReady();
            }
        });
    } catch (e) {
        console.error(e);
    }
});

gulp.task('move img once', [], function () {
    return gulp.src(path.join(SRC_DIR, IMG_SRC_DIR, '**')).pipe(gulp.dest(path.join(BUILD_DIR, IMG_DEST_DIR)));
});
gulp.task('move font once', [], function () {
    return gulp.src(path.join(SRC_DIR, FONT_SRC_DIR, '**')).pipe(gulp.dest(path.join(BUILD_DIR, FONT_DEST_DIR)));
});
gulp.task('watch ts', ['compile ts once'], function () {
    gulp.watch([path.join(SRC_DIR, '**/*.{ts,tsx}')], ['compile ts once']);
});
gulp.task('watch less', ['compile less once'], function () {
    gulp.watch(path.join(SRC_DIR, '**/*.less'), ['compile less once']);
});
gulp.task('watch lib', ['move lib once'], function () {
    gulp.watch(path.join(SRC_DIR, JS_LIB_SRC_DIR, '**'), ['move lib once']);
});
gulp.task('watch img', ['move img once'], function () {
    gulp.watch(path.join(SRC_DIR, IMG_SRC_DIR, '**'), ['move img once']);
});
gulp.task('watch font', ['move font once'], function () {
    gulp.watch(path.join(SRC_DIR, FONT_SRC_DIR, '**'), ['move font once']);
});
// ---------------------------------------------------------


// ---------------------------------------------------------
// commands
gulp.task('default', ['clean', 'image compression', 'update img to oss', 'compile ts', 'webpack', 'compile less', 'move lib', 'move font']);
gulp.task('dev', ['watch webpack', 'watch ts', 'watch lib', 'watch img', 'watch less', 'watch font']);
// ---------------------------------------------------------

