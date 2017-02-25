/* jshint node: true */
/* globals describe, it */

'use strict';

let expect = require('chai').expect;

let propKeys = require('../../../lib/utils/prop-keys');

describe('propKeys', function() {
  it('propKeys({ a: true, b: { c: true }}) => ["a", "b.c"]', function() {
    expect(propKeys({ a: true, b: { c: true }})).to.deep.equal(['a', 'b.c']);
  });

  it('propKeys({ "a.a": true, b: { c: true }}) => ["a\.a", "b.c"]', function() {
    expect(propKeys({ 'a.a': true, b: { c: true }})).to.deep.equal(['a\\.a', 'b.c']);
  });
});
