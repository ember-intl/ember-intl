const expect = require('chai').expect;

const subject = require('../../../blueprints/translation');

describe('translations', function () {
  it('returns undefined on valid formatted locale', function () {
    expect(
      subject.beforeInstall({
        entity: {
          name: 'fr-fr',
        },
      }),
    ).to.be.an('undefined');
  });

  it('throws when invalid formatted locale is provided', function () {
    function triggerBeforeInstall() {
      subject.beforeInstall({
        entity: {
          name: 'INVALID.LOCALE',
        },
      });
    }

    expect(triggerBeforeInstall).to.throw(Error);
  });
});
