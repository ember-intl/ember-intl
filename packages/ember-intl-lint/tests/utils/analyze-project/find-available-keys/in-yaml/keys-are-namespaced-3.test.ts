import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inYaml } from '../../../../../src/utils/analyze-project/find-available-keys/index.js';

test('utils | analyze-project | find-available-keys | in-yaml > keys are namespaced (3)', function () {
  const file = normalizeFile([
    `card:`,
    `  learn-more:`,
    `    aria-label: Learn more about {productName}`,
    `    label: Learn more`,
    `details:`,
    `  add-to-cart: Add to Cart`,
    `  description: Description`,
    `  price: Price`,
    `  rating: Rating`,
    `  rating-value: "{productRating} out of 5 stars"`,
    `  seller: Seller`,
    `title: "{productName}"`,
    ``,
  ]);

  const translationObject = inYaml(file, {
    filePath: 'translations/components/products/product/en-us.yaml',
    namespaceKeys: true,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationObject, {
    'components.products.product.card.learn-more.aria-label':
      'Learn more about {productName}',
    'components.products.product.card.learn-more.label': 'Learn more',
    'components.products.product.details.add-to-cart': 'Add to Cart',
    'components.products.product.details.description': 'Description',
    'components.products.product.details.price': 'Price',
    'components.products.product.details.rating': 'Rating',
    'components.products.product.details.rating-value':
      '{productRating} out of 5 stars',
    'components.products.product.details.seller': 'Seller',
    'components.products.product.title': '{productName}',
  });
});
