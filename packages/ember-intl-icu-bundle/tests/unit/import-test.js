import IntlMessageFormat from 'intl-messageformat';
import { module, test } from 'qunit';

module('Unit | MessageFormat exports');

test('intl-messageformat exports a constructor', function(assert) {
  assert.ok(IntlMessageFormat, 'IntlMessageFormat exports constructor');
});

test('intl-messageformat exports a single module', function(assert) {
  var NUM_PHOTOS = `You have {numPhotos, plural,
      =0 {no photos.}
      =1 {one photo.}
      other {# photos.}
    }`;

  var enNumPhotos = new IntlMessageFormat(NUM_PHOTOS, 'en-US');
  assert.equal(enNumPhotos.format({numPhotos: 1000}), 'You have 1,000 photos.');
});
