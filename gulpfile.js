const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
// const pug = require('pug');

// const { src, dest } = require('gulp');
const pugG = require('gulp-pug');

const pug = () => {
    return gulp.src('source/*.pug')
        .pipe(
            pugG({
                // Your options in here.
            })
        )
        .pipe(gulp.dest('build'));
};

exports.pug = pug;


// Styles

const styles = () => {
    return gulp
        .src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), csso()]))
        .pipe(sourcemap.write("."))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"))
        .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
    return gulp
        .src("source/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("build"));
};

exports.html = html;

// Scripts

const scripts = () => {
    return gulp.src("source/js/script.js")
        .pipe(terser())
        .pipe(rename("script.min.js"))
        .pipe(gulp.dest("build/js"))
        .pipe(sync.stream());
}

exports.scripts = scripts;

// Images

const optimizeImages = () => {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
        .pipe(imagemin([
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img"))
}

exports.images = optimizeImages;

const copyImages = () => {
    return gulp.src("source/img/**/*.{png,jpg,svg}")
        .pipe(gulp.dest("build/img"))
}

exports.images = copyImages;

// Copy

const copy = (done) => {
    gulp.src([
            "source/fonts/*.{woff2,woff}",
            "source/*.ico",
            "source/img/**/*.svg",
            "!source/img/icons/*.svg",
        ], {
            base: "source"
        })
        .pipe(gulp.dest("build"))
    done();
}

exports.copy = copy;

// Clean

const clean = () => {
    return del("build");
};

// Server

const server = (done) => {
    sync.init({
        server: {
            baseDir: "build"
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.server = server;

// Watcher

const watcher = () => {
    gulp.watch("source/sass/**/*.scss", gulp.series(styles));
    gulp.watch("source/js/script.js", gulp.series(scripts));
    gulp.watch("source/*.html", gulp.series(html, reload));
    gulp.watch("source/*.pug", gulp.series(pug, reload))
}

// Reload
const reload = (done) => {
    sync.reload();
    done();
}

// Build

const build = gulp.series(
    clean,
    copy,
    optimizeImages,
    gulp.parallel(
        styles,
        html,
        pug,
        scripts
    ),
);

exports.build = build;

// Default

exports.default = gulp.series(
    clean,
    copy,
    copyImages,
    gulp.parallel(
        styles,
        pug,
        scripts
    ),
    gulp.series(
        server,
        watcher
    ));