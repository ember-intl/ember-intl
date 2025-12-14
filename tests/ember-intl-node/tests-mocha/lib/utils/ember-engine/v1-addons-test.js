import findEngine from '@ember-intl/v1-compat/lib/utils/ember-engine.js';
import { expect } from 'chai';

describe('lib | utils | ember-engine | v1 addons', function () {
  it('works', async function () {
    const addon = {
      pkg: {
        name: 'my-v1-addon',
        keywords: ['ember-addon'],
      },
    };

    const output = findEngine(addon);

    expect(output).to.deep.equal(undefined);
  });
});
