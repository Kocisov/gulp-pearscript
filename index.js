'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var transpile = require('pearscript/lib/transpiler').transpile;

module.exports = function (options) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-pearscript', 'Streaming not supported'));
      return;
    }

    try {
      var output = transpile(file.contents.toString(), file.relative);

      file.contents = new Buffer(output);
      file.path = gutil.replaceExtension(file.path, '.js');

      if (file.sourceMap) {
        applySourceMap(file, output.map.toString());
      }

      this.push(file);

    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-pearscript', err));
    }

    cb();
  });
};
