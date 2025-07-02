const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const base64 = require('gulp-base64');
const components = require('../components.json')

function buildCss(cb) {
  gulp.src(['../src/styles/base.less', '../src/styles/index.less'])
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie > 8']
    }))
    .pipe(base64({
      baseDir: '../src/styles',
      extensions: ['ttf', 'woff', 'woff2', 'eot'], // 需要转换的字体文件扩展名
      maxImageSize: 8 * 1024 * 1024, // 最大文件大小限制，这里设置为8MB
      debug: true // 在控制台显示转换信息
    }))
    .pipe(cleanCSS())
    .pipe(concat('hilbert-vue.css'))
    .pipe(gulp.dest('../lib/styles'));
  cb()
}

function buildComponentCss(cb) {
  Object.keys(components).forEach(key => {
    gulp.src(['../src/styles/base.less', `../src/styles/${key}.less`])
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(base64({
        baseDir: '../src/styles',
        extensions: ['ttf', 'woff', 'woff2', 'eot'], // 需要转换的字体文件扩展名
        maxImageSize: 8 * 1024 * 1024, // 最大文件大小限制，这里设置为8MB
        debug: true // 在控制台显示转换信息
      }))
      .pipe(cleanCSS())
      .pipe(concat(`${key}.css`))
      .pipe(gulp.dest('../lib/styles'));
  })
  cb()
}

exports.default = gulp.series(buildCss, buildComponentCss)
