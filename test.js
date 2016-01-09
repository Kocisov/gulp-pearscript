'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var pearscript = require('./');
var expect = require('chai').expect;

var data;
beforeEach(done => {
  var stream = pearscript();

  stream.on('data', file => { data = file });
  stream.on('end', done);

  stream.write(new gutil.File({
    base: __dirname,
    path: __dirname + '/file.pear',
    contents: new Buffer(`
    	log."hello"
    `)
  }));

  stream.end();

});

it('should parse valid pearscript', function() {
  expect(data.contents.toString()).to.contain('console.log("hello");');
});

it('renames to .js', () => {
  expect(data.extname).to.equal('.js');
});
