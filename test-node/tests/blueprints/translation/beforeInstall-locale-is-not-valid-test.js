import { expect } from 'chai';
import blueprint from 'ember-intl/blueprints/translation/index.js';

describe('blueprints | translation', function () {
  it('beforeInstall (locale is not valid)', function () {
    expect(() => {
      blueprint.beforeInstall({
        entity: {
          name: 'INVALID.LOCALE',
        },
      });
    }).to.throw('[ember-intl] invalid locale format: "INVALID.LOCALE"');
  });
});
