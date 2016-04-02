'use strict';

var mocha = require('mocha');
var expect = require('chai').expect;

var subject = require('../../../blueprints/translation');

describe('translations', function() {
  it('normalizes the locale arg', function() {
    expect(subject.normalizeEntityName('FR-FR')).to.equal('fr-fr');
  });

  it('returns undefined on valid formatted locale', function() {
    expect(subject.beforeInstall({
      entity: {
        name: 'fr-fr'
      }
    })).to.be.an('undefined');
  });

  it('throws when invalid formatted locale is provided', function() {
    var fn = function() {
      subject.beforeInstall({
        entity: {
          name: 'INVALID.LOCALE'
        }
      })
    }

    expect(fn).to.throw(Error);
  });
});
