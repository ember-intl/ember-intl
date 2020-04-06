const expect = require('chai').expect;

const addon = require('../../index');

describe('index', function () {
  it('createOptions ensures that requiresTranslation is a function.', function () {
    const logs = [];
    const subject = {
      ...addon,
      readConfig: () => ({ requiresTranslation: undefined }),
      logger: {
        log: (message) => logs.push(message),
      },
    };

    const addonConfig = subject.createOptions();

    expect(addonConfig.requiresTranslation).to.be.a('function');
    expect(logs).to.deep.equal(['Configured `requiresTranslation` is not a function. Using default implementation.']);
  });
});
