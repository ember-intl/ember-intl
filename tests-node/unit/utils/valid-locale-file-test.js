/* eslint-env node */
/* globals describe, it */

'use strict';

let expect = require('chai').expect;

let validLocaleFile = require('../../../lib/utils/valid-locale-file');

describe('validLocaleFile', function() {
  [
    ['en-us.yaml', true],
    ['en.json', true],
    ['sub/en-us.yml', true],

    ['index.html', false],
    ['.bashrc', false],
    ['.DS_Store', false],
    [undefined, false]
  ].forEach(([filename, isValid]) => {
    it(`${filename}`, function() {
      expect(validLocaleFile(filename)).to.equal(isValid);
    });
  });
});
