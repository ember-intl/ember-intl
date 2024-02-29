import { expect } from 'chai';
import blueprint from 'ember-intl/blueprints/translation/index.js';

describe('blueprints | translation', function () {
  it('beforeInstall (locale is valid)', function () {
    const output = blueprint.beforeInstall({
      entity: {
        name: 'de-de',
      },
    });

    expect(output).to.equal(undefined);
  });
});
