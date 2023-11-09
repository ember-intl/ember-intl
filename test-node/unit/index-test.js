import { expect } from 'chai';
import addon from 'ember-intl/index.js';

describe('index', function () {
  it('createOptions ensures that requiresTranslation is a function.', function () {
    const logs = [];
    const subject = {
      ...addon,
      readConfig: () => ({ requiresTranslation: undefined }),
      logger: {
        warn: (message) => logs.push(message),
      },
    };

    const addonConfig = subject.createOptions();

    expect(addonConfig.requiresTranslation).to.be.a('function');
    expect(logs).to.deep.equal([
      'Configured `requiresTranslation` is not a function. Using default implementation.',
    ]);
  });
});
