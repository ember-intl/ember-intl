import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inYaml } from '../../../../../src/utils/analyze-project/find-available-keys/index.js';

test('utils | analyze-project | find-available-keys | in-yaml > keys are namespaced (1)', function () {
  const file = normalizeFile([
    `card.learn-more.aria-label: Learn more about {productName}`,
    `card.learn-more.label: Learn more`,
    `details.add-to-cart: Add to Cart`,
    `details.description: Description`,
    `details.price: Price`,
    `details.rating: Rating`,
    `details.rating-value: "{productRating} out of 5 stars"`,
    `details.seller: Seller`,
    `title: "{productName}"`,
    ``,
  ]);

  const translationObject = inYaml(file, {
    filePath: 'translations/en-us.yaml',
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
