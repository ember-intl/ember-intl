'use strict';

var mocha = require('mocha');
var expect = require('chai').expect;

var subject = require('../../../blueprints/translation');

describe('translations', function() {
  it('returns undefined on valid formatted locale', function() {
    expect(subject.beforeInstall({
      args: [null, 'fr-fr']
    })).to.be.an('undefined');
  });

  it('throws when invalid formatted locale is provided', function() {
    var fn = function() {
      subject.beforeInstall({
        args: [null, 'invalid.locale']
      })
    }

    expect(fn).to.throw(Error);
  });
});
