const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const components = require('../components.json')

function buildCss(cb) {
  gulp.src(['../src/styles/base.less', '../src/styles/index.less'])
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie > 8']
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
      .pipe(cleanCSS())
      .pipe(concat(`${key}.css`))
      .pipe(gulp.dest('../lib/styles'));
  })
  cb()
}

exports.default = gulp.series(buildCss, buildComponentCss)
