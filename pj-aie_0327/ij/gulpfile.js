const { src, dest, parallel, series, watch, lastRun } = require('gulp');
const ejs = require('gulp-ejs');
const indent = require('gulp-html-beautify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mmq = require('gulp-merge-media-queries');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const browserSync = require('browser-sync');
const ssi = require('connect-ssi');
const minifyCSS = require('gulp-csso');

const dir_name = 'ij';

function browserSyncTask(done){
    browserSync.init({
        server: {
            baseDir: 'dist',
            middleware: [
                ssi({
                    baseDir: 'dist',
                    notify: false, //通知
                    ext: ".html"
                })
            ]
        },
        port: 4000,
        reloadOnRestart: true
    });
    done();
}
function browserReloadTask(done){
    browserSync.reload();
    done();
}

function imgTask() {
    return src('src/'+dir_name+'/assets/img/**/*', { since: lastRun(imgTask) })
    .pipe(dest('dist/'+dir_name+'/assets/img'))
}
function imgminTask() {
    return src('src/'+dir_name+'/assets/img/**/*')
    .pipe(imagemin([
        pngquant({
            quality: [.6, .9],
            speed: 1
        }),
        mozjpeg({
            quality: 85,
            progressive: true
        }),
        imagemin.svgo(
            {
                plugins: [
                    // viewBox属性を削除する（widthとheight属性がある場合）。
                    // 表示が崩れる原因になるので削除しない。
                    { removeViewBox: false },
                    // <metadata>を削除する。
                    // 追加したmetadataを削除する必要はない。
                    { removeMetadata: false },
                    // SVGの仕様に含まれていないタグや属性、id属性やvertion属性を削除する。
                    // 追加した要素を削除する必要はない。
                    { removeUnknownsAndDefaults: false },
                    // コードが短くなる場合だけ<path>に変換する。
                    // アニメーションが動作しない可能性があるので変換しない。
                    { convertShapeToPath: false },
                    // 重複や不要な`<g>`タグを削除する。
                    // アニメーションが動作しない可能性があるので変換しない。
                    { collapseGroups: false },
                    // SVG内に<style>や<script>がなければidを削除する。
                    // idにアンカーが貼られていたら削除せずにid名を縮小する。
                    // id属性は動作の起点となることがあるため削除しない。
                    { cleanupIDs: false },
                ]
            }
        ),
        imagemin.optipng(),
        imagemin.gifsicle()
    ]))
    .pipe(dest('dist/'+dir_name+'/assets/img'))
}


function ejsHtmlTask() {
    var html = true;
    return src(['src/**/*.ejs', '!src/components/**/*.ejs', '!src/_**/*', '!src/**/_*'])
    .pipe(ejs({
        html: true,
        wp: false,
        dir: "./",
        home_url: "./",
        body_class: "",
        title: "",
    }))
    .pipe(indent({
        indent_size: 4,
        // indent_with_tabs: true
    }))
    .pipe(rename(function(path){
        path.extname = ".html";
    }))
    .pipe(dest('dist'))
}
function htmlTask() {
    return src('src/**/*.html')
    .pipe(indent({
        indent_size: 4,
        // indent_with_tabs: true
    }))
    .pipe(dest('dist'))
}

function scssCssTask() {
    return src('src/'+dir_name+'/assets/scss/**/*.scss', { sourcemaps: true })
    .pipe(sass({
        outputStyle: "expanded",
        sourcemaps: true
    }))
    .pipe( postcss([ autoprefixer({
        // ☆IEは11以上、Androidは4.4以上
        // その他は最新2バージョンで必要なベンダープレフィックスを付与する
        "overrideBrowserslist": ["last 2 versions", "ie >= 11", "Android >= 4"],
        cascade: false,
        grid: "autoplace"
    }) ]) )
    .pipe(mmq())
    // .pipe(minifyCSS())
    .pipe(dest('dist/'+dir_name+'/assets/css', { sourcemaps: './maps' }))
}
function scssTask() {
    return src('src/**/*.scss')
    .pipe(dest('dist'))
}
function cssTask() {
    return src(['src/**/*.css'])
    .pipe(dest('dist'))
}

function jsTask() {
    return src('src/**/*.js', { sourcemaps: false })
    .pipe(dest('dist', { sourcemaps: false }))
}


function watchHtmlTask(){
    watch('src/**/*.html',
    series(
        parallel(htmlTask),
        browserReloadTask
        )
    )
}
function watchEjsTask(){
    watch('src/**/*.ejs',
    series(
        parallel(ejsHtmlTask),
        browserReloadTask
        )
    )
}
function watchScssTask(){
    watch('src/**/*.scss',
    series(
        parallel(scssTask,scssCssTask),
        browserReloadTask,
        )
    )
}
function watchCssTask(){
    watch('src/**/*.css',
    series(
        parallel(cssTask),
        browserReloadTask,
        )
    )
}
function watchJsTask(){
    watch('src/**/*.js',
    series(
        parallel(jsTask),
        browserReloadTask,
        )
    )
}
function watchImgTask(){
    watch('src/'+dir_name+'/assets/img/**/*',
    series(
        parallel(imgTask),
        browserReloadTask
        )
    )
}

// 追加タスク
// slickをdestに出力
function additionalTask1() {
    return src('src/'+dir_name+'/assets/slick')
    .pipe(dest('dist/'+dir_name+'/assets/'))
}
// fontをdestに出力
function additionalTask2() {
    return src('src/**/*.otf')
    .pipe(dest('dist'))
}


// ejs→htmlコーディング
exports.default = parallel(
    additionalTask1,additionalTask2, htmlTask,ejsHtmlTask, scssTask,scssCssTask,cssTask, jsTask, imgTask, watchHtmlTask,watchEjsTask, watchScssTask,watchCssTask, watchJsTask, watchImgTask, browserSyncTask
);
// build
exports.build = parallel(
    additionalTask1,additionalTask2, htmlTask,ejsHtmlTask, scssTask,scssCssTask,cssTask, jsTask, imgminTask, watchHtmlTask,watchEjsTask, watchScssTask,watchCssTask, watchJsTask, watchImgTask, browserSyncTask
);

// 全画像圧縮
exports.img = parallel(
    imgTask
);