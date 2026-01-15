import gulp from 'gulp';
import pug from  'gulp-pug';
const { src, dest, watch, series } = gulp;
import plumber from  "gulp-plumber";
import sourcemap from  "gulp-sourcemaps";
import postcss from  "gulp-postcss";
import autoprefixer from  "autoprefixer";
import csso from  "postcss-csso";
import rename from  "gulp-rename";
import htmlmin from  "gulp-htmlmin";
import terser from  "gulp-terser";
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import del from  "del";
import syncServer from 'browser-sync';
const sync = syncServer.create();
import * as dartSass from 'sass'
import  gulpSass  from  'gulp-sass' ;
const  sass  =  gulpSass ( dartSass );

function pugTask(done) {
 return src('source/*.pug')
  .pipe(pug())
  .pipe(dest('build')),
  done();
};

// Styles

function styles(done) {
  return src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(sourcemap.write("."))
    .pipe(rename("style.min.css"))
    .pipe(dest("build/css")),
    done();
}

// HTML

function html(done) {
  return src('source/*.html')
    .pipe(
      htmlmin({ collapseWhitespace: true }),
    )
    .pipe(dest('build')),
    done();
}

// Scripts

function scripts(done) {
  return src('source/js/script.js')
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(dest("build/js")),
    done();
}

// Images

function optimizeImages(done) {
  return src('source/img/**/*.{png,jpg,svg}')
    .pipe(imagemin([
    mozjpeg({ progressive: true}),
    optipng({optimizationLevel: 3}),
    svgo()
  ]))
    .pipe(dest("build/img")),
    done();
}

function copyImages(done) {
  return src("source/img/**/*.{png,jpg,svg}")
    .pipe(dest("build/img")),
    done();
}

// Copy

function copy(done) {
  return src([
    "source/*.ico",
    "source/img/**/*.svg",
    "!source/img/icons/*.svg",
  ], {
    base: "source"
  })
  .pipe(dest("build")),
  done();
}

// Clean

function clean() {
  return del("build");
}

// Server

function server(done) {
  sync.init({
    server: "./build",
    cors: true,
    notify: false,
    ui: false, });

  watch(['source/*.html'], series(html)).on('change', sync.reload);
  watch(['source/sass/**/*.scss'], series(styles)).on('change', sync.reload);
  watch('source/js/script.js', series(scripts)).on('change', sync.reload);
}

const build = series([clean, copy, optimizeImages, styles, html, pugTask, scripts]);
const dev = series([clean, copy, copyImages, styles, html, pugTask, scripts, server]);

export { build, dev };