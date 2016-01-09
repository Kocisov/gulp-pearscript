# gulp-pearscript [![Build Status](https://travis-ci.org/Kocisov/gulp-pearscript.svg?branch=master)](https://travis-ci.org/Kocisov/gulp-pearscript)

> Gulp plugin for pearscript

## Install

```
$ npm install --save-dev gulp-pearscript
```


## Usage

```js
var gulp = require('gulp');
var pearscript = require('gulp-pearscript');

gulp.task('default', function () {
	return gulp.src('src/file.pear')
		.pipe(pearscript())
		.pipe(gulp.dest('dist'));
});
```
