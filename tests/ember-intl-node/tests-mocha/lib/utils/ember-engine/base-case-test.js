import findEngine from '@ember-intl/v1-compat/lib/utils/ember-engine.js';
import { expect } from 'chai';

describe('lib | utils | ember-engine | base case', function () {
  it('works', async function () {
    const addon = {
      pkg: null,
    };

    const output = findEngine(addon);

    expect(output).to.deep.equal(undefined);
  });
});
