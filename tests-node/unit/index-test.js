'use strict';

const mocha = require('mocha');
const expect = require('chai').expect;

const subject = require('../../index');

describe('index', function() {
  it('createOptions ensures that requiresTranslation is a function.', function() {
    const index = Object.assign({}, subject);
    const logs = [];

    index.log = message => logs.push(message);
    index.readConfig = () => ({ requiresTranslation: undefined });

    const addonConfig = index.createOptions.call(index);

    expect(addonConfig.requiresTranslation).to.be.a('function');

    expect(logs).to.deep.equal(['Configured `requiresTranslation` is not a function. Using default implementation.']);
  });
});
