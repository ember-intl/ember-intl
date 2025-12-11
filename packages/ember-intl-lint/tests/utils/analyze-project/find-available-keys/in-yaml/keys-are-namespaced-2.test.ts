import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { inYaml } from '../../../../../src/utils/analyze-project/find-available-keys/index.js';

test('utils | analyze-project | find-available-keys | in-yaml > keys are namespaced (2)', function () {
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
    filePath: 'translations/components/products/product/en-us.yaml',
    namespaceKeys: true,
    rootDir: 'translations',
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
