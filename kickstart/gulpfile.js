/**
 * Copyright 2016 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const gulp = require('gulp-help')(require('gulp'));
const posthtml = require('gulp-posthtml');
const runSequence = require('run-sequence');

const config = {
  dist: 'dist',
  templates: 'templates/**/*.html',
};

gulp.task('build', 'build', function(cb) {
  runSequence('posthtml', cb);
});

gulp.task('default', ['build']);

gulp.task('posthtml', 'build kickstart files', function() {
  const prefixOptions = {
    prefix: 'prefix-',
  };
  const plugins = [require('posthtml-prefix-class')(prefixOptions)];
  const options = {};
  gulp.src(config.templates)
    .pipe(posthtml(plugins, options))
    .pipe(gulp.dest(config.dist))
});

function serve() {
  var app = require('express')();
  var webserver = require('gulp-webserver');

  var host = 'localhost';
  var port = process.env.PORT || 8000;
  var server = gulp.src(cofig.dist)
      .pipe(webserver({
        port,
        host,
        directoryListing: true,
        https: false,
        middleware: [app]
      }));

  return server;
}

gulp.task('serve', serve);
