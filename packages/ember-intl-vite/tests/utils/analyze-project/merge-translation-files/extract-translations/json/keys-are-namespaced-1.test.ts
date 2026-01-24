import { assert, test } from '@codemod-utils/tests';

import { extractTranslations } from '../../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | extract-translations | json > keys are namespaced (1)', function () {
  const file = JSON.stringify({
    'card.learn-more.aria-label': 'Learn more about {productName}',
    'card.learn-more.label': 'Learn more',
    'details.add-to-cart': 'Add to Cart',
    'details.description': 'Description',
    'details.price': 'Price',
    'details.rating': 'Rating',
    'details.rating-value': '{productRating} out of 5 stars',
    'details.seller': 'Seller',
    title: '{productName}',
  });

  const translationObject = extractTranslations(file, {
    filePath: 'translations/en-us.json',
    namespaceKeys: true,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationObject, {
    'card.learn-more.aria-label': 'Learn more about {productName}',
    'card.learn-more.label': 'Learn more',
    'details.add-to-cart': 'Add to Cart',
    'details.description': 'Description',
    'details.price': 'Price',
    'details.rating': 'Rating',
    'details.rating-value': '{productRating} out of 5 stars',
    'details.seller': 'Seller',
    title: '{productName}',
  });
});
